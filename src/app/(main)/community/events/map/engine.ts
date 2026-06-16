import { createProgram, initGL, loadLandMaskTexture } from "./gl-utils"
import { lonLatToUV, uvToLonLat } from "./projection"
import { dotsFrag, fullscreenVert, MARKER_CAPACITY } from "./shaders"
import { createDiagnostics, type Diagnostics } from "./diagnostics"
import {
  clamp,
  clampLatitude,
  computeLatitudeBounds,
  computePointerVelocity,
  computeWorldDimensions,
  dragTargetByPixels,
  screenToUV,
  stepInertia,
  updatePanFromTarget,
  wrapCentered,
  zoomAroundPointer,
  type LatitudeBounds,
  type WorldDimensions,
} from "./viewport-math"
import type { MapColors } from "./map-colors"

export type MarkerPoint = {
  id: string
  lon: number
  lat: number
}

export type MapHandle = {
  dispose(): void
  setThemeColors(colors: MapColors): void
  setActiveMarker(id: string | null): void
  resetView(): void
}

export type BootOptions = {
  canvas: HTMLCanvasElement
  markers: MarkerPoint[]
  maskUrl: string
  initialCellSize: number
  initialSquareSize: number
  aspectRatio: number
  theme: MapColors
  signal?: AbortSignal
  onActiveMarkerChange?: (id: string | null) => void
}

const MIN_ZOOM = 1
const MAX_ZOOM = 20
const MARKER_TYPE_REGULAR = 1
const MARKER_TYPE_ACTIVE = 2
const ACTIVE_TRANSITION_MS = 100
/**
 * Per-frame damping factor (scaled by dt / (1/60s)).
 * Decrease value to increase damping.
 */
const INERTIA_DAMPING = 0.92
/** Reference frame time in milliseconds for the damping exponent. */
const INERTIA_BASE_DT = 1000 / 60
/** Velocities below this normalized threshold snap directly to zero. */
const INERTIA_EPS = 1e-5

export async function bootMeetupsMap(options: BootOptions): Promise<MapHandle> {
  const gl = initGL(options.canvas)
  const dotsProgram = createProgram(gl, fullscreenVert, dotsFrag)
  let landTexture: WebGLTexture | null = null
  try {
    landTexture = await loadLandMaskTexture(gl, options.maskUrl, options.signal)
    console.assert(
      gl.getError() === gl.NO_ERROR,
      "WebGL init error",
      gl.getError(),
    )
    return new MapEngine({
      ...options,
      gl,
      dotsProgram,
      landTexture,
    })
  } catch (error) {
    gl.deleteProgram(dotsProgram)
    if (landTexture) gl.deleteTexture(landTexture)
    throw error
  }
}

type InternalOptions = BootOptions & {
  gl: WebGL2RenderingContext
  dotsProgram: WebGLProgram
  landTexture: WebGLTexture
}

class MapEngine implements MapHandle {
  private gl: WebGL2RenderingContext
  private canvas: HTMLCanvasElement
  private dotsProgram: WebGLProgram
  private landTexture: WebGLTexture
  private cellSize: number
  private squareSize: number
  private aspectRatio: number
  private zoom = 1
  private pan = new Float32Array([0, 0])
  private target = new Float32Array([0.5, 0.5])
  private velocity = new Float32Array([0, 0])
  private pixelRatio = getDevicePixelRatio()
  private seaColor: Float32Array
  private landColor: Float32Array
  private readonly fullscreenVAO: WebGLVertexArrayObject
  private readonly markerPoints: MarkerPoint[]
  private readonly markerData: Float32Array
  private markerCount: number
  private markerCapacityWarned = false
  private readonly markerColor: Float32Array
  private haloColor: Float32Array
  private haloMinOpacity: number
  private readonly markerIntensity: Float32Array
  private readonly markerIntensityTarget: Float32Array
  private readonly markerIndexById: Map<string, number>
  private activeMarkerIndex = -1
  private hoveredMarkerIndex = -1
  private markerUniformDirty = true
  private readonly resizeObserver: ResizeObserver
  private readonly diagnostics: Diagnostics | null
  private lastRenderState: {
    pan: [number, number]
    zoom: number
    dims: WorldDimensions
    deviceCell: number
  } | null = null
  private rafHandle = 0
  private fps = 60
  private lastFrameTime = performance.now()
  private readonly pointer = {
    active: false,
    id: 0,
    startX: 0,
    startY: 0,
    targetAtStart: new Float32Array([0, 0]),
    lastMoveTime: 0,
  }
  private hoverPointer: { x: number; y: number; hasValue: boolean } = {
    x: 0,
    y: 0,
    hasValue: false,
  }
  private readonly pointerTrail = new Float32Array(192)
  private trailCount = 0
  private readonly onActiveMarkerChange?: (id: string | null) => void
  private destroyed = false

  constructor(options: InternalOptions) {
    this.gl = options.gl
    this.canvas = options.canvas
    this.dotsProgram = options.dotsProgram
    this.landTexture = options.landTexture
    this.aspectRatio = options.aspectRatio
    this.cellSize = options.initialCellSize
    this.squareSize = Math.min(options.initialSquareSize, this.cellSize)

    this.seaColor = new Float32Array(options.theme.sea)
    this.landColor = new Float32Array(options.theme.land)
    this.markerPoints = options.markers
    this.markerData = new Float32Array(MARKER_CAPACITY * 4)
    this.markerCount = this.packMarkers(this.markerPoints, this.markerData)
    this.markerColor = new Float32Array(options.theme.marker)
    this.haloColor = new Float32Array(options.theme.halo)
    this.haloMinOpacity = options.theme.haloMinOpacity
    this.markerIntensity = new Float32Array(MARKER_CAPACITY)
    this.markerIntensityTarget = new Float32Array(MARKER_CAPACITY)
    this.markerIndexById = new Map()
    this.markerPoints.forEach((marker, index) => {
      this.markerIndexById.set(marker.id, index)
    })
    this.onActiveMarkerChange = options.onActiveMarkerChange

    this.fullscreenVAO = this.gl.createVertexArray() as WebGLVertexArrayObject
    this.uploadMarkerUniforms()
    this.pointerTrail.fill(-1)
    this.trailCount = 0

    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas())
    this.resizeObserver.observe(this.canvas)
    this.resizeCanvas()
    this.updatePanFromTarget()
    this.attachEvents()
    this.attachDevtools()
    this.diagnostics =
      process.env.NODE_ENV !== "production"
        ? createDiagnostics({ markers: this.markerPoints })
        : null
    this.loop()
  }
  dispose() {
    if (this.destroyed) return
    this.destroyed = true
    cancelAnimationFrame(this.rafHandle)
    this.resizeObserver.disconnect()
    this.detachEvents()
    this.detachDevtools()
    this.gl.deleteProgram(this.dotsProgram)
    this.gl.deleteTexture(this.landTexture)
    this.gl.deleteVertexArray(this.fullscreenVAO)
  }

  setThemeColors(colors: MapColors) {
    this.seaColor.set(colors.sea)
    this.landColor.set(colors.land)
    this.markerColor.set(colors.marker)
    this.haloColor.set(colors.halo)
    this.haloMinOpacity = colors.haloMinOpacity
  }

  setActiveMarker(id: string | null) {
    const nextIndex =
      typeof id === "string" ? (this.markerIndexById.get(id) ?? -1) : -1
    if (nextIndex === this.activeMarkerIndex) {
      if (nextIndex >= 0) {
        this.markerIntensityTarget[nextIndex] = 1
      }
      return
    }
    if (this.activeMarkerIndex >= 0) {
      this.markerIntensityTarget[this.activeMarkerIndex] = 0
    }
    this.activeMarkerIndex = nextIndex
    if (nextIndex >= 0) {
      const base = nextIndex * 4
      this.markerData[base + 2] = MARKER_TYPE_ACTIVE
      this.markerIntensityTarget[nextIndex] = 1
    }
    this.markerUniformDirty = true
  }

  private uploadMarkerUniforms() {
    this.gl.useProgram(this.dotsProgram)
    const location = this.gl.getUniformLocation(this.dotsProgram, "uMarkers")
    if (location) {
      this.gl.uniform4fv(location, this.markerData)
    }
    this.markerUniformDirty = false
  }

  private getWorldDimensions(): WorldDimensions {
    return computeWorldDimensions(
      this.canvas.width,
      this.canvas.height,
      this.aspectRatio,
    )
  }

  private clampLatitude(value: number) {
    return clampLatitude(value, this.getLatitudeBounds())
  }

  private getLatitudeBounds(): LatitudeBounds {
    const { height, worldHeight } = this.getWorldDimensions()
    return computeLatitudeBounds(height, worldHeight, this.zoom)
  }

  resetView() {
    this.zoom = 1
    this.target[0] = 0.5
    this.target[1] = 0.5
    this.velocity[0] = 0
    this.velocity[1] = 0
    this.updatePanFromTarget()
  }

  private packMarkers(markers: MarkerPoint[], target: Float32Array) {
    const capacity = MARKER_CAPACITY
    const count = Math.min(markers.length, capacity)
    for (let i = 0; i < count; i++) {
      const marker = markers[i]
      const uv = lonLatToUV(marker.lon, marker.lat)
      const base = i * 4
      target[base + 0] = uv[0]
      target[base + 1] = 1 - uv[1]
      target[base + 2] = MARKER_TYPE_REGULAR
      target[base + 3] = 0
    }
    if (markers.length > capacity && !this.markerCapacityWarned) {
      console.warn(
        `Meetups map: capped marker count at ${capacity} (received ${markers.length}).`,
      )
      this.markerCapacityWarned = true
    }
    return count
  }

  private pointerToDevice(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect()
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null
    }
    const relativeX = clientX - rect.left
    const relativeY = clientY - rect.top
    const px = relativeX * this.pixelRatio
    const py = this.canvas.height - relativeY * this.pixelRatio
    return [px, py] as const
  }

  private updateHoveredMarkerFromClient(clientX: number, clientY: number) {
    if (this.pointer.active) return
    if (!this.onActiveMarkerChange) return
    const device = this.pointerToDevice(clientX, clientY)
    if (!device) {
      this.notifyHoverChange(-1)
      return
    }
    const [px, py] = device
    const dims = this.getWorldDimensions()
    const deviceCell = this.cellSize * this.pixelRatio
    if (!(deviceCell > 0)) {
      this.notifyHoverChange(-1)
      return
    }
    const cellX = Math.floor(px / deviceCell)
    const cellY = Math.floor(py / deviceCell)
    const centerX = (cellX + 0.5) * deviceCell
    const centerY = (cellY + 0.5) * deviceCell
    const zoomedHeight = dims.worldHeight * this.zoom
    if (!(zoomedHeight > 0)) {
      this.notifyHoverChange(-1)
      return
    }
    const normalizedY = (centerY - this.pan[1]) / zoomedHeight
    if (normalizedY < 0 || normalizedY > 1) {
      this.notifyHoverChange(-1)
      return
    }
    const periodX = dims.worldWidth * this.zoom
    if (!(periodX > 0 && Number.isFinite(periodX))) {
      this.notifyHoverChange(-1)
      return
    }
    const halfPeriod = 0.5 * periodX
    let foundIndex = -1
    for (let i = 0; i < this.markerCount; i++) {
      const base = i * 4
      const markerX = this.markerData[base]
      const markerY = this.markerData[base + 1]
      const baseX = this.pan[0] + markerX * periodX
      let offset = baseX - centerX + halfPeriod
      offset = (((offset % periodX) + periodX) % periodX) - halfPeriod
      const nearestX = centerX + offset
      const screenY = this.pan[1] + markerY * zoomedHeight
      const markerCellX = Math.floor(nearestX / deviceCell)
      const markerCellY = Math.floor(screenY / deviceCell)
      if (markerCellX === cellX && markerCellY === cellY) {
        foundIndex = i
        break
      }
    }
    this.notifyHoverChange(foundIndex)
  }

  private notifyHoverChange(index: number) {
    if (index === this.hoveredMarkerIndex) return
    this.hoveredMarkerIndex = index
    this.updateCursor()
    if (!this.onActiveMarkerChange) return
    if (this.destroyed) return
    const id =
      index >= 0 && index < this.markerPoints.length
        ? this.markerPoints[index].id
        : null
    this.onActiveMarkerChange(id)
  }

  private updateCursor() {
    if (this.pointer.active) return
    this.canvas.style.cursor =
      this.hoveredMarkerIndex >= 0 ? "pointer" : "default"
  }

  private updatePointerTrail(px: number, py: number) {
    const now = performance.now() * 0.001
    const maxGap = this.cellSize * this.pixelRatio * 1.5

    if (this.trailCount === 0) {
      const idx = 0
      this.pointerTrail[idx] = px
      this.pointerTrail[idx + 1] = py
      this.pointerTrail[idx + 2] = now
      this.trailCount = 1
      return
    }

    const lastIdx = 0
    const lastX = this.pointerTrail[lastIdx]
    const lastY = this.pointerTrail[lastIdx + 1]
    const lastTime = this.pointerTrail[lastIdx + 2]
    const dx = px - lastX
    const dy = py - lastY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist <= maxGap) {
      this.addTrailPoint(px, py, now)
    } else {
      const steps = Math.ceil(dist / maxGap)
      const stepSize = 1.0 / steps
      const timeStep = (now - lastTime) / steps

      for (let i = 0; i < steps; i++) {
        const t = (i + 1) * stepSize
        const interpX = lastX + dx * t
        const interpY = lastY + dy * t
        const interpTime = lastTime + timeStep * (i + 1)
        this.addTrailPoint(interpX, interpY, interpTime)
      }
    }
  }

  private addTrailPoint(px: number, py: number, time: number) {
    if (this.trailCount >= 64) {
      for (let i = 189; i >= 3; i -= 3) {
        this.pointerTrail[i] = this.pointerTrail[i - 3]
        this.pointerTrail[i - 1] = this.pointerTrail[i - 4]
        this.pointerTrail[i - 2] = this.pointerTrail[i - 5]
      }
    } else {
      for (let i = this.trailCount * 3 - 1; i >= 0; i--) {
        this.pointerTrail[i + 3] = this.pointerTrail[i]
      }
      this.trailCount++
    }
    this.pointerTrail[0] = px
    this.pointerTrail[1] = py
    this.pointerTrail[2] = time
  }

  private attachEvents() {
    this.canvas.style.cursor = "default"
    this.canvas.addEventListener("pointerdown", this.handlePointerDown)
    this.canvas.addEventListener("pointermove", this.handlePointerMove)
    this.canvas.addEventListener("pointerup", this.handlePointerUp)
    this.canvas.addEventListener("pointerleave", this.handlePointerUp)
    this.canvas.addEventListener("pointercancel", this.handlePointerUp)
    this.canvas.addEventListener("wheel", this.handleWheel, { passive: false })
    window.addEventListener("keydown", this.handleKeyDown)
    window.addEventListener("resize", this.resizeCanvas)
  }

  private detachEvents() {
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown)
    this.canvas.removeEventListener("pointermove", this.handlePointerMove)
    this.canvas.removeEventListener("pointerup", this.handlePointerUp)
    this.canvas.removeEventListener("pointerleave", this.handlePointerUp)
    this.canvas.removeEventListener("pointercancel", this.handlePointerUp)
    this.canvas.removeEventListener("wheel", this.handleWheel)
    window.removeEventListener("keydown", this.handleKeyDown)
    window.removeEventListener("resize", this.resizeCanvas)
  }

  private attachDevtools() {
    if (process.env.NODE_ENV === "production") return
    this.canvas.addEventListener("click", this.handleDebugClick!)
  }

  private detachDevtools() {
    if (process.env.NODE_ENV === "production") return
    this.canvas.removeEventListener("click", this.handleDebugClick!)
  }

  private handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    this.pointer.active = true
    this.pointer.id = event.pointerId
    this.pointer.startX = event.clientX
    this.pointer.startY = event.clientY
    this.pointer.targetAtStart[0] = this.target[0]
    this.pointer.targetAtStart[1] = this.target[1]
    this.pointer.lastMoveTime = performance.now()
    this.velocity[0] = 0
    this.velocity[1] = 0
    this.canvas.setPointerCapture(event.pointerId)
    this.canvas.style.cursor = "move"
    this.notifyHoverChange(-1)
    this.pointerTrail.fill(-1)
    this.trailCount = 0
  }

  private handlePointerMove = (event: PointerEvent) => {
    this.hoverPointer.x = event.clientX
    this.hoverPointer.y = event.clientY
    this.hoverPointer.hasValue = true
    const devicePos = this.pointerToDevice(event.clientX, event.clientY)
    if (devicePos && !this.pointer.active) {
      this.updatePointerTrail(devicePos[0], devicePos[1])
    }
    if (!this.pointer.active) {
      this.updateHoveredMarkerFromClient(event.clientX, event.clientY)
    }
    if (!this.pointer.active || event.pointerId !== this.pointer.id) return
    const scale = this.pixelRatio
    const dx = (event.clientX - this.pointer.startX) * scale
    const dy = (event.clientY - this.pointer.startY) * scale
    const dims = this.getWorldDimensions()
    const prevX = this.target[0]
    const prevY = this.target[1]
    const nextTarget = dragTargetByPixels(
      this.pointer.targetAtStart,
      dx,
      dy,
      this.zoom,
      dims,
    )
    this.target[0] = nextTarget[0]
    this.target[1] = this.clampLatitude(nextTarget[1])
    this.updatePanFromTarget()

    const now = performance.now()
    const last = this.pointer.lastMoveTime || now
    const dt = Math.max(now - last, 1)
    this.pointer.lastMoveTime = now
    const velocity = computePointerVelocity(
      [prevX, prevY],
      [this.target[0], this.target[1]],
      dt,
    )
    this.velocity[0] = velocity[0]
    this.velocity[1] = velocity[1]
  }

  private handlePointerUp = (event: PointerEvent) => {
    if (event.type === "pointerleave" || event.type === "pointercancel") {
      this.hoverPointer.hasValue = false
      this.notifyHoverChange(-1)
      this.pointerTrail.fill(-1)
      this.trailCount = 0
    }
    if (!this.pointer.active || event.pointerId !== this.pointer.id) return
    this.pointer.active = false
    this.canvas.releasePointerCapture(event.pointerId)
    this.canvas.style.cursor = "default"
    this.pointer.lastMoveTime = 0
    if (event.type === "pointerup") {
      this.updateHoveredMarkerFromClient(event.clientX, event.clientY)
    } else {
      this.updateCursor()
    }
  }

  private handleDebugClick =
    process.env.NODE_ENV === "production"
      ? undefined
      : (event: MouseEvent) => {
          const rect = this.canvas.getBoundingClientRect()
          const scale = this.pixelRatio
          const px = (event.clientX - rect.left) * scale
          const py = (event.clientY - rect.top) * scale
          const state =
            this.lastRenderState ?? this.captureRenderStateSnapshot()

          const [u, v] = screenToUV(px, py, state.pan, state.zoom, state.dims)
          const { lon, lat } = uvToLonLat(u, v)
          console.debug(
            `MeetupsMap click → lat ${lat.toFixed(2)}, lon ${lon.toFixed(2)}`,
          )
        }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "r" || event.key === "R") {
      this.resetView()
    }
  }

  private handleWheel = (event: WheelEvent) => {
    if (!event.ctrlKey) {
      // we only handle zooming with control or with pinch gestures (which set ctrlKey)
      // to avoid interfering with normal scrolling through the page
      return
    }

    event.preventDefault()
    const rect = this.canvas.getBoundingClientRect()
    const scale = this.pixelRatio
    const wheel = event as WheelEvent & {
      pointerType?: string
      sourceCapabilities?: { firesTouchEvents?: boolean }
    }
    const looksLikeTouch =
      wheel.pointerType === "touch" ||
      wheel.sourceCapabilities?.firesTouchEvents
    const deviceHeight = this.canvas.height
    const hasOffsets =
      Number.isFinite(event.offsetX) && Number.isFinite(event.offsetY)

    const toDevice = (relativeX: number, relativeY: number) => {
      const px = relativeX * scale
      const py = deviceHeight - relativeY * scale
      return [px, py] as const
    }

    const [pointerPx, pointerPy] = (() => {
      if (hasOffsets) {
        return toDevice(event.offsetX, event.offsetY)
      }
      const hasEventCoords =
        Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
      const withinBounds =
        hasEventCoords &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      const shouldUseEventCoords = withinBounds && !looksLikeTouch
      const pointerClientX = shouldUseEventCoords
        ? event.clientX
        : this.hoverPointer.hasValue
          ? this.hoverPointer.x
          : rect.left + rect.width * 0.5
      const pointerClientY = shouldUseEventCoords
        ? event.clientY
        : this.hoverPointer.hasValue
          ? this.hoverPointer.y
          : rect.top + rect.height * 0.5
      return toDevice(pointerClientX - rect.left, pointerClientY - rect.top)
    })()

    const wheelSensitivity = 0.005
    const zoomFactor = Math.exp(-event.deltaY * wheelSensitivity)
    const previousZoom = this.zoom
    const nextZoom = clamp(previousZoom * zoomFactor, MIN_ZOOM, MAX_ZOOM)
    if (nextZoom === previousZoom) return

    const dims = this.getWorldDimensions()
    const [nextTargetX, nextTargetY] = zoomAroundPointer({
      pointerPx,
      pointerPy,
      previousZoom,
      nextZoom,
      pan: this.pan,
      dims,
    })
    this.zoom = nextZoom
    this.target[0] = nextTargetX
    this.target[1] = this.clampLatitude(nextTargetY)
    this.updatePanFromTarget()
    this.velocity[0] = 0
    this.velocity[1] = 0
  }

  private resizeCanvas = (explicitPixelRatio?: number | UIEvent) => {
    // we discard the argument if it's an event
    const nextPixelRatio =
      typeof explicitPixelRatio === "number" ? explicitPixelRatio : undefined

    const dpr = nextPixelRatio ?? getDevicePixelRatio()
    this.pixelRatio = dpr
    const rect = this.canvas.getBoundingClientRect()
    const width = Math.max(1, Math.round(rect.width * dpr))
    const height = Math.max(1, Math.round(rect.height * dpr))
    if (width === this.canvas.width && height === this.canvas.height) {
      return
    }
    this.canvas.width = width
    this.canvas.height = height
    this.updatePanFromTarget()
    this.gl.viewport(0, 0, width, height)
  }

  private loop() {
    if (this.destroyed) return
    this.rafHandle = requestAnimationFrame(time => {
      const dt = time - this.lastFrameTime
      this.lastFrameTime = time
      const instantaneous = dt > 0 ? 1000 / dt : 0
      this.fps = this.fps * 0.9 + instantaneous * 0.1
      this.applyInertia(dt)
      this.updateActiveMarkers(dt)
      this.removeCooledTrailPositions()
      this.render()
      this.loop()
    })
  }

  private removeCooledTrailPositions() {
    if (this.trailCount === 0) return
    const now = performance.now() * 0.001
    const newestTime = this.pointerTrail[2]
    const maxAge = 2.0
    const threshold = newestTime - maxAge

    let writeIdx = 0
    for (let i = 0; i < this.trailCount; i++) {
      const idx = i * 3
      const time = this.pointerTrail[idx + 2]
      if (time >= threshold) {
        if (writeIdx !== i) {
          this.pointerTrail[writeIdx * 3] = this.pointerTrail[idx]
          this.pointerTrail[writeIdx * 3 + 1] = this.pointerTrail[idx + 1]
          this.pointerTrail[writeIdx * 3 + 2] = this.pointerTrail[idx + 2]
        }
        writeIdx++
      }
    }
    this.trailCount = writeIdx
  }

  private render() {
    const gl = this.gl
    const deviceRatio = getDevicePixelRatio()
    if (deviceRatio !== this.pixelRatio) {
      this.resizeCanvas(deviceRatio)
    }
    const dims = this.getWorldDimensions()
    const { width, height, worldWidth, worldHeight } = dims
    gl.viewport(0, 0, width, height)
    gl.clearColor(this.seaColor[0], this.seaColor[1], this.seaColor[2], 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const panX = wrapCentered(this.pan[0], worldWidth * this.zoom)
    const panY = this.pan[1]
    const deviceCell = this.cellSize * this.pixelRatio
    const deviceSquare = this.squareSize * this.pixelRatio

    gl.useProgram(this.dotsProgram)
    gl.bindVertexArray(this.fullscreenVAO)
    if (this.markerUniformDirty) {
      this.uploadMarkerUniforms()
    }
    setUniform2f(gl, this.dotsProgram, "uRes", width, height)
    setUniform2f(gl, this.dotsProgram, "uWorldSize", worldWidth, worldHeight)
    setUniform2f(gl, this.dotsProgram, "uPan", panX, panY)
    setUniform1f(gl, this.dotsProgram, "uZoom", this.zoom)
    setUniform1f(gl, this.dotsProgram, "uCell", deviceCell)
    setUniform1f(gl, this.dotsProgram, "uSquare", deviceSquare)
    setUniform3f(
      gl,
      this.dotsProgram,
      "uLandColor",
      this.landColor[0],
      this.landColor[1],
      this.landColor[2],
    )
    setUniform3f(
      gl,
      this.dotsProgram,
      "uSeaColor",
      this.seaColor[0],
      this.seaColor[1],
      this.seaColor[2],
    )
    setUniform3f(
      gl,
      this.dotsProgram,
      "uMarkerColor",
      this.markerColor[0],
      this.markerColor[1],
      this.markerColor[2],
    )
    setUniform3f(
      gl,
      this.dotsProgram,
      "uHaloColor",
      this.haloColor[0],
      this.haloColor[1],
      this.haloColor[2],
    )
    setUniform1f(gl, this.dotsProgram, "uHaloMinOpacity", this.haloMinOpacity)
    setUniform1i(gl, this.dotsProgram, "uMarkerCount", this.markerCount)
    setUniform1f(gl, this.dotsProgram, "uTime", performance.now() * 0.001)
    const trailLocation = gl.getUniformLocation(
      this.dotsProgram,
      "uPointerTrail",
    )
    if (trailLocation) {
      gl.uniform3fv(trailLocation, this.pointerTrail)
    }
    setUniform1i(gl, this.dotsProgram, "uTrailCount", this.trailCount)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.landTexture)
    setUniform1i(gl, this.dotsProgram, "uLand", 0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    this.lastRenderState = {
      pan: [panX, panY],
      zoom: this.zoom,
      dims,
      deviceCell,
    }
    if (process.env.NODE_ENV !== "production") {
      this.diagnostics?.afterRender({
        zoom: this.zoom,
        pan: this.pan,
        target: this.target,
        dims,
        cellSize: this.cellSize,
        squareSize: this.squareSize,
        pixelRatio: this.pixelRatio,
        fps: this.fps,
      })
    }
  }

  private applyInertia(dtMs: number) {
    if (this.pointer.active) {
      return
    }
    const result = stepInertia({
      target: [this.target[0], this.target[1]],
      velocity: [this.velocity[0], this.velocity[1]],
      dtMs,
      bounds: this.getLatitudeBounds(),
      damping: INERTIA_DAMPING,
      baseDt: INERTIA_BASE_DT,
      velocityEps: INERTIA_EPS,
    })
    if (!result.moved && result.velocity[0] === 0 && result.velocity[1] === 0) {
      this.velocity[0] = 0
      this.velocity[1] = 0
      return
    }
    this.target[0] = result.target[0]
    this.target[1] = result.target[1]
    this.velocity[0] = result.velocity[0]
    this.velocity[1] = result.velocity[1]
    if (result.moved) {
      this.updatePanFromTarget()
    }
  }

  private updateActiveMarkers(dtMs: number) {
    if (this.markerCount === 0 || dtMs <= 0) return
    const step = Math.min(1, dtMs / ACTIVE_TRANSITION_MS)
    if (step <= 0) return
    let changed = false
    for (let i = 0; i < this.markerCount; i++) {
      const target = this.markerIntensityTarget[i]
      const current = this.markerIntensity[i]
      const diff = target - current
      if (Math.abs(diff) <= 1e-4) {
        if (current !== target) {
          this.markerIntensity[i] = target
          this.markerData[i * 4 + 3] = target
          if (
            target === 0 &&
            this.markerData[i * 4 + 2] !== MARKER_TYPE_REGULAR
          ) {
            this.markerData[i * 4 + 2] = MARKER_TYPE_REGULAR
            changed = true
          }
          changed = true
        }
        continue
      }
      const delta = Math.min(Math.abs(diff), step) * Math.sign(diff)
      const next = current + delta
      this.markerIntensity[i] = next
      this.markerData[i * 4 + 3] = next
      if (next > 0 && this.markerData[i * 4 + 2] !== MARKER_TYPE_ACTIVE) {
        this.markerData[i * 4 + 2] = MARKER_TYPE_ACTIVE
        changed = true
      } else if (
        next === 0 &&
        this.markerData[i * 4 + 2] !== MARKER_TYPE_REGULAR
      ) {
        this.markerData[i * 4 + 2] = MARKER_TYPE_REGULAR
        changed = true
      }
      changed = true
    }
    if (changed) {
      this.markerUniformDirty = true
    }
  }

  private updatePanFromTarget() {
    const dims = this.getWorldDimensions()
    const [panX, panY] = updatePanFromTarget(this.target, this.zoom, dims)
    this.pan[0] = panX
    this.pan[1] = panY
  }

  private captureRenderStateSnapshot() {
    const dims = this.getWorldDimensions()
    const panX = wrapCentered(this.pan[0], dims.worldWidth * this.zoom)
    const panY = this.pan[1]
    const deviceCell = this.cellSize * this.pixelRatio
    return {
      pan: [panX, panY] as [number, number],
      zoom: this.zoom,
      dims,
      deviceCell,
    }
  }
}

function setUniform3f(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  x: number,
  y: number,
  z: number,
) {
  const location = gl.getUniformLocation(program, name)
  if (location) {
    gl.uniform3f(location, x, y, z)
  }
}

function getDevicePixelRatio() {
  return Math.max(1, window.devicePixelRatio || 1)
}

function setUniform2f(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  x: number,
  y: number,
) {
  const location = gl.getUniformLocation(program, name)
  if (location) {
    gl.uniform2f(location, x, y)
  }
}

function setUniform1f(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  value: number,
) {
  const location = gl.getUniformLocation(program, name)
  if (location) {
    gl.uniform1f(location, value)
  }
}

function setUniform1i(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  value: number,
) {
  const location = gl.getUniformLocation(program, name)
  if (location) {
    gl.uniform1i(location, value)
  }
}

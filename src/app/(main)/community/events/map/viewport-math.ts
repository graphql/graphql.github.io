export type Vec2 = readonly [number, number]
export type Vec2Like = Vec2 | Float32Array

export type WorldDimensions = {
  width: number
  height: number
  worldWidth: number
  worldHeight: number
}

export type LatitudeBounds = {
  min: number
  max: number
}

export type ZoomAroundPointerInput = {
  pointerPx: number
  pointerPy: number
  previousZoom: number
  nextZoom: number
  pan: Vec2Like
  dims: WorldDimensions
}

export type StepInertiaInput = {
  target: Vec2
  velocity: Vec2
  dtMs: number
  bounds: LatitudeBounds
  damping: number
  baseDt: number
  velocityEps: number
}

export type StepInertiaResult = {
  target: Vec2
  velocity: Vec2
  moved: boolean
}

export function computeWorldDimensions(
  width: number,
  height: number,
  aspectRatio: number,
): WorldDimensions {
  const safeWidth = width || 1
  const safeHeight = height || 1
  const worldHeight = Math.min(safeWidth / aspectRatio, safeHeight)
  const worldWidth = worldHeight * aspectRatio
  return { width: safeWidth, height: safeHeight, worldWidth, worldHeight }
}

export function computeLatitudeBounds(
  height: number,
  worldHeight: number,
  zoom: number,
): LatitudeBounds {
  const zoomedHeight = worldHeight * zoom
  if (!isFinite(zoomedHeight) || zoomedHeight <= 0) {
    return { min: 0.5, max: 0.5 }
  }
  const fraction = height / (2 * zoomedHeight)
  if (fraction >= 0.5) {
    return { min: 0.5, max: 0.5 }
  }
  const margin = clamp01(fraction)
  const center = 0.5
  const fullTravel = center - margin
  if (fullTravel <= 0) {
    return { min: center, max: center }
  }
  const limitedTravel = clamp01(fullTravel)
  return { min: center - limitedTravel, max: center + limitedTravel }
}

export function clampLatitude(value: number, bounds: LatitudeBounds) {
  return clamp(value, bounds.min, bounds.max)
}

export function updatePanFromTarget(
  target: Vec2Like,
  zoom: number,
  dims: WorldDimensions,
): Vec2 {
  const panX = dims.width * 0.5 - target[0] * dims.worldWidth * zoom
  const panY = dims.height * 0.5 - target[1] * dims.worldHeight * zoom
  return [panX, panY]
}

export function screenToWorld(
  px: number,
  py: number,
  pan: Vec2Like,
  zoom: number,
  dims: WorldDimensions,
): Vec2 {
  const x = dims.worldWidth > 0 ? (px - pan[0]) / (dims.worldWidth * zoom) : 0
  const y = dims.worldHeight > 0 ? (py - pan[1]) / (dims.worldHeight * zoom) : 0
  return [x, y]
}

export function screenToUV(
  px: number,
  py: number,
  pan: Vec2Like,
  zoom: number,
  dims: WorldDimensions,
) {
  const [worldX, worldY] = screenToWorld(px, py, pan, zoom, dims)
  const u = wrap01(worldX)
  const v = clamp01(worldY)
  return [u, v] as const
}

export function dragTargetByPixels(
  startTarget: Vec2Like,
  dx: number,
  dy: number,
  zoom: number,
  dims: WorldDimensions,
): Vec2 {
  const invWidth = dims.worldWidth > 0 ? 1 / (dims.worldWidth * zoom) : 0
  const invHeight = dims.worldHeight > 0 ? 1 / (dims.worldHeight * zoom) : 0
  const nextX = wrap01(startTarget[0] - dx * invWidth)
  const nextY = startTarget[1] + dy * invHeight
  return [nextX, nextY]
}

export function computePointerVelocity(
  prev: Vec2Like,
  next: Vec2Like,
  dtMs: number,
): Vec2 {
  const dt = Math.max(dtMs, 1)
  const invDt = 1 / dt
  return [(next[0] - prev[0]) * invDt, (next[1] - prev[1]) * invDt]
}

export function zoomAroundPointer(input: ZoomAroundPointerInput): Vec2 {
  const { pointerPx, pointerPy, previousZoom, nextZoom, pan, dims } = input
  const safePrevWidth = dims.worldWidth * previousZoom || 1
  const safePrevHeight = dims.worldHeight * previousZoom || 1
  const worldX = (pointerPx - pan[0]) / safePrevWidth
  const worldY = (pointerPy - pan[1]) / safePrevHeight
  const safeNextWidth = dims.worldWidth * nextZoom || 1
  const safeNextHeight = dims.worldHeight * nextZoom || 1
  const nextTargetX = wrap01(
    worldX - (pointerPx - dims.width * 0.5) / safeNextWidth,
  )
  const nextTargetY = worldY - (pointerPy - dims.height * 0.5) / safeNextHeight
  return [nextTargetX, nextTargetY]
}

export function stepInertia(input: StepInertiaInput): StepInertiaResult {
  const { target, velocity, dtMs, bounds, damping, baseDt, velocityEps } = input
  const velX = velocity[0]
  const velY = velocity[1]
  if (Math.abs(velX) < velocityEps && Math.abs(velY) < velocityEps) {
    return { target, velocity: [0, 0], moved: false }
  }
  const dt = Math.max(dtMs, 0)
  const nextX = wrap01(target[0] + velX * dt)
  const unclampedY = target[1] + velY * dt
  const nextY = clamp(unclampedY, bounds.min, bounds.max)
  let nextVelY = velY
  if (nextY === bounds.min || nextY === bounds.max) {
    nextVelY = 0
  }
  const dampingFactor = Math.pow(damping, dt / baseDt)
  let nextVelX = velX * dampingFactor
  nextVelY *= dampingFactor
  if (Math.abs(nextVelX) < velocityEps) nextVelX = 0
  if (Math.abs(nextVelY) < velocityEps) nextVelY = 0
  const moved = dt > 0 && (nextX !== target[0] || nextY !== target[1])
  return {
    target: [nextX, nextY],
    velocity: [nextVelX, nextVelY],
    moved,
  }
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function wrapCentered(value: number, period: number) {
  if (!isFinite(period) || period <= 0) return value
  let wrapped = value % period
  if (wrapped > period * 0.5) wrapped -= period
  if (wrapped < -period * 0.5) wrapped += period
  return wrapped
}

export function wrap01(value: number) {
  let wrapped = value % 1
  if (wrapped < 0) wrapped += 1
  return wrapped
}

export function clamp01(value: number) {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

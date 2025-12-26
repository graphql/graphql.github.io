import { lonLatToUV } from "./projection"
import type { MarkerPoint } from "./engine"
import type { WorldDimensions, Vec2Like } from "./viewport-math"

export type DiagnosticsFrame = {
  zoom: number
  pan: Vec2Like
  target: Vec2Like
  dims: WorldDimensions
  cellSize: number
  squareSize: number
  pixelRatio: number
  fps: number
}

export type Diagnostics = {
  afterRender(frame: DiagnosticsFrame): void
}

type DiagnosticsOptions = {
  markers: MarkerPoint[]
}

const LOG_INTERVAL_MS = 2_000
const MARKER_SCREEN_EPS = 2

export function createDiagnostics(options: DiagnosticsOptions): Diagnostics {
  const lastMarkerPositions = options.markers.map(marker => ({
    id: marker.id,
    uv: lonLatToUV(marker.lon, marker.lat),
  }))
  let lastLog = 0
  return {
    afterRender(frame) {
      const now = performance.now()
      if (now - lastLog < LOG_INTERVAL_MS) return
      lastLog = now
      const markerStats = computeMarkerVisibility(lastMarkerPositions, frame)
      const isZoomedOut = frame.zoom <= 1.05
      const centered =
        Math.abs(frame.target[0] - 0.5) < 0.05 &&
        Math.abs(frame.target[1] - 0.5) < 0.05
      const bold = "font-weight:600"
      if (
        isZoomedOut &&
        centered &&
        markerStats.visible < options.markers.length
      ) {
        console.warn(
          `%cMeetupsMap%c ⚠️ markers ${markerStats.visible}/${options.markers.length} (missing ${markerStats.missingIds.length}): ${markerStats.missingIds.join(", ")}`,
          bold,
          "",
        )
        return
      }
      const tilesX = estimateTileCount(
        frame.dims.width,
        frame.cellSize,
        frame.pixelRatio,
      )
      const tilesY = estimateTileCount(
        frame.dims.height,
        frame.cellSize,
        frame.pixelRatio,
      )
      console.info(
        `%cMeetupsMap%c zoom %c${frame.zoom.toFixed(2)}%c, fps %c${frame.fps.toFixed(1)}%c, markers %c${markerStats.visible}/${options.markers.length}%c · tiles ${tilesX}×${tilesY}`,
        bold,
        "",
        bold,
        "",
        bold,
        "",
        bold,
        "",
      )
    },
  }
}

export type MarkerUV = {
  id: string
  uv: [number, number]
}

export function computeMarkerVisibility(
  markers: MarkerUV[],
  frame: DiagnosticsFrame,
) {
  const zoomedWorldWidth = frame.dims.worldWidth * frame.zoom
  const zoomedWorldHeight = frame.dims.worldHeight * frame.zoom
  let visible = 0
  const missingIds: string[] = []
  for (const marker of markers) {
    const screenX = frame.pan[0] + marker.uv[0] * zoomedWorldWidth
    const yNormalized = 1 - marker.uv[1]
    const screenY = frame.pan[1] + yNormalized * zoomedWorldHeight
    const onScreen =
      screenX >= -MARKER_SCREEN_EPS &&
      screenX <= frame.dims.width + MARKER_SCREEN_EPS &&
      screenY >= -MARKER_SCREEN_EPS &&
      screenY <= frame.dims.height + MARKER_SCREEN_EPS
    if (onScreen) {
      visible += 1
    } else {
      missingIds.push(marker.id)
    }
  }
  return { visible, missingIds }
}

function estimateTileCount(
  lengthPx: number,
  cellSize: number,
  pixelRatio: number,
) {
  const deviceCell = Math.max(1, cellSize * pixelRatio)
  return Math.max(1, Math.round(lengthPx / deviceCell))
}

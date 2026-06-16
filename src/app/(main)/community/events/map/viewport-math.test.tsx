import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  clampLatitude,
  computeLatitudeBounds,
  computePointerVelocity,
  computeWorldDimensions,
  dragTargetByPixels,
  screenToWorld,
  screenToUV,
  stepInertia,
  updatePanFromTarget,
  wrap01,
  wrapCentered,
  zoomAroundPointer,
} from "./viewport-math"
import { lonLatToUV, uvToLonLat } from "./projection"

describe("viewport-math", () => {
  const aspectRatio = 1.65

  it("computes safe world dimensions even for zero-sized canvases", () => {
    const dims = computeWorldDimensions(0, 0, aspectRatio)
    assert.strictEqual(dims.width, 1)
    assert.strictEqual(dims.height, 1)
    assert.ok(Number.isFinite(dims.worldHeight))
    assert.ok(Number.isFinite(dims.worldWidth))
    assert.ok(Math.abs(dims.worldWidth - dims.worldHeight * aspectRatio) < 1e-6)
  })

  it("limits latitude travel range based on zoom", () => {
    const dims = computeWorldDimensions(1200, 600, aspectRatio)
    const tight = computeLatitudeBounds(dims.height, dims.worldHeight, 2)
    assert.deepStrictEqual(tight, { min: 0.25, max: 0.75 })

    const locked = computeLatitudeBounds(dims.height, dims.worldHeight, 0.1)
    assert.deepStrictEqual(locked, { min: 0.5, max: 0.5 })

    assert.strictEqual(clampLatitude(0.9, tight), 0.75)
    assert.strictEqual(clampLatitude(0.1, tight), 0.25)
  })

  it("keeps the requested target under the screen center", () => {
    const dims = computeWorldDimensions(800, 600, aspectRatio)
    const centerPan = updatePanFromTarget([0.5, 0.5], 1, dims)
    const [centerWorldX, centerWorldY] = screenToWorld(
      dims.width * 0.5,
      dims.height * 0.5,
      centerPan,
      1,
      dims,
    )
    const eps = 1e-6
    assert.ok(Math.abs(centerWorldX - 0.5) < eps)
    assert.ok(Math.abs(centerWorldY - 0.5) < eps)

    const movedPan = updatePanFromTarget([0.75, 0.5], 1, dims)
    const [movedWorldX] = screenToWorld(
      dims.width * 0.5,
      dims.height * 0.5,
      movedPan,
      1,
      dims,
    )
    assert.ok(Math.abs(movedWorldX - 0.75) < eps)
    assert.ok(movedPan[0] < centerPan[0])
  })

  it("projects screen coordinates back to world coordinates", () => {
    const dims = computeWorldDimensions(800, 600, aspectRatio)
    const pan = updatePanFromTarget([0.5, 0.5], 1, dims)
    const [worldX, worldY] = screenToWorld(400, 300, pan, 1, dims)
    assert.ok(Math.abs(worldX - 0.5) < 1e-6)
    assert.ok(Math.abs(worldY - 0.5) < 1e-6)
  })

  it("maps screen pixels directly to UV coordinates", () => {
    const dims = computeWorldDimensions(800, 600, aspectRatio)
    const pan = updatePanFromTarget([0.5, 0.5], 1, dims)
    const [u, v] = screenToUV(400, 300, pan, 1, dims)
    assert.ok(Math.abs(u - 0.5) < 1e-6)
    assert.ok(Math.abs(v - 0.5) < 1e-6)
  })

  it("wraps horizontal UVs after long pans", () => {
    const dims = computeWorldDimensions(800, 600, aspectRatio)
    const pan = [dims.worldWidth * 0.5, 0] as [number, number]
    const [u] = screenToUV(0, 0, pan, 1, dims)
    assert.ok(Math.abs(u - 0.5) < 1e-6)
  })

  it("clamps V to the visible range without flipping", () => {
    const dims = computeWorldDimensions(800, 600, aspectRatio)
    const top = screenToUV(0, -100, [0, 0], 1, dims)
    const bottom = screenToUV(0, dims.height + 100, [0, 0], 1, dims)
    assert.strictEqual(top[1], 0)
    assert.strictEqual(bottom[1], 1)
  })

  it("round-trips lon/lat when using uv helpers", () => {
    const dims = computeWorldDimensions(900, 600, aspectRatio)
    const zoom = 1.5
    const target: [number, number] = [0.42, 0.58]
    const pan = updatePanFromTarget(target, zoom, dims)
    const point = { lon: -0.1276, lat: 51.5074 }
    const uv = lonLatToUV(point.lon, point.lat)
    const zoomedWidth = dims.worldWidth * zoom
    const zoomedHeight = dims.worldHeight * zoom
    const px = pan[0] + uv[0] * zoomedWidth
    const py = pan[1] + uv[1] * zoomedHeight
    const [screenU, screenV] = screenToUV(px, py, pan, zoom, dims)
    const eps = 1e-6
    assert.ok(Math.abs(screenU - uv[0]) < eps)
    assert.ok(Math.abs(screenV - uv[1]) < eps)
    const { lon, lat } = uvToLonLat(screenU, screenV)
    assert.ok(Math.abs(lon - point.lon) < 1e-3)
    assert.ok(Math.abs(lat - point.lat) < 1e-3)
  })

  it("wraps normalized values into the expected ranges", () => {
    assert.ok(Math.abs(wrap01(1.2) - 0.2) < 1e-12)
    assert.ok(Math.abs(wrap01(-0.2) - 0.8) < 1e-12)
    assert.strictEqual(wrapCentered(6, 10), -4)
    assert.strictEqual(wrapCentered(7, 10), -3)
  })

  it("translates targets predictably when dragging in pixel space", () => {
    const dims = computeWorldDimensions(1024, 512, aspectRatio)
    const start: [number, number] = [0.5, 0.5]
    const next = dragTargetByPixels(start, 64, -32, 2, dims)
    assert.ok(next[0] < start[0])
    assert.ok(next[1] < start[1])
    const velocity = computePointerVelocity(start, next, 16)
    assert.ok(velocity[0] < 0)
    assert.ok(velocity[1] < 0)
  })

  it("keeps the zoom pointer anchored in world space", () => {
    const dims = computeWorldDimensions(800, 600, aspectRatio)
    const target: [number, number] = [0.4, 0.6]
    const pan = updatePanFromTarget(target, 1, dims)
    const pointerPx = dims.width * 0.25
    const pointerPy = dims.height * 0.75
    const before = screenToWorld(pointerPx, pointerPy, pan, 1, dims)
    const zoomedTarget = zoomAroundPointer({
      pointerPx,
      pointerPy,
      previousZoom: 1,
      nextZoom: 2,
      pan,
      dims,
    })
    const zoomedPan = updatePanFromTarget(zoomedTarget, 2, dims)
    const after = screenToWorld(pointerPx, pointerPy, zoomedPan, 2, dims)
    const eps = 1e-6
    assert.ok(Math.abs(after[0] - before[0]) < eps)
    assert.ok(Math.abs(after[1] - before[1]) < eps)
  })

  it("advances inertia and damps velocity", () => {
    const bounds = { min: 0.25, max: 0.75 }
    const step = stepInertia({
      target: [0.5, 0.5],
      velocity: [0.001, -0.002],
      dtMs: 16,
      bounds,
      damping: 0.87,
      baseDt: 1000 / 60,
      velocityEps: 1e-5,
    })
    assert.ok(step.moved)
    assert.ok(step.target[0] !== 0.5)
    assert.ok(step.velocity[0] < 0.001)

    const clipped = stepInertia({
      target: [0.5, bounds.max],
      velocity: [0, 0.01],
      dtMs: 16,
      bounds,
      damping: 0.87,
      baseDt: 1000 / 60,
      velocityEps: 1e-5,
    })
    assert.strictEqual(clipped.target[1], bounds.max)
    assert.strictEqual(clipped.velocity[1], 0)
  })
})

const mercatorLimit = 85.05112878
const minDisplayedLatitude = -60
/**
 * We excluded the south pole from the map, so we need to align the map slightly northwards.
 */
const baseLatitudeOffset = 4
const baseLongitudeOffset = 0.1

const maxProjectedV = latToRawV(mercatorLimit)
const minProjectedV = latToRawV(minDisplayedLatitude)

export type UV = [number, number]

export function lonLatToUV(lon: number, lat: number): UV {
  const adjustedLon = normalizeLongitude(lon + baseLongitudeOffset)
  const u = (adjustedLon + 180) / 360
  const adjustedLat = clampProjectedLatitude(lat + baseLatitudeOffset)
  const rawV = latToRawV(adjustedLat)
  const normalizedV = clamp01(
    (rawV - maxProjectedV) / (minProjectedV - maxProjectedV),
  )
  return [u, normalizedV]
}

export function uvToLonLat(u: number, v: number) {
  const wrappedU = ((u % 1) + 1) % 1
  const rawV = clamp01(v) * (minProjectedV - maxProjectedV) + maxProjectedV
  const mapLon = wrappedU * 360 - 180
  const mapLat = clampProjectedLatitude(rawVToLat(rawV))
  const lon = normalizeLongitude(mapLon - baseLongitudeOffset)
  const lat = clampActualLatitude(mapLat - baseLatitudeOffset)
  return { lon, lat }
}

function clampProjectedLatitude(value: number) {
  return Math.max(minDisplayedLatitude, Math.min(mercatorLimit, value))
}

function clampActualLatitude(value: number) {
  return Math.max(-90, Math.min(90, value))
}

function normalizeLongitude(value: number) {
  let lon = value
  while (lon <= -180) lon += 360
  while (lon > 180) lon -= 360
  return lon
}

function latToRawV(lat: number) {
  const clampedLat = Math.max(-mercatorLimit, Math.min(mercatorLimit, lat))
  const rad = (clampedLat * Math.PI) / 180
  return 0.5 - Math.log(Math.tan(Math.PI * 0.25 + rad * 0.5)) / (2 * Math.PI)
}

function rawVToLat(v: number) {
  const exponent = (0.5 - v) * 2 * Math.PI
  const latRad = 2 * Math.atan(Math.exp(exponent)) - Math.PI / 2
  return (latRad * 180) / Math.PI
}

function clamp01(value: number) {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

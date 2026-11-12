const UINT32_MAX = 0xffffffff

type RgbColor = [number, number, number]

interface OklchColor {
  l: number
  c: number
  h: number
}

interface GradientStop {
  offset: number
  color: OklchColor
}

interface PreparedGradient {
  cos: number
  sin: number
  minProjection: number
  invProjectionRange: number
  stops: GradientStop[]
}

export function getBlogPattern(
  seed: string,
  width: number,
  height: number,
  pixelSize = 18,
) {
  const cells: Array<{
    x: number
    y: number
    width: number
    height: number
    color: string
  }> = []

  if (width <= 0 || height <= 0) {
    return cells
  }

  const columns = Math.max(1, Math.ceil(width / pixelSize))
  const rows = Math.max(1, Math.ceil(height / pixelSize))
  const random = createSeededRandom(seed)
  const angle = random() * Math.PI * 2
  const gradientStops = buildGradientStops(random)
  const gradient = prepareGradient(angle, gradientStops, columns, rows)

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const color = sampleGradientColor(gradient, column, row, seed)
      const x = column * pixelSize
      const y = row * pixelSize
      cells.push({
        x,
        y,
        width: Math.min(pixelSize, width - x),
        height: Math.min(pixelSize, height - y),
        color: toCssColor(color),
      })
    }
  }

  return cells
}

function createSeededRandom(seed: string) {
  let state = hashString(seed) || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / UINT32_MAX
  }
}

function prepareGradient(
  angle: number,
  stops: GradientStop[],
  columns: number,
  rows: number,
): PreparedGradient {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  const corners: Array<[number, number]> = [
    [0, 0],
    [columns, 0],
    [0, rows],
    [columns, rows],
  ]

  let minProjection = Infinity
  let maxProjection = -Infinity

  for (const [x, y] of corners) {
    const projection = x * cos + y * sin
    if (projection < minProjection) {
      minProjection = projection
    }
    if (projection > maxProjection) {
      maxProjection = projection
    }
  }

  const range = Math.max(maxProjection - minProjection, 1e-6)

  return {
    cos,
    sin,
    minProjection,
    invProjectionRange: 1 / range,
    stops,
  }
}

function buildGradientStops(random: () => number): GradientStop[] {
  const baseHue = random() * 360

  const midOffset = clamp(0.25, 0.75, 0.44 + (random() - 0.5) * 0.22)
  const secondaryOffset = clamp(
    0.58,
    0.85,
    midOffset + 0.16 + (random() - 0.5) * 0.08,
  )
  const offsets = [0, midOffset, secondaryOffset, 1]

  const paletteBlueprint: Array<{
    hueOffset: number
    hueJitter: number
    lightnessBase: number
    lightnessJitter: number
    chromaBase: number
    chromaJitter: number
    chromaMin: number
    chromaMax: number
  }> = [
    {
      hueOffset: -18,
      hueJitter: 10,
      lightnessBase: 0.74,
      lightnessJitter: 0.06,
      chromaBase: 0.18,
      chromaJitter: 0.12,
      chromaMin: 0.12,
      chromaMax: 0.28,
    },
    {
      hueOffset: 8,
      hueJitter: 12,
      lightnessBase: 0.64,
      lightnessJitter: 0.06,
      chromaBase: 0.24,
      chromaJitter: 0.12,
      chromaMin: 0.18,
      chromaMax: 0.32,
    },
    {
      hueOffset: 26,
      hueJitter: 14,
      lightnessBase: 0.78,
      lightnessJitter: 0.06,
      chromaBase: 0.2,
      chromaJitter: 0.1,
      chromaMin: 0.14,
      chromaMax: 0.28,
    },
    {
      hueOffset: 38,
      hueJitter: 12,
      lightnessBase: 0.72,
      lightnessJitter: 0.06,
      chromaBase: 0.2,
      chromaJitter: 0.1,
      chromaMin: 0.14,
      chromaMax: 0.28,
    },
  ]

  const stops = offsets.map((offset, index) => {
    const blueprint =
      paletteBlueprint[index] ?? paletteBlueprint[paletteBlueprint.length - 1]
    const hue = normalizeHue(
      baseHue + blueprint.hueOffset + (random() - 0.5) * blueprint.hueJitter,
    )
    const lightness = clamp(
      0.56,
      0.84,
      blueprint.lightnessBase + (random() - 0.5) * blueprint.lightnessJitter,
    )
    const chroma = clamp(
      blueprint.chromaMin,
      blueprint.chromaMax,
      blueprint.chromaBase + (random() - 0.5) * blueprint.chromaJitter,
    )
    return {
      offset,
      color: {
        l: lightness,
        c: chroma,
        h: hue,
      },
    }
  })

  return stops
}

function sampleGradientColor(
  gradient: PreparedGradient,
  column: number,
  row: number,
  jitterPrefix: string,
): RgbColor {
  const x = column + 0.5
  const y = row + 0.5

  const projection = x * gradient.cos + y * gradient.sin
  const baseT =
    (projection - gradient.minProjection) * gradient.invProjectionRange
  const noise = hashString(`${jitterPrefix}:${column}:${row}`) / UINT32_MAX
  const t = clamp(0, 1, baseT + (noise - 0.5) * 0.045)

  const oklch = evaluateGradient(gradient.stops, t)
  return oklchToSrgb(oklch)
}

function evaluateGradient(stops: GradientStop[], t: number): OklchColor {
  if (stops.length === 0) {
    return { l: 0.72, c: 0.18, h: 0 }
  }

  if (t <= stops[0].offset) {
    return stops[0].color
  }

  for (let index = 1; index < stops.length; index += 1) {
    const stop = stops[index]
    const previous = stops[index - 1]
    if (t <= stop.offset) {
      const span = Math.max(stop.offset - previous.offset, 1e-6)
      const amount = (t - previous.offset) / span
      return mixOklch(previous.color, stop.color, amount)
    }
  }

  return stops[stops.length - 1].color
}

function toCssColor([r, g, b]: RgbColor) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

function normalizeHue(hue: number) {
  return ((hue % 360) + 360) % 360
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value))
}

function hashString(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mixOklch(a: OklchColor, b: OklchColor, amount: number): OklchColor {
  const hueStep = shortestHueDistance(a.h, b.h)
  return {
    l: a.l + (b.l - a.l) * amount,
    c: a.c + (b.c - a.c) * amount,
    h: normalizeHue(a.h + hueStep * amount),
  }
}

function shortestHueDistance(start: number, end: number) {
  const startNorm = normalizeHue(start)
  const endNorm = normalizeHue(end)
  let diff = endNorm - startNorm
  if (diff > 180) {
    diff -= 360
  } else if (diff < -180) {
    diff += 360
  }
  return diff
}

function oklchToSrgb({ l, c, h }: OklchColor): RgbColor {
  const hueRad = (h / 180) * Math.PI
  const a = Math.cos(hueRad) * c
  const b = Math.sin(hueRad) * c

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_

  const rLinear = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const gLinear = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const bLinear = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  return [linearToSrgb(rLinear), linearToSrgb(gLinear), linearToSrgb(bLinear)]
}

function linearToSrgb(value: number) {
  const clamped = clamp(0, 1, value)
  if (clamped <= 0.0031308) {
    return clamped * 12.92 * 255
  }
  return (1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255
}

export type ColorVec3 = [r: number, g: number, b: number]

export type MapColors = {
  sea: ColorVec3
  land: ColorVec3
  marker: ColorVec3
  halo: ColorVec3
  haloMinOpacity: number
}

export const MAP_COLORS = {
  light: {
    sea: [0.9804, 0.9882, 0.9569], // neu-50
    land: [0.8627, 0.8706, 0.8275], // neu-300
    marker: [0.8824, 0.0039, 0.5961], // #E10198 = pri-base
    halo: [1.0, 0.6, 0.8784], // hsl(318, 100%, 80%) = pri-light
    haloMinOpacity: 0.75,
  },
  dark: {
    sea: [0.0549, 0.0588, 0.0431], // neu-50
    land: [0.1647, 0.1804, 0.1373], // a shade darker than neu-800
    marker: [1, 0.6, 0.8745], // #FF99DF = pri-light
    halo: [1.0, 0.8, 0.9373], // hsl(319, 100%, 90%) = pri-lighter
    haloMinOpacity: 0.5,
  },
} satisfies Record<string, MapColors>

export function asRgbString(color: ColorVec3): string {
  return `rgb(${color.map(c => Math.round(c * 255)).join(", ")})`
}

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import sharp from "sharp"

import { meetups } from "@/components/meetups"
import { lonLatToUV } from "@/app/(main)/community/events/map/projection"
import {
  asRgbString,
  MAP_COLORS,
} from "@/app/(main)/community/events/map/map-colors"

let mapImage: Promise<string> | undefined

export function getEventsMapImage() {
  return (mapImage ??= (async () => {
    const width = 1200
    const height = Math.round(width / 1.65)
    const cell = 8
    const columns = Math.ceil(width / cell)
    const rows = Math.ceil(height / cell)
    const mask = await readFile(
      join(process.cwd(), "src/app/(main)/community/events/map/land-mask.png"),
    )
    const pixels = await sharp(mask)
      .resize(columns, rows, { fit: "fill" })
      .removeAlpha()
      .greyscale()
      .raw()
      .toBuffer()
    const theme = MAP_COLORS.light
    const land = asRgbString(theme.land)
    const marker = asRgbString(theme.marker)
    const sea = asRgbString(theme.sea)
    const squares: string[] = []
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (pixels[row * columns + column] < 128) {
          squares.push(
            `<rect x="${column * cell + 1}" y="${row * cell + 1}" width="6" height="6" fill="${land}"/>`,
          )
        }
      }
    }
    for (const { node } of meetups) {
      const [u, v] = lonLatToUV(node.longitude, node.latitude)
      const x = Math.floor((u * width) / cell) * cell
      const y = Math.floor((v * height) / cell) * cell
      squares.push(
        `<rect x="${x - 5}" y="${y - 5}" width="18" height="18" fill="${marker}" opacity="0.12"/><rect x="${x + 1}" y="${y + 1}" width="6" height="6" fill="${marker}"/>`,
      )
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="fade"><stop stop-color="${sea}"/><stop offset="30%" stop-color="${sea}"/><stop offset="85%" stop-color="${sea}" stop-opacity="0"/></linearGradient></defs><rect width="100%" height="100%" fill="${sea}"/>${squares.join("")}<rect width="100%" height="100%" fill="url(#fade)"/></svg>`
    const png = await sharp(Buffer.from(svg)).png().toBuffer()
    return `data:image/png;base64,${png.toString("base64")}`
  })())
}

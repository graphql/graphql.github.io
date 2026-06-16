"server-only"

import { getPlaiceholder } from "plaiceholder"

export async function getBase64Placeholder(src: string) {
  const image = await fetch(src).then(res => res.arrayBuffer())
  return (await getPlaiceholder(Buffer.from(image))).base64
}

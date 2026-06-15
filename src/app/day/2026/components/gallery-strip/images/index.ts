import type { StaticImageData } from "next/image"

import grafastComic from "./grafast-comic.jpg"
import leBrun from "./le-brun.jpg"
import trustedDocuments from "./trusted-documents.jpg"
import one from "./1.jpg"
import two from "./2.jpg"
import three from "./3.jpg"
import four from "./4.jpg"
import five from "./5.jpg"
import six from "./6.jpg"
import seven from "./7.jpg"
import eight from "./8.jpg"

export const imagesByYear: Record<string, StaticImageData[]> = {
  "2025": [grafastComic, leBrun, trustedDocuments],
  "2026": [one, two, three, four, five, six, seven, eight],
}

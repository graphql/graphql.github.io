import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import { speakers } from "../../_data"
import { SpeakerOpengraphImage } from "../../components/speaker-opengraph-image"

export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export function generateStaticParams() {
  return speakers.map(s => ({ id: s.username }))
}

export default async function SpeakerOGImage({
  params,
}: {
  params: { id: string }
}) {
  const decodedId = decodeURIComponent(params.id)
  const speaker = speakers.find(s => s.username === decodedId)

  if (!speaker) {
    throw new Error(`Speaker not found: ${decodedId}`)
  }

  const fonts = loadFontsForOG()

  return new ImageResponse(
    (
      <SpeakerOpengraphImage
        speaker={speaker}
        date="September 8-10"
        year="2025"
        location="Amsterdam, Netherlands"
      />
    ),
    {
      ...size,
      fonts: await fonts,
    },
  )
}

import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"

import { SpeakerOpengraphImage } from "@/app/conf/2026/components/og-images/speaker-opengraph-image"
import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import { speakers } from "../../_data"

export const alt = "GraphQLConf 2024 speakers"
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
    notFound()
  }

  const fonts = loadFontsForOG()

  return new ImageResponse(
    (
      <SpeakerOpengraphImage
        speaker={speaker}
        date="September 10-12"
        year="2024"
        location="San Francisco Bay Area, California"
      />
    ),
    {
      ...size,
      fonts: await fonts,
    },
  )
}

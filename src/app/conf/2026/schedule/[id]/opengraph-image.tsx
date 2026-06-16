import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import { schedule } from "../../_data"
import { SessionOpengraphImage } from "../../components/og-images/session-opengraph-image"

export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export function generateStaticParams() {
  return schedule.filter(s => s.id).map(s => ({ id: s.id }))
}

export default async function SessionOGImage({
  params,
}: {
  params: { id: string }
}) {
  const decodedId = decodeURIComponent(params.id)
  const session = schedule.find(s => s.id === decodedId)

  if (!session) {
    throw new Error(`Speaker not found: ${decodedId}`)
  }

  const fonts = loadFontsForOG()

  return new ImageResponse(
    (
      <SessionOpengraphImage
        session={session}
        date="May 19-20"
        year="2026"
        location="Fremont, California"
      />
    ),
    {
      ...size,
      fonts: await fonts,
    },
  )
}

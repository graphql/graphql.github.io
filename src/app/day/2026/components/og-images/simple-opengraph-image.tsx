import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import { GenericDayOpengraphImage } from "./generic-opengraph-image"

export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export function generateStaticParams() {
  return [{}]
}

export async function SimpleOpengraphImage({
  pageTitle,
  date,
  location,
}: {
  pageTitle: string
  date: string
  location: string
}) {
  const fonts = loadFontsForOG()

  return new ImageResponse(
    (
      <GenericDayOpengraphImage
        pageTitle={pageTitle}
        date={date}
        location={location}
      />
    ),
    {
      ...size,
      fonts: await fonts,
    },
  )
}

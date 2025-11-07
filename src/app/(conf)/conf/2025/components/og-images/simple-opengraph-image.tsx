import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"

import { GenericOpengraphImage } from "./generic-opengraph-image"

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
}: {
  pageTitle: string
}) {
  const fonts = loadFontsForOG()

  return new ImageResponse(
    (
      <GenericOpengraphImage
        pageTitle={pageTitle}
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

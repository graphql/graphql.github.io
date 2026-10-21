import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"
import { SiteCard } from "@/components/og-image/site-card"
import { parseSocialImage, SOCIAL_IMAGE_SIZE } from "@/social-metadata"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const content = parseSocialImage(searchParams)
  if (!content) {
    return new Response("Invalid social image parameters", { status: 400 })
  }
  const [image, fonts] = await Promise.all([
    SiteCard(content),
    loadFontsForOG(),
  ])
  return new ImageResponse(image, {
    ...SOCIAL_IMAGE_SIZE,
    fonts,
    headers: {
      "cache-control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  })
}

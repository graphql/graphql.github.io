import { ImageResponse } from "next/og"

import { loadFontsForOG } from "@/app/fonts/og/load-fonts-for-og"
import { SiteCard, size } from "@/components/og-image/site-card"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || "/"
  const title =
    searchParams.get("title")?.trim() ||
    "The API language for humans and agents"
  const description = searchParams.get("description") || undefined
  const byline = searchParams.get("byline") || undefined
  const date = searchParams.get("date") || undefined
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /[.?#\\]/.test(path) ||
    [...path].some(character => character.charCodeAt(0) < 32) ||
    path.length > 240 ||
    title.length > 300 ||
    (description?.length || 0) > 2000 ||
    (byline?.length || 0) > 300 ||
    (date?.length || 0) > 64
  ) {
    return new Response("Invalid social image parameters", { status: 400 })
  }
  const [image, fonts] = await Promise.all([
    SiteCard({ path, title, description, byline, date }),
    loadFontsForOG(),
  ])
  return new ImageResponse(image, {
    ...size,
    fonts,
    headers: {
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  })
}

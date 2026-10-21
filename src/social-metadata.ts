import type { Metadata } from "next"

export const SITE_URL = "https://graphql.org"

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 }
export const HOMEPAGE_LINES = [
  "The API language",
  "for humans and agents",
] as const
export const HOMEPAGE_TITLE = HOMEPAGE_LINES.join(" ")

const SOCIAL_IMAGE_KEYS = [
  "path",
  "title",
  "description",
  "byline",
  "date",
] as const

export const SITE_DESCRIPTION =
  "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data."

export interface SocialImageContent {
  path: string
  title: string
  description?: string
  byline?: string
  date?: string
}

export function parseSocialImage(searchParams: URLSearchParams) {
  const path = searchParams.get("path")
  const title = searchParams.get("title")?.trim() || HOMEPAGE_TITLE
  const description = searchParams.get("description") || undefined
  const byline = searchParams.get("byline") || undefined
  const date = searchParams.get("date") || undefined

  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /[?#\\]/.test(path) ||
    [...path].some(character => {
      const code = character.charCodeAt(0)
      return code < 32 || (code >= 127 && code <= 159)
    }) ||
    path.split("/").some(segment => segment === "." || segment === "..") ||
    path.length > 240 ||
    title.length > 300 ||
    (description?.length || 0) > 2000 ||
    (byline?.length || 0) > 300 ||
    (date?.length || 0) > 64
  ) {
    return null
  }

  return { path, title, description, byline, date }
}

export function getSocialImage(content: SocialImageContent) {
  const url = new URL("/og/", SITE_URL)
  url.searchParams.set("v", "3")
  for (const key of SOCIAL_IMAGE_KEYS) {
    const value = content[key]
    if (value === undefined && key !== "path" && key !== "title") continue
    if (typeof value !== "string") {
      throw new Error(`Invalid social image parameter: ${key}`)
    }
    if (value) url.searchParams.set(key, value)
  }
  const parsed = parseSocialImage(url.searchParams)
  if (!parsed) throw new Error("Invalid social image parameters")
  url.searchParams.set("title", parsed.title)

  return {
    url: url.href,
    ...SOCIAL_IMAGE_SIZE,
    type: "image/png",
    alt: parsed.title,
  }
}

export function withSocialImage(
  path: string,
  metadata: Metadata & { title: string },
) {
  return {
    ...metadata,
    openGraph: {
      type: "website" as const,
      siteName: "GraphQL",
      ...metadata.openGraph,
      images: [
        getSocialImage({
          path,
          title: metadata.title,
          description: metadata.description || undefined,
        }),
      ],
    },
  }
}

export const DEFAULT_SOCIAL_IMAGE = getSocialImage({
  path: "/",
  title: HOMEPAGE_TITLE,
})

import type { Metadata } from "next"

export const SITE_URL = "https://graphql.org"

export const SITE_DESCRIPTION =
  "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data."

export interface SocialImageContent {
  path: string
  title: string
  description?: string
  byline?: string
  date?: string
}

export function getSocialImage(content: SocialImageContent) {
  const url = new URL("/og/", SITE_URL)
  url.searchParams.set("v", "3")
  for (const [key, value] of Object.entries(content)) {
    if (typeof value === "string" && value) url.searchParams.set(key, value)
  }
  return {
    url: url.href,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: content.title,
  }
}

export function withSocialImage(
  path: string,
  metadata: Metadata & { title: string },
) {
  return {
    ...metadata,
    openGraph: {
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
  title: "The API language for humans and agents",
})

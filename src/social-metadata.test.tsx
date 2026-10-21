import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  DEFAULT_SOCIAL_IMAGE,
  getSocialImage,
  withSocialImage,
} from "./social-metadata"

describe("social image metadata", () => {
  it("uses a stable public URL and losslessly encodes authored content", () => {
    const title = 'Safer inputs with `@oneOf` & "choices"'
    const image = getSocialImage({
      path: "/blog/oneof/",
      title,
      byline: "A & B",
      date: "2026-01-01",
    })
    const url = new URL(image.url)
    assert.equal(url.origin, "https://graphql.org")
    assert.equal(url.pathname, "/og/")
    assert.equal(url.searchParams.get("title"), title)
    assert.equal(url.searchParams.get("path"), "/blog/oneof/")
    assert.equal(url.searchParams.get("byline"), "A & B")
    assert.equal(image.alt, title)
    assert.deepEqual(
      [image.width, image.height, image.type],
      [1200, 630, "image/png"],
    )
  })

  it("keeps page metadata and replaces only its image", () => {
    const metadata = withSocialImage("/ai/", {
      title: "GraphQL for AI",
      description: "Existing description",
      alternates: { canonical: "/ai/" },
      openGraph: {
        type: "article",
        title: "Existing OG title",
        images: ["/old.png"],
      },
    })
    assert.equal(metadata.title, "GraphQL for AI")
    assert.ok("type" in metadata.openGraph)
    assert.ok("title" in metadata.openGraph)
    assert.equal(metadata.openGraph.type, "article")
    assert.equal(metadata.openGraph.title, "Existing OG title")
    assert.deepEqual(metadata.alternates, { canonical: "/ai/" })
    assert.equal(
      new URL(metadata.openGraph.images[0].url).searchParams.get("path"),
      "/ai/",
    )
  })

  it("uses the generated homepage card as the global fallback", () => {
    const url = new URL(DEFAULT_SOCIAL_IMAGE.url)
    assert.equal(url.pathname, "/og/")
    assert.equal(url.searchParams.get("path"), "/")
  })
})

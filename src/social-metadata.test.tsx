import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  DEFAULT_SOCIAL_IMAGE,
  getSocialImage,
  HOMEPAGE_LINES,
  HOMEPAGE_TITLE,
  parseSocialImage,
  SOCIAL_IMAGE_SIZE,
  type SocialImageContent,
  withSocialImage,
} from "./social-metadata"

describe("social image protocol", () => {
  it("uses a stable public URL and round-trips supported authored content", () => {
    const content = {
      path: "/blog/oneof/",
      title: 'Safer inputs with `@oneOf` & "choices"',
      description: "Unicode: café 日本語; query punctuation: ? # + %",
      byline: "A & B",
      date: "2026-01-01",
    }
    const image = getSocialImage(content)
    const url = new URL(image.url)
    assert.equal(url.origin, "https://graphql.org")
    assert.equal(url.pathname, "/og/")
    assert.equal(url.searchParams.get("v"), "3")
    assert.deepEqual(parseSocialImage(url.searchParams), content)
    assert.equal(image.alt, content.title)
    assert.deepEqual(
      { width: image.width, height: image.height },
      SOCIAL_IMAGE_SIZE,
    )
    assert.equal(image.type, "image/png")
  })

  it("normalizes titles and empty optional fields with shared homepage defaults", () => {
    assert.equal(HOMEPAGE_TITLE, HOMEPAGE_LINES.join(" "))
    for (const title of [undefined, "", " \n ", "  Authored title  "]) {
      const params = new URLSearchParams({
        path: "/",
        description: "",
        byline: "",
        date: "",
      })
      if (title !== undefined) params.set("title", title)
      const expected = {
        path: "/",
        title: title?.trim() || HOMEPAGE_TITLE,
        description: undefined,
        byline: undefined,
        date: undefined,
      }
      assert.deepEqual(parseSocialImage(params), expected)
      if (title !== undefined) {
        const image = getSocialImage({ path: "/", title })
        assert.deepEqual(
          parseSocialImage(new URL(image.url).searchParams),
          expected,
        )
        assert.equal(image.alt, expected.title)
      }
    }
  })

  for (const [key, limit] of [
    ["path", 240],
    ["title", 300],
    ["description", 2000],
    ["byline", 300],
    ["date", 64],
  ] as const) {
    it(`accepts ${key} at its ${limit}-character limit and rejects overflow`, () => {
      for (const length of [limit, limit + 1]) {
        const value =
          key === "path" ? `/${"x".repeat(length - 1)}` : "x".repeat(length)
        const content = { path: "/", title: "Title", [key]: value }
        const params = new URLSearchParams(content)
        if (length === limit) {
          assert.ok(parseSocialImage(params))
          assert.deepEqual(
            parseSocialImage(new URL(getSocialImage(content).url).searchParams),
            parseSocialImage(params),
          )
        } else {
          assert.equal(parseSocialImage(params), null)
          assert.throws(() => getSocialImage(content), /Invalid social image/)
        }
      }
    })
  }

  it("does not serialize or return unknown runtime fields", () => {
    const content = {
      path: "/learn/",
      title: "Learn GraphQL",
      v: "999",
      width: "9000",
      unknown: "Ignore me",
    }
    const params = new URL(getSocialImage(content).url).searchParams
    assert.deepEqual([...params.keys()], ["v", "path", "title"])
    assert.equal(params.get("v"), "3")
    params.set("unknown", "Ignore me too")
    assert.deepEqual(parseSocialImage(params), {
      path: content.path,
      title: content.title,
      description: undefined,
      byline: undefined,
      date: undefined,
    })
  })

  it("accepts ordinary dots in slugs without accepting traversal segments", () => {
    for (const path of [
      "/",
      "/blog/graphql.v2/",
      "/.well-known/",
      "/v1...v2/",
    ]) {
      const content = { path, title: "Title" }
      assert.equal(
        parseSocialImage(new URL(getSocialImage(content).url).searchParams)
          ?.path,
        path,
      )
    }
  })

  it("requires a local path without traversal, query, hash, backslash or controls", () => {
    assert.equal(parseSocialImage(new URLSearchParams()), null)
    for (const path of [
      "",
      "relative/",
      "https://example.com/",
      "//example.com/",
      "/./",
      "/../",
      "/blog/../learn/",
      "/blog/.",
      "/blog/..",
      "/blog/?page=1",
      "/blog/#section",
      "/blog/\\slug/",
      "/blog/\u0000/",
      "/blog/\n/",
      "/blog/\u001f/",
      "/blog/\u007f/",
      "/blog/\u0085/",
    ]) {
      const content = { path, title: "Title" }
      assert.equal(parseSocialImage(new URLSearchParams(content)), null, path)
      assert.throws(() => getSocialImage(content), /Invalid social image/, path)
    }
  })

  it("throws on non-string authored fields instead of silently dropping them", () => {
    for (const content of [
      { title: "Title" },
      { path: "/" },
      { path: 42, title: "Title" },
      { path: "/", title: null },
      { path: "/", title: "Title", description: 42 },
      { path: "/", title: "Title", byline: false },
      { path: "/", title: "Title", date: null },
    ]) {
      assert.throws(
        () => getSocialImage(content as unknown as SocialImageContent),
        /Invalid social image/,
      )
    }
  })

  it("uses the generated homepage card as the global fallback", () => {
    const url = new URL(DEFAULT_SOCIAL_IMAGE.url)
    assert.equal(url.pathname, "/og/")
    assert.equal(url.searchParams.get("path"), "/")
    assert.equal(url.searchParams.get("title"), HOMEPAGE_TITLE)
  })
})

describe("social image Open Graph metadata", () => {
  it("provides complete website defaults for child metadata", () => {
    const metadata = withSocialImage("/ai/", { title: "GraphQL for AI" })
    assert.equal(metadata.openGraph.type, "website")
    assert.equal(metadata.openGraph.siteName, "GraphQL")
    assert.equal(metadata.openGraph.images.length, 1)
  })

  it("preserves local overrides and other page metadata but replaces images", () => {
    const metadata = withSocialImage("/ai/", {
      title: "GraphQL for AI",
      description: "Existing description",
      alternates: { canonical: "/ai/" },
      openGraph: {
        type: "article",
        siteName: "Custom site",
        title: "Existing OG title",
        images: ["/old.png"],
      },
    })
    assert.equal(metadata.title, "GraphQL for AI")
    assert.equal(metadata.description, "Existing description")
    assert.equal(metadata.openGraph.type, "article")
    assert.equal(metadata.openGraph.siteName, "Custom site")
    assert.equal(metadata.openGraph.title, "Existing OG title")
    assert.deepEqual(metadata.alternates, { canonical: "/ai/" })
    assert.equal(metadata.openGraph.images.length, 1)
    const params = new URL(metadata.openGraph.images[0].url).searchParams
    assert.equal(params.get("path"), "/ai/")
    assert.equal(params.get("description"), "Existing description")
  })

  it("preserves GraphQL Day identity through an explicit local override", () => {
    const metadata = withSocialImage("/day/", {
      title: "GraphQL Day 2026",
      openGraph: { siteName: "GraphQL Day" },
    })
    assert.equal(metadata.openGraph.type, "website")
    assert.equal(metadata.openGraph.siteName, "GraphQL Day")
    assert.equal(
      withSocialImage("/day/", { title: "GraphQL Day 2026" }).openGraph
        .siteName,
      "GraphQL",
    )
  })
})

import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { HOMEPAGE_LINES, HOMEPAGE_TITLE } from "@/social-metadata"
import {
  ARTICLE_ART_WIDTH,
  BODY_HEIGHT,
  HEADER_HEIGHT,
  INNER_WIDTH,
  SPLIT_COLUMN,
} from "./geometry"
import { getCardPresentation } from "./presentation"

describe("social card presentation", () => {
  it("keeps the homepage's explicit lines in a single resolved layout", async () => {
    const card = await getCardPresentation({ path: "/", title: HOMEPAGE_TITLE })
    assert.equal(card.layout, "full-width")
    assert.equal(card.divider, SPLIT_COLUMN)
    assert.equal(card.ruleHeight, HEADER_HEIGHT)
    assert.ok(card.text.heading.kind === "lines")
    assert.deepEqual(card.text.heading.lines, HOMEPAGE_LINES)
    assert.equal(card.text.width, INNER_WIDTH)
  })

  for (const [path, section] of [
    ["/blog/", "Blog"],
    ["/tags/announcements/", "Blog"],
    ["/resources/", "Resource Hub"],
    ["/resources/reading/books/", "Resource Hub"],
    ["/community/foundation/", "GraphQL Foundation"],
    ["/community/team/", "Community"],
    ["/ai/", "GraphQL / AI"],
    ["/day/", "GraphQL Day"],
    ["/conf/conference-kit/", "Conference Kit"],
  ]) {
    it(`resolves the section and title layout for ${path}`, async () => {
      const card = await getCardPresentation({ path, title: "Page title" })
      assert.equal(card.layout, "full-width")
      assert.equal(card.section, section)
    })
  }

  it("requires a complete code panel for documentation", async () => {
    const card = await getCardPresentation({
      path: "/learn/queries/",
      title: "Queries",
    })
    assert.ok(card.layout === "split")
    assert.ok(card.panel.kind === "code")
    assert.equal(card.panel.label, "Operation")
    assert.ok(card.panel.tokens.flat().some(token => token.content === "hero"))
    assert.equal(card.ruleHeight, HEADER_HEIGHT + BODY_HEIGHT)
    assert.equal(card.text.width, card.divider)
  })

  it("uses a headings panel for prose and an explicit title fallback for missing sources", async () => {
    const overview = await getCardPresentation({ path: "/faq/", title: "FAQ" })
    assert.ok(overview.layout === "split")
    assert.ok(overview.panel.kind === "headings")
    assert.ok(overview.panel.headings.length)
    const missing = await getCardPresentation({
      path: "/learn/does-not-exist/",
      title: "Missing",
    })
    assert.ok(missing.layout === "full-width")
    assert.ok(missing.background)
  })

  for (const path of ["/brand/", "/users/", "/codeofconduct/"]) {
    it(`keeps quiet-page content separate from its caption for ${path}`, async () => {
      const card = await getCardPresentation({
        path,
        title: "Title",
        description: "Should not be marketing copy",
      })
      assert.ok(card.layout === "full-width")
      assert.equal(card.surface, "neu0")
      assert.equal(card.background, null)
      assert.ok(card.caption)
      assert.equal(card.text.align, "center")
      assert.equal(card.text.supporting.kind, "none")
    })
  }

  it("carries the enlarged map geometry as resolved background data", async () => {
    const card = await getCardPresentation({
      path: "/community/events/",
      title: "Events",
    })
    assert.ok(card.layout === "full-width")
    assert.ok(card.background)
    assert.deepEqual(
      [card.background.width, card.background.height, card.background.top],
      [1980, 1200, -335],
    )
    assert.ok(card.background.src.startsWith("data:image/png;base64,"))
  })

  for (const length of [100, 101]) {
    it(`selects the article layout at ${length} title characters`, async () => {
      const title = "A".repeat(length)
      const card = await getCardPresentation({ path: "/blog/example/", title })
      assert.equal(card.layout, length === 100 ? "split" : "article-cover")
      assert.ok(card.text.heading.kind === "text")
      assert.equal(card.text.heading.text, title)
      assert.equal(card.text.deck, null)
      if (card.layout === "split") {
        assert.ok(card.panel.kind === "artwork")
        assert.ok(card.panel.src.startsWith("data:image/png;base64,"))
      } else if (card.layout === "article-cover") {
        assert.equal(card.divider, ARTICLE_ART_WIDTH)
        assert.equal(card.text.width, INNER_WIDTH - ARTICLE_ART_WIDTH)
        assert.ok(card.artwork.startsWith("data:image/png;base64,"))
      }
    })
  }

  for (const colon of [0, 15, 32, 33]) {
    it(`preserves the authored title around a colon at ${colon}`, async () => {
      const title = `${"A".repeat(colon)}:${" detail".repeat(20)}`
      const card = await getCardPresentation({
        path: "/blog/example/",
        title,
        byline: "Author",
        date: "2026-06-24",
      })
      assert.ok(card.layout === "article-cover")
      assert.ok(card.text.heading.kind === "text")
      if (colon > 0 && colon <= 32) {
        assert.equal(card.text.heading.text, title.slice(0, colon + 1))
        assert.equal(card.text.deck, title.slice(colon + 1).trim())
        assert.equal(`${card.text.heading.text} ${card.text.deck}`, title)
      } else {
        assert.equal(card.text.heading.text, title)
        assert.equal(card.text.deck, null)
      }
      assert.ok(card.text.supporting.kind === "publication")
      assert.deepEqual(card.text.supporting.lines, ["Author", "June 24, 2026"])
    })
  }

  it("removes Markdown formatting without deleting technical identifier characters", async () => {
    const card = await getCardPresentation({
      path: "/blog/example/",
      title: "Introducing `__typename` and **aliases**",
    })
    assert.ok(card.text.heading.kind === "text")
    assert.equal(card.text.heading.text, "Introducing __typename and aliases")
  })
})

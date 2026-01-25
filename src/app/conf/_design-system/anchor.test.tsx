import { describe, it, beforeEach } from "node:test"
import { strict as assert } from "node:assert"
import React from "react"
import { render } from "@testing-library/react"
import { JSDOM } from "jsdom"

import { Anchor } from "./anchor"

const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window as any
global.React = React
global.self = dom.window as any

describe("Anchor", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("adds target=_blank and rel attributes for external HTTPS links", () => {
    const { container } = render(
      <Anchor href="https://example.com">External Link</Anchor>,
    )

    const link = container.querySelector("a")
    assert.ok(link, "Link element should exist")
    assert.strictEqual(link.getAttribute("target"), "_blank")
    assert.strictEqual(link.getAttribute("rel"), "noopener noreferrer")
    assert.strictEqual(link.getAttribute("href"), "https://example.com")
  })

  it("adds target=_blank and rel attributes for external HTTP links", () => {
    const { container } = render(
      <Anchor href="http://example.com">External Link</Anchor>,
    )

    const link = container.querySelector("a")
    assert.ok(link, "Link element should exist")
    assert.strictEqual(link.getAttribute("target"), "_blank")
    assert.strictEqual(link.getAttribute("rel"), "noopener noreferrer")
    assert.strictEqual(link.getAttribute("href"), "http://example.com")
  })

  it("does not add target=_blank for hash links", () => {
    const { container } = render(<Anchor href="#section">Hash Link</Anchor>)

    const link = container.querySelector("a")
    assert.ok(link, "Link element should exist")
    assert.strictEqual(link.getAttribute("target"), null)
    assert.strictEqual(link.getAttribute("rel"), null)
    assert.strictEqual(link.getAttribute("href"), "#section")
  })

  it("handles various external URL formats with target=_blank", () => {
    const urls = [
      "https://graphql.org",
      "http://localhost:3000",
      "https://api.github.com/user",
      "http://example.com/path?query=value",
      "https://docs.example.com/guide",
      "//google.com",
    ]

    urls.forEach(url => {
      const { container } = render(<Anchor href={url}>Link</Anchor>)
      const link = container.querySelector("a")

      assert.ok(link, `Link element should exist for ${url}`)
      assert.strictEqual(
        link.getAttribute("target"),
        "_blank",
        `Should have target="_blank" for ${url}`,
      )
      assert.strictEqual(
        link.getAttribute("rel"),
        "noopener noreferrer",
        `Should have rel="noopener noreferrer" for ${url}`,
      )
    })
  })

  it("handles empty href as internal (no target=_blank)", () => {
    // Empty href is treated as internal by isInternal() logic
    const { container } = render(<Anchor href="">Empty Link</Anchor>)

    const link = container.querySelector("a")
    assert.ok(link, "Link element should exist")
    assert.strictEqual(link.getAttribute("target"), null)
    assert.strictEqual(link.getAttribute("rel"), null)
    assert.strictEqual(link.getAttribute("href"), "")
  })

  it("does not add target=_blank for mailto links", () => {
    // mailto links are handled by SIMPLE_LINK_REGEX, no external link treatment needed
    const { container } = render(
      <Anchor href="mailto:test@example.com">Email Link</Anchor>,
    )

    const link = container.querySelector("a")
    assert.ok(link, "Link element should exist")
    assert.strictEqual(link.getAttribute("target"), null)
    assert.strictEqual(link.getAttribute("rel"), null)
    assert.strictEqual(link.getAttribute("href"), "mailto:test@example.com")
  })
})

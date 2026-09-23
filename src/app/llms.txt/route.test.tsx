import { strict as assert } from "node:assert"
import { describe, it } from "node:test"

import { pagesBySection } from "@/components/learn-aggregator/learn-pages"

import { renderLlmsTxt } from "./render-llms-txt"
import { dynamic, GET } from "./route"

describe("llms.txt", () => {
  it("is generated as a static plain-text response", async () => {
    assert.strictEqual(dynamic, "force-static")

    const response = GET()

    assert.strictEqual(response.status, 200)
    assert.strictEqual(
      response.headers.get("content-type"),
      "text/plain; charset=utf-8",
    )
    assert.strictEqual(await response.text(), renderLlmsTxt())
  })

  it("follows the llms.txt structure and includes every Learn page", () => {
    const content = renderLlmsTxt()

    assert.match(content, /^# GraphQL\n\n>/)
    assert.match(content, /\n## Start Here\n/)
    assert.match(content, /\n## Learn: Core Concepts\n/)
    assert.match(content, /\n## Learn: Best Practices\n/)
    assert.match(content, /\n## Learn: Schema Governance\n/)
    assert.match(content, /\n## Implementations and Resources\n/)
    assert.match(content, /\n## Project and Community\n/)
    assert.match(content, /\n## Optional\n/)

    for (const pages of Object.values(pagesBySection)) {
      for (const page of pages) {
        const url = new URL(page.href, "https://graphql.org").href
        assert.ok(content.includes(`- [${page.title}](${url}):`))
      }
    }
  })

  it("uses absolute canonical URLs instead of known redirect routes", () => {
    const urls = Array.from(
      renderLlmsTxt().matchAll(/\]\((https?:\/\/[^)]+)\)/g),
      match => match[1],
    )

    assert.ok(urls.length > 0)
    assert.ok(urls.every(url => URL.canParse(url)))
    assert.ok(!urls.includes("https://graphql.org/code/"))
    assert.ok(!urls.includes("https://graphql.org/community/"))
    assert.ok(!urls.includes("https://graphql.org/foundation/"))
    assert.ok(!urls.includes("https://graphql.org/graphql-js/"))
    assert.ok(
      urls.includes("https://graphql.org/community/tools-and-libraries/"),
    )
    assert.ok(urls.includes("https://www.graphql-js.org/docs/"))
  })
})

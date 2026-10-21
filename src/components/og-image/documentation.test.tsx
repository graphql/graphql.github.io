import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  extractDocumentationExample,
  getDocumentationContent,
} from "./documentation"

describe("documentation social cards", () => {
  it("uses a complete operation from the Queries page and the site's syntax colors", async () => {
    const content = await getDocumentationContent("/learn/queries/")
    assert.equal(content?.example?.code, "{\n  hero {\n    name\n  }\n}")
    assert.equal(
      content?.subtitle,
      "Learn how to fetch data from a GraphQL server",
    )
    const tokens = content?.highlighted?.tokens.flat() || []
    assert.equal(
      tokens.find(token => token.content === "hero")?.color,
      "#E10198",
    )
    assert.equal(tokens.find(token => token.content === "{")?.color, "#6E7557")
  })

  it("does not truncate long code blocks into invalid snippets", () => {
    const source =
      "```graphql\nquery {\n  anExtremelyLongFieldThatDoesNotFitTheCard\n}\n```\n\n## Arguments\n"
    const content = extractDocumentationExample(source, "/learn/example/")
    assert.equal(content.example, undefined)
    assert.deepEqual(content.headings, ["Arguments"])
  })

  it("uses real contents for prose-only and landing pages", async () => {
    for (const path of ["/learn/", "/faq/", "/learn/best-practices/"]) {
      const content = await getDocumentationContent(path)
      assert.ok(content?.headings.length)
      assert.equal(content?.highlighted, null)
    }
  })

  it("never resolves paths outside the documentation directories", async () => {
    for (const path of [
      "/learn/../../package/",
      "/learn/%2e%2e/",
      "/blog/",
      "/etc/passwd/",
      "//learn/queries/",
    ]) {
      assert.equal(await getDocumentationContent(path), null)
    }
    assert.equal(await getDocumentationContent("/learn/does-not-exist/"), null)
  })
})

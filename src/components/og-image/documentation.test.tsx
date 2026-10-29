import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { describe, it } from "node:test"

import {
  extractDocumentationExample,
  getDocumentationContent,
} from "./documentation"

describe("documentation social cards", () => {
  it("uses the first fitting executable operation from Queries with the site's syntax colors", async () => {
    const source = await readFile("src/pages/learn/queries.mdx", "utf8")
    const extracted = extractDocumentationExample(source, "/learn/queries/")
    assert.equal(extracted.preview.kind, "code")
    if (extracted.preview.kind !== "code") return
    assert.equal(extracted.preview.code, "{\n  hero {\n    name\n  }\n}")
    assert.equal(extracted.preview.label, "Operation")

    const content = await getDocumentationContent("/learn/queries/")
    assert.equal(content?.preview.kind, "code")
    assert.equal(
      content?.subtitle,
      "Learn how to fetch data from a GraphQL server",
    )
    assert.ok(content && content.preview.kind === "code")
    assert.equal(content.preview.label, "Operation")
    assert.equal(content.preview.background, "#ffffff")
    assert.equal(
      content.preview.tokens
        .map(line => line.map(token => token.content).join(""))
        .join("\n"),
      extracted.preview.code,
    )
    const tokens = content.preview.tokens.flat()
    assert.equal(
      tokens.find(token => token.content === "hero")?.color,
      "#E10198",
    )
    assert.equal(tokens.find(token => token.content === "{")?.color, "#6E7557")
  })

  it("treats equivalent Markdown fences and MDX subtitle quotes identically", () => {
    const canonical = extractDocumentationExample(
      '<p className="learn-subtitle">Learn **GraphQL**</p>\n\n```graphql\n# { "graphiql": true }\n{ hero { name } }\n```',
      "/learn/example/",
    )
    const reformatted = extractDocumentationExample(
      "<p\n className='other learn-subtitle'\n>Learn **GraphQL**</p>\n\n~~~graphql graphiql\n{ hero { name } }\n~~~",
      "/learn/example/",
    )
    assert.deepEqual(reformatted, canonical)
    assert.equal(canonical.subtitle, "Learn GraphQL")
    assert.deepEqual(canonical.preview, {
      kind: "code",
      label: "Operation",
      language: "graphql",
      code: "{ hero { name } }",
    })
  })

  it("reads inline heading markup and omits footnote references", () => {
    const content = extractDocumentationExample(
      "## It's *Graphs* [All](https://example.com) the `Way` <em>Down</em>[^1]\n\nSecond **heading**\n--------------\n\n[^1]: A footnote.",
      "/learn/example/",
    )
    assert.deepEqual(content.preview, {
      kind: "headings",
      label: "On this page",
      headings: ["It's Graphs All the Way Down", "Second heading"],
    })
  })

  it("does not mistake frontmatter for a section heading", () => {
    const content = extractDocumentationExample(
      "---\nsidebarTitle: Federation\n---\n\n# GraphQL federation\n\n## What is federation?",
      "/learn/example/",
    )
    assert.deepEqual(content.preview, {
      kind: "headings",
      label: "On this page",
      headings: ["What is federation?"],
    })
  })

  it("never extracts headings or JSX subtitles from code fences", () => {
    const content = extractDocumentationExample(
      "~~~text\n## Fake heading\n<p className='learn-subtitle'>Fake subtitle</p>\n~~~\n\n## Real heading",
      "/learn/example/",
    )
    assert.equal(content.subtitle, undefined)
    assert.deepEqual(content.preview, {
      kind: "headings",
      label: "On this page",
      headings: ["Real heading"],
    })
  })

  it("rejects entire snippets over nine lines or 29 characters, without truncation", () => {
    for (const code of [
      "query {\n  anExtremelyLongFieldThatDoesNotFitTheCard\n}",
      "{\n  hero {\n    name\n    name\n    name\n    name\n    name\n    name\n  }\n}",
    ]) {
      const content = extractDocumentationExample(
        `\`\`\`graphql\n${code}\n\`\`\`\n\n## Arguments`,
        "/learn/example/",
      )
      assert.deepEqual(content.preview, {
        kind: "headings",
        label: "On this page",
        headings: ["Arguments"],
      })
    }
    const code = `# ${"x".repeat(27)}\n{\n hero {\n  name\n  name\n  name\n  name\n }\n}`
    const content = extractDocumentationExample(
      `\`\`\`graphql\n# { "graphiql": true }\n${code}\n\`\`\``,
      "/learn/example/",
    )
    assert.equal(content.preview.kind, "code")
    if (content.preview.kind === "code")
      assert.equal(content.preview.code, code)
  })

  it("uses source-order fallback after rejecting oversized blocks", () => {
    const source = [
      "```graphql\nquery {\n  anExtremelyLongFieldThatDoesNotFitTheCard\n}\n```",
      '```json\n{"first": true}\n```',
      "```graphql\n{ second }\n```",
    ].join("\n\n")
    const fallback = extractDocumentationExample(source, "/learn/example/")
    assert.deepEqual(fallback.preview, {
      kind: "code",
      label: "Example",
      language: "json",
      code: '{"first": true}',
    })
    const preferred = extractDocumentationExample(source, "/learn/queries/")
    assert.deepEqual(preferred.preview, {
      kind: "code",
      label: "Operation",
      language: "graphql",
      code: "{ second }",
    })
  })

  it("prefers executable operations, including named ones, rather than SDL or fragments", () => {
    const source = [
      "```graphql\ntype Query { hero: Hero }\n```",
      "```graphql\nfragment Name on Hero { name }\n```",
      "```graphql\nquery Hero { hero { name } }\n```",
      "```graphql\n{ later }\n```",
    ].join("\n\n")
    assert.deepEqual(
      extractDocumentationExample(source, "/learn/queries/").preview,
      {
        kind: "code",
        label: "Operation",
        language: "graphql",
        code: "query Hero { hero { name } }",
      },
    )
    assert.deepEqual(
      extractDocumentationExample(source, "/learn/example/").preview,
      {
        kind: "code",
        label: "Schema",
        language: "graphql",
        code: "type Query { hero: Hero }",
      },
    )
    assert.equal(
      extractDocumentationExample(
        "```graphql\ntype Query { hero: Hero }\n```",
        "/learn/queries/",
      ).preview.label,
      "Schema",
    )
  })

  it("classifies GraphQL syntax with the parser and keeps invalid examples", () => {
    for (const [code, label] of [
      ["# Comment\nscalar Date", "Schema"],
      ["extend type Query { a: Int }", "Schema"],
      ["schema { query: Root }", "Schema"],
      ["query Hero { hero { name } }", "Operation"],
      ["subscription { changes }", "Operation"],
      ["{ hero( }", "Example"],
    ]) {
      const { preview } = extractDocumentationExample(
        `\`\`\`graphql\n${code}\n\`\`\``,
        "/learn/example/",
      )
      assert.equal(preview.kind, "code")
      assert.equal(preview.label, label)
    }
  })

  it("uses explicit aggregator previews without interpreting JavaScript or sibling imports", async () => {
    const expected = {
      "/learn/": ["Learn GraphQL", "Tutorials", "Best Practices", "FAQ"],
      "/faq/": [
        "Getting Started",
        "General",
        "Best Practices",
        "Specification",
      ],
      "/learn/best-practices/": [
        "Thinking in Graphs",
        "Serving over HTTP",
        "Authorization",
        "Pagination",
      ],
    }
    for (const [path, headings] of Object.entries(expected)) {
      const content = await getDocumentationContent(path)
      assert.deepEqual(content?.preview, {
        kind: "headings",
        label: "On this page",
        headings,
      })
      assert.deepEqual(
        extractDocumentationExample(
          "import Missing from './does-not-exist.mdx'\n\n<Cards items={[{ title: 'Invented' }]} />\n\n## Not the policy",
          path,
        ).preview,
        content?.preview,
      )
    }
    assert.deepEqual(
      extractDocumentationExample(
        "import Missing from './does-not-exist.mdx'\n\n<Cards items={[{ title: 'Invented' }]} />",
        "/learn/example/",
      ).preview,
      { kind: "headings", label: "On this page", headings: [] },
    )
  })

  it("limits fallback headings to four real sections", () => {
    const { preview } = extractDocumentationExample(
      Array.from({ length: 5 }, (_, i) => `## Section ${i}`).join("\n\n"),
      "/learn/example/",
    )
    assert.deepEqual(preview, {
      kind: "headings",
      label: "On this page",
      headings: ["Section 0", "Section 1", "Section 2", "Section 3"],
    })
  })

  it("never resolves paths outside the documentation filesystem allowlist", async () => {
    for (const path of [
      "/learn/../../package/",
      "/learn/%2e%2e/",
      "/learn/queries/?mode=raw",
      "/learn/queries/#fields",
      "/learn/queries",
      "/learn/queries.mdx/",
      "/learn//queries/",
      "/learn/Queries/",
      "/learn/queries\\/",
      "/learn/queries\0/",
      "/blog/",
      "/etc/passwd/",
      "//learn/queries/",
    ]) {
      assert.equal(await getDocumentationContent(path), null, path)
    }
    assert.equal(await getDocumentationContent("/learn/does-not-exist/"), null)
  })
})

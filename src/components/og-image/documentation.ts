import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { Kind, parse } from "graphql"
import { toString } from "mdast-util-to-string"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import {
  getSingletonHighlighter,
  type BundledLanguage,
  type ThemedToken,
} from "shiki"
import { unified } from "unified"
import { visit } from "unist-util-visit"

import lightTheme from "@/_design-system/syntax/light.json"

type HeadingsPreview = {
  kind: "headings"
  label: "On this page"
  headings: string[]
}

type CodeExample = {
  kind: "code"
  label: string
  language: BundledLanguage
  code: string
}

export type DocumentationPreview =
  | HeadingsPreview
  | {
      kind: "code"
      label: string
      tokens: ThemedToken[][]
      background: string
    }

type PreviewPolicy =
  | { kind: "headings"; headings: string[] }
  | { kind: "code"; prefer: "Operation" }

const previewPolicies: Partial<Record<string, PreviewPolicy>> = {
  "/learn/": {
    kind: "headings",
    headings: ["Learn GraphQL", "Tutorials", "Best Practices", "FAQ"],
  },
  "/faq/": {
    kind: "headings",
    headings: ["Getting Started", "General", "Best Practices", "Specification"],
  },
  "/learn/best-practices/": {
    kind: "headings",
    headings: [
      "Thinking in Graphs",
      "Serving over HTTP",
      "Authorization",
      "Pagination",
    ],
  },
  "/learn/queries/": { kind: "code", prefer: "Operation" },
}

const languages = new Map<string, BundledLanguage>([
  ["graphql", "graphql"],
  ["js", "javascript"],
  ["javascript", "javascript"],
  ["ts", "typescript"],
  ["typescript", "typescript"],
  ["json", "json"],
  ["http", "http"],
  ["bash", "bash"],
])

const parser = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMdx)

export function extractDocumentationExample(source: string, path: string) {
  const tree = parser.parse(source)
  const policy = previewPolicies[path]
  let subtitle: string | undefined
  const headings: string[] = []
  const examples: { preview: CodeExample; executable: boolean }[] = []

  visit(tree, node => {
    if (
      (node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement") &&
      node.name === "p" &&
      node.attributes.some(
        attribute =>
          attribute.type === "mdxJsxAttribute" &&
          attribute.name === "className" &&
          typeof attribute.value === "string" &&
          attribute.value.split(/\s+/).includes("learn-subtitle"),
      )
    ) {
      subtitle ??= toString(node).trim()
    }
    if (node.type === "heading" && node.depth === 2) {
      const heading = toString(node).trim()
      if (heading) headings.push(heading)
    }
    if (node.type !== "code") return
    const language = languages.get(node.lang || "")
    if (!language) return

    const lines = node.value.split("\n")
    if (
      lines[0].trimStart().startsWith("#") &&
      /graphiql["']?: ?true/.test(lines[0])
    ) {
      lines.shift()
    }
    if (lines.length > 9 || lines.some(line => line.length > 29)) return
    const code = lines.join("\n")
    if (!code.trim()) return

    let label = "Example"
    let executable = false
    if (language === "graphql") {
      try {
        const { definitions } = parse(code)
        const isExecutable = definitions.every(
          definition =>
            definition.kind === Kind.OPERATION_DEFINITION ||
            definition.kind === Kind.FRAGMENT_DEFINITION,
        )
        executable =
          isExecutable &&
          definitions.some(
            definition => definition.kind === Kind.OPERATION_DEFINITION,
          )
        if (isExecutable) {
          label = "Operation"
        } else if (
          definitions.every(
            definition =>
              definition.kind !== Kind.OPERATION_DEFINITION &&
              definition.kind !== Kind.FRAGMENT_DEFINITION,
          )
        ) {
          label = "Schema"
        }
      } catch {
        label = "Example"
      }
    }
    examples.push({
      preview: { kind: "code", label, language, code },
      executable,
    })
  })

  const example =
    (policy?.kind === "code" && policy.prefer === "Operation"
      ? examples.find(example => example.executable)
      : undefined) || examples[0]
  const preview: CodeExample | HeadingsPreview =
    policy?.kind === "headings"
      ? { kind: "headings", label: "On this page", headings: policy.headings }
      : example?.preview || {
          kind: "headings",
          label: "On this page",
          headings: headings.slice(0, 4),
        }
  return { subtitle, preview }
}

export async function getDocumentationContent(path: string) {
  if (!/^\/(learn|faq)(\/[a-z0-9-]+)*\/$/.test(path)) return null
  const stem = join(process.cwd(), "src/pages", path.slice(1, -1))
  let source: string | undefined
  for (const file of [`${stem}.mdx`, join(stem, "index.mdx")]) {
    try {
      source = await readFile(file, "utf8")
      break
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
    }
  }
  if (source === undefined) return null
  const content = extractDocumentationExample(source, path)
  let preview: DocumentationPreview
  if (content.preview.kind === "code") {
    const { code, language, label } = content.preview
    const highlighter = await getSingletonHighlighter({
      themes: [{ ...lightTheme, type: "light" }],
      langs: [language],
    })
    const { tokens, bg } = highlighter.codeToTokens(code, {
      lang: language,
      theme: lightTheme.name,
    })
    preview = {
      kind: "code",
      label,
      tokens,
      background: bg || lightTheme.colors["editor.background"],
    }
  } else {
    preview = content.preview
  }
  return { subtitle: content.subtitle, preview }
}

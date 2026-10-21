import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { getSingletonHighlighter, type BundledLanguage } from "shiki"

import lightTheme from "@/_design-system/syntax/light.json"

export function extractDocumentationExample(source: string, path: string) {
  const subtitle = source.match(
    /<p className="learn-subtitle">([^<]+)<\/p>/,
  )?.[1]
  const sectionList = source.match(/sections=\{\[([^\]]+)\]\}/)?.[1]
  const headings = [...source.matchAll(/^## (.+)$/gm)].map(match =>
    match[1].replace(/[`*_]/g, ""),
  )
  if (!headings.length) {
    headings.push(
      ...(sectionList
        ? [...sectionList.matchAll(/"([^"]+)"/g)].map(match => match[1])
        : [...source.matchAll(/^\s+title: "([^"]+)"/gm)].map(
            match => match[1],
          )),
    )
  }
  const examples = [...source.matchAll(/^```(\w+)[^\n]*\n([\s\S]*?)^```/gm)]
    .map(([, language, text]) => ({
      language:
        language === "js"
          ? "javascript"
          : language === "ts"
            ? "typescript"
            : language,
      code: text.replace(/^#\s*\{[^\n]*"graphiql"[^\n]*\}\s*\n/, "").trimEnd(),
    }))
    .filter(
      ({ language, code }) =>
        [
          "graphql",
          "javascript",
          "typescript",
          "json",
          "http",
          "bash",
        ].includes(language) &&
        code.split("\n").length <= 9 &&
        code.split("\n").every(line => line.length <= 29),
    )
  const example =
    path === "/learn/queries/"
      ? examples.find(
          ({ language, code }) =>
            language === "graphql" && code.trimStart().startsWith("{"),
        ) || examples[0]
      : examples[0]
  return { subtitle, headings: headings.slice(0, 4), example }
}

export async function getDocumentationContent(path: string) {
  if (!/^\/(learn|faq)(\/[a-z0-9-]+)*\/$/.test(path)) return null
  const stem = join(process.cwd(), "src/pages", path.slice(1, -1))
  let source: string | undefined
  let sourcePath = stem
  for (const file of [`${stem}.mdx`, join(stem, "index.mdx")]) {
    try {
      source = await readFile(file, "utf8")
      sourcePath = file
      break
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
    }
  }
  if (!source) return null
  const { example, ...content } = extractDocumentationExample(source, path)
  if (!example && !content.headings.length) {
    for (const [, slug] of [
      ...source.matchAll(/^import \w+ from ["']\.\/([a-z0-9-]+)\.mdx["']/gm),
    ].slice(0, 4)) {
      const child = await readFile(
        join(dirname(sourcePath), `${slug}.mdx`),
        "utf8",
      )
      const heading = child.match(/^# (.+)$/m)?.[1]
      if (heading) content.headings.push(heading)
    }
  }
  const highlighted = example
    ? (
        await getSingletonHighlighter({
          themes: [{ ...lightTheme, type: "light" }],
          langs: [example.language as BundledLanguage],
        })
      ).codeToTokens(example.code, {
        lang: example.language as BundledLanguage,
        theme: lightTheme.name,
      })
    : null
  return {
    ...content,
    example,
    highlighted,
  }
}

import path from "node:path"
import { glob } from "node:fs/promises"
import { readFile } from "node:fs/promises"
import { cache } from "react"
import matter from "gray-matter"

import { ResourceMetadata, type ResourceTag, topics } from "./types"

const dataGlob = "src/resources/data/*.json"
const codeGlob = "src/code/**/*.md"
const blogGlob = "src/pages/blog/**/*.mdx"

export const readResources = cache(async () => {
  const resources: ResourceMetadata[] = []

  for await (const file of glob(dataGlob)) {
    const raw = await readFile(file, "utf8")
    const parsed = JSON.parse(raw)
    parsed.origin = "/data"
    resources.push(ResourceMetadata.assert(parsed))
  }

  for await (const file of glob(blogGlob)) {
    const raw = await readFile(file, "utf8")
    const { data, content } = matter(raw)

    const title: string | undefined = data.title
    if (!title) continue

    const slug = blogSlug(file)

    const bodyLines = content
      .split(/\r?\n/)
      .map(line => line.trim())
      .map(line =>
        line
          .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/`+/g, "")
          .replace(/[*_~]+/g, "")
          .replace(/^#+\s*/, "")
          .replace(/<\/?[^>]+>/g, "")
          .trim(),
      )
      .filter(line => line.length > 0)

    const excerpt = bodyLines.slice(0, 2).join(" ")

    const description =
      typeof data.description === "string" && data.description.length > 0
        ? data.description
        : excerpt || undefined

    const topicsFromFrontmatter: ResourceTag[] = Array.isArray(data.topics)
      ? data.topics.filter((tag): tag is ResourceTag =>
          topics.includes(tag as (typeof topics)[number]),
        )
      : []

    const topicTagsFromTags: ResourceTag[] = Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is ResourceTag =>
          topics.includes(tag as (typeof topics)[number]),
        )
      : []

    const tags: ResourceTag[] = [
      "blog",
      ...topicsFromFrontmatter,
      ...topicTagsFromTags,
    ]

    resources.push(
      ResourceMetadata.assert({
        origin: "/blog",

        title,
        url: slug,
        author: data.byline,
        date: data.date,
        description,
        tags,
      }),
    )
  }

  for await (const file of glob(codeGlob)) {
    const raw = await readFile(file, "utf8")
    const { data } = matter(raw)
    const tags: ResourceMetadata["tags"] = Array.isArray(data.tags)
      ? data.tags
      : []

    if (!tags.includes("tools-and-libraries")) {
      tags.push("tools-and-libraries")
    }

    const url: string | undefined =
      data.url ??
      (data.github ? `https://github.com/${data.github}` : undefined) ??
      (data.npm ? `https://npmjs.com/package/${data.npm}` : undefined)

    const title = data.name ?? path.parse(file).name

    resources.push(
      ResourceMetadata.assert({
        origin: "$tools",

        title,
        url,
        tags,
        description: data.description,
      }),
    )
  }

  return resources
})

export async function getResourcesByTag(tag: ResourceTag) {
  const resources = await readResources()
  return resources.filter(resource => resource.tags.includes(tag))
}

function blogSlug(file: string) {
  const relative = path.relative("src/pages", file)
  const withoutExt = relative.replace(/\.mdx$/, "")
  const normalized = withoutExt.split(path.sep).join("/")
  const clean = normalized.endsWith("/index")
    ? normalized.slice(0, -"index".length - 1)
    : normalized
  return `/${clean}`
}

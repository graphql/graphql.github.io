import path from "node:path"
import { glob } from "node:fs/promises"
import { readFile } from "node:fs/promises"
import { cache } from "react"
import matter from "gray-matter"

import { ResourceMetadata, type ResourceTag } from "./types"

const dataGlob = "src/resources/data/*.json"
const codeGlob = "src/code/**/*.md"

export const readResources = cache(async () => {
  const resources: ResourceMetadata[] = []

  for await (const file of glob(dataGlob)) {
    const raw = await readFile(file, "utf8")
    const parsed = JSON.parse(raw)
    resources.push(ResourceMetadata.assert(parsed))
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
        title,
        url,
        description: data.description,
        tags,
      }),
    )
  }

  return resources
})

export async function getResourcesByTag(tag: ResourceTag) {
  const resources = await readResources()
  return resources.filter(resource => resource.tags.includes(tag))
}

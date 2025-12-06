import { glob } from "node:fs/promises"
import { readFile } from "node:fs/promises"
import { cache } from "react"

import { ResourceMetadata, type ResourceTag } from "./types"

const dataGlob = "src/resources/data/*.json"

export const readResources = cache(async () => {
  const resources: ResourceMetadata[] = []

  for await (const file of glob(dataGlob)) {
    const raw = await readFile(file, "utf8")
    const parsed = JSON.parse(raw)
    resources.push(ResourceMetadata.assert(parsed))
  }

  return resources
})

export async function getResourcesByTag(tag: ResourceTag) {
  const resources = await readResources()
  return resources.filter(resource => resource.tags.includes(tag))
}

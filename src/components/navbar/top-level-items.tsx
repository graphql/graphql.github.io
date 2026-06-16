import { normalizePages } from "nextra/normalize-pages"
import type { Folder, PageMapItem } from "nextra"
import meta from "../../pages/_meta"

/**
 * Convert _meta.tsx format to PageMapItem[] format that normalizePages expects
 */
export function normalizeMetaToItems(meta: Record<string, any>, parent = "/") {
  const pageMapItems: PageMapItem[] = Object.entries(meta).map(
    ([name, config]) => {
      const route = parent === "/" ? `/${name}` : `${parent}/${name}`

      if (typeof config === "string") {
        return {
          kind: "MdxPage",
          name,
          route,
          frontMatter: { title: config },
        }
      }

      const item: PageMapItem = {
        name,
        route: config.route || route,
      }

      if (config.title) {
        item.frontMatter = { title: config.title }
      }

      if (config.type === "menu" && config.items) {
        ;(item as Folder<PageMapItem>).children = normalizeMetaToItems(
          config.items,
          item.route,
        ).directories
      }

      return item
    },
  )

  const result = normalizePages({
    list: [{ data: meta }, ...pageMapItems],
    route: parent,
  })

  return result
}

export const { topLevelNavbarItems, docsDirectories, directories } =
  normalizeMetaToItems(meta)

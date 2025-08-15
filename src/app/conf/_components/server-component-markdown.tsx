import "server-only"

// @ts-expect-error - we already have it in transitive deps and I want to avoid having a duplicate
import { compile, run } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"
import { Root, Element } from "hast"
import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import Slugger from "github-slugger"

/**
 * Nextra's builtin MDX support requires jumping out to a Client component
 * (and creating new file) and we don't really need that for everything.
 *
 * Sometimes we want to grab some markdown without all the remark and rehype
 * plugins configured by Nextra.
 */
export async function ServerComponentMarkdown({
  markdown,
  extractToc = false,
  render = ({ mdx }) => mdx({}),
}: {
  markdown: string
  extractToc?: boolean
  render?: (props: {
    mdx: ({
      components,
    }: {
      components?: MdxComponents
    }) => React.AwaitedReactNode
    data: { toc: TableOfContents }
  }) => React.AwaitedReactNode
}) {
  try {
    const rehypePlugins = extractToc ? [rehypeExtractTableOfContents] : []

    const vfile = await compile(markdown, {
      outputFormat: "function-body",
      remarkPlugins: [],
      rehypePlugins,
      recmaPlugins: [],
    })

    const { default: mdx } = await run(vfile, {
      ...runtime,
      baseUrl: import.meta.url,
    })

    return render({ data: vfile.data, mdx })
  } catch (error) {
    console.error(error)
    if (process.env.NODE_ENV === "production") throw error
    return (
      <div>{error instanceof Error ? error.message : "Error loading MDX"}</div>
    )
  }
}

type TableOfContents = Array<{ value: string; id: string; depth: number }>
type MdxComponents = Record<string, React.ComponentType>

/**
 * Nextra has a built-in plugin like this, but it also steals the heading contents
 * as is tightly coupled with other Nextra features.
 */
function rehypeExtractTableOfContents() {
  const slugger = new Slugger()

  return function (tree: Root, file: any) {
    const toc: TableOfContents = []

    visit(tree, "element", (node: Element) => {
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const depth = parseInt(node.tagName.charAt(1), 10)
        const value = toString(node)
        const slug = slugger.slug(value)

        node.properties ||= node.properties || {}
        // add id to the heading element if it's not already set
        node.properties.id ||= slug

        toc.push({ value, id: slug, depth })
      }
    })

    file.data = file.data || {}
    file.data.toc = toc
  }
}

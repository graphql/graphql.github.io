import { createCatchAllMeta } from "nextra/catch-all"
import { getStaticPaths } from "./[slug].mdx"

export default () => {
  // @ts-expect-error -- fixme
  const { paths } = getStaticPaths() as unknown as {
    paths: { params: { slug: string } }[]
  }

  const options = {
    display: "hidden",
  }

  return createCatchAllMeta(
    paths.map(p => "/" + p.params.slug),
    Object.fromEntries(paths.map(p => [p.params.slug, options])),
  )
}

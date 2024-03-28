declare module "*.mdx" {
  import type { FC } from "react"
  import type { GetStaticPaths } from "next"
  import type { MDXComponents } from "nextra/mdx"
  const ReactComponent: FC<{ components?: MDXComponents }>
  export default ReactComponent
  export const getStaticPaths: GetStaticPaths
}

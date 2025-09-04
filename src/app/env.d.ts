declare module "*.mdx" {
  import type { FC } from "react"
  import type { GetStaticPaths } from "next"
  import type { MDXComponents } from "nextra/mdx"
  const ReactComponent: FC<{ components?: MDXComponents }>
  export default ReactComponent
  export const getStaticPaths: GetStaticPaths
}

declare module "*.svg?svgr" {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}

declare module "*?raw" {
  const content: string
  export default content
}

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

// We're importing a transitive dependency to avoid a bug.
declare module "next-themes" {
  export function ThemeProvider(props: {
    attribute: "class" | "data-theme" | "style"
    children: React.ReactNode
  }): JSX.Element

  export function useTheme(): {
    theme: string | undefined
    setTheme: (theme: string) => void
    resolvedTheme: string
  }
}

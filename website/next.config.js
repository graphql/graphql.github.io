import nextra from "nextra"
import path from "node:path"
import withLess from "next-with-less"
import { remarkGraphiQLComment } from "./src/remark-graphiql-comment.js"

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    remarkPlugins: [remarkGraphiQLComment],
  },
})

const sep = path.sep === "/" ? "/" : "\\\\"

const ALLOWED_SVG_REGEX = new RegExp(`${sep}icons${sep}.+\\.svg$`)

/**
 * @type {import('next').NextConfig}
 */
export default withLess(
  withNextra({
    // reactStrictMode: true, provoke duplicated codemirror editors
    webpack(config) {
      const fileLoaderRule = config.module.rules.find(rule =>
        rule.test?.test?.(".svg"),
      )

      fileLoaderRule.exclude = ALLOWED_SVG_REGEX

      config.module.rules.push({
        test: ALLOWED_SVG_REGEX,
        use: ["@svgr/webpack"],
      })
      return config
    },
    output: "export",
    images: {
      unoptimized: true,
    },
    distDir: process.env.NODE_ENV === "production" ? "../public" : undefined,
    trailingSlash: true,
  }),
)

/* eslint-env node */
// @ts-check

import nextra from "nextra"
import path from "node:path"
import withLess from "next-with-less"
import nextBundleAnalyzer from "@next/bundle-analyzer"
import fs from "fs"
import rehypeMermaid from "rehype-mermaid"

import { remarkGraphiQLComment } from "./src/remark-graphiql-comment.js"
import { syntaxHighlightingThemes } from "./src/_design-system/syntax/index.js"

const vercelJSON = JSON.parse(fs.readFileSync("./vercel.json", "utf-8"))

const withNextra = nextra({
  autoImportThemeStyle: false,
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    remarkPlugins: [remarkGraphiQLComment],
    rehypePlugins: [mermaidConfig()],
    rehypePrettyCodeOptions: {
      theme: syntaxHighlightingThemes,
    },
  },
})

const sep = path.sep === "/" ? "/" : "\\\\"

const ALLOWED_SVG_REGEX = new RegExp(`${sep}icons${sep}.+\\.svg$`)

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // reactStrictMode: true, provoke duplicated codemirror editors
  webpack(config) {
    // #region MDX
    const mdxRule = config.module.rules.find(rule => rule.test?.test?.(".mdx"))
    if (mdxRule) {
      mdxRule.resourceQuery = {
        not: /raw/,
      }
    }
    // Instead of transforming MDX, with ?source we can get
    // the raw content to process in a Server Component.
    config.module.rules.push({
      test: /\.mdx$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    })
    // #endregion MDX

    // #region SVGs
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.(".svg"),
    )

    fileLoaderRule.exclude = /\.svg$/i

    config.module.rules.push(
      // All .svg from /icons/ and with ?svgr are going to be processed by @svgr/webpack
      {
        test: ALLOWED_SVG_REGEX,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.svg$/i,
        exclude: ALLOWED_SVG_REGEX,
        resourceQuery: /svgr/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        minifyStyles: false,
                        removeViewBox: false,
                        removeTitle: false,
                      },
                    },
                  },
                  "removeXMLNS",
                  "removeXlink",
                  "prefixIds",
                ],
              },
            },
          },
        ],
      },
      // Otherwise, we use the default file loader
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        exclude: ALLOWED_SVG_REGEX,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /svgr/],
        },
      },
    )
    // #endregion SVGs

    return config
  },
  // Comment this out if you're working on OG images.
  output: "export",
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
    // If you want to cache the remote images, you can set the time to live of the cache in seconds.
    // The default value is 0 seconds.
    nextImageExportOptimizer_remoteImageCacheTTL: "0",
    NEXT_PUBLIC_GA_ID:
      process.env.NODE_ENV === "production" ? "UA-44373548-16" : "",
  },
  headers: async () => {
    return [
      {
        source: "/graphql",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ]
  },
  trailingSlash: true,
  // Only for local development, skip 200 statusCode due following error:
  //
  // `statusCode` is not undefined or valid statusCode for route {"source":"/conf/attendee/:path*","destination":"https://graphql-conf-attendee-nextjs.vercel.app/:path*","statusCode":200}
  // `statusCode` is not undefined or valid statusCode for route {"source":"/swapi-graphql/:path*","destination":"https://graphql.github.io/swapi-graphql/:path*","statusCode":200}
  // Valid redirect statusCode values are 301, 302, 303, 307, 308
  redirects: () => vercelJSON.redirects.filter(o => o.statusCode !== 200),
  async rewrites() {
    return [
      {
        source: "/swapi-graphql/:path*",
        destination: "https://swapi-graphql.netlify.app/:path*",
      },
      {
        source: "/graphql",
        destination: "https://swapi-graphql.netlify.app/graphql",
      },
    ]
  },
}

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

export default withBundleAnalyzer(withLess(withNextra(config)))

function mermaidConfig() {
  return [
    rehypeMermaid,
    /** @type {import("rehype-mermaid").RehypeMermaidOptions} */ ({
      mermaidConfig: {
        fontFamily: "var(--font-sans)", // we can't use monospace here because it's way too wide
        theme: "null",
        look: "classic",
        flowchart: {
          defaultRenderer: "elk",
          padding: 6,
        },
        themeCSS: `
          .node rect {
            fill: var(--mermaid-node-fill);
            stroke: var(--mermaid-node-stroke);
          }
          .label text, span {
            fill: hsl(var(--color-neu-900));
            color: hsl(var(--color-neu-900));
          }
          .flowchart-link {
            stroke: var(--mermaid-arrow);
          }
          .marker {
            stroke: var(--mermaid-arrow);
            fill: var(--mermaid-arrow);
          }
        `,
      },
    }),
  ]
}

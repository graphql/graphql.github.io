/* eslint-env node */

import nextra from "nextra"
import path from "node:path"
import withLess from "next-with-less"
import { remarkGraphiQLComment } from "./src/remark-graphiql-comment.js"
import fs from "fs"

const vercelJSON = JSON.parse(fs.readFileSync("./vercel.json", "utf-8"))

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
  }),
)

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
    rewrites() {
      return [
        {
          source: "/conf",
          destination: "/conf/2024",
        },
      ]
    },
    redirects: () =>
      Object.entries({
        "/blog/graphql-a-query-language": "/blog/2015-09-14-graphql",
        "/blog/subscriptions-in-graphql-and-relay":
          "/blog/2015-10-16-subscriptions",
        "/blog/mocking-with-graphql": "/blog/2016-04-19-mocking",
        "/blog/rest-api-graphql-wrapper":
          "/blog/2016-05-02-rest-api-graphql-wrapper",
        "/blog/production-ready": "/blog/2016-09-14-production-ready",
        "/blog/2017-11-08-programmableweb-graphql-moving-to-neutral-open-source-foundation":
          "/blog/2017-11-08-programmable-web",
        "/blog/2018-11-06-eweek-graphql-api-specification-moving-forward-with-independent-foundation":
          "/blog/2018-11-06-eweek",
        "/blog/2018-11-06-infoworld-graphql-gets-its-own-foundation":
          "/blog/2018-11-06-infoworld",
        "/blog/2018-11-06-linux-foundation-announces-intent-to-form-new-foundation-to-support-graphql":
          "/blog/2018-11-06-linux-foundation-graphql",
        "/blog/2018-11-07-datanami-will-graphql-become-a-standard-for-the-new-data-economy":
          "/blog/2018-11-07-datanami",
        "/blog/2018-11-07-sd-times-lf-announces-plans-to-form-graphql-foundation":
          "/blog/2018-11-07-sd-times",
        "/blog/2018-11-12-channel-futures-graphql-api-query-language-growing":
          "/blog/2018-11-12-channel-futures",
        "/blog/2019-03-12-graphql-foundation-announces-collaboration-with-jdf":
          "/blog/2019-03-12-joint-development-foundation",
        "/blog/2019-10-28-graphql-foundation-launches-interactive-landscape-welcomes-new-members":
          "/blog/2019-10-28-interactive-landscape",
        "/blog/2019-10-31-linux-foundation-training-announces-free-online-course-exploring-graphql":
          "/blog/2019-10-31-linux-foundation-training",
        "/blog/2020-04-02-announcing-the-first-graphql-foundation-annual-report":
          "/blog/2020-04-02-graphql-annual-report-2019",
        "/blog/2020-04-03-web-based-graphql-ides-for-the-win":
          "/blog/2020-04-03-graphiql-graphql-playground",
        "/blog/2020-06-13-graphql-joins-google-season-of-docs":
          "/blog/2020-06-13-season-of-docs",
        "/blog/2020-06-30-gsoc-2020-participant-naman":
          "/blog/2020-06-30-gsoc-2020-naman",
        "/blog/2020-09-11-graphql-foundation-monthly-newsletter-august-2020":
          "/blog/2020-09-11-newsletter-august-2020",
        "/blog/2020-09-21-gsod-carolyn-stransky":
          "/blog/2020-09-21-gsod-2020-carolyn",
        "/blog/2020-10-15-graphql-foundation-monthly-newsletter-september-2020":
          "/blog/2020-10-15-newsletter-september-2020",
        "/blog/2020-11-12-graphql-foundation-monthly-newsletter-october-2020":
          "/blog/2020-11-12-newsletter-october-2020",
        "/blog/2020-12-08-improving-latency-with-defer-and-stream-directives":
          "/blog/2020-12-08-defer-stream",
        "/blog/2021-02-15-graphql-foundation-monthly-newsletter-february-2021":
          "/blog/2021-02-15-newsletter-february-2021",
        "/blog/2021-03-31-graphql-foundation-monthly-newsletter-march-2021":
          "/blog/2021-03-31-newsletter-march-2021",
        "/blog/2021-04-30-graphql-foundation-monthly-newsletter-april-2021":
          "/blog/2021-04-30-newsletter-april-2021",
        "/blog/2021-06-30-graphql-foundation-monthly-newsletter-june-2021":
          "/blog/2021-06-30-newsletter-june-2021",
        "/blog/2022-11-07-graphql-foundation-graphql-http":
          "/blog/2022-11-07-graphql-http",
        "/community/(project-resources|developers|users)":
          "/community/contribute/essential-links",
        "/community": "/community/resources/official-channels",
        "/community/upcoming-events": "/community/events",
        "/community/contribute": "/community/contribute/essential-links",
      }).map(([from, to]) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
  }),
)

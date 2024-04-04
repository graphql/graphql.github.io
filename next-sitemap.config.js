/* eslint-env node */

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://graphql.org",
  generateIndexSitemap: false,
  output: "export", // Set static output here
}

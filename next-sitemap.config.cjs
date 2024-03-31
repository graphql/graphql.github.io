/* eslint-env node */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://graphql.org",
  generateIndexSitemap: false,
}

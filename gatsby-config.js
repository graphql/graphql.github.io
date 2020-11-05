module.exports = {
  siteMetadata: {
    title: "A query language for your API",
    description:
      "GraphQL provides a complete description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.",
    siteUrl: "http://graphql.org/",
  },

  plugins: [
    "gatsby-plugin-react-helmet",
    'gatsby-plugin-anchor-links',
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Rubik`,
              variants: [`300`],
            },
            {
              family: `Roboto Mono`,
              variants: [`400`, `400i`, `600`],
            },
            {
              family: `Roboto`,
              variants: [`300`],
            },
          ],
        },
      },
    },
    `gatsby-plugin-less`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-44373548-16",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(
                ({
                  node: {
                    excerpt,
                    frontmatter: { title, date, permalink, byline },
                  },
                }) => ({
                  title,
                  date,
                  url: site.siteMetadata.siteUrl + permalink,
                  description: excerpt,
                  author: byline,
                })
              ),
            query: `
              {
                allMarkdownRemark(
                  filter: {frontmatter: {layout: {eq: "blog"}}},
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      frontmatter {
                        title
                        date
                        permalink
                        byline
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog/rss.xml",
            title: "Blog | GraphQL",
            feed_url: "http://graphql.org/blog/rss.xml",
            site_url: "http://graphql.org",
          },
        ],
      },
    },
  ],
}

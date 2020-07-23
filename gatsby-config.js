module.exports = {
  siteMetadata: {
    title: 'GraphQL',
    description: 'Gatsby Site for GraphQL.org',
    siteUrl: 'http://graphql.org',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/img`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'graphql-docs',
        short_name: 'graphql',
        start_url: '/',
        icon: 'src/img/favicon.png',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'prism language-',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
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
            serialize: ( {
              query: { site, allMarkdownRemark },
            } ) => allMarkdownRemark.edges.map( ( {
              node: {
                excerpt,
                frontmatter: { title, date, permalink, byline },
              },
            } ) => ( {
              title,
              date,
              url: site.siteMetadata.siteUrl + permalink,
              description: excerpt,
              author: byline,
            } ) ),
            query: `
              {
                allMarkdownRemark(
                  filter: {frontmatter: {layout: {eq: "BlogPostLayout"}}},
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
            output: '/blog/rss.xml',
            title: 'Blog | GraphQL',
            feed_url: 'http://graphql.org/blog/rss.xml',
            site_url: 'http://graphql.org',
          },
        ],
      },
    },
  ],
}

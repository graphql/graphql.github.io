module.exports = {
  siteMetadata: {
    title: 'GraphQL',
    description: 'Gatsby Site for GraphQL.org',
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
    },
  ],
}

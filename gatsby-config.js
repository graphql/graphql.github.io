module.exports = {
  siteMetadata: {
    title: 'GraphQL',
    description: 'Gatsby Site for GraphQL.org',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
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
        icon: 'src/images/favicon.png',
      },
    },
  ],
}

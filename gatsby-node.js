const path = require( 'path' )

exports.createPages = async ( { actions, graphql, reporter } ) => {
  const { createPage } = actions

  const result = await graphql( `
  query AllContentPages {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            layout
            permalink
          }
        }
      }
    }
  }
  ` )

  if ( result.errors ) reporter.panicOnBuild( '🚨  ERROR: Loading "createPages" query' )

  const pages = result.data.allMarkdownRemark.edges

  // Call `createPage` for each page
  pages
    .forEach( ( { node: {
      id,
      frontmatter: { layout, permalink },
    } } ) => {
      createPage( {
        path: permalink,
        component: path.resolve( `src/templates/${layout}.js` ),
        context: { id },
      } )
    } )
}

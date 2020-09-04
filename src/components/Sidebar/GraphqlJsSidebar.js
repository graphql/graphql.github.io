import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './Sidebar'

const GraphqlJsSidebar = () => {
  const { allMarkdownRemark: { edges: data } } = useStaticQuery( graphql`
    query GraphQlJsSidebar {
        allMarkdownRemark(
            filter: {frontmatter: {permalink: {regex: "/graphql-js/"}}}
            sort: {fields: frontmatter___sidebarOrder}
            ) {
            edges {
                node {
                    id
                    frontmatter {
                        category
                        sidebarTitle
                        sublinks
                        permalink
                        title
                    }
                }
            }
        }
    }
` )

  return <Sidebar data={data} />
}

export default GraphqlJsSidebar

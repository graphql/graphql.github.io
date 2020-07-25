import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './Sidebar'

const CommunitySidebar = () => {
  const { allMarkdownRemark: { edges: data } } = useStaticQuery( graphql`
    query CommunityPagesSidebar {
        allMarkdownRemark(
            filter: {frontmatter: {permalink: {regex: "/community/"}}},
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

export default CommunitySidebar

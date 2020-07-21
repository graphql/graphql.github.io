import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './Sidebar'

const LearnSidebar = () => {
  const { allMarkdownRemark: { edges: data } } = useStaticQuery( graphql`
    query DocsSidebar {
        allMarkdownRemark(filter: {frontmatter: {permalink: {regex: "/learn/"}}}) {
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

export default LearnSidebar

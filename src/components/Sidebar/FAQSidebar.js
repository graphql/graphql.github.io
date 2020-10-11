import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Sidebar from './Sidebar'

const FAQSidebar = () => {
  const { allMarkdownRemark: { edges: data } } = useStaticQuery( graphql`
    query FAQPageSidebar {
        allMarkdownRemark(
            filter: {frontmatter: {permalink: {regex: "/faq/"}}},
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

export default FAQSidebar

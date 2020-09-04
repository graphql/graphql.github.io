import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const BlogPostSidebar = () => {
  const { allMarkdownRemark: { edges: data } } = useStaticQuery( graphql`
    query BlogPostSidebar {
        allMarkdownRemark(
            filter: {frontmatter: {layout: {eq: "BlogPostLayout"}}},
            sort: {fields: frontmatter___date, order: DESC}
            ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        permalink
                    }
                }
            }
        }
    }
  ` )

  return (
    <div className="nav-docs">

      <div className="nav-docs-section">
        <h3>Subscribe</h3>
        <Link to="/blog/rss.xml">RSS</Link>
      </div>

      <div className="nav-docs-section">
        <h3>Recent Posts</h3>
        <ul>
          {data.map( ( { node: { id, frontmatter: { title, permalink } } } ) => (
            <li key={id}>
              <Link to={permalink}>{title}</Link>
            </li>
          ) )}
        </ul>
      </div>

    </div>
  )
}

export default BlogPostSidebar

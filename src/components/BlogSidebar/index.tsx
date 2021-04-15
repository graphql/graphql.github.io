import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

interface Props {
  posts: any[]
  currentPermalink?: string
}

const BlogSidebar = ({ posts, currentPermalink }: Props) => {
  const allTags = useStaticQuery(graphql`
    query allTags {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `).allMarkdownRemark.group

  return (
    <div className="nav-docs blog-sidebar">
      <div className="nav-docs-section subscribe">
        <h3>Subscribe</h3>
        <a rel="home" type="application/rss+xml" href="/blog/rss.xml">
          RSS
        </a>
      </div>
      <div className="nav-docs-section categories">
        <h3>Categories</h3>
        <ul>
          {allTags.map(({ fieldValue }: { fieldValue: string }, i: number) => {
            const tag = fieldValue[0].toUpperCase() + fieldValue.substring(1)
            return (
              <li key={i}>
                {fieldValue === currentPermalink ? (
                  tag
                ) : (
                  <Link to={`/tags/${fieldValue}`}>{tag}</Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="nav-docs-section recent-posts">
        <h3>Recent Posts</h3>
        <ul>
          {posts.map(({ frontmatter }, i) => (
            <li key={i}>
              {frontmatter.permalink === currentPermalink ? (
                frontmatter.title
              ) : (
                <Link to={frontmatter.permalink}>{frontmatter.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogSidebar

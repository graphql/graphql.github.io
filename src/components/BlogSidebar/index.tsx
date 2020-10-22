import React from 'react';
import { Link } from "gatsby"

interface Props {
  posts: any[]
  currentPermalink?: string
}

const BlogSidebar = ({ posts, currentPermalink }: Props) => (
  <div className="nav-docs">
    <div className="nav-docs-section">
      <h3>Subscribe</h3>
      <a rel="home" type="application/rss+xml" href="/blog/rss.xml">
        RSS
      </a>
    </div>
    <div className="nav-docs-section">
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

export default BlogSidebar;
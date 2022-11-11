import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

const BlogSidebar: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.AllTagsStaticQuery>(graphql`
    query AllTagsStatic {
      allBlogPost {
        group(field: tags) {
          fieldValue
        }
      }
      allRecentBlogPost: allBlogPost(
        limit: 30,
        sort: { fields: [date], order: DESC }
      ) {
        nodes {
          title
          postId
          postPath: gatsbyPath(filePath: "/blog/{BlogPost.postId}")
        }
      }
    }
  `)

  const tags = data.allBlogPost.group.map(group => group.fieldValue!)
  const recentPosts = data.allRecentBlogPost.nodes

  const { pathname: currentPath } = useLocation();

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
          {tags.map(tag => {
            const formattedTag = tag[0].toUpperCase() + tag.substring(1)
            const pathname = `/tags/${tag}/`;
            return (
              <li key={tag}>
                {pathname === currentPath ? (
                  formattedTag
                ) : (
                  <Link to={pathname}>{formattedTag}</Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="nav-docs-section recent-posts">
        <h3>Recent Posts</h3>
        <ul>
          {recentPosts.map(post => (
            <li key={post.postId}>
              {post.postPath === currentPath ? (
                post.title
              ) : (
                <Link to={post.postPath!}>{post.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogSidebar

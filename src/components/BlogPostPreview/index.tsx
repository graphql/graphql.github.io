import * as React from "react"
import { graphql, Link } from "gatsby"

export const fragments = graphql`
  fragment BlogPostPreview_post on BlogPost {
    title
    date
    authors
    tags
    postPath: gatsbyPath(filePath: "/blog/{BlogPost.postId}")
    remark {
      excerpt
    }
  }
`;

interface Props {
  post: GatsbyTypes.BlogPostPreview_postFragment,
}

const BlogPostPreview: React.FC<Props> = ({
  post,
}) => (
  <div className="inner-content">
    <h1>
      <Link to={post.postPath!}>{post.title}</Link>
    </h1>

    <p>
      {new Date(post.date).toLocaleDateString()} by {post.authors.join(', ')}
    </p>

    <div className="tag-wrapper">
      {post.tags.map(tag => (
        <span key={tag} className="tag">
          <Link to={`/tags/${tag}/`}>{tag}</Link>
        </span>
      ))}
    </div>

    <p>{post.remark.excerpt}</p>
  </div>
)

export default BlogPostPreview

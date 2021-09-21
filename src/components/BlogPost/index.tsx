import * as React from "react"
import { graphql, Link } from "gatsby"
import Marked from "../Marked"

export const fragments = graphql`
  fragment BlogPost_post on BlogPost {
    title
    excerpt
    rawContent
    date
    authors
    tags
  }
`;

interface Props {
  post: GatsbyTypes.BlogPost_postFragment,
  showExcerpt: boolean,
}

const BlogPost: React.FC<Props> = ({
  post,
  showExcerpt,
}) => (
  <div className="inner-content">
    <h1>{post.title}</h1>
    <p>
      {new Date(post.date).toLocaleDateString()} by {post.authors.join(', ')}
    </p>
    <div className="tag-wrapper">
      {post.tags.map(tag => (
        <span key={tag} className="tag">
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </span>
      ))}
    </div>

    {showExcerpt ? (
      <p>{post.excerpt}</p>
    ) : (
      <Marked>{post.rawContent}</Marked>
    )}
  </div>
)

export default BlogPost

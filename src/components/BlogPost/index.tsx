import * as React from "react"
import { graphql, Link } from "gatsby"
import Marked from "../Marked"

export const fragments = graphql`
  fragment BlogPost_post on BlogPost {
    title
    rawContent
    date
    authors
    tags
    guestBio
  }
`;

interface Props {
  post: GatsbyTypes.BlogPost_postFragment,
}

const BlogPost: React.FC<Props> = ({
  post,
}) => {
  const byline = post.authors.join(', ')
  return (
    <div className="inner-content">
      <h1>{post.title}</h1>

      <p>
        {new Date(post.date).toLocaleDateString()} by {byline}
      </p>

      <div className="tag-wrapper">
        {post.tags.map(tag => (
          <span key={tag} className="tag">
            <Link to={`/tags/${tag}/`}>{tag}</Link>
          </span>
        ))}
      </div>

      {post.guestBio && (
        <p className="guestBio">{`This guest article contributed by ${byline}, ${post.guestBio}.`}</p>
      )}

      <Marked>{post.rawContent}</Marked>
    </div>
  )
}

export default BlogPost

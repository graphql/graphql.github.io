import React from "react"
import Marked from "../Marked"
import { Link } from "gatsby"

interface Props {
  title: string
  date: string
  permalink: string
  byline: string
  guestBio: string
  rawMarkdownBody: string
  isPermalink: boolean
  pageContext: any
  excerpt?: string
  showExcerpt?: true
  tags: Array<string>
}

const BlogPost = ({
  title,
  date,
  permalink,
  byline,
  guestBio,
  rawMarkdownBody,
  isPermalink,
  pageContext,
  excerpt,
  showExcerpt,
  tags,
}: Props) => (
  <div className="inner-content">
    <h1>{isPermalink ? title : <a href={permalink}>{title}</a>}</h1>
    <p>
      {new Date(date).toLocaleDateString()} by {byline}
    </p>
    <div className="tag-wrapper">
      {tags.map(tag => (
        <span className="tag">
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </span>
      ))}
    </div>

    {guestBio ? null : <hr />}
    {guestBio && (
      <p className="guestBio">{`This guest article contributed by ${byline}, ${guestBio}.`}</p>
    )}

    {showExcerpt ? (
      <p>{excerpt}</p>
    ) : (
      <Marked pageContext={pageContext}>{rawMarkdownBody}</Marked>
    )}
  </div>
)

export default BlogPost

import React from "react"
import Marked from "../Marked"

interface Props {
  title: string
  date: string
  permalink: string
  byline: string
  guestBio: string
  rawMarkdownBody: string
  isPermalink: boolean
}

const BlogPost = ({
  title,
  date,
  permalink,
  byline,
  guestBio,
  rawMarkdownBody,
  isPermalink,
}: Props) => (
  <div className="inner-content">
    <h1>{isPermalink ? title : <a href={permalink}>{title}</a>}</h1>
    <p>
      {new Date(date).toLocaleDateString()} by {byline}
    </p>
    {guestBio ? null : <hr />}
    {guestBio && (
      <p className="guestBio">{`This guest article contributed by ${byline}, ${guestBio}.`}</p>
    )}
    <Marked>{rawMarkdownBody}</Marked>
  </div>
)

export default BlogPost

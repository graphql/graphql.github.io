import * as React from "react"
import { graphql } from "gatsby"
import BlogSidebar from "../BlogSidebar"
import BlogPost from "../BlogPost"

export const fragments = graphql`
  fragment BlogLayout_post on BlogPost {
    ...BlogPost_post
  }
`

interface Props {
  post: Queries.BlogLayout_postFragment
}

const BlogLayout: React.FC<Props> = ({ post }) => {
  return (
    <section>
      <div className="documentationContent">
        <BlogPost post={post} />
        <BlogSidebar />
      </div>
    </section>
  )
}

export default BlogLayout

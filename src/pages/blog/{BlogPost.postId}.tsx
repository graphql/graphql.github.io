import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import BlogLayout from "../../components/BlogLayout"

export const query = graphql`
  query BlogPostPage($id: String!) {
    blogPost(id: { eq: $id }) {
      title
      ...BlogLayout_post
    }
  }
`

type Props = PageProps<GatsbyTypes.BlogPostPageQuery, GatsbyTypes.SitePageContext>

const BlogPostPage: React.FC<Props> = ({
  data
}) => {
  // Always exist since it is collected by Gatsby filesystem route API
  const post = data.blogPost!

  return (
    <Layout title={`${post.title} | GraphQL`} pageContext={{}}>
      <BlogLayout post={post} />
    </Layout>
  )
}

export default BlogPostPage

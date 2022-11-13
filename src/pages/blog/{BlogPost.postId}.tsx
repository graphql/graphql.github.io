import * as React from "react"
import type { PageProps, HeadProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import BlogLayout from "../../components/BlogLayout"
import Seo from "../../components/Seo"

export const query = graphql`
  query BlogPostPage($id: String!) {
    blogPost(id: { eq: $id }) {
      title
      ...BlogLayout_post
    }
  }
`

type Props = PageProps<Queries.BlogPostPageQuery>

const BlogPostPage: React.FC<Props> = ({ data }) => {
  // Always exist since it is collected by Gatsby filesystem route API
  const post = data.blogPost!

  return (
    <Layout>
      <BlogLayout post={post} />
    </Layout>
  )
}

export function Head({ data }: HeadProps<Queries.BlogPostPageQuery>) {
  return <Seo title={`${data.blogPost!.title} | GraphQL`} />
}

export default BlogPostPage

import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import Layout from "../components/Layout"
import BlogPostPreview from "../components/BlogPostPreview"
import BlogSidebar from "../components/BlogSidebar"
import Seo from "../components/Seo"

export const query = graphql`
  query BlogPostListPage {
    allBlogPost(sort: { date: DESC }) {
      nodes {
        id
        ...BlogPostPreview_post
      }
    }
  }
`

type Props = PageProps<Queries.BlogPostListPageQuery>

const BlogPostListPage: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      <section>
        <div className="documentationContent">
          <div>
            {data.allBlogPost.nodes.map(post => (
              <BlogPostPreview key={post.id} post={post} />
            ))}
          </div>
          <BlogSidebar />
        </div>
      </section>
    </Layout>
  )
}

export function Head() {
  return <Seo title="Blog | GraphQL" />
}

export default BlogPostListPage

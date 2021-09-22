import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import Layout from "../components/Layout"
import BlogPostPreview from "../components/BlogPostPreview"
import BlogSidebar from "../components/BlogSidebar"

export const query = graphql`
  query BlogPostListPage {
    allBlogPost(
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        id
        ...BlogPostPreview_post
      }
    }
  }
`

type Props = PageProps<GatsbyTypes.BlogPostListPageQuery, GatsbyTypes.SitePageContext>

const BlogPostListPage: React.FC<Props> = ({ data }) => {
  return (
    <Layout title="Blog | GraphQL" pageContext={{}}>
      <section>
        <div className="documentationContent">
          <div>
            {data.allBlogPost.nodes.map(post => (
              <BlogPostPreview
                key={post.id}
                post={post}
              />
            ))}
          </div>
          <BlogSidebar />
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostListPage

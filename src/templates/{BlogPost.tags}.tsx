import * as React from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogPostPreview from "../components/BlogPostPreview"
import BlogSidebar from "../components/BlogSidebar"
import Seo from "../components/Seo"

export const query = graphql`
  query TagPage($tag: String!) {
    allBlogPost(filter: { tags: { in: [$tag] } }) {
      nodes {
        id
        ...BlogPostPreview_post
      }
    }
  }
`

type Props = PageProps<Queries.TagPageQuery>

const TagPage: React.FC<Props> = ({ data }) => {
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

export function Head({ pageContext }: { pageContext: { tag: string } }) {
  return <Seo title={`Blog: ${pageContext.tag} | GraphQL`} />
}

export default TagPage

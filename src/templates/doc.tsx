import React from "react"
import type { HeadProps, PageProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import DocsLayout from "../components/DocsLayout"
import FoundationLayout from "../components/FoundationLayout"
import BlogLayout from "../components/BlogLayout"
import CodeLayout from "../components/CodeLayout"
import FAQLayout from "../components/FAQLayout"
import ConfLayout from "../components/ConfLayout"
import Seo from "../components/Seo"

interface PageContext extends Queries.DocTemplateQueryVariables {
  sideBarData: Array<{
    name: string
    links: Array<Queries.MarkdownRemark>
  }>
  sourcePath: string
}

const layoutMap: Record<string, React.ComponentType<any>> = {
  docs: DocsLayout,
  foundation: FoundationLayout,
  blog: BlogLayout,
  code: CodeLayout,
  faq: FAQLayout,
  conf: ConfLayout,
}

const Blog = ({
  data,
  pageContext,
}: PageProps<Queries.DocTemplateQuery, PageContext>) => {
  const { doc, nextDoc } = data
  const { frontmatter, rawMarkdownBody } = doc || {}
  const { title, date, heroText, permalink, byline, guestBio, layout, tags } =
    frontmatter || {}

  const InnerLayout = layoutMap[layout!]
  return (
    <Layout pageContext={pageContext}>
      <InnerLayout
        title={title}
        date={date}
        heroText={heroText}
        permalink={permalink}
        byline={byline}
        guestBio={guestBio}
        rawMarkdownBody={rawMarkdownBody}
        nextDoc={nextDoc}
        sideBarData={pageContext.sideBarData}
        pageContext={pageContext}
        tags={tags}
      />
    </Layout>
  )
}

export function Head({ data }: HeadProps<Queries.DocTemplateQuery>) {
  const { frontmatter } = data.doc || {}
  const { title } = frontmatter || {}

  return <Seo title={`${title} | GraphQL`} />
}

export const query = graphql`
  query DocTemplate($permalink: String!, $nextPermalink: String) {
    doc: markdownRemark(frontmatter: { permalink: { eq: $permalink } }) {
      frontmatter {
        title
        heroText
        date
        permalink
        byline
        guestBio
        sublinks
        layout
        tags
      }
      id
      rawMarkdownBody
    }
    nextDoc: markdownRemark(
      frontmatter: { permalink: { eq: $nextPermalink } }
    ) {
      frontmatter {
        title
        permalink
      }
    }
  }
`

export default Blog

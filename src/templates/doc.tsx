import React from "react"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import DocsLayout from "../components/DocsLayout"
import FoundationLayout from "../components/FoundationLayout"
import BlogLayout from "../components/BlogLayout"
import CodeLayout from "../components/CodeLayout"
import FAQLayout from "../components/FAQLayout"
import ConfLayout from "../components/ConfLayout"

const layoutMap: Record<string, React.ComponentType<any>> = {
  docs: DocsLayout,
  foundation: FoundationLayout,
  blog: BlogLayout,
  code: CodeLayout,
  faq: FAQLayout,
  conf: ConfLayout,
}

const Blog = ({ data, pageContext }: PageProps<GatsbyTypes.DocTemplateQuery, GatsbyTypes.SitePageContext>) => {
  const { doc, nextDoc } = data
  const { frontmatter, rawMarkdownBody } = doc || {}
  const {
    title,
    date,
    heroText,
    permalink,
    byline,
    guestBio,
    layout,
    tags,
  } = frontmatter || {}

  const InnerLayout = layoutMap[layout!]
  return (
    <Layout title={`${title} | GraphQL`} pageContext={pageContext}>
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

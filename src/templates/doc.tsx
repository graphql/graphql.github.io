import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import DocsLayout from "../components/DocsLayout"
import BlogLayout from '../components/BlogLayout';
import CodeLayout from "../components/CodeLayout";
import FAQLayout from "../components/FAQLayout";

interface Props {
  data: any
  pageContext: any
}

const layoutMap: any = {
  docs: DocsLayout,
  blog: BlogLayout,
  code: CodeLayout,
  faq: FAQLayout,
}

const Blog = ({ data, pageContext }: Props) => {
  const {
    doc: {
      frontmatter: { title, date, permalink, byline, guestBio, layout },
      rawMarkdownBody,
    },
    nextDoc,
  } = data
  const InnerLayout = layoutMap[layout];
  return (
    <Layout title={`${title} | GraphQL`} pageContext={pageContext}>
      <InnerLayout
        title={title}
        date={date}
        permalink={permalink}
        byline={byline}
        guestBio={guestBio}
        rawMarkdownBody={rawMarkdownBody}
        nextDoc={nextDoc}
        sideBarData={pageContext.sideBarData}
        pageContext={pageContext}
      />
    </Layout>
  )
}

export const query = graphql`
  query LearnQuery($permalink: String!, $nextPermalink: String) {
    doc: markdownRemark(frontmatter: { permalink: { eq: $permalink } }) {
      frontmatter {
        title
        date
        permalink
        byline
        guestBio
        sublinks
        layout
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

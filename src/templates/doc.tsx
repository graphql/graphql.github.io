import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import DocsLayout from "../components/DocsLayout"

interface Props {
  data: any
  pageContext: any
}

const Blog = ({ data, pageContext }: Props) => {
  const {
    doc: {
      frontmatter: { title, permalink },
      rawMarkdownBody,
    },
    nextDoc,
  } = data
  return (
    <Layout pageContext={pageContext}>
      <DocsLayout
        title={title}
        permalink={permalink}
        nextDoc={nextDoc}
        sideBarData={pageContext.sideBarData}
        rawMarkdownBody={rawMarkdownBody}
      />
    </Layout>
  )
}

export const query = graphql`
  query LearnQuery($permalink: String!, $nextPermalink: String) {
    doc: markdownRemark(frontmatter: { permalink: { eq: $permalink } }) {
      frontmatter {
        title
        permalink
        sublinks
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

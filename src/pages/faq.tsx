import React from "react"
import Layout from "../components/Layout"
import FAQSection from "../components/FAQSection"
import type { PageProps } from "gatsby"
import { graphql } from "gatsby"
import { useFAQAccordion } from "../utils/useFAQAccordion"
import Seo from "../components/Seo"

export default ({
  pageContext,
  data,
}: PageProps<Queries.GetAllFAQSectionsQuery, { sourcePath: string }>) => {
  useFAQAccordion()

  const sections = data.allMarkdownRemark.edges
    .map(e => e.node)
    .sort((a, b) => {
      const aPosition = a?.frontmatter?.position ?? 0
      const bPosition = b?.frontmatter?.position ?? 0
      if (aPosition < bPosition) {
        return -1
      }
      return 1
    })

  return (
    <Layout pageContext={pageContext}>
      <section>
        <div className="documentationContent">
          <section className="inner-faq-content">
            <h1>Frequently Asked Questions (FAQ)</h1>
            <div>
              {sections.map(
                ({ frontmatter: { title } = {}, rawMarkdownBody }, i) => (
                  <FAQSection
                    key={i}
                    title={title!}
                    rawMarkdownBody={rawMarkdownBody!}
                    pageContext={pageContext}
                  />
                ),
              )}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  )
}

export function Head() {
  return <Seo title="FAQ | GraphQL" />
}

export const query = graphql`
  query GetAllFAQSections {
    allMarkdownRemark(
      filter: { frontmatter: { permalink: { regex: "/faq/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            position
          }
          id
          rawMarkdownBody
        }
      }
    }
  }
`

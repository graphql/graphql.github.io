import React from "react"
import Layout from "../components/Layout"
import FAQSection from "../components/FAQSection"
import { graphql } from "gatsby"
import { useFAQAccordion } from "../utils/useFAQAccordion"

export default ({ pageContext, data }: any) => {
  useFAQAccordion()

  const sections = data.allMarkdownRemark.edges
    .map((e: any) => e.node)
    .sort((a: any, b: any) => {
      const aPosition = a.frontmatter.position
      const bPosition = b.frontmatter.position
      if (aPosition < bPosition) {
        return -1
      }
      return 1
    })

  return (
    <Layout title="FAQ | GraphQL" pageContext={pageContext}>
    <section>
      <div className="documentationContent">
        <section className="inner-faq-content">
          <h1>Frequently Asked Questions (FAQ)</h1>
          <div>
            {sections.map(
              (
                {
                  frontmatter: { title, permalink },
                  rawMarkdownBody,
                }: any,
              i
            ) => (
              <FAQSection
                key={i}
                title={title}
                permalink={permalink}
                rawMarkdownBody={rawMarkdownBody}
                pageContext={pageContext}
              />
            )
            )}
          </div>
        </section>
      </div>
    </section>
    </Layout>
  )
}

export const query = graphql`
  query getAllFAQSections {
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

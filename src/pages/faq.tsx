import React from "react"
import Layout from "../components/Layout"
import FAQSection from "../components/FAQSection"
import { graphql } from "gatsby"

export default ({ data }: any) => {
  const sections = data.allMarkdownRemark.edges
    .map((e: any) => e.node)
    .sort((a: any, b: any) => {
      const aPosition = a.frontmatter.position
      const bPosition = b.frontmatter.position
      if (aPosition < bPosition) {
        return -1
      } else if (aPosition > bPosition) {
        return 1
      }
      return 0
    })

  return (
    <Layout title="FAQ | GraphQL">
    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>Frequently Asked Questions (FAQ)</h1>
          <div>
            {sections.map(
              (
                {
                  frontmatter: { sectionTitle, permalink, questions },
                  rawMarkdownBody,
                }: any,
              i
            ) => (
              <FAQSection
                key={i}
                sectionTitle={sectionTitle}
                permalink={permalink}
                questions={questions}
                rawMarkdownBody={rawMarkdownBody}
              />
            )
            )}
          </div>
        </div>
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
            sectionTitle
            permalink
            questions
            position
          }
          id
          rawMarkdownBody
        }
      }
    }
  }
`

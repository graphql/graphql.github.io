import React from "react"
import Layout from "../components/Layout"
import FAQSection from "../components/FAQSection"
import { graphql } from "gatsby"
import FAQSidebar from "../components/FAQSidebar"

export default ({ pageContext, data }: any) => {
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

    console.log(sections[0].frontmatter.title)

  return (
    <Layout title="FAQ | GraphQL" pageContext={pageContext}>
    <section>
      <div className="documentationContent">
        <section className="inner-content">
          <h1>Frequently Asked Questions (FAQ)</h1>
          <div className="faq-content">
            {sections.map(
              (
                {
                  frontmatter: { title, permalink, questions },
                  rawMarkdownBody,
                }: any,
              i
            ) => (
              <FAQSection
                key={i}
                title={title}
                permalink={permalink}
                questions={questions}
                rawMarkdownBody={rawMarkdownBody}
                pageContext={pageContext}
              />
            )
            )}
          </div>
          <FAQSidebar sections={sections} />
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

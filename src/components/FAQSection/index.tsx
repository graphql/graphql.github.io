import React from "react"
import Marked from "../Marked"

interface Props {
  title: string
  rawMarkdownBody: string
  pageContext: any
}

const FAQSection = ({
  title,
  rawMarkdownBody,
  pageContext
}: Props) => (
  <section className="inner-content">
    <h2>{title}</h2>
    <Marked pageContext={pageContext}>{rawMarkdownBody}</Marked>
  </section>
)

export default FAQSection

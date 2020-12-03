import React from "react"
import FAQSection from "../FAQSection"

interface Props {
  title: string
  permalink: string
  questions: string
  rawMarkdownBody: string
  pageContext: any
}

const index = ({
  title,
  permalink,
  questions,
  rawMarkdownBody,
  pageContext
}: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <FAQSection
          title={title}
          permalink={permalink}
          questions={questions}
          rawMarkdownBody={rawMarkdownBody}
          pageContext={pageContext}
        />
      </div>
    </section>
  )
}

export default index
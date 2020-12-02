import React from "react"
import FAQSection from "../FAQSection"
import FAQSidebar from "../FAQSidebar"

interface Props {
  title: string
  permalink: string
  questions: string
  rawMarkdownBody: string
  sections: any
  pageContext: any
}

const index = ({
  title,
  permalink,
  questions,
  rawMarkdownBody,
  sections,
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
        <FAQSidebar
          sections={sections}
          currentPermalink={permalink}
        />
      </div>
    </section>
  )
}

export default index
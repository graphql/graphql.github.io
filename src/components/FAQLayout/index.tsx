import React from "react"
import FAQSection from "../FAQSection"

interface Props {
  sectionTitle: string
  permalink: string
  questions: string
  rawMarkdownBody: string
}

const index = ({
  sectionTitle,
  permalink,
  questions,
  rawMarkdownBody
}: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <FAQSection
          sectionTitle={sectionTitle}
          permalink={permalink}
          questions={questions}
          rawMarkdownBody={rawMarkdownBody}
        />
      </div>
    </section>
  )
}

export default index
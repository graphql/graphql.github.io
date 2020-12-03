import React from "react"
import FAQSection from "../FAQSection"

interface Props {
  title: string
  rawMarkdownBody: string
  pageContext: any
}

const index = ({
  title,
  rawMarkdownBody,
  pageContext
}: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <FAQSection
          title={title}
          rawMarkdownBody={rawMarkdownBody}
          pageContext={pageContext}
        />
      </div>
    </section>
  )
}

export default index
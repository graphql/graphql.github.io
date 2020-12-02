import React from "react"
import { Link } from "gatsby"
import Marked from "../Marked"
import { toSlug } from '../../utils/slug'

interface Props {
  title: string
  permalink: string
  questions: string
  rawMarkdownBody: string
  pageContext: any
}

const FAQSection = ({
  title,
  questions,
  rawMarkdownBody,
  pageContext
}: Props) => (
  <section className="inner-content">
    <h2>{title}</h2>
    {questions
        .split(',')
        .map(question => (
            <Link className="faq-questions" key={question} to={`#${toSlug( question )}`}>
                {question}
            </Link>
        ))
    }
    <Marked pageContext={pageContext}>{rawMarkdownBody}</Marked>
  </section>
)

export default FAQSection

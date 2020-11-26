import React from "react"
import { Link } from "gatsby"
import Marked from "../Marked"
import { toSlug } from '../../utils/slug'

interface Props {
  sectionTitle: string
  permalink: string
  questions: string
  rawMarkdownBody: string
}

const FAQSection = ({
  sectionTitle,
  questions,
  rawMarkdownBody
}: Props) => (
  <div className="inner-content">
    <h2>{sectionTitle}</h2>
    {questions
        .split(',')
        .map(question => (
            <Link className="faq-questions" key={question} to={`#${toSlug( question )}`}>
                {question}
            </Link>
        ))
    }
    <Marked>{rawMarkdownBody}</Marked>
  </div>
)

export default FAQSection

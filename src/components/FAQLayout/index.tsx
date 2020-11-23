import React from "react"
import { Link } from "gatsby"
import Marked from '../Marked'
import { toSlug } from '../../utils/slug'

interface Props {
  title: string
  questions: string
  rawMarkdownBody: string
}

const index = ({ title, questions, rawMarkdownBody }: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>{title}</h1>
          {questions && (
              <div>
                  {questions
                    .split(',')
                    .map(question => (
                        <Link className="faq-questions" key={question} to={`#${toSlug( question )}`}>
                            {question}
                        </Link>
                    ))
                  }
              </div>
          )}
          <Marked>{rawMarkdownBody}</Marked>
        </div>
      </div>
    </section>
  )
}

export default index

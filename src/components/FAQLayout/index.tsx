import React from "react"
import { Link } from "gatsby"
import Marked from '../Marked'
import { toSlug } from '../../utils/slug'

interface Props {
  title: string
  gettingStartedQuestions: string
  generalQuestions: string
  bestPracticesQuestions: string
  specificationQuestions: string
  frontendQuestions: string
  rawMarkdownBody: string
}

const index = ({ title, gettingStartedQuestions, generalQuestions, bestPracticesQuestions, specificationQuestions, frontendQuestions, rawMarkdownBody }: Props) => {
  return (
    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>{title}</h1>
          {gettingStartedQuestions && (
              <div>
                  <h2>Getting Started</h2>
                  {gettingStartedQuestions
                    .split(',')
                    .map(gettingStartedQuestion => (
                        <Link className="faq-questions" key={gettingStartedQuestion} to={`#${toSlug( gettingStartedQuestion )}`}>
                            {gettingStartedQuestion}
                        </Link>
                    ))
                  }
              </div>
          )}
          {generalQuestions && (
              <div>
                  <h2>General</h2>
                  {generalQuestions
                    .split(',')
                    .map(generalQuestion => (
                        <Link className="faq-questions" key={generalQuestion} to={`#${toSlug( generalQuestion )}`}>
                            {generalQuestion}
                        </Link>
                    ))
                  }
              </div>
          )}
          {bestPracticesQuestions && (
              <div>
                  <h2>Best Practices</h2>
                  {bestPracticesQuestions
                    .split(',')
                    .map(bestPracticesQuestion => (
                        <Link className="faq-questions" key={bestPracticesQuestion} to={`#${toSlug( bestPracticesQuestion )}`}>
                            {bestPracticesQuestion}
                        </Link>
                    ))
                  }
              </div>
          )}
          {specificationQuestions && (
              <div>
                  <h2>Specification</h2>
                  {specificationQuestions
                    .split(',')
                    .map(specificationQuestion => (
                        <Link className="faq-questions" key={specificationQuestion} to={`#${toSlug( specificationQuestion )}`}>
                            {specificationQuestion}
                        </Link>
                    ))
                  }
              </div>
          )}
          {frontendQuestions && (
              <div>
                  <h2>Frontend</h2>
                  {frontendQuestions
                    .split(',')
                    .map(frontendQuestion => (
                        <Link className="faq-questions" key={frontendQuestion} to={`#${toSlug( frontendQuestion )}`}>
                            {frontendQuestion}
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

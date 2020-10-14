import React from 'react'
import { Link } from 'gatsby'
import { shape, string } from 'prop-types'
import { toSlug } from '../lib/utils'

import Layout from '../components/Layout'

const FAQTemplate = ( {
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, questions },
    },
  },
  layoutSection,
} ) => (
  <Layout section={layoutSection} title={title}>
    <section>
      <div className="documentationContent">
        <div className="inner-content">

          <h1>{title}</h1>

          {questions && (
          <div>
            {questions
              .split( ',' )
              .map( question => (
                  <Link className="faq-questions" key={question} to={`#${toSlug( question )}`}>
                    {question}
                  </Link>
              ) )}
          </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

      </div>
    </section>

  </Layout>
)

FAQTemplate.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
  layoutSection: string,
}

FAQTemplate.defaultProps = {
  layoutSection: 'docs'
}

export default FAQTemplate

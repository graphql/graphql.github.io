import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import FAQTemplate from './FAQTemplate'

export const query = graphql`
  query FAQPagesLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"FAQLayout" } }) {
      html
      frontmatter {
        title
        questions
      }
    }
  }
`

const FAQLayout = ( { data } ) => <FAQTemplate data={data} />

FAQLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default FAQLayout
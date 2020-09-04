import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import Template from './Template'

export const query = graphql`
  query DefaultPagesLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"DefaultLayout" } }) {
      html
      frontmatter {
        title
        next
      }
    }
  }
`

const DefaultLayout = ( { data } ) => <Template data={data} />

DefaultLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default DefaultLayout

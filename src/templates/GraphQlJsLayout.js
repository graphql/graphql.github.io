import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import Template from './Template'
import Sidebar from '../components/Sidebar/GraphqlJsSidebar'

export const query = graphql`
  query GraphQlJsPagesLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"GraphQlJsLayout" } }) {
      html
      frontmatter {
        title
        next
      }
    }
  }
`

const GraphQlJsLayout = ( { data } ) => <Template data={data} SideBarComponent={Sidebar} />

GraphQlJsLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default GraphQlJsLayout

import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import Template from './Template'
import Sidebar from '../components/Sidebar/LearnSidebar'

export const query = graphql`
  query LearnPagesLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"LearnLayout" } }) {
      html
      frontmatter {
        title
        next
      }
    }
  }
`

const LearnLayout = ( { data } ) => <Template data={data} SideBarComponent={Sidebar} />

LearnLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default LearnLayout

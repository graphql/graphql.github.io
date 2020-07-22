import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import Template from './Template'
import Sidebar from '../components/Sidebar/CommunitySidebar'

export const query = graphql`
  query CommunityPagesLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"CommunityLayout" } }) {
      html
      frontmatter {
        title
        next
      }
    }
  }
`

const CommunityLayout = ( { data } ) => <Template data={data} SideBarComponent={Sidebar} />

CommunityLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default CommunityLayout

import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import Template from './Template'
import Sidebar from '../components/Sidebar/FAQSidebar'

export const query = graphql`
  query FAQPageLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"FAQLayout" } }) {
      html
      frontmatter {
        title
        next
      }
    }
  }
`

const FAQLayout = ( { data } ) => <Template data={data} SideBarComponent={Sidebar} />

FAQLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default FAQLayout

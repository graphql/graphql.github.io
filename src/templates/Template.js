import React from 'react'
import { Link } from 'gatsby'
import { shape, element, string } from 'prop-types'

import Layout from '../components/Layout'

const Template = ( {
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, next },
    },
  },
  SideBarComponent,
  layoutSection,
} ) => (
  <Layout section={layoutSection} title={title}>
    <section>
      <div className="documentationContent">
        <div className="inner-content">

          <h1>{title}</h1>

          <div dangerouslySetInnerHTML={{ __html: html }} />
          {next
            && (
            <Link className="read-next" to={next}>
              <span className="read-next-continue">Continue Reading &rarr;</span>
              {/* <span className="read-next-title">{nextPage.frontmatter.title}</span> */}
            </Link>
            )}
        </div>

        {SideBarComponent && <SideBarComponent />}

      </div>
    </section>

  </Layout>
)

Template.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
  SideBarComponent: element,
  layoutSection: string,
}

Template.defaultProps = {
  SideBarComponent: null,
  layoutSection: 'docs',
}

export default Template

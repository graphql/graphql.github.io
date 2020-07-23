import React from 'react'
import { graphql } from 'gatsby'
import { shape } from 'prop-types'

import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar/BlogPostSidebar'

export const query = graphql`
  query BlogPostLayout($id: String ) {
    markdownRemark(id: { eq: $id }, frontmatter: { layout: { eq:"BlogPostLayout" } }) {
      html
      frontmatter {
        title
        date
        byline
        guestBio
      }
    }
  }
`

const BlogPostLayout = ( {
  data: {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        date,
        byline,
        guestBio,
      },
    },
  },
} ) => (
  <Layout section="blog" title={title}>
    <section>
      <div className="documentationContent">

        <div className="inner-content">
          <h1>{title}</h1>

          <p>{new Date( date ).toLocaleDateString()} by {byline}</p>

          {guestBio ? null : <hr />}
          {guestBio && (
            <p className="guestBio">
              {`This guest article contributed by ${byline}, ${guestBio}.`}
            </p>
          )}

          <div dangerouslySetInnerHTML={{ __html: html }} />

        </div>

        <Sidebar />

      </div>
    </section>
  </Layout>
)

BlogPostLayout.propTypes = {
  data: shape( { markdownRemark: shape( {} ).isRequired } ).isRequired,
}

export default BlogPostLayout

import React from 'react'
import { node, string, bool } from 'prop-types'

import Header from './Header'
import Footer from './Footer'
import SEO from './Seo'

const Layout = ( { children, title, section, className, noSearch } ) => (
  // Temporarily added (need to find a way around this)
  <body className={className}>
    <SEO title={title} />
    <Header section={section} noSearch={noSearch} />

    {children}

    <Footer />
  </body>
)

Layout.propTypes = {
  children: node.isRequired,
  className: string,
  noSearch: bool,
  section: string,
  title: string.isRequired,
}

Layout.defaultProps = {
  className: undefined,
  noSearch: false,
  section: undefined,
}

export default Layout

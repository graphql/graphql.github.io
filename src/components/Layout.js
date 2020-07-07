import React from 'react'
import { node, string, bool } from 'prop-types'

import Header from './Header'
import Footer from './Footer'
import SEO from './Seo'

const Layout = ( { children, title, section, className, noSearch } ) => (
  <div className={className}>
    <SEO title={title} />
    <Header section={section} noSearch={noSearch} />

    {children}

    <Footer />
  </div>
)

Layout.propTypes = {
  children: node.isRequired,
  className: string,
  noSearch: bool,
  section: string,
  title: string.isRequired,
}

Layout.defaultProps = {
  className: null,
  noSearch: false,
  section: null,
}

export default Layout

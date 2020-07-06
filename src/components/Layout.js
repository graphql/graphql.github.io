import React from 'react'
import { node } from 'prop-types'
import { useSiteMetadata } from '../hooks'

import Header from './Header'

const Layout = ( { children } ) => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Header siteTitle={title} />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout

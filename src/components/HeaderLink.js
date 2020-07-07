import React from 'react'
import { Link } from 'gatsby'
import { string } from 'prop-types'

const links = [
  { section: 'learn', text: 'Learn', href: '/learn/' },
  { section: 'code', text: 'Code', href: '/code/' },
  { section: 'community', text: 'Community', href: '/community/' },
  { section: 'spec', text: 'Spec', href: 'https://graphql.github.io/graphql-spec/', outsideDomain: true },
  { section: 'codeofconduct', text: 'Code of Conduct', href: '/codeofconduct/' },
  { section: 'foundation', text: 'Foundation', href: 'https://foundation.graphql.org/', outsideDomain: true },
  { section: 'landscape', text: 'Landscape', href: 'https://l.graphql.org/', outsideDomain: true },
]

const HeaderLink = ( { section } ) => (
  <nav>
    {links.map( ( {
      section: linkSection,
      text,
      href,
      outsideDomain,
    } ) => ( outsideDomain ? (
      <a
        key={linkSection}
        href={href}
        target={href.slice( 0, 4 ) === 'http' ? '_blank' : null}
        rel={href.slice( 0, 4 ) === 'http' ? 'noopener noreferrer' : null}
        className={linkSection === section ? 'active' : null}
      >
        {text}
      </a>
    ) : (
      <Link
        key={linkSection}
        to={href}
        className={linkSection === section ? 'active' : null}
      >
        {text}
      </Link>
    ) ) ) }
  </nav>
)

HeaderLink.propTypes = {
  section: string,
}

HeaderLink.defaultProps = {
  section: null,
}

export default HeaderLink

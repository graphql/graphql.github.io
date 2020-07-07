import React from 'react'
import { Link } from 'gatsby'
import { string, bool } from 'prop-types'

import logo from '../img/logo.svg'
import Search from './Search'
import HeaderLink from './HeaderLink'

const Header = ( { section, noSearch } ) => (
  <header>

    <section>

      <Link className="nav-home" to="/">
        <img className="nav-logo" src={logo} alt="GraphQL Logo" width="30" height="30" />
        GraphQL
      </Link>

      <HeaderLink section={section} />

      {noSearch || <Search />}

    </section>

  </header>
)

Header.propTypes = {
  section: string.isRequired,
  noSearch: bool.isRequired,
}

export default Header

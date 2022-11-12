import React from "react"
import { Link } from "gatsby"
import HeaderLinks from "../HeaderLinks"
import Logo from "../Logo"
import Search from "../Search"

const Header = () => {
  return (
    <header>
      <section>
        <Link className="nav-home" to="/">
          <Logo />
          GraphQL
        </Link>
        <HeaderLinks />
        <Search />
      </section>
    </header>
  )
}

export default Header

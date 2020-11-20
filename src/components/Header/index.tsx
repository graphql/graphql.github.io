import React from "react"
import { Link } from "gatsby"
import HeaderLinks from "../HeaderLinks"
import Search from "../Search"

const Header = () => {
  return (
    <header>
      <section>
        <Link className="nav-home" to="/">
          <img
            className="nav-logo"
            src="/img/logo.svg"
            alt="GraphQL Logo"
            width="30"
            height="30"
          />
          GraphQL
        </Link>
        <HeaderLinks/>
        <Search searchID="hero-search-input"></Search>
      </section>
    </header>
  )
}

export default Header

import React from "react"
import Logo from "../../Logo"
import Search from "../../Search"
import Link from "../../Link"

interface LinkItem {
  section: string
  text: string
  href: string
}

const links: LinkItem[] = [
  {
    section: "Register",
    text: "Register",
    href: "/#register",
  },
  {
    section: "Speak",
    text: "Speak",
    href: "/cfp",
  },
  {
    section: "Sponsor",
    text: "Sponsor",
    href: "/pdf",
  },
  {
    section: "FAQ",
    text: "FAQ",
    href: "/faq/",
  },
]

const HeaderConf = () => {
  return (
    <header>
      <section>
        <Link className="conf-header" href="/">
          <img
            src="/img/conf/logo-color.png"
            alt="GraphQL Conf Logo"
            style={{ height: "50px", width: "auto" }}
          />
        </Link>
        <nav>
          <input type="checkbox" id="menubox" aria-label="Menu" />
          <div>
            {links.map((link, i) => (
              <Link key={i} href={link.href}>
                {link.text}
              </Link>
            ))}
          </div>
        </nav>
      </section>
    </header>
  )
}

export default HeaderConf

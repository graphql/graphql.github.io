import React from "react"
import ButtonConf from "../Button"

interface LinkItem {
  section: string
  text: string
  href: string
}

const links: LinkItem[] = [
  {
    section: "Register",
    text: "Register",
    href: "/conf/#register",
  },
  {
    section: "Speak",
    text: "Speak",
    href: "/conf/speak/",
  },
  {
    section: "Sponsor",
    text: "Sponsor",
    href: "/conf/sponsor/",
  },
  {
    section: "FAQ",
    text: "FAQ",
    href: "/conf/faq/",
  },
]

const classes = {
  background: "bg-[#862e69]",
}

const HeaderConf = () => {
  return (
    <header className={classes.background}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          {links.map((link, i) => (
            <a
              className="mr-5 text-white font-normal hover:font-extrabold hover:text-white"
              key={i}
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </nav>
        <a href="/conf/" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
          <img src="/img/conf/graphql-conf-logo.svg" className="w-[150px]" />
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <ButtonConf text="REGISTER NOW" href="/" />
        </div>
      </div>
    </header>
  )
}

export default HeaderConf

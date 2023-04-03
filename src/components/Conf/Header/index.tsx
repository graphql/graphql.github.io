import React from "react"
import ButtonConf from "../Button"

interface LinkItem {
  section: string
  text: string
  href: string
  noMobile?: boolean
}

const links: LinkItem[] = [
  {
    section: "Register",
    text: "Register",
    href: "/conf/#register",
    noMobile: true,
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
      <div className="xl:container mx-auto flex flex-wrap p-5 flex-row items-center max-md:justify-between">
        <nav className="flex xl:w-2/5 flex-wrap items-center text-base md:ml-auto">
          {links.map((link, i) => (
            <a
              className={`mr-5 text-white font-normal hover:font-extrabold hover:text-white focus:text-white ${
                link.noMobile ? "max-md:hidden" : ""
              }`}
              key={i}
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </nav>
        <a
          href="/conf/"
          className="flex order-first max-sm:hidden xl:order-none xl:w-1/5 title-font font-medium items-center xl:items-center xl:justify-center max-lg:mr-2"
        >
          <img
            src="/img/conf/graphql-conf-logo.svg"
            className="w-[125px] md:w-[150px]"
          />
        </a>
        <div className="xl:w-2/5 inline-flex xl:justify-end ml-5 xl:ml-0">
          <ButtonConf
            text="Register Now!"
            href="https://cvent.me/4zbxz9"
            target="_blank"
          />
        </div>
      </div>
    </header>
  )
}

export default HeaderConf

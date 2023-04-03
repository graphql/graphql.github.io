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

const HeaderConf = () => {
  return (
    <header className="bg-fuchsia-950 gap-2 shadow-lg">
      <div className="xl:container mx-auto flex flex-wrap flex-row items-center max-md:justify-between">
        <a
          href="/conf/"
          className="flex order-first max-sm:hidden xl:order-none xl:w-1/5 title-font font-medium items-center xl:items-center xl:justify-center max-lg:mr-2"
        >
          <img
            src="/img/conf/graphql-conf-logo.svg"
            className="w-[125px] md:w-[150px]"
          />
        </a>
        <nav className="flex grow gap-4">
          {links.map((link, i) => (
            <a
              className={`text-white hover:bg-fuchsia-900 rounded font-normal hover:font-extrabold hover:text-white focus:text-white ${
                link.noMobile ? "max-md:hidden" : ""
              }`}
              key={i}
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </nav>
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

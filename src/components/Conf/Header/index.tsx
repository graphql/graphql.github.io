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
    <header className="bg-[#0E031C] gap-2 shadow-lg px-5 h-[70px]">
      <div className="mx-auto flex flex-wrap flex-row items-center h-full max-md:justify-between">
        <a
          href="/conf/"
          className="flex order-first max-sm:hidden xl:order-none xl:w-1/5 font-medium items-center xl:items-center xl:justify-center mr-8 xl:mr-0"
        >
          <img
            src="/img/conf/graphql-conf-logo-simple.svg"
          />
        </a>
        <nav className="flex grow items-center justify-between md:justify-normal">
          {links.map((link, i) => (
            <a
              className={`text-lg text-white font-medium hover:text-white focus:text-white ${
                link.noMobile ? "max-md:hidden" : ""
              }`}
              key={i}
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </nav>
        <div>
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

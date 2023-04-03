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
  },
  { section: "Speak", text: "Speak", href: "/conf/speak/" },
  {
    section: "Sponsor",
    text: "Sponsor",
    href: "/conf/sponsor/",
  },
  { section: "FAQ", text: "FAQ", href: "/conf/faq/" },
]

const HeaderConf = () => {
  return (
    <header className="bg-[#0E031C] gap-2 shadow-lg px-5 h-[70px]">
      <div className="container mx-auto flex items-center h-full gap-5">
        <a href="/conf/" className="shrink-0">
          <img
            src="/img/conf/graphql-conf-logo-simple.svg"
            className="max-md:w-24"
          />
        </a>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm sm:text-lg text-white font-medium hover:text-white focus:text-white"
          >
            {link.text}
          </a>
        ))}
        <ButtonConf
          text="Register Now!"
          href="https://cvent.me/4zbxz9"
          target="_blank"
          className="ml-auto max-sm:hidden"
        />
      </div>
    </header>
  )
}

export default HeaderConf

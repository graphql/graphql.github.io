import React from "react"
import ButtonConf from "../Button"

interface LinkItem {
  text: string
  href: string
  noMobile?: boolean
}

const links: LinkItem[] = [
  { text: "Attend", href: "/conf/#attend" },
  { text: "Speak", href: "/conf/speak/" },
  { text: "Sponsor", href: "/conf/sponsor/" },
  { text: "FAQ", href: "/conf/faq/" },
]

const HeaderConf = () => {
  return (
    <header className="bg-[#0E031C] gap-2 shadow-lg px-5 h-[70px]">
      <div className="container flex items-center h-full gap-5 max-sm:justify-center">
        <a href="/conf/" className="shrink-0 max-sm:hidden">
          <img
            src="/img/conf/graphql-conf-logo-simple.svg"
            className="mt-[5px] mr-2 max-md:w-24"
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
          href="https://cvent.me/4zbxz9"
          className="ml-auto max-sm:hidden"
        >
          Buy a Ticket!
        </ButtonConf>
      </div>
    </header>
  )
}

export default HeaderConf

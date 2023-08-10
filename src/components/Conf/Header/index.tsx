import React, { useState } from "react"
import ButtonConf from "../Button"
import { Cross2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"

interface LinkItem {
  text: string
  href: string
}

const links: LinkItem[] = [
  { text: "Attend", href: "/conf/#attend" },
  { text: "Speakers", href: "/conf/speakers/" },
  { text: "Schedule", href: "/conf/schedule/" },
  { text: "Sponsor", href: "/conf/sponsor/" },
  { text: "Partner", href: "/conf/partner/" },
  { text: "FAQ", href: "/conf/faq/" },
]

const LinksList = () => (
  <>
    {links.map(link => (
      <a
        key={link.href}
        href={link.href}
        className="px-2.5 text-2xl md:text-lg text-white font-medium hover:text-white focus:text-white"
      >
        {link.text}
      </a>
    ))}
  </>
)

interface HeaderConfProps {
  className?: string
}
const HeaderConf = ({ className = "" }: HeaderConfProps) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const handleDrawerClick = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  return (
    <header
      className={clsx(
        "bg-[#171E26] px-2 xs:px-0 gap-2 shadow-lg h-[70px]",
        className
      )}
    >
      <div className="md:container mx-auto flex items-center h-full gap-5 max-sm:justify-end justify-between">
        <a href="/conf/" className="shrink-0 max-sm:hidden">
          <img
            src="/img/conf/graphql-conf-logo-simple.svg"
            className="mt-[5px] mr-2"
          />
        </a>

        {mobileDrawerOpen && (
          <div
            onClick={handleDrawerClick}
            className="bg-black opacity-50 fixed inset-0 z-10"
          />
        )}

        <nav
          className={`lg:transform-none ${
            mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }  lg:w-full lg:justify-between justify-start fixed lg:static bg-[#171e26] h-full lg:h-auto right-0 top-0 transition-transform duration-200 ease-in-out z-20 lg:items-center items-start min-w-[75%] flex flex-col lg:flex-row py-10 px-8 lg:p-0`}
        >
          {mobileDrawerOpen && (
            <Cross2Icon
              onClick={handleDrawerClick}
              className="lg:hidden text-white w-9 h-9 mb-2 cursor-pointer"
            />
          )}
          <div className="lg:block lg:gap-0 lg:mt-0 flex flex-col gap-5 mt-7">
            <LinksList />
          </div>

          <div className="lg:flex items-center gap-5 mt-5 lg:mt-0 hidden">
            <ButtonConf
              href="https://cvent.me/4zbxz9"
              className="ml-auto lg:visible"
            >
              Buy a Ticket!
            </ButtonConf>
          </div>
        </nav>

        <div
          className="flex items-center space-x-4 lg:hidden"
          onClick={handleDrawerClick}
        >
          <ButtonConf href="https://cvent.me/4zbxz9" className="lg:hidden">
            Buy a Ticket!
          </ButtonConf>
          <div className="space-y-2 cursor-pointer py-3">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderConf

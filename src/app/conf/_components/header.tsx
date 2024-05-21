"use client"

import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react"
import NextLink from "next/link"
import { HamburgerIcon, CrossIcon, GraphQLLogo } from "@/icons"
import { clsx } from "clsx"
import { usePathname } from "next/navigation"
import { Badge } from "./badge"

export function Header({
  links,
  logo,
}: {
  links: { href: string; children: React.ReactNode; "aria-disabled"?: true }[]
  logo: ReactNode
}): ReactElement {
  const pathname = usePathname()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const handleDrawerClick = useCallback(() => {
    setMobileDrawerOpen(prev => !prev)
  }, [])

  useEffect(() => {
    setMobileDrawerOpen(false)
  }, [pathname])

  return (
    <header className="border-b border-[#565060] sticky top-0 bg-conf-black z-10">
      <div className="container flex items-center h-[70px] gap-5">
        <div className="flex items-center gap-2">
          <NextLink href="/">
            <GraphQLLogo className="h-8" />
          </NextLink>
          <svg
            className="text-neutral-500"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M16.88 3.549L7.12 20.451" />
          </svg>
          {logo}
        </div>

        {mobileDrawerOpen && (
          <div
            onClick={handleDrawerClick}
            className="bg-black/70 fixed inset-0 z-10"
          />
        )}

        <nav
          className={clsx(
            "gap-7 items-end",
            "max-lg:py-6 max-lg:px-4 inset-y-0 right-0 z-20 max-lg:fixed max-lg:min-w-[50%]",
            mobileDrawerOpen ? "translate-x-0" : "max-lg:translate-x-full",
            "bg-conf-black flex max-lg:flex-col",
          )}
        >
          {mobileDrawerOpen && (
            <button className="size-6">
              <CrossIcon
                onClick={handleDrawerClick}
                className="lg:hidden text-white"
              />
            </button>
          )}
          <div className="lg:block lg:gap-0 lg:mt-0 flex flex-col gap-5 text-gray-400 font-semibold w-full">
            {links.map(({ "aria-disabled": isDisabled, children, ...link }) => (
              <NextLink
                key={link.href}
                {...link}
                className={clsx(
                  "px-4",
                  isDisabled
                    ? "pointer-events-none"
                    : "hover:text-primary focus:text-white transition-colors",
                  pathname === link.href && "text-white", // underline decoration-from-font underline-offset-4
                )}
              >
                {children}
                {isDisabled && (
                  <sup className="ml-2">
                    <Badge className="text-white">Soon</Badge>
                  </sup>
                )}
              </NextLink>
            ))}
          </div>
        </nav>

        <button
          className="lg:hidden text-white size-6 ml-auto"
          onClick={handleDrawerClick}
        >
          <HamburgerIcon />
        </button>
      </div>
    </header>
  )
}

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
  is2025,
}: {
  links: { href: string; children: React.ReactNode; "aria-disabled"?: true }[]
  logo: ReactNode
  is2025?: boolean
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
    <header className="sticky top-0 z-10 border-b border-[#565060] bg-conf-black">
      <div
        className={`container flex items-center ${is2025 ? "justify-between" : ""} h-[70px] gap-5`}
      >
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
            className="fixed inset-0 z-10 bg-black/70"
          />
        )}

        <nav
          className={clsx(
            "items-end gap-7",
            "inset-y-0 right-0 z-20 max-lg:fixed max-lg:min-w-[50%] max-lg:px-4 max-lg:py-6",
            mobileDrawerOpen ? "translate-x-0" : "max-lg:translate-x-full",
            "flex bg-conf-black max-lg:flex-col",
          )}
        >
          {mobileDrawerOpen && (
            <button className="size-6">
              <CrossIcon
                onClick={handleDrawerClick}
                className="text-white lg:hidden"
              />
            </button>
          )}
          <div className="flex w-full flex-col gap-5 font-semibold text-gray-400 lg:mt-0 lg:block lg:gap-0">
            {links.map(({ "aria-disabled": isDisabled, children, ...link }) => (
              <NextLink
                key={link.href}
                {...link}
                // if external link, open in new tab
                {...(link.href.startsWith("https") && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={clsx(
                  "px-4",
                  isDisabled
                    ? "pointer-events-none"
                    : "transition-colors hover:text-primary focus:text-white",
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
          className="ml-auto size-6 text-white lg:hidden"
          onClick={handleDrawerClick}
        >
          <HamburgerIcon />
        </button>
      </div>
    </header>
  )
}

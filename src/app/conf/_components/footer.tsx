import { SocialIcons } from "./social-icons"
import NextLink from "next/link"
import { ReactNode } from "react"
import { clsx } from "clsx"
import { Badge } from "./badge"

export function Footer({
  links,
  logo,
}: {
  links: { href: string; children: string; "aria-disabled"?: true }[][]
  logo: ReactNode
}) {
  return (
    <footer className="bg-conf-black py-10 text-white lg:py-20">
      <div className="container mb-10 flex flex-wrap items-start justify-between gap-10 xl:mb-32">
        {logo}
        {links.map((link, i) => (
          <ul key={i} className="max-md:w-full">
            {link.map(({ "aria-disabled": isDisabled, children, ...link }) => (
              <li key={link.href} className="mb-3.5">
                <NextLink
                  {...link}
                  className={clsx(
                    "outline-none",
                    isDisabled
                      ? "pointer-events-none"
                      : "transition-colors hover:text-primary focus:text-primary",
                  )}
                  tabIndex={isDisabled ? -1 : undefined}
                >
                  {children}
                  {isDisabled && (
                    <sup className="ml-2">
                      <Badge>Soon</Badge>
                    </sup>
                  )}
                </NextLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="container flex justify-between gap-10 text-sm max-lg:flex-col">
        <div className="flex flex-col font-light max-md:gap-5">
          <p>
            Copyright © {new Date().getFullYear()} The GraphQL Foundation. All
            rights reserved.
          </p>
          <p>
            For web site terms of use, trademark policy and general project
            policies please see{" "}
            <a
              href="https://lfprojects.org"
              target="_blank"
              rel="noreferrer"
              className="text-primary outline-none focus:ring focus:ring-primary"
            >
              https://lfprojects.org
            </a>
            .
          </p>
        </div>
        <SocialIcons />
      </div>
    </footer>
  )
}

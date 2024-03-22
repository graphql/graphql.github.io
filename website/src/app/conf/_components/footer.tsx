import { SocialIcons } from "./social-icons"
import NextLink from "next/link"
import { ReactNode } from "react"
import { clsx } from "clsx"
import { Badge } from './badge'

export function Footer({
  links,
  logo,
}: {
  links: { href: string; children: string; "aria-disabled"?: true }[][]
  logo: ReactNode
}) {
  return (
    <footer className="py-10 lg:py-20 bg-conf-black text-white">
      <div className="container flex justify-between items-start flex-wrap gap-10 mb-10 xl:mb-32">
        {logo}
        {links.map((link, i) => (
          <ul key={i} className="max-md:w-full">
            {link.map(({ "aria-disabled": isDisabled, children, ...link }) => (
              <li key={link.href} className="mb-3.5">
                <NextLink
                  {...link}
                  className={clsx(
                    isDisabled
                      ? "pointer-events-none"
                      : "hover:text-primary transition-colors",
                  )}
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
      <div className="container text-sm flex max-lg:flex-col gap-10 justify-between">
        <div className="flex flex-col max-md:gap-5 font-light">
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
              className="text-primary"
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

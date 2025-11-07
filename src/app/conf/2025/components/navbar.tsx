"use client"

import { ReactElement, useCallback, useEffect, useState } from "react"
import { clsx } from "clsx"
import { usePathname } from "next/navigation"

import { Badge } from "../../_components/badge"

import MenuIcon from "@/app/conf/_design-system/pixelarticons/menu.svg?svgr"
import CloseIcon from "@/app/conf/_design-system/pixelarticons/close.svg?svgr"
import { GraphQLConfLogoLink } from "./graphql-conf-logo-link"
import { Anchor } from "../../_design-system/anchor"

export interface NavbarProps {
  links: { href: string; children: React.ReactNode; "aria-disabled"?: true }[]
  year: number
}

export function Navbar({ links, year }: NavbarProps): ReactElement {
  const pathname = usePathname()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const handleDrawerClick = useCallback(() => {
    setMobileDrawerOpen(prev => !prev)
  }, [])

  useEffect(() => {
    setMobileDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "auto"
    if (mobileDrawerOpen) {
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMobileDrawerOpen(false)
      }
      document.addEventListener("keydown", closeOnEscape)
      return () => {
        document.removeEventListener("keydown", closeOnEscape)
      }
    }
  }, [mobileDrawerOpen])

  return (
    <>
      <div
        className={clsx(
          "top-0 w-full scale-y-105 bg-pri-base dark:bg-pri-darker",
          mobileDrawerOpen ? "static" : "absolute",
        )}
      />
      <NavbarPlaceholder className="bg-pri-base before:bg-white/30 dark:bg-pri-darker dark:before:bg-blk/40" />
      <header
        className={clsx(
          "gql-all-anchors-focusable sticky top-0 z-[100] w-full border-b border-blk/60 font-mono text-neu-900 antialiased dark:border-white/80",
          mobileDrawerOpen && "!border-neu-900 dark:!border-white",
        )}
      >
        <BackdropBlur />
        <div className="flex h-[var(--navbar-h)] items-center justify-between gap-5 px-4 md:px-6 2xl:px-10">
          <GraphQLConfLogoLink year={year} />

          <div className="typography-menu mr-auto flex h-full flex-col justify-center whitespace-pre border-x border-blk/60 px-4 dark:border-white/80 max-xl:hidden">
            <p className="flex items-center gap-2 text-sm">
              <time dateTime="2025-09-08">September 08</time>
              <span>-</span>
              <time dateTime="2025-09-10">10, 2025</time>
            </p>
            <address className="text-sm not-italic">
              Amsterdam, Netherlands
            </address>
          </div>

          {mobileDrawerOpen && (
            <div
              // menu overlay
              onClick={handleDrawerClick}
              className="fixed inset-0 top-[calc(var(--navbar-h)+1px)] z-10 bg-white/40 backdrop-blur-[6.4px] dark:bg-blk/30"
            />
          )}

          <nav
            className={clsx(
              "typography-menu inset-0 z-20 flex gap-7 max-lg:fixed max-lg:mt-[calc(var(--navbar-h)+1px)] max-lg:flex-col max-md:min-w-[50%] sm:max-lg:p-4 lg:items-end",
              mobileDrawerOpen ? "translate-x-0" : "max-lg:translate-x-full",
            )}
          >
            <div className="flex w-full flex-col lg:mt-0 lg:block">
              {links.map(
                ({ "aria-disabled": isDisabled, children, ...link }) => (
                  <Anchor
                    aria-disabled={isDisabled}
                    key={link.href}
                    {...link}
                    className={clsx(
                      "p-5 underline-offset-4 hover:underline aria-disabled:pointer-events-none max-lg:text-base",
                      pathname === link.href && "underline",
                    )}
                    onClick={() => {
                      if (mobileDrawerOpen) {
                        setMobileDrawerOpen(false)
                      }
                    }}
                  >
                    {children}
                    {isDisabled && (
                      <sup className="ml-2">
                        <Badge className="text-white">Soon</Badge>
                      </sup>
                    )}
                  </Anchor>
                ),
              )}
            </div>
          </nav>

          <button
            className="gql-focus-visible z-40 ml-auto size-7 hover:bg-neu-900/10 lg:hidden"
            onClick={handleDrawerClick}
          >
            {mobileDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </>
  )
}

function BackdropBlur() {
  const mask = "linear-gradient(to bottom,#000 0% 50%, transparent 50% 100%)"
  return (
    <div
      // note: we can't use the background trick to reduce flickering, because we have many section
      // background colors and big images, so we'd have to change the --bg var with javascript
      className="pointer-events-none absolute inset-0 -z-10 h-[200%] backdrop-blur-[6.4px]"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  )
}

export function NavbarPlaceholder({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // placeholder: the colors here on `before` must match the ones on Hero `before` strip
      className={clsx(
        "absolute h-[calc(var(--navbar-h)+1px)] w-full before:absolute before:top-0 before:h-[calc(var(--navbar-h)+1px)] before:w-full",
        className,
      )}
      {...rest}
    />
  )
}

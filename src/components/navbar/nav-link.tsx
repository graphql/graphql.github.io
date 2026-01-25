"use client"

import clsx from "clsx"
import type * as normalizePages from "nextra/normalize-pages"
import React from "react"
import { Anchor } from "../../app/conf/_design-system/anchor"
import { usePathname } from "next/navigation"

export const navLinkClasses =
  "typography-menu flex items-center text-neu-900 px-3 py-1 nextra-focus [text-box:trim-both_cap_alphabetic] leading-none hover:underline underline-offset-2 md:py-5"

export interface NavLinkProps {
  href: string
  isActive: boolean
  page: normalizePages.PageItem
}

export function NavLink({
  href,
  page,
}: {
  href: string
  page: normalizePages.PageItem
}) {
  const pathname = usePathname() || "/"

  const isActive =
    page.route === pathname || pathname.startsWith(page.route + "/")

  return (
    <Anchor
      href={href}
      className={clsx(
        navLinkClasses,
        "whitespace-nowrap max-md:hidden",
        isActive && !page.newWindow && "underline",
      )}
      target={page.newWindow ? "_blank" : undefined}
      aria-current={!page.newWindow && isActive}
    >
      {page.title}
    </Anchor>
  )
}

// eslint-disable-next-line no-restricted-imports -- since we don't need newWindow prop
import NextLink from "next/link"
import type { Item } from "nextra/normalize-pages"
import type { ReactElement } from "react"
import { useThemeConfig } from "nextra-theme-docs"
import type { DocsThemeConfig } from "nextra-theme-docs"

import ArrowDown from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

interface NavLinkProps {
  currentIndex: number
  flatDocsDirectories: Item[]
}

export function ArrowNavLinks({
  flatDocsDirectories,
  currentIndex,
}: NavLinkProps): ReactElement | null {
  const themeConfig = useThemeConfig()
  const nav = themeConfig.navigation
  const navigation: Exclude<DocsThemeConfig["navigation"], boolean> =
    typeof nav === "boolean" ? { prev: nav, next: nav } : nav
  let prev = navigation.prev && flatDocsDirectories[currentIndex - 1]
  let next = navigation.next && flatDocsDirectories[currentIndex + 1]

  if (prev && !prev.isUnderCurrentDocsTree) prev = false
  if (next && !next.isUnderCurrentDocsTree) next = false

  if (!prev && !next) return null

  return (
    <div className="mb-8 flex items-center gap-4 border-t border-neu-200 pt-8 print:hidden">
      {prev && (
        <NextLink
          href={prev.route}
          title={prev.title}
          className="gql-focus-visible typography-link flex max-w-[50%] items-center gap-2 border border-neu-200 pr-2 text-left text-base no-underline hover:bg-neu-50 hover:ring hover:ring-neu-100 dark:border-neu-100 dark:hover:bg-neu-50/50 dark:hover:ring-neu-50"
        >
          <span className="border-r p-2">
            <ArrowDown className="size-8 shrink-0 rotate-90" />
          </span>
          <span className="[word-break:break-word]">{prev.title}</span>
        </NextLink>
      )}
      {next && (
        <NextLink
          href={next.route}
          title={next.title}
          className="gql-focus-visible typography-link ml-auto flex max-w-[50%] items-center gap-2 border border-neu-200 pl-2 text-left text-base no-underline hover:bg-neu-50 hover:ring hover:ring-neu-100 dark:border-neu-100 dark:hover:bg-neu-50/50 dark:hover:ring-neu-50"
        >
          <span className="[word-break:break-word]">{next.title}</span>
          <span className="border-l border-neu-200 p-2 dark:border-neu-100">
            <ArrowDown className="size-8 shrink-0 -rotate-90" />
          </span>
        </NextLink>
      )}
    </div>
  )
}

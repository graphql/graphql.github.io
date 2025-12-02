import NextLink from "next/link"
import type { Item } from "nextra/normalize-pages"
import type { ReactElement } from "react"
import { useThemeConfig } from "nextra-theme-docs"
import type { DocsThemeConfig } from "nextra-theme-docs"

import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { learnPages } from "@/components/learn-aggregator/learn-pages"

import blurCorner from "./blur-corner.webp"
import clsx from "clsx"

interface NavLinkProps {
  currentIndex: number
  flatDocsDirectories: Item[]
}

export function NavLinks({
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

  const displayPost = next || prev
  const isNext = !!next

  if (!displayPost) return null

  const pageKey = displayPost.route.split("/").pop() as keyof typeof learnPages
  const pageData = learnPages[pageKey]
  const section = pageData?.section

  return (
    <div className="gql-container mb-8 print:hidden">
      <NextLink
        href={displayPost.route}
        className="gql-focus-visible relative flex items-center gap-8 border border-neu-200 bg-neu-0 p-8 hover:ring hover:ring-neu-100 dark:border-neu-50 dark:hover:ring-neu-50/50"
      >
        <div
          className={clsx(
            "pointer-events-none absolute inset-0 left-4 overflow-hidden",
            section === "getting-started" &&
              "[--start:var(--color-pri-lightest)] dark:[--start:var(--color-pri-darker)]",
            section === "best-practices" &&
              "[--start:var(--color-sec-lighter)] dark:[--start:var(--color-sec-darker)]",
          )}
          style={{
            maskImage: `url(${blurCorner.src})`,
            WebkitMaskImage: `url(${blurCorner.src})`,
            maskSize: "50% 50%",
            WebkitMaskSize: "50% 50%",
            maskPosition: "top right",
            WebkitMaskPosition: "top right",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <StripesDecoration
            oddClassName="bg-[linear-gradient(180deg,hsl(var(--start))_0%,hsl(var(--color-neu-0)/0)_50%)]"
            stripeWidth="12px"
          />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <p className="typography-menu text-pri-base dark:text-pri-light">
            {isNext ? "next lesson" : "previous lesson"}
          </p>

          <div className="flex flex-col gap-4 text-neu-900">
            <h2 className="typography-h2">{displayPost.title}</h2>
            {pageData?.description && (
              <p className="typography-body-lg max-w-[560px]">
                {pageData.description}
              </p>
            )}
          </div>

          <div className="flex h-12 items-center justify-center self-start bg-neu-900 px-8 py-2">
            <span className="typography-button text-neu-0">
              Go to {isNext ? "next" : "previous"} lesson
            </span>
          </div>
        </div>

        {pageData?.icon && (
          <div className="relative flex size-[222px] bg-neu-0">
            <div
              className={clsx(
                "shrink-0 items-center justify-center p-12",
                section === "getting-started" &&
                  "bg-pri-lightest dark:bg-pri-lighter/5",
                section === "best-practices" &&
                  "bg-sec-lighter dark:bg-sec-lighter/10",
              )}
            >
              <img
                src={pageData.icon}
                alt=""
                className="size-full object-contain"
              />
            </div>
          </div>
        )}
      </NextLink>
    </div>
  )
}

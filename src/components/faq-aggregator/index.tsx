"use client"

import { getMdxHeadings } from "@/_design-system/mdx-components/get-mdx-headings"
import { type ReactNode, useRef, useLayoutEffect, useState } from "react"
import ArrowDown from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import BestPracticesIcon from "./decorations/best-practices.svg?svgr"
import FrontendIcon from "./decorations/frontend.svg?svgr"
import GeneralIcon from "./decorations/general.svg?svgr"
import GettingStartedIcon from "./decorations/getting-started.svg?svgr"
import SpecificationIcon from "./decorations/specification.svg?svgr"

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

const mdxHeadings = getMdxHeadings()

const iconMap: Record<string, typeof GettingStartedIcon> = {
  "getting-started": GettingStartedIcon,
  "best-practices": BestPracticesIcon,
  frontend: FrontendIcon,
  general: GeneralIcon,
  specification: SpecificationIcon,
}

function FaqH1({ id, children }: { id?: string; children?: ReactNode }) {
  const slug = id ?? slugify(String(children))
  const Icon = iconMap[slug] ?? GeneralIcon

  return (
    <div
      data-heading
      className="mb-4 mt-8 flex items-center border border-neu-400 first:mt-0 dark:border-neu-100"
    >
      <div className="flex size-[90px] shrink-0 items-center justify-center border-r border-inherit bg-neu-100 p-4 dark:bg-neu-50/50">
        <Icon className="size-full text-neu-800" />
      </div>
      <mdxHeadings.h2
        id={slug}
        size="h1"
        className="!mt-0 flex-1 px-4 text-neu-900"
      >
        {children}
      </mdxHeadings.h2>
    </div>
  )
}

function FaqH2({ id, children }: { id?: string; children?: ReactNode }) {
  const slug = id ?? slugify(String(children))
  return (
    <details className="group mt-4 border border-neu-400 bg-neu-0 *:px-3 dark:border-neu-100 lg:mt-6 [&:first-of-type]:border-t [&>:last-child]:mb-3 [&>p:first-of-type]:!mt-3">
      <summary className="gql-focus-visible flex cursor-pointer list-none items-center justify-between gap-4 p-3 hover:bg-neu-100 group-open:border-b group-open:border-neu-400 dark:hover:bg-neu-50/50 dark:group-open:border-neu-100 [&::-webkit-details-marker]:hidden">
        <h3 id={slug} className="typography-body-lg text-neu-900">
          {children}
        </h3>
        <ArrowDown className="size-10 shrink-0 text-neu-800 group-open:rotate-180" />
      </summary>
    </details>
  )
}

export function FaqAggregator({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [, forceUpdate] = useState(0)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const details = container.querySelectorAll("details")
    details.forEach(detail => {
      const answerContent: Node[] = []
      let sibling = detail.nextSibling

      while (sibling) {
        const next = sibling.nextSibling
        if (sibling instanceof Element) {
          if (
            sibling.tagName === "DETAILS" ||
            (sibling as HTMLElement).dataset?.heading
          )
            break
          answerContent.push(sibling)
        } else if (
          sibling.nodeType === Node.TEXT_NODE &&
          sibling.textContent?.trim()
        ) {
          answerContent.push(sibling)
        }
        sibling = next
      }

      if (answerContent.length > 0) {
        answerContent.forEach(node => detail.appendChild(node))
      }
    })

    forceUpdate(n => n + 1)
  }, [])

  return <div ref={containerRef}>{children}</div>
}

export const faqMdxComponents = {
  h1: FaqH1,
  h2: FaqH2,
}

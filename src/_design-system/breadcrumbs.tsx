import { Fragment } from "react"
import { clsx } from "clsx"
import NextLink from "next/link"
import type { Item } from "nextra/normalize-pages"

import CaretDown from "@/app/conf/_design-system/pixelarticons/caret-down.svg?svgr"

import { extractStringsFromReactNode } from "../components/utils/extract-strings-from-react-node"

export const Breadcrumbs = ({
  activePath,
  className,
}: {
  activePath: Item[]
  className?: string
}) => {
  return (
    <div
      className={clsx(
        "typography-menu flex items-center gap-1 text-sm",
        className,
      )}
    >
      {activePath.map((item, index) => {
        const href = getHref(item)

        const title = extractStringsFromReactNode(item.title)
        const className = clsx(
          "text-neu-700 dark:text-neu-400 min-w-6 last:text-neu-800 dark:last:text-neu-800 leading-none whitespace-pre",
          href &&
            "gql-focus-visible ring-inset hover:text-neu-900 hover:underline underline-offset-2",
          item.title.length > 8 ? "overflow-hidden truncate" : "shrink-0",
        )

        return (
          <Fragment key={item.route + item.name}>
            {index > 0 && (
              <CaretDown className="size-4 translate-x-[0.5px] -rotate-90" />
            )}
            {href ? (
              <NextLink
                href={href}
                title={title}
                prefetch={false}
                className={className}
              >
                {item.title}
              </NextLink>
            ) : (
              <span className={className} title={title}>
                {item.title}
              </span>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

function getHref(item: Item): string {
  if ("frontMatter" in item) return item.route

  const firstChild = item.children?.[0]
  return firstChild ? getHref(firstChild) : ""
}

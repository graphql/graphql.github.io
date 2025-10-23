import { Fragment } from "react"
import { clsx } from "clsx"
import NextLink from "next/link"
import { ArrowRightIcon } from "nextra/icons"
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
        "typography-menu flex items-center gap-1 overflow-hidden text-sm",
        className,
      )}
    >
      {activePath.map((item, index, arr) => {
        const nextItem = arr[index + 1]
        const href = nextItem
          ? "frontMatter" in item
            ? item.route
            : (item as { children: { route: string }[] }).children[0]?.route ===
                nextItem.route
              ? ""
              : (item as { children: { route: string }[] }).children[0]?.route
          : ""

        const title = extractStringsFromReactNode(item.title)
        const className = clsx(
          "truncate text-neu-700 dark:text-neu-400 min-w-6 last:text-neu-800 dark:last:text-neu-800 leading-none",
          href &&
            "focus-visible:gql-focus-visible ring-inset hover:text-neu-900 hover:underline",
        )

        return (
          <Fragment key={item.route + item.name}>
            {index > 0 && (
              <CaretDown className="size-4 translate-x-[0.5px] -rotate-90" />
            )}
            {href ? (
              <NextLink href={href} title={title} prefetch={false}>
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

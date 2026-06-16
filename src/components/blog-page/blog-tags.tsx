import NextLink from "next/link"

import { Tag } from "@/app/conf/_design-system/tag"

import { tagColors } from "@/app/conf/_design-system/tag-colors"
import clsx from "clsx"

export function BlogTags({
  tags,
  opaque,
  className,
  links,
}: {
  tags: readonly string[]
  opaque?: boolean
  className?: string
  links?: boolean
}) {
  return (
    <span className={clsx("flex gap-2", className)}>
      {tags.map(tag => {
        const color = tagColors[tag as keyof typeof tagColors]
        if (!color && process.env.NODE_ENV !== "production") {
          throw new Error(`No color found for tag: ${tag}`)
        }

        const tagElement = (
          <Tag className={opaque ? "bg-neu-0" : ""} color={color}>
            {tag.replaceAll("-", " ")}
          </Tag>
        )

        return links ? (
          <NextLink
            key={tag}
            // yes, the page lives under /tags, not /blog/tags
            href={`/tags/${tag}`}
            className="gql-focus-visible -m-1 flex p-1 ring-inset ring-neu-400 transition-opacity duration-75 hover:ring focus:!outline-offset-0 dark:ring-neu-50 [:has(>:hover)>&:not(:hover)]:opacity-70"
          >
            {tagElement}
          </NextLink>
        ) : (
          tagElement
        )
      })}
    </span>
  )
}

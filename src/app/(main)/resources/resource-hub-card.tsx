import Link from "next/link"
import type { ReactNode } from "react"
import { clsx } from "clsx"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import ClockIcon from "@/app/conf/_design-system/pixelarticons/clock.svg?svgr"
import { Tag } from "@/app/conf/_design-system/tag"
import { Topic } from "@/resources/types"
import { tagColors } from "@/app/conf/_design-system/tag-colors"

interface ResourceHubCardProps {
  href: string
  title: string
  author?: string
  duration?: string
  authorPlacement?: "body" | "footer"
  tags?: string[]
  className?: string
  icon?: ReactNode
}

export function ResourceHubCard({
  href,
  title,
  author,
  duration,
  authorPlacement = "footer",
  tags,
  className,
  icon,
}: ResourceHubCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative grid h-full grid-rows-[1fr_auto] border border-neu-200 bg-neu-50 text-left hover:ring hover:ring-neu-100 dark:border-neu-100 dark:bg-neu-50/25 dark:hover:ring-neu-50",
        authorPlacement === "body" && "min-h-[180px]",
        className,
      )}
    >
      <div
        className={clsx(
          "flex gap-4 border-inherit p-4 md:p-6",
          authorPlacement === "body" ? "max-w-[calc(100%-53px)]" : "border-b",
        )}
      >
        <div className="flex flex-col gap-4">
          {tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Tag key={tag} color={tagColors[tag as Topic]}>
                  {formatTag(tag)}
                </Tag>
              ))}
            </div>
          ) : null}
          <div
            className={clsx(
              "flex flex-col gap-3",
              authorPlacement === "body" && "mt-auto",
            )}
          >
            {authorPlacement === "body" && author ? (
              <span className="typography-body-sm text-neu-800">{author}</span>
            ) : null}
            <h3
              className={clsx(
                "text-pretty text-neu-900",
                title.length > 100
                  ? "typography-body-lg"
                  : title.length > 65
                    ? "typography-h4"
                    : "typography-h4 md:typography-h3",
              )}
            >
              {title}
            </h3>
          </div>
        </div>
        {icon ? (
          <div className="absolute right-0 top-0 flex size-12 shrink-0 place-content-center place-items-center self-start justify-self-end border-b border-l border-inherit md:size-[72px]">
            {icon}
          </div>
        ) : null}
      </div>
      <div
        className={clsx(
          "grid items-center",
          authorPlacement === "body"
            ? "absolute bottom-0 right-0 border-l border-t border-neu-200 dark:border-neu-100"
            : "grid-cols-[1fr_auto] divide-x divide-neu-200 dark:divide-neu-100",
        )}
      >
        {(authorPlacement === "footer" || !!duration) && (
          <div className="flex items-center gap-4 p-4 md:p-6">
            {authorPlacement === "footer" && author ? (
              <span className="typography-body-sm flex h-[1em] items-center justify-center text-neu-800">
                <span>{author}</span>
              </span>
            ) : null}
            {duration ? (
              <span className="ml-auto flex items-center gap-2 text-neu-800">
                <ClockIcon className="size-5" />
                <span className="typography-body-sm">{duration}</span>
              </span>
            ) : null}
          </div>
        )}
        <div className="flex size-[53px] items-center justify-center md:size-[72px]">
          <ArrowDownIcon className="size-8 -rotate-90 md:size-10" aria-hidden />
        </div>
      </div>
    </Link>
  )
}

function formatTag(tag: string) {
  if (tag === "blog-or-newsletter") return "Blogs & Newsletters"
  if (tag === "book") return "Books"
  if (tag === "guide") return "Individual posts"

  return tag.replaceAll("-", " ")
}

"use client"

import { clsx } from "clsx"
import NextLink from "next/link"

import ArrowDown from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { arrowsMoveSideways } from "@/app/conf/_design-system/utils/arrows-move-sideways"

import { BlogTags } from "./blog-tags"
import { BlogCardPicture } from "./blog-card-picture"

export interface BlogCardProps extends React.HTMLAttributes<HTMLElement> {
  frontMatter: {
    title: string
    date: Date
    tags: string[]
    byline: string
  }
  route: string
}

export function BlogCard({
  route,
  frontMatter,
  className,
  ...rest
}: BlogCardProps) {
  return (
    <div className="relative isolate">
      <BlogTags
        tags={frontMatter.tags}
        opaque
        className="absolute left-4 top-4 z-[1]"
        links
      />
      <NextLink
        href={route}
        onKeyDown={arrowsMoveSideways}
        data-vertical="3"
        className={clsx(
          className,
          "relative flex h-full flex-col bg-neu-0 ring-neu-300 ring-offset-[3px] ring-offset-neu-0 hover:ring-1 dark:ring-neu-100",
        )}
        {...rest}
      >
        <BlogCardPicture frontMatter={frontMatter} className="aspect-[4.75]" />
        <div className="flex grow flex-col border border-neu-200 dark:border-neu-50">
          <div className="typography-body-lg grow text-pretty p-4">
            {frontMatter.title}
          </div>
          <footer className="mt-auto flex items-end justify-between">
            <BlogCardFooterContent
              byline={frontMatter.byline}
              date={frontMatter.date}
              className="min-h-[73px] p-4"
            />
            <BlogCardArrow className="translate-x-px translate-y-px border-l border-t border-neu-200 p-4 dark:border-neu-50" />
          </footer>
        </div>
      </NextLink>
    </div>
  )
}

export function BlogCardArrow({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ArrowDown className="-rotate-90" />
    </div>
  )
}

export function BlogCardFooterContent({
  byline,
  date,
  className,
}: {
  byline: string
  date: Date
  className?: string
}) {
  return (
    <span
      className={clsx(
        "typography-menu flex flex-col justify-center gap-2",
        className,
      )}
    >
      <span>{byline}</span>
      <time
        dateTime={date.toISOString()}
        className="text-neu-700 dark:text-neu-400"
      >
        {date.toLocaleDateString("en", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })}
      </time>
    </span>
  )
}

export { BlogCardPicture } from "./blog-card-picture"

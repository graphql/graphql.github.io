import Link from "next/link"

import ArrowRightIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { BlogTags } from "@/components/blog-page/blog-tags"

export interface BlogPostRowProps {
  date: string
  category: string
  title: string
  href: string
  author: string
}

export function BlogPostListItem({
  date,
  category,
  title,
  href,
  author,
}: BlogPostRowProps) {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    })
    .replaceAll("/", "-")

  return (
    <Link
      href={href}
      className="group typography-menu col-span-full flex flex-col gap-2 p-4 hover:bg-neu-50 dark:hover:bg-neu-50/50 max-md:*:![grid-row:1] md:grid md:grid-cols-subgrid md:grid-rows-1 md:items-center md:gap-4 md:gap-x-6 md:gap-y-0 md:p-0 md:py-6 md:hover:-mx-2 md:hover:px-2"
    >
      <div className="order-1 md:order-none md:[grid-column:2]">
        <BlogTags tags={[category]} opaque />
      </div>
      <p className="typography-menu order-2 leading-[1.2] max-md:text-lg md:order-none md:truncate md:[grid-column:3]">
        {title}
      </p>
      <div className="order-3 flex items-center justify-between overflow-hidden font-mono text-sm uppercase md:contents">
        <div className="flex gap-4 max-md:max-w-[80%] md:contents">
          <time className="shrink-0 whitespace-pre text-neu-700 [grid-row:1] md:pr-6 md:[grid-column:1]">
            {formattedDate}
          </time>
          <span className="overflow-hidden truncate whitespace-nowrap text-neu-800 md:text-neu-700 md:[grid-column:4]">
            {author}
          </span>
        </div>
        <ArrowRightIcon className="size-8 shrink-0 -rotate-90 text-neu-800 md:text-neu-400 md:[grid-column:5] md:group-hover:text-neu-800" />
      </div>
    </Link>
  )
}

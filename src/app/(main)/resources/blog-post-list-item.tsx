import Link from "next/link"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
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
  return (
    <Link
      href={href}
      className="group typography-menu col-span-full grid grid-flow-row grid-cols-subgrid grid-rows-1 items-center gap-x-6 gap-y-px py-6 hover:-mx-2 hover:!border-transparent hover:bg-neu-50 hover:px-2 dark:hover:bg-neu-50/50 max-md:grid-rows-2"
    >
      <time className="pr-6 text-neu-700 [grid-column:1]">
        {formatDate(date)}
      </time>
      <div className="[grid-column:2] max-md:!row-span-1 max-md:[grid-column:1]">
        <BlogTags tags={[category]} opaque />
      </div>

      <p className="truncate [grid-column:3] max-md:[grid-column:2] max-md:[grid-row:0]">
        {title}
      </p>
      <p className="text-neu-700 [grid-column:4] max-md:[grid-column:2] max-md:[grid-row:1]">
        {author}
      </p>

      <div className="row-span-full pr-6 [grid-column:5] max-sm:hidden">
        <ArrowDownIcon className="size-8 -rotate-90 text-neu-400 group-hover:text-neu-800" />
      </div>
    </Link>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-")
}

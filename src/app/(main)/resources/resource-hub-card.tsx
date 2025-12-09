import Link from "next/link"
import { clsx } from "clsx"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import ClockIcon from "@/app/conf/_design-system/pixelarticons/clock.svg?svgr"
import { Tag } from "@/app/conf/_design-system/tag"

interface ResourceHubCardProps {
  href: string
  title: string
  author?: string
  duration?: string
  tags?: {
    label: string
    color: string
  }[]
  className?: string
}

export function ResourceHubCard({
  href,
  title,
  author,
  duration,
  tags,
  className,
}: ResourceHubCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group flex h-full flex-col border border-neu-200 bg-neu-50 text-left hover:ring hover:ring-neu-100 dark:hover:ring-neu-50",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-4 border-b border-neu-200 p-4 dark:border-neu-100 md:p-6">
        {tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Tag key={tag.label} color={tag.color}>
                {tag.label}
              </Tag>
            ))}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col justify-end">
          <h3 className="typography-h4 text-pretty text-neu-900 md:typography-h3">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-1 items-center justify-between p-4 md:p-6">
          {author && (
            <span className="typography-body-sm text-neu-800">{author}</span>
          )}
          {duration && (
            <span className="flex items-center gap-2 text-neu-800">
              <ClockIcon className="size-5" />
              <span className="typography-body-sm">{duration}</span>
            </span>
          )}
        </div>
        <div className="flex size-[53px] items-center justify-center border-l border-neu-200 dark:border-neu-100 md:size-[72px]">
          <ArrowDownIcon className="size-8 -rotate-90 md:size-10" aria-hidden />
        </div>
      </div>
    </Link>
  )
}

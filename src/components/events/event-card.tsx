import type { ReactNode } from "react"
import { clsx } from "clsx"

import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import { Tag } from "@/app/conf/_design-system/tag"

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const isoLikeDatePattern =
  /^(\d{4}-\d{2}-\d{2}|\d{4}\/?\d{2}\/?\d{2}|\d{2}\/\d{2}\/\d{4})/

function normaliseDate(value: EventCardProps["date"]) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value
  }

  if (typeof value === "string") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed
    }
  }

  return undefined
}

function formatDateLabel(value: EventCardProps["date"]) {
  const parsed = normaliseDate(value)

  if (parsed) {
    if (typeof value === "string" && !isoLikeDatePattern.test(value.trim())) {
      return value.trim() || undefined
    }

    return dateFormatter.format(parsed)
  }

  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }

  return undefined
}

export interface EventCardProps {
  href: string
  date?: Date | string | null
  city: ReactNode
  name: ReactNode
  meta?: ReactNode
  official?: boolean
}

export function EventCard({
  href,
  date,
  city,
  name,
  meta,
  official,
}: EventCardProps) {
  const dateLabel = formatDateLabel(date)
  const parsedDate = normaliseDate(date)

  return (
    <a
      href={href}
      className={clsx(
        "gql-focus-visible group flex min-w-[260px] flex-col overflow-hidden border border-neu-200 bg-neu-0 text-left text-current no-underline ring-neu-400 hover:bg-sec-base/[.035] hover:ring-1 hover:ring-offset-1 hover:ring-offset-neu-0 dark:border-neu-100 dark:ring-neu-100 xs:min-w-[352px]",
      )}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-1 flex-col">
        <div
          className={clsx(
            "flex items-center justify-between gap-2 px-2 text-neu-700 dark:text-neu-600 xs:px-4",
            meta
              ? "border-b border-neu-200 py-2.5 dark:border-neu-100"
              : "-mb-2 pt-2 xs:-mb-4 xs:pt-3",
          )}
        >
          {meta ? (
            <span className="typography-body-md font-medium">{meta}</span>
          ) : (
            <span className="sr-only">Official GraphQL Local</span>
          )}
          {official ? (
            <Tag color="hsl(var(--color-pri-base))" className="*:gap-1">
              <span className="font-sans" aria-hidden>
                ★
              </span>
              Official
            </Tag>
          ) : meta ? null : (
            <div className="h-[22px]" />
          )}
        </div>

        <div className="typography-h3 flex min-h-[100px] flex-1 flex-col justify-center px-2 py-3 text-neu-900 xs:min-h-[124px] xs:px-4 xs:py-6">
          {name}
        </div>

        <div
          className={clsx(
            "flex flex-wrap border-t border-neu-200 text-neu-700 dark:border-neu-100",
            dateLabel && city
              ? "grid grid-cols-2 divide-x divide-neu-200 dark:divide-neu-100"
              : "",
          )}
        >
          {dateLabel && (
            <div className="typography-body-sm flex items-center gap-1 px-2 py-1.5 text-neu-700 dark:text-neu-600 xs:gap-1.5 xs:px-4 xs:py-2.5">
              <CalendarIcon className="size-4 shrink-0 translate-y-[-.5px] text-neu-600 dark:text-neu-500 xs:size-5" />
              {parsedDate ? (
                <time dateTime={parsedDate.toISOString()}>{dateLabel}</time>
              ) : (
                <span>{dateLabel}</span>
              )}
            </div>
          )}
          {city && (
            <div className="typography-body-sm flex items-center gap-1.5 whitespace-pre px-2 py-1.5 text-neu-700 dark:text-neu-600 xs:px-4 xs:py-2.5">
              <PinIcon className="size-4 shrink-0 translate-y-[-.5px] text-neu-600 dark:text-neu-500 xs:size-5" />
              {city}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

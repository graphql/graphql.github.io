import type { ReactNode } from "react"
import { clsx } from "clsx"

import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import ClockIcon from "@/app/conf/_design-system/pixelarticons/clock.svg?svgr"

export interface EventCardProps {
  href: string
  date?: Date
  city: ReactNode
  name: ReactNode
  meta: ReactNode
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
  return (
    <a
      href={href}
      className={clsx(
        "flex rounded-none border border-neutral-300 text-current no-underline dark:border-neutral-700",
        "group transition-colors *:transition-colors hover:relative hover:!border-primary hover:shadow-2xl hover:shadow-primary/10",
        "relative after:absolute after:right-4 after:top-4 after:font-sans after:content-['_↗']",
      )}
      target="_blank"
      rel="noreferrer"
    >
      {date && date instanceof Date && (
        <div className="flex w-28 shrink-0 flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 group-hover:dark:bg-zinc-700 lg:w-48">
          <div className="text-5xl font-bold lg:text-7xl">{date.getDate()}</div>
          <div className="text-sm lg:text-lg">
            {date.toLocaleString("en", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      )}
      <div className="flex grow flex-col gap-4 bg-white px-5 py-4 dark:bg-neutral-900 group-hover:dark:bg-zinc-800 lg:px-10 lg:py-7">
        <b className="text-primary max-lg:text-xs">{meta}</b>
        <div className="text-lg font-bold lg:text-2xl">
          {name}
          {official ? (
            <>
              {" "}
              <span title="Official GraphQL Local">⭐️</span>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs lg:gap-x-6 lg:text-lg">
          <div className="flex items-center gap-2">
            <PinIcon className="size-5 fill-primary" />
            {city}
          </div>
          {date && (
            <div className="flex items-center gap-2">
              <ClockIcon className="size-5 fill-primary" />
              {date.toLocaleString("en", {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

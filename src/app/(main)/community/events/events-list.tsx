"use client"

import { useMemo, useState, type ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

import type { CalendarEvent } from "@/../scripts/sync-calendar-events/sync-calendar-events"

import { EventCard } from "./event-card"
import type { Event } from "./events"
import { EventFilterTag, EventKind } from "./event-filter-tag"

const PAGE_SIZE = 12

interface FilterChipProps extends ComponentPropsWithoutRef<"button"> {
  active?: boolean
  count?: number
}

export function FilterChip({
  active = false,
  children,
  className,
  count,
  disabled,
  type,
  ...props
}: FilterChipProps) {
  const showCount = typeof count === "number"

  return (
    <button
      type={type ?? "button"}
      aria-pressed={active}
      disabled={disabled}
      className={clsx(
        "gql-focus-visible typography-body-sm inline-flex h-9 items-center gap-2 border px-4 font-medium text-neu-700 transition-colors disabled:cursor-not-allowed disabled:opacity-40 dark:text-neu-200",
        active
          ? "border-neu-900 bg-neu-900 text-neu-0 dark:border-neu-0 dark:bg-neu-0 dark:text-neu-900"
          : "border-neu-200 hover:border-neu-500 dark:border-neu-100",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showCount ? (
        <span
          className={clsx(
            "roboto-mono text-xs font-semibold",
            active ? "text-current" : "text-neu-500 dark:text-neu-400",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}

type AnyEvent = Event | CalendarEvent

// NOTE: the order of this controls the order of the tag toggles
const DEFAULT_VISIBILITY = {
  conference: true,
  meetup: true,
  "working-group": false,
  "foundation-meeting": false,
  workshop: true,
} satisfies Record<EventKind, boolean>

const tags = Object.keys(DEFAULT_VISIBILITY) as EventKind[]

const DAY_IN_MS = 24 * 60 * 60 * 1000

// We want to show at least one of each WG, a month might be 31 days long and
// meetings are on the same week days, so we need the next multiple of 7 larger
// than 31; then plus half a day for DST changes.
const FUTURE_DAYS_TO_SHOW = 35.5

/** Sees if the date is in the next FUTURE_DAYS_TO_SHOW days; primarily for filtering working groups */
function isSoon(date: Date) {
  const maxTimestamp = Date.now() + FUTURE_DAYS_TO_SHOW * DAY_IN_MS
  return date.getTime() <= maxTimestamp
}

export function categorizeEvent(
  event: AnyEvent,
): EventKind | "duplicate" | null {
  if ("start" in event) {
    // From https://calendar.graphql.org
    const summary = event.summary ?? ""
    if (/\b(Subcommittee|Committee)\b/i.test(summary)) {
      return "foundation-meeting"
    } else if (/\bWorking\s*Session\b/i.test(summary)) {
      return "foundation-meeting"
    } else if (/\bGoverning\b/i.test(summary)) {
      return "foundation-meeting"
    } else if (/\bConference\s+Planning\b/i.test(summary)) {
      return "foundation-meeting"
    } else if (/\b(Local|Virtual\s+Meetup)\b/i.test(summary)) {
      return "meetup"
    } else if (/\bGraphQLConf[0-9]*\b/i.test(summary)) {
      // Handled elsewhere
      return "duplicate"
    } else if (/\bConference\b/i.test(summary)) {
      return "conference"
    } else {
      // Probably a working group
      return "working-group"
    }
  } else if ("slug" in event) {
    return event.kind ?? "conference"
  } else {
    // Uncategorized!
    if (process.env.NODE_ENV !== "production") {
      console.warn("Could not determine event type for event", event)
    }
    return null
  }
}

function isUrl(
  string: string | null | undefined,
): string is `http${"s" | ""}://${string}` {
  return string != null && /^https?:\/\//.test(string)
}

function calendarEventName(event: CalendarEvent) {
  let summary = event.summary
  if (summary) {
    summary = summary.replace(/^(Local|Conference)\s*[:-]\s*/i, "")
    return summary
  } else {
    return "Working Group"
  }
}

function calendarEventUrl(event: CalendarEvent) {
  // First, is the event location a non-zoom URL?
  if (isUrl(event.location) && !/zoom/i.test(event.location)) {
    return event.location
  }
  // Failing that, extract the first explicit link from the description
  const description = event.description
  if (description != null) {
    const text = description.replace(/<[^>]+>/g, " ")
    const matches = text.match(/\bhttps?:\/\/\S+/)
    if (matches) {
      return matches[0]
    }
  }
  // Failing that, use the calendar link
  return event.htmlLink
}

function calendarEventCity(event: CalendarEvent) {
  if (!event.location || isUrl(event.location)) {
    return "Online"
  }
  return event.location
}

export function EventsList({
  events: allEvents,
  className,
  children,
}: {
  events: AnyEvent[]
  className?: string
  children?: React.ReactNode
}) {
  const [kindFilters, setKindFilters] =
    useState<Record<EventKind, boolean>>(DEFAULT_VISIBILITY)
  const [limit, setLimit] = useState(PAGE_SIZE)

  const events = useMemo(() => {
    /** Determines if this event kind should be shown */
    const shouldShow = (kind: EventKind, date?: Date): boolean => {
      if (kind === "working-group" || kind === "foundation-meeting") {
        if (!date) return false
        // we filter out all working groups further in the future than 30 days
        if (!isSoon(date)) return false
      }
      return kindFilters[kind]
    }
    const events: AnyEvent[] = []

    for (const event of allEvents) {
      const kind = categorizeEvent(event)
      if (kind === null) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Could not determine event type for event", event)
        }
        // Uncategorized!
        continue
      } else if (kind === "duplicate") {
        // Doubly categorized; filter out
        continue
      } else if ("start" in event) {
        const date = new Date(event.start)
        if (shouldShow(kind, date)) {
          events.push(event)
        }
      } else {
        if (shouldShow(kind)) {
          events.push(event)
        }
      }
    }
    return events
  }, [allEvents, kindFilters])

  return (
    <div className={className}>
      <div className="mb-6 flex justify-between gap-2 max-lg:flex-col-reverse lg:mb-8 lg:items-end">
        <fieldset>
          <legend className="typography-menu mt-2">Event type</legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {tags.map(tag => (
              <EventFilterTag
                key={tag}
                kind={tag}
                checked={kindFilters[tag]}
                disabled={
                  tags.filter(kind => kindFilters[kind]).length === 1 &&
                  kindFilters[tag]
                }
                onChange={event => {
                  setKindFilters(prev => ({
                    ...prev,
                    [tag]: event.target.checked,
                  }))
                }}
              />
            ))}
          </div>
        </fieldset>
        {children}
      </div>
      <div className="flex flex-col gap-2">
        {events.slice(0, limit).map(event => {
          const kind = categorizeEvent(event)
          if (kind === "duplicate" || kind == null) {
            return null
          }
          return "start" in event ? (
            // It's from the calendar
            <EventCard
              key={event.id}
              href={calendarEventUrl(event)}
              date={new Date(event.start)}
              name={calendarEventName(event)}
              city={calendarEventCity(event)}
              kind={kind}
              compact
            />
          ) : (
            <EventCard
              key={event.slug}
              href={event.eventLink}
              date={new Date(event.date)}
              meta={event.host}
              name={event.name}
              city={event.location}
              kind={kind}
              compact
            />
          )
        })}
        {events.length > limit && (
          <button
            type="button"
            onClick={() => setLimit(limit + PAGE_SIZE)}
            className="gql-focus-visible typography-body-md border border-neu-200 py-3 text-neu-800 hover:bg-neu-100 dark:border-neu-50 dark:text-neu-600 dark:hover:bg-neu-50"
          >
            Load more
          </button>
        )}
        {events.length <= limit && tags.some(tag => !kindFilters[tag]) && (
          <button
            type="button"
            onClick={() =>
              setKindFilters(
                Object.fromEntries(tags.map(tag => [tag, true])) as Record<
                  EventKind,
                  boolean
                >,
              )
            }
            className="gql-focus-visible typography-body-md border border-neu-200 py-3 text-neu-800 hover:bg-neu-100 dark:border-neu-50 dark:text-neu-600 dark:hover:bg-neu-50"
          >
            Show all event types
          </button>
        )}
      </div>
    </div>
  )
}

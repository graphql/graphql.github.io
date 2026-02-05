"use client"

import { useMemo, useState, type ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

import type { WorkingGroupMeeting as CalendarEvent } from "@/../scripts/sync-working-groups/sync-working-groups"

import { EventCard } from "./event-card"
import { EventsScrollview } from "./events-scrollview"
import type { Event, Meetup } from "./events"
import { EventFilterTag, EventKind } from "./event-filter-tag"

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

type AnyEvent = Event | Meetup | CalendarEvent

const DEFAULT_VISIBILITY = {
  meetup: true,
  conference: true,
  "working-group": true,
  "foundation-meeting": true,
} satisfies Record<EventKind, boolean>

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

function categorizeEvent(event: AnyEvent): EventKind | "duplicate" | null {
  if ("node" in event) {
    return "meetup"
  } else if ("start" in event) {
    // From https://calendar.graphql.org
    const summary = event.summary ?? ""
    if (/\b(Subcommittee|Committee)\b/i.test(summary)) {
      return "foundation-meeting"
    } else if (/\bGoverning\b/i.test(summary)) {
      return "foundation-meeting"
    } else if (/\bLocal\b/i.test(summary)) {
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
    return "conference"
  } else {
    // Uncategorized!
    if (process.env.NODE_ENV !== "production") {
      console.warn("Could not determine event type for event", event)
    }
    return null
  }
}

function isUrl(string: string | null | undefined): string is string {
  return string != null && /^https?:\/\//.test(string)
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
  const [kindFilters, setKindFilters] = useState(DEFAULT_VISIBILITY)

  const { events, tags } = useMemo(() => {
    const tags: Set<EventKind> = new Set()
    /** Determines if this event kind should be shown, and if so ensures the tag is present in tags */
    const shouldShow = (kind: EventKind, date?: Date): boolean => {
      if (kind === "working-group" || kind === "foundation-meeting") {
        if (!date) return false
        // we filter out all working groups further in the future than 30 days
        if (!isSoon(date)) return false
      }
      tags.add(kind)
      return kindFilters[kind]
    }
    const events = allEvents.filter(event => {
      const kind = categorizeEvent(event)
      if (kind === null) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Could not determine event type for event", event)
        }
        // Uncategorized!
        return false
      }
      if (kind === "duplicate") {
        // Doubly categorized; filter out
        return false
      } else if ("start" in event) {
        const date = new Date(event.start)
        return shouldShow(kind, date)
      } else {
        return shouldShow(kind)
      }
    })
    return { events, tags }
  }, [allEvents, kindFilters])

  return (
    <div className={className}>
      <div className="flex justify-between gap-2 max-lg:flex-col-reverse lg:mb-8 lg:items-end">
        <fieldset>
          <legend className="typography-menu mt-2">Event type</legend>
          <div className="mt-4 flex gap-3">
            {Array.from(tags).map(tag => (
              <EventFilterTag
                key={tag}
                kind={tag}
                checked={kindFilters[tag]}
                disabled={
                  Object.values(kindFilters).filter(Boolean).length === 1 &&
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
      <EventsScrollview>
        {events.map(event => {
          const kind = categorizeEvent(event)
          if (kind === "duplicate" || kind == null) {
            return null
          }
          return "node" in event ? (
            <EventCard
              key={event.node.id}
              name={event.node.name}
              href={event.node.link}
              city={event.node.city + ", " + event.node.country}
              date={event.node.next || event.node.prev}
              kind={kind}
            />
          ) : "start" in event ? (
            <EventCard
              key={event.id}
              href={isUrl(event.location) ? event.location : event.htmlLink}
              date={new Date(event.start)}
              name={event.summary ?? "Working Group"}
              city={
                !event.location || isUrl(event.location)
                  ? "Online"
                  : event.location
              }
              kind={kind}
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
            />
          )
        })}
      </EventsScrollview>
    </div>
  )
}

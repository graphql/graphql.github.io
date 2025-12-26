"use client"

import { useState, type ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

import type { WorkingGroupMeeting } from "@/../scripts/sync-working-groups/sync-working-groups"

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

type AnyEvent = Event | Meetup | WorkingGroupMeeting

const ALL_SHOWN = {
  meetup: true,
  conference: true,
  "working-group": true,
} satisfies Record<EventKind, boolean>

export function EventsList({
  events,
  className,
  children,
}: {
  events: AnyEvent[]
  className?: string
  children?: React.ReactNode
}) {
  const [kindFilters, setKindFilters] = useState(ALL_SHOWN)

  const tags: Set<EventKind> = new Set()
  events.forEach(event => {
    if ("start" in event) tags.add("working-group")
    else if ("node" in event) tags.add("meetup")
    else tags.add("conference")
  })

  events = events.filter(event => {
    if ("node" in event) {
      return kindFilters.meetup
    }
    if ("start" in event) {
      return kindFilters["working-group"]
    }
    if ("slug" in event) {
      return kindFilters.conference
    }
  })

  // we filter out all working groups further in the future than 30 days
  const FUTURE_DAYS_TO_SHOW = 30
  const DAY_IN_MS = 24 * 60 * 60 * 1000
  const thirtyDaysFromNow = Date.now() + FUTURE_DAYS_TO_SHOW * DAY_IN_MS
  events = events.filter(event => {
    if ("start" in event) {
      return new Date(event.start).getTime() <= thirtyDaysFromNow
    }
    return true
  })

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
        {events.map(event =>
          "node" in event ? (
            <EventCard
              key={event.node.id}
              name={event.node.name}
              href={event.node.link}
              city={event.node.city + ", " + event.node.country}
              date={event.node.next || event.node.prev}
              kind="meetup"
            />
          ) : "start" in event ? (
            <EventCard
              key={event.id}
              href={event.htmlLink}
              date={new Date(event.start)}
              name={event.summary ?? "Working Group"}
              city="Online" // event.location is a zoom link, we could potentially use but we'd have to refactor the event-card to avoid nested anchors
              kind="working-group"
            />
          ) : (
            <EventCard
              key={event.slug}
              href={event.eventLink}
              date={new Date(event.date)}
              meta={event.host}
              name={event.name}
              city={event.location}
              kind="conference"
            />
          ),
        )}
      </EventsScrollview>
    </div>
  )
}

import React, { Fragment } from "react"
import { ics, google, outlook, CalendarEvent } from "calendar-link"
import { clsx } from "clsx"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { stripHtml } from "string-strip-html"

import { SchedSpeaker, ScheduleSession } from "@/app/conf/_api/sched-types"
import { Anchor } from "@/app/conf/_design-system/anchor"
import { Tag } from "@/app/conf/_design-system/tag"

import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import ClockIcon from "@/app/conf/_design-system/pixelarticons/clock.svg?svgr"

import { getEventTitle } from "../../utils"
import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { formatBlockTime } from "./format-block-time"

function isString(x: unknown): x is string {
  return Object.prototype.toString.call(x) === "[object String]"
}

export function ScheduleSessionCard({
  session,
  basePath,
  eventsColors,
  blockEnd,
  durationVisible,
}: {
  session: ScheduleSession
  basePath: string
  eventsColors: Record<string, string>
  blockEnd: Date
  durationVisible: boolean
}) {
  let eventType = session.event_type

  if (
    session.event_type === "GraphQL in Production" ||
    session.event_type === "Developer Experience" ||
    session.event_type === "Session Presentations"
  ) {
    eventType = session.event_subtype
  }

  const speakers = session.speakers
    ? isString(session.speakers)
      ? (session.speakers as string)
          .split(",")
          .map(name => ({ name, username: "" }))
      : (session.speakers as SchedSpeaker[])
    : []

  const eventTitle = getEventTitle(
    session,
    speakers.map(s => s.name),
  )

  if (eventType === eventTitle) eventType = ""

  const eventColor =
    eventsColors[session.event_subtype] || eventsColors[session.event_type]

  let blockTimeFraction = 1
  if (blockEnd.getTime() !== new Date(session.event_end).getTime()) {
    blockTimeFraction =
      (new Date(session.event_end).getTime() -
        new Date(session.event_start).getTime()) /
      (blockEnd.getTime() - new Date(session.event_start).getTime())
  }

  return session.event_type === "Breaks" ? (
    <div className="flex size-full items-center bg-neu-0 px-4 py-2 font-normal">
      {eventTitle}
    </div>
  ) : (
    <div
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className={clsx(
        "[--bg:hsl(var(--color-neu-0))] [&:has(>a:hover)]:[--bg:hsl(var(--color-neu-0)/.9)] dark:[&:has(>a:hover)]:[--bg:hsl(var(--color-neu-0)/.8)]",
        "group relative size-full p-4 font-normal no-underline ring-neu-400 @container focus-visible:z-[1] dark:ring-neu-100 [&:has(>a:hover)]:ring-1",
        blockTimeFraction < 1 && "[--bg:hsl(var(--color-neu-0)/50)]",
      )}
      style={
        {
          "--time": `${blockTimeFraction * 100}%`,
          background:
            blockTimeFraction < 1
              ? `linear-gradient(to bottom, var(--bg), var(--bg) var(--time), hsl(var(--color-neu-0)/.8) var(--time), hsl(var(--color-neu-0)/.8))`
              : "var(--bg)",
        } as {}
      }
    >
      <Anchor
        id={`session-${session.id}`}
        href={`${basePath}/schedule/${session.id}?name=${session.name}`}
        className="absolute inset-0 z-[1] ring-inset ring-neu-400 hover:ring-1 dark:ring-neu-100"
        aria-label={`Read more about "${eventTitle}" by ${speakers
          .map(s => s.name)
          .join(", ")}`}
      />
      <span className="flex h-full flex-col justify-start">
        {eventType && (
          <Tag
            className="mb-3"
            color={eventColor || "hsl(var(--color-neu-300))"}
          >
            {eventType}
          </Tag>
        )}
        <span className="flex h-full flex-col justify-between gap-y-2">
          <span className="typography-body-md">{eventTitle}</span>
          <span className="flex flex-col">
            {(speakers?.length || 0) > 0 && (
              <span className="typography-body-sm">
                {speakers.map((s, i) => (
                  <React.Fragment key={s.username || s.name}>
                    {s.username ? (
                      <Anchor
                        href={`${basePath}/speakers/${s.username}`}
                        className="relative z-[2] decoration-neu-600 hover:underline dark:decoration-neu-200"
                      >
                        {s.name}
                      </Anchor>
                    ) : (
                      s.name
                    )}
                    {i !== speakers.length - 1 && <span>, </span>}
                  </React.Fragment>
                ))}
              </span>
            )}
            <span className="mt-4 flex items-center gap-2 xl:mt-6">
              {session.venue && (
                <span className="typography-body-xs flex items-center gap-0.5">
                  <PinIcon className="size-4 text-pri-base [@container(width<240px)]:hidden" />
                  {session.venue}
                </span>
              )}
              {durationVisible && <SessionDuration session={session} />}
              <AddToCalendarLink
                eventTitle={eventTitle}
                session={session}
                speakers={session.speakers || []}
                className="ml-auto [&_[data-text]]:hidden @[300px]:[&_[data-text]]:inline"
              />
            </span>
          </span>
        </span>
      </span>
    </div>
  )
}

function SessionDuration({
  session,
}: {
  session: ScheduleSession
}): React.ReactNode {
  const durationMs =
    new Date(session.event_end).getTime() -
    new Date(session.event_start).getTime()

  // if a session is longer than 3 hours, we show the time range
  const formattedTime =
    durationMs > 1000 * 60 * 60 * 3
      ? formatBlockTime(session.event_start, new Date(session.event_end))
      : `${Math.round(durationMs / (1000 * 60))} min`

  return (
    <span className="typography-body-xs flex items-center gap-0.5">
      <ClockIcon className="size-4 text-pri-base [@container(width<240px)]:hidden" />
      {formattedTime}
    </span>
  )
}

function AddToCalendarLink({
  eventTitle,
  session,
  speakers,
  className,
}: {
  eventTitle: string
  session: ScheduleSession
  speakers: SchedSpeaker[]
  className?: string
}) {
  const calendarEvent: CalendarEvent = {
    title: eventTitle,
    start: session.event_start,
    end: session.event_end,
    description: stripHtml(session.description).result,
    location: session.venue,
    organizer: {
      name: `GraphQL Day ${new Date().getFullYear()}`,
      email: "graphql_events@linuxfoundation.org",
    },
    guests: speakers.map(s => s.name),
  }

  const calendars = {
    ICS: ics,
    Google: google,
    Outlook: outlook,
  }

  return (
    <Menu
      as="div"
      className={clsx("relative z-[2] inline-block text-left", className)}
    >
      <div>
        <MenuButton
          className={clsx(
            "inline-flex w-full items-center justify-center gap-0.5 p-1",
            "ring-neu-400 hover:bg-neu-50/50 hover:ring-1 focus:outline-none focus:ring-1 dark:ring-neu-100 [&[aria-expanded=true]]:ring-2",
          )}
        >
          <CalendarIcon className="size-4 shrink-0 text-pri-base" />
          <span data-text className="typography-body-xs">
            Add to calendar
          </span>
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="mt-2 w-40 origin-top-right border border-neu-400 bg-neu-0 focus:outline-none"
        >
          <div className="p-1">
            {Object.entries(calendars).map(([name, calendar]) => (
              <MenuItem key={name}>
                <a
                  href={calendar(calendarEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group typography-body-xs flex w-full items-center px-2 py-1 text-neu-800 [&[data-active]]:bg-neu-100 [&[data-active]]:text-neu-900 dark:[&[data-active]]:bg-neu-50"
                >
                  {name}
                </a>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

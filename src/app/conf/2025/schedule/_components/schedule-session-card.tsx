import React from "react"

import { SchedSpeaker, ScheduleSession } from "@/app/conf/_api/sched-types"
import { Anchor } from "@/app/conf/_design-system/anchor"
import { Tag } from "@/app/conf/_design-system/tag"

import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"

import { getEventTitle } from "../../utils"

function isString(x: unknown): x is string {
  return Object.prototype.toString.call(x) === "[object String]"
}

export function ScheduleSessionCard({
  session,
  year,
  eventsColors,
}: {
  session: ScheduleSession
  year: `202${number}`
  eventsColors: Record<string, string>
}) {
  let eventType = session.event_type

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

  const eventColor = eventsColors[session.event_type]

  return session.event_type === "Breaks" ? (
    <div className="flex size-full items-center bg-neu-0 px-4 py-2 font-normal">
      {eventTitle}
    </div>
  ) : (
    <div className="group relative size-full bg-neu-0 p-4 font-normal no-underline ring-neu-400 focus-visible:z-[1] dark:ring-neu-100 dark:hover:bg-neu-0/80 [&:has(>a:hover)]:bg-neu-0/90 [&:has(>a:hover)]:ring-1">
      <Anchor
        id={`session-${session.id}`}
        href={`/conf/${year}/schedule/${session.id}?name=${session.name}`}
        className="absolute inset-0 z-[1] ring-inset ring-neu-400 hover:ring-1 dark:ring-neu-100"
        aria-label={`Read more about "${eventTitle}" by ${speakers.map(s => s.name).join(", ")}`}
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
                        href={`/conf/${year}/speakers/${s.username}`}
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
            <span className="typography-body-xs mt-2 flex items-center gap-0.5">
              <PinIcon className="size-4 text-pri-base" />
              {session.venue}
            </span>
          </span>
        </span>
      </span>
    </div>
  )
}

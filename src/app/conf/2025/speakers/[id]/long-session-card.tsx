import { clsx } from "clsx"
import { ics } from "calendar-link"

import { SchedSpeaker, ScheduleSession } from "@/app/conf/2023/types"
import { Button } from "@/app/conf/_design-system/button"
import { Anchor } from "@/app/conf/_design-system/anchor"
import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import ClockIcon from "@/app/conf/_design-system/pixelarticons/clock.svg?svgr"
import PlusIcon from "@/app/conf/_design-system/pixelarticons/plus.svg?svgr"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"
import { findVideo } from "../../schedule/[id]/session-video"
import { getEventTitle } from "../../utils"
import React from "react"
import { SessionTags } from "../../components/session-tags"

export interface LongSessionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  session: ScheduleSession
  eventColors?: Record<string, string>
}

export function LongSessionCard({
  session,
  className,
  ...props
}: LongSessionCardProps) {
  const eventStart = new Date(session.event_start)

  const formattedDate = eventStart.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  })

  const year = eventStart.getFullYear()

  const formattedTime = eventStart.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const eventTitle = getEventTitle(
    session,
    session.speakers?.map(s => s.name) || [],
  )
  const video = findVideo(session, eventTitle)

  const eventDurationMs =
    new Date(session.event_end).getTime() -
    new Date(session.event_start).getTime()

  const speakers = session.speakers || []

  return (
    <div
      className={clsx(
        "group relative flex flex-col justify-between border border-neu-200 bg-neu-0 dark:border-neu-100",
        className,
      )}
      {...props}
    >
      <Anchor
        href={`/conf/${year}/schedule/${session.id}?name=${session.name}`}
        className="absolute inset-0 z-[1] ring-inset ring-neu-400 hover:bg-sec-base/[.035] hover:ring-1 dark:ring-neu-100"
        aria-label={`Read more about "${eventTitle}" by ${session.speakers?.[0]?.name || "Speaker"}`}
      />

      <div className="flex flex-col gap-6 p-4 lg:p-6">
        <div className="flex items-start justify-between gap-6">
          <SessionTags session={session} />
          {year !== new Date().getFullYear() && (
            <div className="flex items-center gap-2 border border-neu-400 bg-neu-100 px-2 py-1 dark:border-neu-100 dark:bg-neu-50">
              <span className="typography-menu text-neu-900">{year}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="min-h-[32px]">
            <h3 className="typography-body-lg text-neu-900 2xl:text-2xl">
              {eventTitle}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-2">
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
            {video && (
              // ideally, we'd display the duration of the video, not the projected duration of the talk
              <div className="flex shrink-0 items-center gap-0.5">
                <ClockIcon className="size-3" />
                <span className="typography-body-xs text-neu-800">
                  {Math.round(eventDurationMs / (1000 * 60))} min
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {video ? (
        <footer className="p-4 pt-0 lg:px-6 lg:pb-6">
          <Button
            href={`https://youtube.com/embed/${video.id}`}
            variant="primary"
            className="relative z-[2] w-full"
          >
            Watch
            <PlayIcon className="size-6" />
          </Button>
        </footer>
      ) : (
        <footer className="flex items-center border-t border-neu-200 text-neu-800 dark:border-neu-100">
          <div className="flex flex-1 items-center gap-2 border-r border-neu-200 p-4 dark:border-neu-100 lg:gap-4 lg:p-6 xl:gap-6">
            <div className="flex items-center gap-0.5 whitespace-pre">
              <CalendarIcon className="size-4 shrink-0 -translate-y-px text-sec-dark" />
              <span className="typography-body-xs">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <ClockIcon className="size-4 shrink-0 text-sec-dark" />
              <span className="typography-body-xs">{formattedTime}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <PinIcon className="size-4 shrink-0 text-sec-dark" />
              <span className="typography-body-xs">{session.venue}</span>
            </div>
          </div>
          {year === new Date().getFullYear() && (
            <AddToCalendarLink
              eventTitle={eventTitle}
              session={session}
              speakers={speakers}
            />
          )}
        </footer>
      )}
    </div>
  )
}

function AddToCalendarLink({
  eventTitle,
  session,
  speakers,
}: {
  eventTitle: string
  session: ScheduleSession
  speakers: SchedSpeaker[]
}) {
  return (
    <a
      className="relative z-[2] flex h-full flex-row items-center justify-center gap-0.5 p-4 text-neu-800 ring-inset ring-neu-400 hover:bg-sec-base/[.035] hover:ring-1 dark:ring-neu-100 lg:px-6"
      href={ics({
        title: eventTitle,
        start: session.event_start,
        end: session.event_end,
        description: session.description,
        location: session.venue,
        organizer: {
          name: `GraphQLConf ${new Date().getFullYear()}`,
          email: "graphql_events@linuxfoundation.org",
        },
        guests: speakers.map(s => s.name),
      })}
    >
      <PlusIcon className="size-4 shrink-0 text-sec-dark" />
      <span className="typography-body-xs">Add to calendar</span>
    </a>
  )
}

import React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import clsx from "clsx"

import { metadata as layoutMetadata } from "@/app/conf/2023/layout"

import { speakers, schedule } from "../../_data"
import { ScheduleSession } from "../../../2023/types"

import { findVideo, SessionVideo } from "./session-video"
import { NavbarPlaceholder } from "../../components/navbar"
import { BackLink } from "../_components/back-link"
import { getEventTitle, HERO_MARQUEE_ITEMS } from "../../utils"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { SpeakerCard } from "../../components/speaker-card"
import { Anchor } from "@/app/conf/_design-system/anchor"
import { MarqueeRows } from "../../components/marquee-rows"
import { GET_TICKETS_LINK } from "../../links"
import { CtaCardSection } from "../../components/cta-card-section"
import { Button } from "@/app/conf/_design-system/button"
import { SessionTags } from "../../components/session-tags"
import { formatDescription } from "./format-description"
import { formatBlockTime } from "../_components/format-block-time"
import DownloadIcon from "@/app/conf/_design-system/pixelarticons/download.svg?svgr"

type SessionProps = { params: { id: string } }

export function generateMetadata({ params }: SessionProps): Metadata {
  const event = schedule.find(s => s.id === params.id)

  if (!event) {
    throw new Error(`Session "${params.id}" not found`)
  }

  const keywords = [
    event.event_type,
    event.audience,
    event.event_subtype,
    ...(event.speakers || []).map(s => s.name),
  ].filter(Boolean)

  return {
    title: event.name,
    description: event.description,
    keywords: [...layoutMetadata.keywords, ...keywords],
  }
}

export function generateStaticParams() {
  return schedule.filter(s => s.id).map(s => ({ id: s.id }))
}

export default function SessionPage({ params }: SessionProps) {
  const session = schedule.find(s => s.id === params.id)
  if (!session) {
    notFound()
  }

  session.speakers = (session.speakers || []).map(speaker => {
    const s = speakers.find(s => s.username === speaker.username)
    if (!s) {
      throw new Error(
        `Speaker "${speaker.username}" not found for "${session.name}"`,
      )
    }
    return s
  })

  const eventTitle = getEventTitle(
    session,
    session.speakers!.map(s => s.name),
  )

  const video = findVideo(session, eventTitle)

  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-50 before:bg-neu-50/40 dark:bg-neu-0 dark:before:bg-blk/30" />
      <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-neu-50/40 before:dark:bg-blk/30">
        <div className="bg-neu-50 dark:bg-neu-0">
          <div className="gql-container">
            <div className="gql-section !py-0 max-xs:px-0">
              <div className="border-neu-200 pt-8 dark:border-neu-100 xs:border-x 2xl:pt-16">
                <SessionHeader
                  event={session}
                  eventTitle={eventTitle}
                  year="2025"
                  className={clsx(
                    "px-2 sm:px-3",
                    video && "mx-auto max-w-[1088px]",
                  )}
                />
                {video ? (
                  <SessionVideo video={video} className="mt-6" />
                ) : (
                  <Hr className="mt-10 2xl:mt-16" />
                )}

                {session.description && (
                  <>
                    <SessionDescription session={session} />
                    <Hr />
                  </>
                )}

                {!!session.speakers?.length && (
                  <>
                    <h3 className="typography-h2 my-8 max-w-[408px] px-2 sm:px-3 lg:my-16">
                      Session speakers
                    </h3>
                    <SessionSpeakers
                      session={session}
                      className="-mx-px -mb-px last:xl:pb-24"
                    />
                  </>
                )}

                {!!session.files?.length && (
                  <>
                    <Hr />

                    <h3 className="typography-h2 my-8 px-2 sm:px-3 lg:my-16">
                      Session resources
                    </h3>
                    <ul className="flex max-w-full flex-col gap-y-2">
                      {session.files?.map(({ path, name }) => (
                        <li key={path}>
                          {path.endsWith(".pdf") && canRenderPdf() ? (
                            <iframe
                              src={path}
                              className="aspect-video size-full"
                            />
                          ) : null}
                          <div className="flex items-stretch justify-between overflow-hidden">
                            <a
                              className="typography-link flex items-center truncate p-3 leading-none text-neu-700 max-xs:hidden sm:px-6"
                              href={path}
                            >
                              <span className="inline-block truncate">
                                {name}
                              </span>
                            </a>
                            <Button
                              href={path}
                              variant="tertiary"
                              className="shrink-0"
                              download
                            >
                              Download
                              <DownloadIcon className="size-6" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neu-200 bg-neu-0 py-8 dark:border-neu-100 xl:py-16">
          <div className="gql-container">
            <CtaCardSection
              title="Get your ticket"
              description="Join three transformative days of expert insights and innovation to shape the next decade of APIs!"
            >
              <Button
                disabled
                className="opacity-55"
                variant="primary"
                href={GET_TICKETS_LINK}
              >
                Sold out
              </Button>
            </CtaCardSection>
            <div className="py-8">
              <MarqueeRows variant="secondary" items={HERO_MARQUEE_ITEMS} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function SessionHeader({
  event,
  eventTitle,
  year,
  className,
}: {
  event: ScheduleSession
  eventTitle: string | null
  year: number | `${number}`
  className?: string
}) {
  const speakers = event.speakers || []

  return (
    <header className={className}>
      <BackLink year="2025" kind="schedule" />
      <p
        className={clsx(
          "mt-8 text-neu-700",
          speakers.length >= 4 ? "typography-body-lg" : "typography-h3",
        )}
      >
        {speakers.map((s, i) => (
          <React.Fragment key={s.username}>
            <Anchor
              href={`/conf/${year}/speakers/${s.username}`}
              className="decoration-neu-500 hover:underline dark:decoration-neu-100"
            >
              {s.name}
            </Anchor>
            {i !== speakers.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </p>
      <h1 className="typography-h2 mb-6 mt-3">{eventTitle}</h1>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="typography-body-md flex flex-col gap-2 md:flex-row md:gap-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-sec-darker dark:text-sec-light/90 sm:size-6" />
            <time dateTime={event.event_start}>
              {new Date(event.event_start).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
              })}
              {", "}
              {formatBlockTime(
                event.event_start,
                event.event_end ? new Date(event.event_end) : undefined,
              )}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <PinIcon className="size-5 text-sec-darker dark:text-sec-light/90 sm:size-6" />
            <span>{event.venue}</span>
          </div>
        </div>
        <SessionTags session={event} />
      </div>
    </header>
  )
}

function SessionSpeakers({
  session: event,
  className,
}: {
  session: ScheduleSession
  className?: string
}) {
  return (
    <div
      className={clsx(
        "grid lg:grid-cols-2 lg:gap-5 max-lg:[&>*:not(:last-child)]:border-b-0",
        className,
      )}
    >
      {event.speakers?.map(speaker => (
        <SpeakerCard key={speaker.username} speaker={speaker} year="2025" />
      ))}
    </div>
  )
}

function Hr({ className }: { className?: string }) {
  return (
    <hr
      className={clsx(
        "ml-[-50vw] w-[200vw] border-neu-200 dark:border-neu-100",
        className,
      )}
    />
  )
}

function SessionDescription({ session }: { session: ScheduleSession }) {
  const formattedDescription = formatDescription(session.description || "")

  return (
    <div className="mt-8 flex gap-4 px-2 pb-8 max-lg:flex-col sm:px-3 lg:mt-16 lg:gap-8 xl:pb-16">
      <h3 className="typography-h2 min-w-[320px]">Session description</h3>
      <p
        className="typography-body-lg whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          // the description was partially sanitized when syncinc data from sched
          __html: formattedDescription,
        }}
      />
    </div>
  )
}

const isFirefox = navigator.userAgent.toLowerCase().includes("firefox")

function canRenderPdf() {
  return !isFirefox && !!navigator?.mimeTypes?.["application/pdf" as any]
}

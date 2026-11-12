import { Metadata } from "next"
import { notFound } from "next/navigation"

import { formatDescription } from "@/app/conf/2026/schedule/[id]/format-description"

import { findDayTalk, getDayTalkParams } from "../../../day-events"
import { NavbarPlaceholder } from "../../../components/navbar"
import { BackLink } from "../../../components/schedule/back-link"
import {
  Hr,
  SessionHeader,
  SessionSpeakers,
} from "../../../components/event-schedule-section"

type TalkProps = { params: { city: string; id: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return getDayTalkParams()
}

export function generateMetadata({ params }: TalkProps): Metadata {
  const talk = findDayTalk(params.city, params.id)
  if (!talk) notFound()

  const { event, session } = talk
  const speakers = session.speakers.map(s => s.name).join(", ")
  const description = session.description
    .replace(/<[^>]+>/g, " ")
    .replace(/&[lr]dquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()

  return {
    title: session.title,
    description: speakers ? `${speakers}: ${description}` : description,
    keywords: [
      event.city,
      ...session.tags,
      ...session.speakers.map(s => s.name),
    ],
  }
}

export default function TalkPage({ params }: TalkProps) {
  const talk = findDayTalk(params.city, params.id)
  if (!talk) notFound()

  const { event, session } = talk

  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-neu-50/50 dark:before:bg-blk/40" />
      <main className="gql-all-anchors-focusable overflow-hidden border-b border-neu-200 bg-neu-50 dark:border-neu-100 dark:bg-neu-50/25">
        <div className="gql-container">
          <div className="gql-section !py-0 max-xs:px-0">
            <article className="border-neu-200 pt-8 dark:border-neu-100 xs:border-x 2xl:pt-16">
              <div className="px-2 sm:px-3">
                <BackLink
                  href={`/day/2026/${params.city}/#schedule`}
                  label={`GraphQL Day ${event.city} schedule`}
                />
              </div>
              <SessionHeader
                session={session}
                heading={
                  <h1 className="typography-h2 mb-6 mt-8">{session.title}</h1>
                }
                timezone={event.timezone}
                tagColors={event.tagColors}
                className="px-2 pb-8 sm:px-3 lg:pb-12"
              />
              {session.description && (
                <>
                  <Hr />
                  <div
                    className="typography-body-lg px-2 py-8 sm:px-3 lg:py-12 [&>p+p]:mt-4 [&_a]:break-words"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(session.description),
                    }}
                  />
                </>
              )}
              {session.speakers.length > 0 && (
                <>
                  <Hr />
                  <SessionSpeakers
                    speakers={session.speakers}
                    className="-mx-px -mb-px"
                  />
                </>
              )}
            </article>
          </div>
        </div>
      </main>
    </>
  )
}

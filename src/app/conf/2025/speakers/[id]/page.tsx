import { Metadata } from "next"
import React from "react"
import Image from "next/image"
import clsx from "clsx"

import { SchedSpeaker, ScheduleSession } from "@/app/conf/2023/types"
import { Button } from "@/app/conf/_design-system/button"

import { previousEditionSessions, speakers, speakerSessions } from "../../_data"
import { metadata as layoutMetadata } from "../../layout"
import { HERO_MARQUEE_ITEMS } from "../../utils"
import { BackLink } from "../../schedule/_components/back-link"
import { NavbarPlaceholder } from "../../components/navbar"
import { CtaCardSection } from "../../components/cta-card-section"
import { MarqueeRows } from "../../components/marquee-rows"
import { GET_TICKETS_LINK } from "../../links"
import { SpeakerTags } from "../../components/speaker-tags"
import { SpeakerLinks } from "../../components/speaker-links"
import { LongSessionCard } from "./long-session-card"
import { formatDescription } from "../../schedule/[id]/format-description"
import { getBase64Placeholder } from "../../../_design-system/utils/get-base64-placeholder"

type SpeakerProps = { params: { id: string } }

export function generateMetadata({ params }: SpeakerProps): Metadata {
  const decodedId = decodeURIComponent(params.id)
  const speaker = speakers.find(s => s.username === decodedId)

  if (!speaker) {
    throw new Error(`Speaker "${decodedId}" not found for details page`)
  }

  const keywords = [speaker.name, speaker.company, speaker.position].filter(
    Boolean,
  ) as string[]

  return {
    title: speaker.name,
    description: speaker.about,
    keywords: [...layoutMetadata.keywords, ...keywords],
  }
}

export function generateStaticParams() {
  return speakers.map(s => ({ id: s.username }))
}

export default function SpeakerPage({ params }: SpeakerProps) {
  const speaker = speakers.find(s => s.username === params.id)

  if (!speaker) {
    throw new Error(`Speaker "${params.id}" not found for details page`)
  }

  const currentYearSessions = speakerSessions.get(speaker.username) || []
  const previousSessions = previousEditionSessions.get(speaker.username) || []

  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-50 before:bg-neu-50/40 dark:bg-neu-0 dark:before:bg-blk/30" />
      <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-neu-50/40 before:dark:bg-blk/30">
        <div className="bg-neu-50 dark:bg-neu-0">
          <div className="gql-container">
            <div className="gql-section !py-0 max-xs:px-0">
              <div className="border-neu-200 dark:border-neu-100 xs:border-x">
                <SpeakerHeader
                  speaker={speaker}
                  year="2025"
                  className="border-b border-neu-200 dark:border-neu-100"
                />

                <div className="flex justify-end">
                  <SpeakerLinks
                    size="lg"
                    speaker={speaker}
                    className="!border-r-0 !border-t-0"
                  />
                </div>

                {speaker.about && (
                  <p
                    className="typography-body-lg mx-auto box-content max-w-[800px] px-4 py-8 lg:px-8 lg:py-16 xl:px-24 xl:pb-24 xl:text-[32px]"
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(speaker.about),
                    }}
                  />
                )}

                {currentYearSessions.length > 0 && (
                  <>
                    <Hr />
                    <h3 className="typography-h2 my-8 px-2 sm:px-3 lg:my-16">
                      2025 Sessions
                    </h3>
                    <SpeakerSessions
                      sessions={currentYearSessions}
                      className="-mx-px -mb-px"
                    />
                  </>
                )}

                {previousSessions.length > 0 && (
                  <>
                    <Hr />
                    <h3 className="typography-h2 my-8 px-2 sm:px-3 lg:my-16">
                      Sessions from previous editions
                    </h3>
                    <SpeakerSessions
                      sessions={previousSessions}
                      className="-mx-px -mb-px"
                    />
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

async function SpeakerHeader({
  speaker,
  year,
  className,
}: {
  speaker: SchedSpeaker
  year: `20${number}`
  className?: string
}) {
  if (speaker.avatar?.startsWith("//"))
    speaker.avatar = `https:${speaker.avatar}`

  const avatarPlaceholder =
    speaker.avatar && (await getBase64Placeholder(speaker.avatar))

  return (
    <header
      className={clsx("flex justify-between gap-4 max-md:flex-col", className)}
    >
      <div className="pl-2 pt-8 sm:pl-3 2xl:pl-24 2xl:pr-16 2xl:pt-16">
        <BackLink year={year} kind="schedule" />
        <p className="typography-body-lg mt-4 text-sec-darker lg:typography-h3 lg:mt-20">
          Meet the speaker
        </p>
        <h1 className="typography-h1 lg:mt-2">{speaker.name}</h1>
        <div className="typography-body-lg mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 lg:mt-12 xl:mt-16 2xl:mt-20">
          {[speaker.position, speaker.company === "-" ? "" : speaker.company]
            .filter(Boolean)
            .join(", ")}
          <SpeakerTags
            speaker={speaker}
            className="flex-nowrap"
            showEventType={false}
          />
        </div>
      </div>
      {speaker.avatar && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-[1] bg-[hsl(79_81%_83.5%)] opacity-90 mix-blend-multiply" />
          <Image
            src={speaker.avatar}
            alt=""
            width={464}
            height={464}
            className="aspect-square size-[464px] object-cover saturate-[0.1] transition-transform max-lg:w-full"
            placeholder="blur"
            blurDataURL={avatarPlaceholder! as `data:image/${string}`}
          />
        </div>
      )}
    </header>
  )
}

function SpeakerSessions({
  sessions,
  className,
}: {
  sessions: ScheduleSession[]
  className?: string
}) {
  return (
    <div
      className={clsx(
        "grid lg:grid-cols-2 lg:gap-5 max-lg:[&>*:not(:last-child)]:border-b-0",
        className,
      )}
    >
      {sessions.map(session => (
        <LongSessionCard key={session.id} session={session} />
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

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { metadata as layoutMetadata } from "@/app/conf/2023/layout"
import React from "react"
import { SessionList } from "@/app/conf/_components/schedule/session-list"
import {
  SocialMediaIcon,
  SocialMediaIconServiceType,
} from "@/app/conf/_components/speakers/social-media"
import { Avatar } from "@/app/conf/_components/speakers/avatar"
import { speakers, schedule } from "@/app/conf/2024/_data"
import { ChevronLeftIcon } from "@/icons"
import NextLink from "next/link"
import { eventsColors } from "../../utils"
import { filterCategories2024 } from "@/app/conf/_components/schedule/filter-categories"

type SpeakerProps = { params: { id: string } }

export function generateMetadata({ params }: SpeakerProps): Metadata {
  const decodedId = decodeURIComponent(params.id)
  const speaker = speakers.find(s => s.username === decodedId)!

  const keywords = [speaker.name, speaker.company, speaker.position].filter(
    Boolean,
  ) as string[]

  return {
    title: speaker.name,
    description: speaker.about,
    keywords: [...layoutMetadata.keywords, ...keywords],
    openGraph: {
      images: `/img/__og-image/2024/${speaker.username}.png`,
    },
  }
}

export function generateStaticParams() {
  return speakers.map(s => ({ id: s.username }))
}

export default function SpeakerPage({ params }: SpeakerProps) {
  const decodedId = decodeURIComponent(params.id)
  const speaker = speakers.find(s => s.username === decodedId)!

  const s = schedule
    .filter(s => s.speakers && s.speakers.some(s => s.username === decodedId))
    .map(s => ({
      ...s,
      speakers: s.speakers!.map(
        s => speakers.find(speaker => speaker.username === s.username)!,
      ),
    }))

  return (
    <div className="bg-[#f4f6f8] py-14 text-conf-black">
      <section className="container flex flex-col">
        <div className="flex flex-col">
          <NextLink
            href="/conf/2024/speakers"
            className="flex items-center gap-2 text-lg text-conf-black transition-colors hover:text-primary"
          >
            <ChevronLeftIcon className="size-5" /> Back to Speakers
          </NextLink>

          <div className="max-w-5xl self-center">
            <div className="flex flex-col justify-between gap-0 gap-y-5 pb-20 pt-14 max-lg:flex-col-reverse sm:flex-row sm:gap-10">
              <div className="flex flex-col items-start gap-y-5">
                <h1 className="conf-heading">{speaker.name}</h1>

                <span className="text-2xl">
                  <span className="underline">{speaker.company}</span>
                  {speaker.company && ", "}
                  {speaker.position}
                </span>

                <p className="text-lg">{speaker.about}</p>

                {!!speaker.socialurls?.length && (
                  <div className="mt-0">
                    <div className="flex gap-5 lg:gap-2.5">
                      {speaker.socialurls.map(social => (
                        <a
                          key={social.url}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-max items-center"
                        >
                          <SocialMediaIcon
                            service={
                              social.service.toLowerCase() as SocialMediaIconServiceType
                            }
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Avatar
                className="size-[280px] self-center rounded-full sm:self-start"
                avatar={speaker.avatar}
                name={speaker.name}
              />
            </div>
            <h1 className="conf-heading mb-10">Sessions</h1>
            <SessionList
              showFilter={false}
              filterCategories={filterCategories2024}
              eventsColors={eventsColors}
              year="2024"
              scheduleData={s}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

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
import { speakers, schedule } from "@/app/conf/2023/_data"
import { ChevronLeftIcon } from "@/icons"
import NextLink from "next/link"

type SpeakerProps = { params: { id: string } }

export function generateMetadata({ params }: SpeakerProps): Metadata {
  const speaker = speakers.find(s => s.username === params.id)!

  const keywords = [speaker.name, speaker.company, speaker.position].filter(
    Boolean,
  ) as string[]

  return {
    title: speaker.name,
    description: speaker.about,
    keywords: [...layoutMetadata.keywords, ...keywords],
    openGraph: {
      images: `/img/__og-image/${speaker.username}.png`,
    },
  }
}

export function generateStaticParams() {
  return speakers.map(s => ({ id: s.username }))
}

export default function SpeakerPage({ params }: SpeakerProps) {
  const speaker = speakers.find(s => s.username === params.id)
  if (!speaker) {
    notFound()
  }

  const s = schedule
    .filter(s => s.speakers && s.speakers.some(s => s.username === params.id))
    .map(s => ({
      ...s,
      speakers: s.speakers!.map(s =>
        speakers.find(speaker => speaker.username === s.username),
      ),
    }))

  return (
    <div className="bg-[#f4f6f8] py-14 text-conf-black">
      <section className="flex flex-col container">
        <div className="flex flex-col">
          <NextLink
            href="/conf/2023/speakers"
            className="text-conf-black flex items-center text-lg hover:text-primary gap-2 transition-colors"
          >
            <ChevronLeftIcon className="size-5" /> Back to Speakers
          </NextLink>

          <div className="max-w-5xl self-center">
            <div className="pt-14 pb-20 flex flex-col sm:flex-row gap-0 sm:gap-10 gap-y-5 justify-between max-lg:flex-col-reverse">
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
                          className="flex items-center w-max"
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
                className="self-center sm:self-start size-[280px] rounded-full"
                avatar={speaker.avatar}
                name={speaker.name}
              />
            </div>
            <h1 className="conf-heading mb-10">Sessions</h1>
            {/* @ts-expect-error */}
            <SessionList showFilter={false} scheduleData={s} />
          </div>
        </div>
      </section>
    </div>
  )
}

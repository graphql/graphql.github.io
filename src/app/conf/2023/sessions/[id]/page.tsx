import { notFound } from "next/navigation"
import { Metadata } from "next"
import { findBestMatch } from "string-similarity"
import clsx from "clsx"
import { getEventTitle } from "./_event_title"
import { videos } from "./_videos"
import { Avatar } from "../../../_components/speakers/avatar"
import { BackLink } from "../../../_components/schedule/back-link"
import {
  SocialMediaIcon,
  SocialMediaIconServiceType,
} from "../../../_components/speakers/social-media"
import { speakers, schedule } from "@/app/conf/2023/_data"
import { metadata as layoutMetadata } from "@/app/conf/2023/layout"
import { format, parseISO } from "date-fns"

type SessionProps = { params: { id: string } }

export function generateMetadata({ params }: SessionProps): Metadata {
  const event = schedule.find(s => s.id === params.id)!

  const keywords = [
    event.event_type,
    event.audience,
    event.event_subtype,
    ...event.speakers!.map(s => s.name),
  ].filter(Boolean)

  return {
    title: event.name,
    description: event.description,
    keywords: [...layoutMetadata.keywords, ...keywords],
    openGraph: {
      images: `/img/__og-image/2023/${event.id}.png`,
    },
  }
}

export function generateStaticParams() {
  return schedule.filter(s => s.speakers).map(s => ({ id: s.id }))
}

const Tag = ({
  text,
  featured = false,
}: {
  text: string
  featured?: boolean
}) =>
  !text ? null : (
    <span
      className={clsx(
        "h-max whitespace-nowrap rounded-full border border-solid border-[#333333] px-3 py-1 text-sm font-semibold",
        featured ? "border-2 border-[#F8779D] bg-[#F8779D] text-white" : "",
      )}
    >
      {text}
    </span>
  )

export default function SessionPage({ params }: SessionProps) {
  const event = schedule.find(s => s.id === params.id)
  if (!event) {
    notFound()
  }
  // @ts-expect-error -- fixme
  event.speakers = event.speakers!.map(speaker =>
    speakers.find(s => s.username === speaker.username),
  )

  const eventType = event.event_type.endsWith("s")
    ? event.event_type.slice(0, -1)
    : event.event_type

  const eventTitle = getEventTitle(
    event,
    event.speakers!.map(s => s.name),
  )

  const recordingTitle = findBestMatch(
    `${eventTitle} ${event.speakers!.map(e => e.name).join(" ")}`,
    videos.map(e => e.title),
  ).bestMatch

  return (
    <div className="bg-[#f4f6f8]">
      <div className="container">
        <div className="py-10">
          <section className="xs:px-0 mx-auto min-h-[80vh] flex-col justify-center px-2 text-[#333333] md:container lg:justify-between">
            <div className="flex flex-col lg:px-0">
              <BackLink year="2023" kind="sessions" />
              {recordingTitle.rating > 0.5 && (
                <iframe
                  className="mx-auto aspect-video size-full max-w-[1000px] rounded-md"
                  src={`https://youtube.com/embed/${
                    videos.find(e => e.title === recordingTitle.target)?.id
                  }`}
                  title={recordingTitle.target}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              <div className="prose mt-10 flex flex-col self-center lg:prose-lg sm:space-y-4">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-3">
                    <Tag text={eventType} featured />
                    <Tag text={event.audience} />
                    <Tag text={event.event_subtype} />
                  </div>
                  <h1 className="mb-5 mt-0 text-2xl font-medium lg:text-3xl">
                    {eventTitle}
                  </h1>
                  <span className="text-[#333333]">
                    {format(
                      parseISO(event.event_start),
                      "EEEE, MMMM d / hh:mmaaaa 'PDT'",
                    )}{" "}
                    - {format(parseISO(event.event_end), "hh:mmaaaa 'PDT'")}
                  </span>
                </div>
                <div className="flex flex-col sm:gap-5 lg:flex-row">
                  {event.speakers!.map(speaker => (
                    <div
                      className="flex items-center gap-3"
                      key={speaker.username}
                    >
                      <Avatar
                        className="size-[100px] rounded-full lg:size-[120px]"
                        avatar={speaker.avatar}
                        name={speaker.name}
                      />

                      <div className="flex flex-col gap-1.5 lg:gap-1">
                        <a
                          href={`/conf/2023/speakers/${speaker.username}`}
                          className="mt-0 text-xl font-bold text-[#333333] underline"
                        >
                          {speaker.name}
                        </a>

                        <span className="font-normal">
                          <span className="font-semibold">
                            {speaker.company}
                          </span>
                          {speaker.company && ", "}
                          {speaker.position}
                        </span>
                        {speaker.socialurls?.length ? (
                          <div className="mt-0 text-[#333333]">
                            <div className="flex space-x-2">
                              {speaker.socialurls.map(social => (
                                <a
                                  key={social.url}
                                  href={social.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center text-black"
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
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
                <p>{event.description}</p>

                <div className="py-8">
                  {event.files?.map(({ path }) => (
                    <div key={path}>
                      <a href={path} target="_blank" rel="noreferrer">
                        View Full PDF{" "}
                        <span className="font-sans text-2xl font-light">
                          ↗
                        </span>
                      </a>
                      <iframe src={path} className="aspect-video size-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

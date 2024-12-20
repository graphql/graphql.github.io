import { notFound } from "next/navigation"
import { Metadata } from "next"
import clsx from "clsx"
import { Avatar } from "../../../_components/speakers/avatar"
import { BackLink } from "../../../_components/schedule/back-link"
import {
  SocialMediaIcon,
  SocialMediaIconServiceType,
} from "../../../_components/speakers/social-media"
import { speakers, schedule } from "@/app/conf/2024/_data"
import { metadata as layoutMetadata } from "@/app/conf/2023/layout"
import { ScheduleSession } from "../../../2023/types"
import { format, parseISO } from "date-fns"
import { videos } from "../../_videos"
import { findBestMatch } from "string-similarity"

function getEventTitle(event: ScheduleSession, speakers: string[]): string {
  let { name } = event

  if (!speakers) {
    return name
  }

  speakers?.forEach(speaker => {
    const speakerInTitle = name.indexOf(`- ${speaker.replace("ı", "i")}`)
    if (speakerInTitle > -1) {
      name = name.slice(0, speakerInTitle)
    }
  })

  return name
}

type SessionProps = { params: { id: string } }

export function generateMetadata({ params }: SessionProps): Metadata {
  const event = schedule.find(s => s.id === params.id)!

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
    openGraph: {
      images: `/img/__og-image/2024/${event.id}.png`,
    },
  }
}

export function generateStaticParams() {
  return schedule.filter(s => s.id).map(s => ({ id: s.id }))
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
        featured && "border-2 border-[#F8779D] bg-[#F8779D] text-white",
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
  event.speakers = (event.speakers || []).map(speaker =>
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

  const videoId = videos.find(e => e.title === recordingTitle.target)?.id

  if (!videoId) {
    throw new Error(`Video "${recordingTitle.target}" not found`)
  }

  return (
    <div className="bg-[#f4f6f8]">
      <div className="container">
        <div className="py-10">
          <section className="xs:px-0 mx-auto min-h-[80vh] flex-col justify-center px-2 text-[#333333] md:container lg:justify-between">
            <BackLink year="2024" kind="schedule" />
            <iframe
              className="mx-auto mt-6 aspect-video w-full max-w-4xl rounded-md"
              src={`https://youtube.com/embed/${videoId}`}
              title={recordingTitle.target}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            <div className="prose mx-auto mt-10 flex flex-col self-center lg:prose-lg sm:space-y-4">
              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <Tag text={eventType} featured />
                  <Tag text={event.audience} />
                  <Tag text={event.event_subtype} />
                </div>
                <h1 className="mt-0 text-2xl font-medium lg:text-3xl">
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
              <div className="mt-8 flex flex-col flex-wrap gap-5 lg:flex-row">
                {event.speakers!.map(speaker => (
                  <div
                    className={`flex w-full items-center gap-3 ${event?.speakers?.length || 0 > 1 ? "max-w-[320px]" : ""}`}
                    key={speaker.username}
                  >
                    <Avatar
                      className="size-[100px] rounded-full lg:size-[120px]"
                      avatar={speaker.avatar}
                      name={speaker.name}
                    />

                    <div className="flex flex-col gap-1.5 lg:gap-1">
                      <a
                        href={`/conf/2024/speakers/${speaker.username}`}
                        className="mt-0 text-xl font-bold text-[#333333] underline"
                      >
                        {speaker.name}
                      </a>

                      <span className="font-normal">
                        <span className="font-semibold">{speaker.company}</span>
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
                      <span className="font-sans text-2xl font-light">↗</span>
                    </a>
                    <iframe src={path} className="aspect-video size-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

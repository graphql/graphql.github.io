import React, { FC } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { HeadProps, PageProps } from "gatsby"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import { ScheduleSession } from "../components/Conf/Schedule/session-list"
import { Avatar } from "../components/Conf/Speakers/Avatar"
import clsx from "clsx"
import {
  SocialMediaIcon,
  SocialMediaIconServiceType,
} from "../components/Conf/Speakers/SocialMedia"
import { BackLink } from "../components/Conf/Schedule/BackLink"
import { getEventTitle } from "../utils/eventTitle"
import { videos } from "./videos"
import { findBestMatch } from "string-similarity"

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
        "border border-solid border-[#333333] font-semibold text-sm px-3 py-1 h-max rounded-full whitespace-nowrap",
        featured ? "bg-[#F8779D] border-[#F8779D] border-2 text-white" : "",
      )}
    >
      {text}
    </span>
  )

export const EventComponent: FC<{
  event: ScheduleSession
  speakers: SchedSpeaker[]
  hideBackButton?: boolean
}> = ({ event, speakers, hideBackButton }) => {
  event.event_type ??= ""
  const eventType = event.event_type.endsWith("s")
    ? event.event_type.slice(0, -1)
    : event.event_type

  const eventTitle = getEventTitle(
    event,
    speakers.map(s => s.name),
  )

  const recordingTitle = findBestMatch(
    `${eventTitle} ${speakers.map(e => e.name).join(" ")}`,
    videos.map(e => e.title),
  ).bestMatch

  return (
    <div className={`bg-white ${!hideBackButton ? "py-10" : ""}`}>
      <section className="text-[#333333] min-h-[80vh] flex-col mx-auto px-2 xs:px-0 lg:justify-between justify-center md:container">
        <div className="flex flex-col lg:px-0">
          {!hideBackButton && <BackLink kind="sessions" />}
          {recordingTitle.rating > 0.5 && (
            <iframe
              className="aspect-video max-w-[1000px] mx-auto w-full h-full"
              src={`https://youtube.com/embed/${
                videos.find(e => e.title === recordingTitle.target)?.id
              }`}
              title={recordingTitle.target}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}

          <div className="mt-10 flex flex-col self-center prose lg:prose-lg sm:space-y-4">
            <div className="space-y-5">
              <div className="flex gap-3 flex-wrap">
                <Tag text={eventType} featured />
                <Tag text={event.audience} />
                <Tag text={event.event_subtype} />
              </div>
              <h1 className="mt-0 text-2xl lg:text-3xl font-medium mb-5">
                {eventTitle}
              </h1>
            </div>
            <div className="flex lg:flex-row flex-col sm:gap-5">
              {speakers?.map(speaker => (
                <div className="flex items-center gap-3" key={speaker.username}>
                  <Avatar
                    className="lg:w-[120px] lg:h-[120px] w-[100px] h-[100px] rounded-full"
                    avatar={speaker.avatar}
                    name={speaker.name}
                  />

                  <div className="flex flex-col lg:gap-1 gap-1.5">
                    <a
                      href={`/conf/speakers/${speaker.username}`}
                      className="text-xl mt-0 font-bold text-[#333333] underline"
                    >
                      {speaker.name}
                    </a>

                    <span className="font-normal">
                      <span className="font-semibold">
                        {speaker.company && speaker.company}
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
                              className="flex items-center text-[#c9b7b7]"
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
            <ReactMarkdown
              children={event.description}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />

            <div className="py-8">
              {event.files?.map(({ path }) => (
                <div key={path}>
                  <a href={path} target="_blank">
                    View Full PDF{" "}
                    <span className="font-sans font-light text-2xl">↗</span>
                  </a>
                  <iframe src={path} className="aspect-video w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const EventTemplate: FC<
  PageProps<{}, { event: ScheduleSession; speakers: SchedSpeaker[] }>
> = ({ pageContext }) => {
  return (
    <LayoutConf>
      <HeaderConf />

      <EventComponent {...pageContext} />
      <FooterConf includeSponors={false} />
    </LayoutConf>
  )
}

export default EventTemplate

export function Head({
  pageContext,
  location,
}: HeadProps<{}, { event: ScheduleSession; speakers: SchedSpeaker[] }>) {
  const { event } = pageContext

  return (
    <>
      <SeoConf
        title={`${event.name} | GraphQLConf 2023`}
        description={event.description}
        ogImage={{
          url: `https://graphql.org/img/__og-image/${event.id}.png`,
          width: 1200,
          height: 630,
        }}
      />
      <meta
        name="keywords"
        content={`GraphQL, GraphQLConf, GraphQLConf 2023, ${event.event_type}, ${event.audience}, ${event.event_subtype} ${event.event_start}`}
      />
      <meta
        property="og:url"
        content={`https://graphql.org${location.pathname}`}
      />
    </>
  )
}

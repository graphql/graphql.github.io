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
import { ScheduleSession } from "../components/Conf/Schedule/ScheduleList"
import { format, parseISO } from "date-fns"
import { Avatar } from "../components/Conf/Speakers/Avatar"
import clsx from "clsx"
import {
  SocialMediaIcon,
  SocialMediaIconServiceType,
} from "../components/Conf/Speakers/SocialMedia"
import { BackLink } from "../components/Conf/Schedule/BackLink"
import { getEventTitle } from "../utils/eventTitle"

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
        featured ? "bg-[#F8779D] border-[#F8779D] border-2 text-white" : ""
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
  const eventType = event.event_type.endsWith("s")
    ? event.event_type.slice(0, -1)
    : event.event_type

  const eventTitle = getEventTitle(
    event,
    speakers.map(s => s.name)
  )

  return (
    <div className={`bg-white ${!hideBackButton ? "py-10" : ""}`}>
      <section className="text-[#333333] min-h-[80vh] flex-col mx-auto px-2 xs:px-0 lg:justify-between justify-center md:container">
        <div className="flex flex-col lg:px-0">
          {!hideBackButton && <BackLink kind="schedule" />}
          <div className="mt-10 flex flex-col self-center prose lg:prose-lg sm:space-y-8">
            <div className="flex gap-5 mb-1.5">
              <span className="flex items-center">
                <svg
                  className="mr-1.5 mb-0.5"
                  width={18}
                  height={18}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                  <path
                    fill="#0E031C"
                    d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                  />
                </svg>

                {format(parseISO(event.event_start), "EEEE, MMM d")}
              </span>
              <span className="flex items-center">
                <svg
                  className="mr-1.5 mb-0.5"
                  width={18}
                  height={18}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                  <path
                    fill="#0E031C"
                    d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                  />
                </svg>

                {format(parseISO(event.event_start), "hh:mmaaaa 'PDT'")}
              </span>
            </div>
            <div className="space-y-5">
              <div className="flex gap-3 flex-wrap">
                <Tag text={eventType} featured />
                <Tag text={event.audience} />
                <Tag text={event.event_subtype} />
              </div>
              <h1 className="mt-0 text-2xl lg:text-3xl font-medium mb-5">
                {eventTitle}
              </h1>
              <h4 className="flex space-x-4">
                {speakers?.map(speaker => (
                  <span className="font-normal">
                    <span className="font-semibold">
                      {speaker.name}
                      {speaker.company && ", "}
                    </span>
                    {speaker.company && speaker.company}
                  </span>
                ))}
              </h4>
            </div>
            <ReactMarkdown
              children={event.description}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />

            <div className="flex lg:flex-row flex-col sm:gap-5">
              {speakers?.map(speaker => (
                <div className="flex items-center gap-3">
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
      <FooterConf includePartners={false} includeSponors={false} />
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

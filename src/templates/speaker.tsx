import React, { FC } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { HeadProps, PageProps } from "gatsby"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import ScheduleList, {
  ScheduleSession,
} from "../components/Conf/Schedule/ScheduleList"
import { Avatar } from "../components/Conf/Speakers/Avatar"
import {
  SocialMediaIcon,
  SocialMediaIconServiceType,
} from "../components/Conf/Speakers/SocialMedia"
import { BackLink } from "../components/Conf/Schedule/BackLink"

const SpeakersTemplate: FC<
  PageProps<{}, { speaker: SchedSpeaker; schedule: ScheduleSession[] }>
> = ({ pageContext: { schedule, speaker } }) => {
  const speakersSessions = schedule.filter(session =>
    session.speakers?.includes(speaker?.name)
  )

  console.log({ schedule, speakersSessions })
  return (
    <LayoutConf>
      <HeaderConf />

      <div className="bg-[#F4F6F8] py-10">
        <section className="text-[#333333] min-h-[80vh] mx-auto flex flex-col px-2 xs:px-0 md:container">
          <div className="lg:px-0 flex flex-col">
            <BackLink kind="speakers" />
            <div className="mt-10 self-center prose lg:prose-lg space-y-12">
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-10 gap-y-5">
                <div className="flex flex-col items-start gap-y-5">
                  <h1 className="!my-0 py-0">{speaker.name}</h1>

                  <span className="font-normal">
                    <span className="font-semibold">
                      {speaker.company && speaker.company}
                    </span>
                    {speaker.company && ", "}
                    {speaker.position}
                  </span>
                  <ReactMarkdown
                    className="text-justify [&>p]:!my-0 !py-0"
                    children={speaker.about}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  />
                  {!!speaker.socialurls?.length && (
                    <div className="mt-0">
                      <div className="flex gap-5 lg:gap-2.5">
                        {speaker.socialurls.map(social => (
                          <a
                            key={social.url}
                            href={social.url}
                            target="_blank"
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
                  className="self-center sm:self-start !mt-0 w-[250px] h-[250px] rounded-full"
                  avatar={speaker.avatar}
                  name={speaker.name}
                />
              </div>

              {speakersSessions.length > 0 ? (
                <div>
                  <h1 className="!mb-0 pb-0">Sessions</h1>
                  {speaker && (
                    <ScheduleList
                      showEventType
                      scheduleData={speakersSessions}
                    />
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export default SpeakersTemplate

export function Head({
  pageContext,
  location,
}: HeadProps<{}, { speaker: SchedSpeaker }>) {
  const { speaker } = pageContext

  return (
    <>
      <SeoConf
        title={`${speaker.name} | GraphQLConf 2023`}
        description={speaker.about}
        ogImage={{
          url: `https://graphql.org/img/__og-image/${speaker.username}.png`,
          width: 1200,
          height: 630,
        }}
      />
      <meta
        property="keywords"
        content={`GraphQL, GraphQLConf, GraphQLConf 2023, ${speaker.name}, ${speaker.company}, ${speaker.position}`}
      />
      <meta
        property="og:url"
        content={`https://graphql.org${location.pathname}`}
      />
    </>
  )
}

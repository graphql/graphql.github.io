import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { HeadProps, PageProps } from "gatsby"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import ScheduleList from "../components/Conf/Schedule/ScheduleList"
import { Avatar } from "../components/Conf/Speakers/Avatar"
import { ReactComponent as TwitterIcon } from "../../static/img/logos/twitter.svg"
import { ReactComponent as FacebookIcon } from "../../static/img/logos/facebook.svg"
import { ReactComponent as InstagramIcon } from "../../static/img/logos/instagram.svg"
import { ReactComponent as SnapChatIcon } from "../../static/img/logos/snapchat.svg"
import { ReactComponent as LinkedinIcon } from "../../static/img/logos/linkedin.svg"

type SocialMediaIconServiceType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "snapchat"

const SocialMediaIcon = ({
  service,
}: {
  service: SocialMediaIconServiceType
}) => {
  switch (service) {
    case "twitter":
      return <TwitterIcon fill="#1C96E9" className="w-8 lg:w-7" />
    case "linkedin":
      return <LinkedinIcon className="w-8 lg:w-7" />
    case "facebook":
      return <FacebookIcon className="w-8 lg:w-7" />
    case "instagram":
      return <InstagramIcon className="w-8 lg:w-7" />
    case "snapchat":
      return <SnapChatIcon className="w-8 lg:w-7" />
    default:
      return null
  }
}

const SpeakersTemplate: FC<
  PageProps<{}, { speaker: SchedSpeaker; schedule: any }>
> = ({ pageContext: { schedule, speaker } }) => {
  return (
    <LayoutConf>
      <HeaderConf />

      <div className="bg-white py-10">
        <section className="min-h-[80vh] flex-col mx-auto max-lg:px-4 px-6 lg:px-0 lg:justify-between justify-center override-prose-w-with-85ch">
          <>
            <div className="flex flex-col lg:px-0">
              <a
                href="/conf/speakers"
                className="w-max text-black rounded-md cursor-pointer hover:opacity-80 transition-all underline"
              >
                <span
                  style={{
                    display: "inline-block",
                    transform: "translateY(-1px)",
                    marginRight: "5px",
                  }}
                >
                  ←
                </span>
                <span>Back to Speakers</span>
              </a>
              <div className="lg:mt-16 mt-6 flex lg:flex-row flex-col-reverse lg:gap-10">
                <Avatar
                  className="w-[300px] h-[300px] rounded-full border-solid border-2 border-gray-300"
                  avatar={speaker.avatar}
                  name={speaker.name}
                />

                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="mt-0 font-bold">{speaker.name}</h2>

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
                  <div className="mt-3 font-medium">
                    {renderPositionAndCompany(speaker)}
                  </div>
                  <p
                    className="lg:text-justify"
                    dangerouslySetInnerHTML={{ __html: speaker.about }}
                  />
                </div>
              </div>
            </div>

            <div className="lg:mt-16 mt-10">
              {speaker && (
                <ScheduleList
                  showEventType
                  scheduleData={schedule}
                  filterSchedule={sessions =>
                    sessions.filter(session =>
                      session.speakers?.includes(speaker?.name)
                    )
                  }
                />
              )}
            </div>
          </>
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

function renderPositionAndCompany(speaker: SchedSpeaker) {
  // Reassign "-" if position or company are undefined
  const position = speaker.position || "-"
  const company = speaker.company || "-"

  // Only include anchor element if url is not an empty string
  const companyElement =
    speaker.url !== "" ? (
      <a target="_blank" className="underline" href={speaker.url}>
        {company}
      </a>
    ) : (
      company
    )

  if (position !== "-" && company !== "-") {
    return (
      <>
        {position} at {companyElement}
      </>
    )
  } else if (position !== "-") {
    return position
  } else if (company !== "-") {
    return <>Works at {companyElement}</>
  } else {
    return "-"
  }
}

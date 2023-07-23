import React, { FC } from "react"
import { PageProps } from "gatsby"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import { ScheduleSession } from "../components/Conf/Schedule/ScheduleList"
import { format, parseISO } from "date-fns"
import { ReactComponent as TwitterIcon } from "../../static/img/logos/twitter.svg"
import { ReactComponent as FacebookIcon } from "../../static/img/logos/facebook.svg"
import { ReactComponent as InstagramIcon } from "../../static/img/logos/instagram.svg"
import { ReactComponent as SnapChatIcon } from "../../static/img/logos/snapchat.svg"
import { ReactComponent as LinkedinIcon } from "../../static/img/logos/linkedin.svg"
import { Avatar } from "../components/Conf/Speakers/Avatar"

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

const Tag = ({ text }: { text: string }) =>
  !text ? null : (
    <span className="border border-solid border-[#333333] text-sm px-4 py-1.5 h-max rounded-full whitespace-nowrap">
      {text}
    </span>
  )
const SpeakersTemplate: FC<
  PageProps<{}, { event: ScheduleSession; speakers: SchedSpeaker[] }>
> = ({ pageContext: { event, speakers } }) => {
  return (
    <LayoutConf>
      <HeaderConf />

      <div className="bg-white py-10">
        <section className="text-[#333333] min-h-[80vh] flex-col mx-auto max-sm:px-4 px-0 lg:justify-between justify-center max-w-[1100px]">
          <div className="flex flex-col lg:px-0">
            <a
              href="/conf/schedule"
              className="w-max rounded-md py-2.5 pr-5 cursor-pointer hover:opacity-80 transition-all underline text-[#333333]"
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
              <span>Back to Schedule</span>
            </a>
            <div className="mt-10 flex flex-col">
              <div className="flex gap-3.5 mb-1.5">
                <span className="text-[#f6009b] text-lg flex items-center">
                  <svg
                    className="mr-1.5 mb-0.5"
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <path
                      fill="#f6009b"
                      d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                    />
                  </svg>

                  {format(parseISO(event.event_start), "EEEE, MMM d")}
                </span>
                <span className="text-[#f6009b] text-lg flex items-center">
                  <svg
                    className="mr-1.5 mb-0.5"
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <path
                      fill="#f6009b"
                      d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                    />
                  </svg>

                  {format(parseISO(event.event_start), "hh:mmaaaa 'PDT'")}
                </span>
              </div>
              <h1 className="mt-0 lg:text-4xl text-3xl lg:leading-[50px] leading-[45px] font-medium mb-5">
                {/* Event name without speaker's name and company */}
                {event.name}
              </h1>
              <div className="flex gap-3 flex-wrap">
                <Tag text={event.event_type} />
                <Tag text={event.audience} />
                <Tag text={event.event_subtype} />
              </div>
              <p className="mt-7 text-xl leading-9 lg:pr-20">
                {event.description}
              </p>

              <div className="flex lg:flex-row flex-col gap-4">
                {speakers?.map(speaker => (
                  <div className="flex items-center mt-5 gap-7">
                    <Avatar
                      className="lg:w-[150px] lg:h-[150px] w-[120px] h-[120px] rounded-full border-solid border-2 border-gray-300"
                      avatar={speaker.avatar}
                      name={speaker.name}
                    />

                    <div className="flex flex-col lg:gap-1 gap-1.5">
                      <a
                        href={`/conf/speakers/${speaker.username}`}
                        className="lg:text-2xl text-xl mt-0 font-bold text-[#333333] underline"
                      >
                        {speaker.name}
                      </a>

                      <span className="lg:text-base text-sm">
                        {renderPositionAndCompany(speaker)}
                      </span>
                      {!!speaker.socialurls?.length && (
                        <div className="mt-0 text-[#333333]">
                          <div className="flex gap-5 lg:gap-2.5">
                            {speaker.socialurls.map(social => (
                              <a
                                key={social.url}
                                href={social.url}
                                target="_blank"
                                className="flex items-center text-[#333333] w-max"
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export default SpeakersTemplate

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Speaker" />
}

function renderPositionAndCompany(speaker: SchedSpeaker) {
  // Reassign "-" if position or company are undefined
  const position = speaker.position || "-"
  const company = speaker.company || "-"

  // Only include anchor element if url is not an empty string
  const companyElement =
    speaker.url !== "" ? (
      <a
        target="_blank"
        className="text-[#333333] underline"
        href={speaker.url}
      >
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

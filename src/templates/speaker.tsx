import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { PageProps } from "gatsby"
import { SchedSpeaker } from "../components/Conf/Speakers/Speaker"
import ScheduleList from "../components/Conf/Schedule/ScheduleList"
import { Avatar } from "../components/Conf/Speakers/Avatar"

const SpeakersTemplate: FC<
  PageProps<{}, { speaker: SchedSpeaker; schedule: any }>
> = ({ pageContext: { schedule, speaker } }) => {
  return (
    <LayoutConf>
      <HeaderConf />

      <div className="bg-white py-10">
        <section className="text-[#333333] min-h-[80vh] flex-col override-prose-w-with-85ch mx-auto max-sm:px-4 px-0 lg:justify-between justify-center">
          <>
            <div className="flex flex-col lg:px-0 px-10">
              <a
                href="/conf/speakers"
                className="w-max rounded-md border-2 border-[#333333] border-solid py-2.5 px-5 cursor-pointer hover:opacity-80 transition-all hover:underline text-[#333333]"
              >
                <span>← Back to Speakers</span>
              </a>
              <div className="mt-16 flex lg:flex-row flex-col gap-10">
                <Avatar
                  className="w-[300px] h-[300px] rounded-full border-solid border-2 border-gray-300"
                  avatar={speaker.avatar}
                  name={speaker.name}
                />

                <div>
                  <h2 className="text-[40px] font-bold mt-5">{speaker.name}</h2>
                  <div className="mt-3 font-medium">
                    {renderPositionAndCompany(speaker)}
                  </div>
                  <p
                    className="leading-8"
                    dangerouslySetInnerHTML={{ __html: speaker.about }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-14">
              <h2 className="text-2xl font-medium mb-9 mt-0">
                My Speakers Sessions
              </h2>
              {speaker && (
                <ScheduleList
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

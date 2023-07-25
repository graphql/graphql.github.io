import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { PageProps } from "gatsby"
import ScheduleList, {
  ScheduleSession,
} from "../components/Conf/Schedule/ScheduleList"

export const eventsColors = [
  ["Breaks", "#a7b7c4", "#171c24"], // Cool light blue with Dark Blue-Gray text
  ["Keynote Sessions", "#a56be8", "#ffffff"], // Vibrant Purple with White text
  ["Lightning Talks", "#16a596", "#ffffff"], // Turquoise with White text
  ["Session Presentations", "#ec4646", "#ffffff"], // Vibrant Red with White text
  ["Workshops", "#e6812f", "#ffffff"], // Slightly Darker Orange with White text
]

const ScheduleTemplate: FC<PageProps<{}, { schedule: ScheduleSession[] }>> = ({
  pageContext: { schedule },
}) => {
  return (
    <LayoutConf>
      <HeaderConf />

      <div className="bg-white">
        <div className="prose lg:prose-lg mx-auto py-10 max-sm:px-4 override-prose-w-with-85ch">
          <h1>GraphQLConf 2023 Schedule</h1>
          <section className="px-0 my-8">
            <h4>September 19-21, 2023 I San Francisco Bay Area, CA</h4>
            <p>
              Please note: All session times are in Pacific Daylight Time (UTC
              -7). To view the schedule in your <b>preferred&nbsp;timezone</b>,
              please select from the drop-down menu to the right, above “Filter
              by Date.”
            </p>
            <p>
              <b>IMPORTANT NOTE:</b> Timing of sessions and room locations are{" "}
              <b>subject to change</b>.
            </p>

            <div className="flex lg:flex-row flex-col items-start mt-8 text-[#111827]">
              <span className="font-medium text-2xl lg:mr-4 lg:mb-0 mb-4 whitespace-nowrap">
                Event Types:
              </span>
              <div className="flex gap-2.5 flex-wrap w-full">
                {eventsColors.map(([event, color]) => (
                  <div className="flex items-center">
                    <div
                      className="w-6 h-6 rounded-full mr-2 border border-solid border-gray-200"
                      style={{ background: color }}
                    />
                    <span>{event}</span>
                  </div>
                ))}
              </div>
            </div>
            <ScheduleList scheduleData={schedule} />
          </section>
        </div>
      </div>
      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Schedule" />
}

export default ScheduleTemplate

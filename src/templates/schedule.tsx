import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { PageProps } from "gatsby"
import ScheduleList from "../components/Conf/Schedule/ScheduleList"

const ScheduleTemplate: FC<PageProps<{}, { schedule: any }>> = ({
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
            <div className="[&>div]:-ml-[15px]">
              <a id="sched-embed" href="//graphqlconf23.sched.com/">
                View the graphqlconf23 schedule &amp; directory.
              </a>
            </div>

            <ScheduleList scheduleData={schedule} />

            {/* 
            <h2>Workshop Day</h2>
            <p>
              Join us for a GraphQLConf Workshop Day on September 19. Workshops
              are included in GraphQLConf registration though pre-registration
              is required -{" "}
              <a href="https://cvent.me/4zbxz9" target="_blank">
                register now
              </a>
              , or modify your registration and join us! Workshop space is
              available on a first come, first served basis.
            </p>
            <p>Thank you to our Workshop Day sponsor, The Guild.</p>
            <div className="w-48">
              <TheGuild />
            </div> */}
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

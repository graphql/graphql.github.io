import React from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import { ReactComponent as TheGuild } from "../../../static/img/conf/Sponsors/TheGuild.svg"
import SeoConf from "../../components/Conf/Seo"
import { Script } from "gatsby"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="bg-white">
        <div className="prose lg:prose-lg mx-auto py-10 max-sm:px-4">
          <h1>GraphQLConf 2023 Program</h1>
          <section className="px-0 my-8">
            <h4>September 19-21, 2023 I San Francisco Bay Area, CA</h4>
            <p>
              Please note: All session times are in Pacific Daylight Time (UTC
              -7). To view the schedule in your <b>preferred timezone</b>,
              please select from the drop-down menu to the right, above “Filter
              by Date.”
            </p>
            <p>
              <b>IMPORTANT NOTE: </b>Timing of sessions and room locations are{" "}
              <b>subject to change</b>.
            </p>
            <div className="[&>div]:-ml-[15px]">
              <a id="sched-embed" href="https://graphqlconf23.sched.com/">
                View the graphqlconf23 schedule &amp; directory.
              </a>
            </div>
            <Script
              type="text/javascript"
              src="https://graphqlconf23.sched.com/js/embed.js"
            ></Script>
            <p>
              Join us for a GraphQLConf Workshop Day on September 19. Workshops
              are included in GraphQLConf registration though pre-registration
              is required - <a href="/conf/#attend">register now</a>, or modify
              your registration and join us! Workshop space is available on a
              first come, first served basis.
            </p>
            <p>Thank you to our Workshop Day sponsor, The Guild.</p>
            <div className="w-48">
              <TheGuild />
            </div>
          </section>
        </div>
      </div>
      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export function Head() {
  return (
    <SeoConf title="Partner with GraphQLConf 2023 - Media and Community Partners" />
  )
}

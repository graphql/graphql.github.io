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
            <div className="[&>div]:-ml-[15px]">
              <a
                id="sched-embed"
                href="//graphqlconf23.sched.com/directory/speakers"
              >
                View the graphqlconf23 schedule &amp; directory.
              </a>
            </div>
            <Script
              type="text/javascript"
              src="//graphqlconf23.sched.com/js/embed.js"
            ></Script>

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
            </div>
          </section>
        </div>
      </div>
      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Program" />
}

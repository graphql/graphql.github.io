import React from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import ButtonConf from "../../components/Conf/Button"
import SpeakersConf from "../../components/Conf/Speakers"
import PricingConf from "../../components/Conf/Pricing"
import AboutConf from "../../components/Conf/About"
import VenueConf from "../../components/Conf/Venue"
import SFConf from "../../components/Conf/SF"
import ScheduleGlanceConf from "../../components/Conf/Schedule"
import SeoConf, { defaults as seoDefaults } from "../../components/Conf/Seo"
import { CalendarIcon, GlobeIcon } from "@radix-ui/react-icons"

export default () => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="text-gray-600 bg-color-[#562556] bg-[url('/img/conf/conf-bg.png')] bg-cover">
        <div className="container flex py-36 items-center justify-center flex-col">
          <div className="flex flex-col justify-center items-center w-full gap-2 md:gap-32 md:flex-row">
            <div>
              <img
                src="/img/conf/graphql-conf-logo.svg"
                className="w-[400px] md:w-[500px]"
              />
            </div>
            <div>
              <div className="mb-8 text-white text-2xl mt-10 md:mt-2 md:text-lg leading-relaxed font-semibold">
                <div className="flex gap-2 items-center mb-2 font-medium">
                  <CalendarIcon />
                  <span>September 19-21, 2023</span>
                </div>
                <div className="flex gap-2 items-center mb-6 font-medium">
                  <GlobeIcon />
                  <span>San Fransisco Bay Area, CA</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 flex-row">
                <ButtonConf text="Join as a Sponsor" href="/conf/sponsor/" />
                <ButtonConf text="Submit to Speak" href="/conf/speak/" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpeakersConf />
      <PricingConf />
      <ScheduleGlanceConf />
      <VenueConf />
      <SFConf />
      <AboutConf />
      <FooterConf />
    </LayoutConf>
  )
}

export function Head() {
  return (
    <>
      <SeoConf />
      <meta property="og:url" content={seoDefaults.url} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Event",
          name: "GraphQLConf 2023",
          url: seoDefaults.url,
          description: seoDefaults.description,
          image: seoDefaults.image,
          potentialAction: {
            "@type": "Action",
            name: "Register Now!",
            url: "https://graphql.org/conf/#register",
          },
          about: {
            "@type": "Thing",
            name: "GraphQL",
            url: "https://graphql.org",
          },
          startDate: "2023-09-19",
          endDate: "2023-09-21",
          location: {
            "@type": "Place",
            name: "Hyatt Regency SFO • SF Bay Area",
            longitude: -122.36515,
            latitude: 37.59403,
            address: "1333 Old Bayshore Hwy, Burlingame, CA 94010",
          },
          organizer: {
            "@type": "Organizer",
            name: "GraphQL Foundation",
            url: "https://graphql.org/foundation/",
          },
          datePublished: "2023-04-03",
        })}
      </script>
    </>
  )
}

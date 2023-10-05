import React from "react"
import FooterConf from "../../components/Conf/Footer"
import HeaderConf from "../../components/Conf/Header"
import LayoutConf from "../../components/Conf/Layout"
import SpeakersConf from "../../components/Conf/Speakers"
import AboutConf from "../../components/Conf/About"
import ScheduleGlanceConf from "../../components/Conf/Schedule"
import SeoConf, { defaults as seoDefaults } from "../../components/Conf/Seo"
import { CalendarIcon, GlobeIcon } from "@radix-ui/react-icons"
import ThanksConf from "../../components/Conf/Thanks"
import GalleryConf from "../../components/Conf/Gallery"

export default function Page() {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="text-white max-md:text-base bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover bg-blend-multiply	bg-black/20">
        <div className="container py-16 md:py-20">
          <img
            src="/img/conf/graphql-conf-logo.svg"
            className="w-72 md:w-[500px]"
          />
          <div className="flex items-center max-md:gap-3 gap-5 mt-5">
            <CalendarIcon className="w-6 h-6" />
            <span>September 19-21, 2023</span>
            <span />
            <GlobeIcon className="w-6 h-6" />
            <span>San Francisco Bay Area, CA</span>
          </div>
        </div>
      </div>
      <ThanksConf />
      {/*<GalleryConf />*/}
      <SpeakersConf />
      {/*<ScheduleGlanceConf />*/}
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

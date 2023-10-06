import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SpeakersConf from "../components/Conf/Speakers"
import AboutConf from "../components/Conf/About"
import SeoConf, { defaults as seoDefaults } from "../components/Conf/Seo"
import { GlobeIcon } from "@radix-ui/react-icons"
import ThanksConf from "../components/Conf/Thanks"
import { PageProps } from "gatsby"
import { ScheduleSession } from "../components/Conf/Schedule/session-list"

const IndexTemplate: FC<
  PageProps<
    {},
    {
      schedule: ScheduleSession[]
    }
  >
> = ({ pageContext }) => {
  return (
    <LayoutConf>
      <HeaderConf />
      <div className="text-white max-md:text-base bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover bg-blend-multiply	bg-black/20">
        <div className="container py-16 md:py-20">
          <img
            src="/img/conf/graphql-conf-logo.svg"
            className="w-72 md:w-[500px]"
          />
          <div className="flex md:items-center max-md:gap-3 gap-5 mt-5 max-md:flex-col">
            <div className="flex items-center max-md:gap-3 gap-5">
              <svg
                className="w-6 h-6"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_649_9808)">
                  <path
                    d="M8.40487 1.49582C8.40487 0.919616 7.94131 0.456055 7.36511 0.456055C6.7889 0.456055 6.32534 0.919616 6.32534 1.49582V3.22876H4.5924C3.06309 3.22876 1.8197 4.47214 1.8197 6.00146V6.69463V8.77416V19.865C1.8197 21.3943 3.06309 22.6377 4.5924 22.6377H18.4559C19.9852 22.6377 21.2286 21.3943 21.2286 19.865V8.77416V6.69463V6.00146C21.2286 4.47214 19.9852 3.22876 18.4559 3.22876H16.723V1.49582C16.723 0.919616 16.2594 0.456055 15.6832 0.456055C15.107 0.456055 14.6435 0.919616 14.6435 1.49582V3.22876H8.40487V1.49582ZM3.89923 8.77416H19.1491V19.865C19.1491 20.2462 18.8372 20.5581 18.4559 20.5581H4.5924C4.21116 20.5581 3.89923 20.2462 3.89923 19.865V8.77416Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_649_9808">
                    <rect
                      width="22.4416"
                      height="22.4416"
                      fill="white"
                      transform="translate(0 0.456055)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span>September 19-21, 2023</span>
            </div>
            <span />
            <div className="flex items-center max-md:gap-3 gap-5">
              <GlobeIcon className="w-6 h-6" />
              <span>San Francisco Bay Area, CA</span>
            </div>
          </div>
        </div>
      </div>
      <ThanksConf schedule={pageContext.schedule} />
      <SpeakersConf />
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

export default IndexTemplate

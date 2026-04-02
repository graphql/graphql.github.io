import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { Accordion } from "@/app/conf/_design-system/accordion"

import locationPhoto from "./location-photo.webp"

export interface VenueProps extends React.HTMLAttributes<HTMLElement> {}

export function Venue(props: VenueProps) {
  return (
    <section
      {...props}
      style={{
        ...({ "--photo": `url(${locationPhoto.src})` } as {}),
        ...props.style,
        backgroundBlendMode: "overlay, normal",
      }}
      className={clsx(
        "gql-section relative bg-[linear-gradient(0deg,hsl(var(--color-sec-light))_0%,hsl(var(--color-sec-light))_100%),var(--photo)] dark:bg-[linear-gradient(180deg,#344303_0%,#344303_120%),var(--photo)] md:bg-cover",
        props.className,
      )}
    >
      <div className="relative flex gap-x-12 gap-y-10 bg-white/10 p-4 dark:bg-blk/10 max-lg:flex-col lg:p-16 xl:*:flex-1">
        <div
          className="absolute inset-0 backdrop-blur-3xl"
          style={{
            maskImage:
              "radial-gradient(circle at center, #fff 65%, rgb(255 0 0/.8) 99%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, #fff 65%, rgb(255 0 0/.8) 99%)",
          }}
        />
        <article className="relative flex shrink-0 flex-col gap-6 max-xl:max-w-[476px]">
          {
            <>
              <h2 className="typography-h2">Venue</h2>
              <p className="typography-body-lg">
                We're heading back to where it all began: GraphQLConf 2026 will
                be hosted at Meta's Fremont campus, where GraphQL was first
                conceptualized by Facebook engineers in 2012.
              </p>
              <div className="flex-1" />
            </>
          }
          <p className="typography-body-lg">
            Meta FRE 117 - Fremont Campus <br />
            6611 Dumbarton Circle <br />
            Fremont, CA 94555
          </p>
          {
            <Button href="https://maps.app.goo.gl/2nBp7Pp3Qrs8299G9">
              Google Maps
            </Button>
          }
        </article>
        {
          <div className="relative flex-1">
            <h3 className="typography-h3 mb-6">How to get there</h3>
            <Accordion
              className="[&_svg]:fill-neu-900"
              items={[
                {
                  title: "Public Transportation",
                  description: (
                    <>
                      Review local and regional transportation options for
                      getting around Fremont:
                      https://www.fremont.gov/residents/public-transportation
                      <br />
                    </>
                  ),
                },
                {
                  title: "Airport Information",
                  description: (
                    <>
                      There are multiple airports within a reasonable driving
                      distance to the Fremont Campus: <br />
                      <ul>
                        <li>
                          <a href="https://www.flysfo.com/">
                            San Francisco International Airport (SFO){" "}
                          </a>
                        </li>
                        <li>
                          <a href="https://www.flysanjose.com/">
                            San Jose Mineta International Airport (SJC)
                          </a>
                        </li>
                        <li>
                          <a href="https://www.iflyoak.com/">
                            Oakland International Airport (OAK)
                          </a>
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Parking at venue",
                  description: <>Coming Soon!</>,
                },
              ]}
            />
            <h3 className="typography-h3 my-6">Where to stay</h3>
            <Accordion
              className="[&_svg]:fill-neu-900"
              items={[
                {
                  title: "Aloft Silicon Valley",
                  link: "https://www.marriott.com/en-us/hotels/sjcal-aloft-silicon-valley/overview/",
                  description: (
                    <>
                      8200 Gateway Blvd
                      <br />
                      Newark, CA 94560
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:650 326 9010">
                        510-494-8800
                      </a>
                    </>
                  ),
                },
                {
                  title: "Courtyard by Marriott Fremont Silicon Valley",
                  link: "https://www.marriott.com/en-us/hotels/sjcfe-courtyard-fremont-silicon-valley/overview/",
                  description: (
                    <>
                      47000 Lakeview Blvd
                      <br />
                      Fremont, CA 94538
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:510 494 8800">
                        510-656-1800
                      </a>
                    </>
                  ),
                },
                {
                  title: "Residence Inn by Marriott Newark Silicon Valley",
                  link: "https://www.marriott.com/en-us/hotels/sjcnw-residence-inn-newark-silicon-valley/overview/",
                  description: (
                    <>
                      35466 Dumbarton Court <br />
                      Newark, CA 94560
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:650 278 4448">
                        510-739-6000
                      </a>
                    </>
                  ),
                },
              ]}
            />
          </div>
        }
      </div>
    </section>
  )
}

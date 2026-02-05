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
                be hosted at Meta's Menlo Park campus, where GraphQL was first
                conceptualized by Facebook engineers in 2012.
              </p>
              <div className="flex-1" />
            </>
          }
          <p className="typography-body-lg">
            Meta MPK 22 Bayfront Campus <br />
            305 Constitution Dr <br />
            Menlo Park, CA 94025
          </p>
          {
            <Button href="https://maps.app.goo.gl/rRTvnDFk8LgwHjsV7">
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
                      The city is served by multiple public transportation
                      providers: <br />
                      <ul>
                        <li>
                          <a href="https://www.caltrain.com/">Caltrain</a>
                        </li>
                        <li>
                          <a href="https://www.samtrans.com/">SamTrans</a>
                        </li>
                        <li>
                          <a href="https://dumbartonexpress.com/">
                            Dumbarton Express
                          </a>{" "}
                          (connects{" "}
                          <a href="https://www.bart.gov/stations/ucty">
                            Union City BART
                          </a>{" "}
                          to Menlo Park)
                        </li>
                        <li>
                          <a href="https://www.menlopark.gov/Government/Departments/Public-Works/Transportation-Division/City-Shuttle-services">
                            City Shuttles
                          </a>
                        </li>
                        <br />
                        Review local and regional transportation options for
                        getting around Menlo Park.
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Airport Information",
                  description: (
                    <>
                      There are multiple airports within a reasonable driving
                      distance to Menlo Park: <br />
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
                  title: "The Cottages Hotel",
                  link: "https://cottageshotel.com/?utm_source=google&utm_medium=organic&utm_campaign=business_listing",
                  description: (
                    <>
                      1704 El Camino Real
                      <br />
                      Menlo Park, CA 94027
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:650 326 9010">
                        650-326-9010
                      </a>
                    </>
                  ),
                },
                {
                  title: "Aloft Silicon Valley",
                  link: "https://www.marriott.com/en-us/hotels/sjcal-aloft-silicon-valley/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
                  description: (
                    <>
                      8200 Gateway Blvd
                      <br />
                      Newark, CA 94560
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:510 494 8800">
                        510-494-8800
                      </a>
                    </>
                  ),
                },
                {
                  title: "CitizenM Menlo Park Hotel",
                  link: "https://www.marriott.com/en-us/hotels/sfopk-citizenm-menlo-park/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
                  description: (
                    <>
                      2 Meta Way <br />
                      Menlo Park, CA 94025
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:650 278 4448">
                        650-278-4448
                      </a>
                    </>
                  ),
                },
                {
                  title: "Courtyard by Marriott Redwood City",
                  link: "https://www.marriott.com/en-us/hotels/sford-courtyard-redwood-city/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
                  description: (
                    <>
                      600 Bair Island Rd <br />
                      Redwood City, CA 94063
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:650 216 9435">
                        650-216-9435
                      </a>
                    </>
                  ),
                },
                {
                  title: "Hotel Nia",
                  link: "https://www.hotelnia.com/",
                  description: (
                    <>
                      200 Independence Dr <br />
                      Menlo Park, CA 94025
                      <br />
                      Phone:{" "}
                      <a className="typography-link" href="tel:650 900 3434">
                        650-900-3434
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

import { TrainIcon, AroundIcon, ParkingIcon, BusIcon } from "@/icons"
import NextImage from "next-image-export-optimizer"
import hotel from "./sf-hotel-image.png"

export function Venue() {
  return (
    <div id="location" className="conf-block">
      <h1 className="text-4xl text-white font-bold mb-8 mx-auto text-center">
        Location &amp; Venue
      </h1>
      <div className="container">
        <p className="max-w-prose mx-auto text-white">
          GraphQLConf 2023 is hosted in the San Francisco Bay Area, where
          GraphQL was first created. It's hosted at the{" "}
          <a
            href="https://www.hyatt.com/en-US/group-booking/SFOBU/G-LIFO"
            target="_blank"
            className="font-bold"
          >
            Hyatt Regency SFO
          </a>{" "}
          hotel in Burlingame, CA.
        </p>
        <NextImage
          src={hotel}
          alt="Hotel photo"
          className="object-cover w-[300px] h-[180px] md:w-[500px] md:h-[300px] rounded-xl my-8 block mx-auto"
        />
      </div>
      <div className="container flex flex-wrap">
        <div className="sm:w-full grid grid-rows-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-4">
              Venue &amp; Lodging
            </h3>
            <p>
              <a
                target="_blank"
                className="font-bold"
                href="https://www.hyatt.com/en-US/group-booking/SFOBU/G-LIFO"
              >
                Hyatt Regency SFO
              </a>
            </p>
            <p>
              <a target="_blank" href="https://goo.gl/maps/czbwwNL28YYYpw8W8">
                1333 Old Bayshore Hwy Burlingame, CA 94010
              </a>
            </p>
            <div className="text-white text-base">
              <b>Dates with Availability</b>: September 18, 19, 20, 21, 2023
              <br />
              <b>Room Rates Start From</b>: $179.00
              <br />
              <b>Room Block Closes</b>: 12:00 PM Pacific on September 8, 2023.
              <br />
              <i>
                (Please note, the rate is valid until the cut-off date or the
                room block is full)
              </i>
              <br />
              Please note, rooms will most likely sell out in advance of the{" "}
              <a
                href="https://www.hyatt.com/en-US/group-booking/SFOBU/G-LIFO"
                target="_blank"
              >
                room block
              </a>{" "}
              close dates. We encourage you to book early to secure a room at
              the conference rate.
            </div>
          </div>

          <div>
            <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-4">
              Alternate lodging options
            </h3>
            <a
              href="https://www.ihg.com/holidayinnexpress/hotels/us/en/burlingame/urlbh/hoteldetail"
              target="_blank"
              rel="noreferrer"
            >
              Holiday Inn Express San Francisco Airport South, and IHG Hotel
            </a>
            <p className="leading-relaxed mb-3 text-white text-base">
              <span className="font-bold">Important:</span> The Linux Foundation
              will never reach out to attendees by phone to make hotel
              reservations for our conferences. Please be advised that the most
              secure way to book in our discounted room block is by using the
              direct booking link provided below or by calling the hotel
              directly. If you receive a phone call or email from someone
              claiming to be with The Linux Foundation or the hotel and they
              attempt to sell you a hotel room, please email us at{" "}
              <a
                className="font-bold"
                href="mailto:housing@linuxfoundation.org"
              >
                housing@linuxfoundation.org
              </a>
              .
            </p>
            <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-4">
              Welcome to all
            </h3>
            <p className="leading-relaxed mb-3 text-white text-base">
              GraphQLConf is welcome to all. Please read our{" "}
              <a href="/conf/faq/#dni" className="underline">
                diversity & inclusion
              </a>{" "}
              guide and{" "}
              <a href="/conf/faq/#codeofconduct" className="underline">
                code of conduct
              </a>
              . Your health and safety is our top priority. We have considered a
              range of both{" "}
              <a href="/conf/faq/#onsite-resources" className="underline">
                onsite resources
              </a>{" "}
              and{" "}
              <a href="/conf/faq/#emergency-resources" className="underline">
                emergency resources
              </a>{" "}
              as well as a{" "}
              <a href="/conf/faq/#health-and-safety" className="underline">
                health &amp; safety
              </a>{" "}
              policy.
            </p>
          </div>
        </div>
      </div>
      <div className="container flex max-lg:flex-col w-full gap-14 pt-16">
        {[
          {
            title: "Public Transportation",
            icon: TrainIcon,
            content: (
              <div>
                <a href="https://samtrans.com" target="_blank" rel="noreferrer">
                  SamTrans
                </a>
                <p>
                  Service from Burlingame to San Francisco is available for $5
                  (adults) or $2.50 youth and seniors.{" "}
                  <a
                    href="https://samtrans.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn More
                  </a>
                </p>
                <a href="https://bart.gov" target="_blank" rel="noreferrer">
                  Bay Area Rapid Transit (BART):
                </a>
                <p>
                  Take the Hyatt Shuttle Bus to/from SFO International Terminal
                  to connect with BART. Approximate cost from the station to
                  downtown San Francisco is $8.65 one-way.
                </p>
              </div>
            ),
          },
          {
            title: "Airport Information",
            icon: AroundIcon,
            content: (
              <div>
                <a href="https://flysfo.com" target="_blank" rel="noreferrer">
                  San Francisco International Airport (SFO)
                </a>
                <p>
                  Drive time from venue: 7 mins.
                  <br />
                  Distance from venue: 3.1 miles.
                </p>
                <a
                  href="https://www.google.com/maps/dir/San+Francisco+International+Airport+(SFO),+San+Francisco,+CA/Hyatt+Regency+San+Francisco+Airport,+1333+Old+Bayshore+Hwy,+Burlingame,+CA+94010/@37.6056719,-122.3979086,14z/am=t/data=!4m14!4m13!1m5!1m1!1s0x808f778c55555555:0xa4f25c571acded3f!2m2!1d-122.3789554!2d37.6213129!1m5!1m1!1s0x808f762dd36adc25:0x66d848e8e05f3445!2m2!1d-122.3651261!2d37.5938725!3e0?shorturl=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Driving Directions from SFO to Venue
                </a>
              </div>
            ),
          },
          {
            title: "Parking",
            icon: ParkingIcon,
            content: (
              <div>
                <a
                  href="https://www.hyatt.com/en-US/hotel/california/hyatt-regency-san-francisco-airport/sfobu"
                  target="_blank"
                  rel="noreferrer"
                >
                  The Hyatt Regency SFO offers self-parking.
                </a>
                <p className="font-bold">Self-Parking:</p>
                <p>
                  0-1 hour: $12
                  <br />
                  1-6 hours: $22/hour
                  <br />
                  6+ hours or overnight: $40/night
                </p>
              </div>
            ),
          },
          {
            title: "Complimentary Shuttle Service",
            icon: BusIcon,
            content: (
              <div>
                <a
                  href="https://www.hyatt.com/en-US/hotel/california/hyatt-regency-san-francisco-airport/sfobu?src=adm_sem_crp_chico_crp_ppc_NAM-UnitedStates-CA-Burlingame-HR-SFOBU_google_Evergreen2022_e_hyatt%20regency%20sfo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hyatt Regency SFO
                </a>
                <p>
                  The Hyatt Regency SFO offers a <b>24-hour</b> complimentary
                  San Francisco International Airport (SFO) shuttle which runs
                  every <b>15 minutes</b> from <b>4:00AM until 1:00AM</b> and
                  <b> every 30 minutes</b> from <a>1:00AM until 4:00AM</a>. At
                  SFO, go to the area marked "Hotel Shuttle." The bus is marked
                  "Hyatt Regency and Marriott.”
                </p>
              </div>
            ),
          },
        ].map(o => (
          <div key={o.title} className="flex-1">
            <div className="h-full rounded-lg overflow-hidden relative [&_a]:text-primary [&_a]:font-medium [&_p]:text-white [&_p]:text-lg [&_p]:mb-6 [&>div>a]:block [&>div>a]:mt-6 [&>div>a]:mb-3">
              <o.icon className="fill-primary h-16 w-auto" />
              <h1 className="my-3 sm:text-2xl text-xl font-medium text-white">
                {o.title}
              </h1>
              {o.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

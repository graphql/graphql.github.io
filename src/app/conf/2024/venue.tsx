import { TrainIcon, AroundIcon, ParkingIcon, BusIcon } from "@/icons"
import NextImage from "next-image-export-optimizer"
import cityViewImage from "./sf-city-view.jpeg"

export function Venue() {
  return (
    <div
      id="location"
      className="container conf-block text-white [&_a]:text-primary"
    >
      <h1 className="md:text-center mb-5 lg:mb-20 conf-heading">
        Location &amp; Venue
      </h1>
      <p className="max-w-prose lg:mx-auto">
        GraphQLConf 2024 is hosted in the San Francisco Bay Area, where GraphQL
        was first created. It's hosted at the{" "}
        <a
          href="https://marriott.com/en-us/hotels/sfojw-jw-marriott-san-francisco-union-square/overview"
          target="_blank"
          rel="noreferrer"
        >
          JW Marriott San Francisco Union Square
        </a>{" "}
        in CA.
      </p>
      <NextImage
        src={cityViewImage}
        alt="San Francisco city view"
        className="object-cover aspect-video lg:max-w-[70%] rounded-md my-8 mx-auto"
      />
      <div className="grid lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="sm:text-2xl text-xl font-medium mt-6 mb-4">
            Venue &amp; Lodging
          </h3>
          <a
            target="_blank"
            href="https://www.hyatt.com/en-US/group-booking/SFOBU/G-LIFO"
          >
            Hyatt Regency SFO
          </a>
          <a
            target="_blank"
            href="https://goo.gl/maps/czbwwNL28YYYpw8W8"
            className="block mb-4"
          >
            1333 Old Bayshore Hwy Burlingame, CA 94010
          </a>
          <b>Dates with Availability</b>: September 18, 19, 20, 21, 2023
          <br />
          <b>Room Rates Start From</b>: $179.00
          <br />
          <b>Room Block Closes</b>: 12:00 PM Pacific on September 8, 2023.
          <br />
          <i>
            (Please note, the rate is valid until the cut-off date or the room
            block is full)
          </i>
          <br />
          Please note, rooms will most likely sell out in advance of the{" "}
          <a
            href="https://www.hyatt.com/en-US/group-booking/SFOBU/G-LIFO"
            target="_blank"
            rel="noreferrer"
          >
            room block
          </a>{" "}
          close dates. We encourage you to book early to secure a room at the
          conference rate.
        </div>
        <div>
          <h3 className="sm:text-2xl text-xl font-medium mt-6 mb-4">
            Alternate lodging options
          </h3>
          <a
            href="https://www.ihg.com/holidayinnexpress/hotels/us/en/burlingame/urlbh/hoteldetail"
            target="_blank"
            rel="noreferrer"
            className="mb-4 block"
          >
            Holiday Inn Express San Francisco Airport South, and IHG Hotel
          </a>
          <p className="leading-relaxed mb-3 text-base">
            <b>Important:</b> The Linux Foundation will never reach out to
            attendees by phone to make hotel reservations for our conferences.
            Please be advised that the most secure way to book in our discounted
            room block is by using the direct booking link provided below or by
            calling the hotel directly. If you receive a phone call or email
            from someone claiming to be with The Linux Foundation or the hotel
            and they attempt to sell you a hotel room, please email us at{" "}
            <a href="mailto:housing@linuxfoundation.org">
              housing@linuxfoundation.org
            </a>
            .
          </p>
          <h3 className="sm:text-2xl text-xl font-medium mt-6 mb-4">
            Welcome to all
          </h3>
          <p className="leading-relaxed mb-3 text-base">
            GraphQLConf is welcome to all. Please read our{" "}
            <a href="/conf/faq/#dni">diversity & inclusion</a> guide and{" "}
            <a href="/conf/faq/#codeofconduct">code of conduct</a>. Your health
            and safety is our top priority. We have considered a range of both{" "}
            <a href="/conf/faq/#onsite-resources">onsite resources</a> and{" "}
            <a href="/conf/faq/#emergency-resources">emergency resources</a> as
            well as a{" "}
            <a href="/conf/faq/#health-and-safety">health &amp; safety</a>{" "}
            policy.
          </p>
        </div>
      </div>
      <div className="flex max-lg:flex-col w-full gap-14 pt-16">
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
                  (adults) or $2.50 youth and seniors.
                </p>
                <a href="https://bart.gov" target="_blank" rel="noreferrer">
                  Bay Area Rapid Transit (BART)
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
                  The Hyatt Regency SFO offers self-parking
                </a>
                <p className="font-bold mb-6">Self-Parking:</p>
                0-1 hour: $12
                <br />
                1-6 hours: $22/hour
                <br />
                6+ hours or overnight: $40/night
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
                  The Hyatt Regency SFO offers a <span>24-hour</span>{" "}
                  complimentary San Francisco International Airport (SFO)
                  shuttle which runs every <span>15 minutes</span> from{" "}
                  <span>4:00AM until 1:00AM</span> and
                  <span> every 30 minutes</span> from{" "}
                  <span>1:00AM until 4:00AM</span>. At SFO, go to the area
                  marked "Hotel Shuttle." The bus is marked "Hyatt Regency and
                  Marriott.”
                </p>
              </div>
            ),
          },
        ].map(o => (
          <div
            key={o.title}
            className="flex-1 text-lg [&_a]:block [&_a]:text-lg [&_a]:mt-6 [&_a]:mb-3"
          >
            <o.icon className="fill-primary h-16 w-auto" />
            <h1 className="my-3 sm:text-2xl text-xl font-medium">{o.title}</h1>
            {o.content}
          </div>
        ))}
      </div>
    </div>
  )
}

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
            content: <></>,
          },
          {
            title: "Airport Information",
            icon: AroundIcon,
            content: (
              <>
                <a href="#" target="_blank" rel="noreferrer">
                  San Francisco International Airport (SFO)
                </a>
                <br />
                Drive Time From Venue: Approximately 35 minutes
                <br />
                Distance from Venue: 14.5 miles
                <br />
                <a href="#" target="_blank" rel="noreferrer">
                  Driving Directions from SFO to Venue
                </a>
                <br />
                <br />
                <a href="#" target="_blank" rel="noreferrer">
                  Oakland Internation Airport (OAK)
                </a>
                <br />
                Drive Time From Venue: Approximately 36 minutes
                <br />
                Distance from Venue: 20 miles
                <br />
                <a href="#" target="_blank" rel="noreferrer">
                  Driving Directions from OAK to Venue
                </a>
              </>
            ),
          },
          {
            title: "Parking",
            icon: ParkingIcon,
            content: (
              <>
                At Venue: Valet parking available onsite for $73 daily
                <br />
                Nearby:{" "}
                <a
                  href="https://sfcitypark.com/parking-locations.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Prestige Park Parking Garage
                </a>{" "}
                - 490 Post Street (entrance at 520 Mason Street)
              </>
            ),
          },
        ].map(o => (
          <div key={o.title} className="flex-1 text-lg">
            <o.icon className="fill-primary h-16 w-auto" />
            <h1 className="my-3 sm:text-2xl text-xl font-medium">{o.title}</h1>
            {o.content}
          </div>
        ))}
      </div>
    </div>
  )
}

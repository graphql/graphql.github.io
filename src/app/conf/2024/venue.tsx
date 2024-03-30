import { TrainIcon, AroundIcon, ParkingIcon, BusIcon } from "@/icons"
import NextImage from "next-image-export-optimizer"
import cityViewImage from "./sf-city-view.jpeg"

const classes = {
  heading: "mb-6 sm:text-2xl text-xl font-bold",
}

export function Venue() {
  return (
    <div
      id="location"
      className="container conf-block text-white [&_a]:text-primary"
    >
      <h1 className="md:text-center mb-5 lg:mb-20 conf-heading">
        Location &amp; Venue
      </h1>
      <div className="grid lg:grid-cols-2 lg:gap-14 text-lg">
        <div>
          <h3 className={classes.heading}>Venue Information</h3>
          <a
            href="https://marriott.com/en-us/hotels/sfojw-jw-marriott-san-francisco-union-square/overview"
            target="_blank"
            rel="noreferrer"
          >
            JW Marriott San Francisco Union Square
          </a>
          <br />
          515 Mason Street
          <br />
          San Francisco, CA 94102
          <NextImage
            src={cityViewImage}
            alt="San Francisco city view"
            className="object-cover aspect-video rounded-md my-8 mx-auto"
          />
        </div>
        <div>
          <h3 className={classes.heading}>Hotel Information</h3>
          Hotel Information Coming Soon!
          <br />
          <br />
          <br />
          Please note, rooms will most likely sell out in advance of the room
          block close dates listed below. We encourage you to book early to
          secure a room at the conference rate.
          <br />
          <br />
          <b>Important:</b> The Linux Foundation will never reach out to
          attendees by phone to make hotel reservations for our conferences.
          Please be advised that the most secure way to book in our discounted
          room block is by using the direct booking link provided below or by
          calling the hotel directly. If you receive a phone call or email from
          someone claiming to be with The Linux Foundation or the hotel and they
          attempt to sell you a hotel room, please email us at{" "}
          <a href="mailto:housing@linuxfoundation.org">
            housing@linuxfoundation.org
          </a>
          .
        </div>
      </div>
      <div className="flex text-lg max-lg:flex-col w-full gap-14 pt-16">
        {[
          {
            title: "Public Transportation",
            icon: TrainIcon,
            content: (
              <>
                Bus Station
                <br />
                <a href="http://greyhound.com" target="_blank" rel="noreferrer">
                  San Francisco Greyhound Station
                </a>
                <br />
                <br />
                Subway Station
                <br />
                <a
                  href="https://marriott.com/en-us/hotels/sfojw-jw-marriott-san-francisco-union-square/overview/#:~:text=Powell%20Street%20BART%20Station"
                  target="_blank"
                  rel="noreferrer"
                >
                  Powell Street BART Station
                </a>
                <br />
                <br />
                Train Station
                <br />
                <a
                  href="https://amtrak.com/san-francisco-bay-area-northern-california-train-routes"
                  target="_blank"
                  rel="noreferrer"
                >
                  Amtrak
                </a>
              </>
            ),
          },
          {
            title: "Airport Information",
            icon: AroundIcon,
            content: (
              <>
                <a href="https://flysfo.com" target="_blank" rel="noreferrer">
                  San Francisco International Airport (SFO)
                </a>
                <br />
                Drive Time From Venue: Approximately 35 minutes
                <br />
                Distance from Venue: 14.5 miles
                <br />
                <a
                  href="https://maps.app.goo.gl/qWMsVAkjy7aV7W2p9"
                  target="_blank"
                  rel="noreferrer"
                >
                  Driving Directions from SFO to Venue
                </a>
                <br />
                <br />
                <a
                  href="http://oaklandairport.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Oakland Internation Airport (OAK)
                </a>
                <br />
                Drive Time From Venue: Approximately 36 minutes
                <br />
                Distance from Venue: 20 miles
                <br />
                <a
                  href="https://maps.app.goo.gl/qfhWf4DqExRhmZSeA"
                  target="_blank"
                  rel="noreferrer"
                >
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
          <div key={o.title} className="flex-1">
            <o.icon className="fill-primary h-16 w-auto mb-4" />
            <h3 className={classes.heading}>{o.title}</h3>
            {o.content}
          </div>
        ))}
      </div>
    </div>
  )
}

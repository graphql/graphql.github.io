import React from "react"

const VenueConf = () => {
  return (
    <div id="location">
      <div className="w-full mx-auto">
        <div className="flex w-2/3 flex-col text-center mx-auto px-4">
          <h1 className="text-4xl text-white font-bold mt-8 mb-6">
            Location &amp; Venue
          </h1>
          <div className="flex flex-wrap">
            <div className="p-4 sm:w-full">
              <div className="h-full bg-[#251C39] bg-opacity-75 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center relative">
                <div className="text-white text-xl">
                  <p className="max-w-prose mx-auto text-white">
                    GraphQLConf 2023 is hosted in the San Francisco Bay Area,
                    where GraphQL was first created, at the{" "}
                    <a
                      href="https://www.hyatt.com/en-US/hotel/california/hyatt-regency-san-francisco-airport/sfobu"
                      target="_blank"
                    >
                      Hyatt Regency SFO
                    </a>
                    . We're thrilled to bring the world-wide community together
                    here. There’s lots to explore in the Bay Area and the
                    weather is great.
                  </p>
                </div>
                <h2 className="title-font sm:text-2xl text-xl font-medium text-white mb-2 mt-8">
                  Hotel Information
                </h2>
                <p className="leading-relaxed mb-3 text-gray-400">
                  Please note, rooms will most likely sell out in advance of the
                  room block close dates listed below. We encourage you to book
                  early to secure a room at the conference rate
                  <br />
                  Important: The Linux Foundation will never reach out to
                  attendees by phone to make hotel reservations for our
                  conferences. Please be advised that the most secure way to
                  book in our discounted room block is by using the direct
                  booking link provided below or by calling the hotel directly.
                  If you receive a phone call or email from someone claiming to
                  be with The Linux Foundation or the hotel and they attempt to
                  sell you a hotel room, please email us at{" "}
                  <a className="font-bold" href="housing@linuxfoundation.org">
                    housing@linuxfoundation.org.
                  </a>
                </p>
                <h2 className="title-font sm:text-2xl text-xl font-medium text-white mb-2 mt-8">
                  Welcome to all
                </h2>
                <p className="leading-relaxed mb-3 text-gray-400">
                  GraphQLConf is welcome to all. Please read our{" "}
                  <a href="/conf/faq/#dni">diversity & inclusion</a> guide and{" "}
                  <a href="/conf/faq/#codeofconduct">code of conduct</a>. Your
                  health and safety is our top priority. We have considered a
                  range of both{" "}
                  <a href="/conf/faq/#onsite-resources">onsite resources</a> and{" "}
                  <a href="/conf/faq/#emergency-resources">
                    emergency resources
                  </a>{" "}
                  as well as a{" "}
                  <a href="/conf/faq/#health-and-safety">health &amp; safety</a>{" "}
                  policy.
                </p>
              </div>
            </div>
          </div>
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap w-full">
              <div className="p-4 lg:w-1/3 sm:w-full">
                <div className="h-full bg-[#251C39] px-8 pt-16 pb-24 rounded-lg overflow-hidden relative">
                  <div className="justify-center flex">
                    <img src="/img/conf/train.svg" className="w-20 h-20" />
                  </div>
                  <h1 className="mb-2 mt-2  sm:text-2xl text-xl font-medium text-white mb-3 text-center">
                    Public Transportation
                  </h1>
                  <div className="text-gray-400 text-sm">
                    <a
                      href="https://www.samtrans.com/"
                      className=" inline-flex left-0 "
                    >
                      SamTrans
                    </a>
                    <p className="leading-relaxed mb-3">
                      Service from Burlingame to San Francisco is available for
                      $5 (adults) or $2.50 youth and seniors.
                      <a className=" inline-flex items-center">Learn More</a>
                    </p>
                    <a
                      href="https://www.bart.gov/"
                      className=" inline-flex left-0 "
                    >
                      Bay Area Rapid Transit (BART):
                    </a>
                    <p className="leading-relaxed mb-3">
                      Take the Hyatt Shuttle Bus to/from SFO International
                      Terminal to connect with BART. Approximate cost from the
                      station to downtown San Francisco is $8.65 one-way.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/3 sm:w-full">
                <div className="h-full w-full bg-[#251C39] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden ">
                  <div className="justify-center flex">
                    <img src="/img/conf/around.svg" className="w-20 h-20" />
                  </div>
                  <h1 className="mb-2 mt-2 sm:text-2xl text-xl font-medium text-white mb-3 text-center">
                    Airport Information
                  </h1>
                  <div className="text-gray-400 text-sm">
                    <a
                      href="https://www.flysfo.com/"
                      className=" inline-flex left-0 "
                    >
                      San Francisco International Airport (SFO)
                    </a>
                    <p className="leading-relaxed mb-3">
                      Drive time from venue: 7 mins. <br />
                      Distance from venue: 3.1 miles.
                    </p>
                    <a href="https://www.google.com/maps/dir/San+Francisco+International+Airport+(SFO),+San+Francisco,+CA/Hyatt+Regency+San+Francisco+Airport,+1333+Old+Bayshore+Hwy,+Burlingame,+CA+94010/@37.6056719,-122.3979086,14z/am=t/data=!4m14!4m13!1m5!1m1!1s0x808f778c55555555:0xa4f25c571acded3f!2m2!1d-122.3789554!2d37.6213129!1m5!1m1!1s0x808f762dd36adc25:0x66d848e8e05f3445!2m2!1d-122.3651261!2d37.5938725!3e0?shorturl=1">
                      Driving Directions from SFO to Venue
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/3 sm:w-full">
                <div className="h-full bg-[#251C39] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative">
                  <div className="justify-center flex">
                    <img
                      src="/img/conf/parking.svg"
                      className="text-white w-20 h-20"
                    />
                  </div>
                  <h1 className="text-white mb-2 mt-2 sm:text-2xl text-xl font-medium text-white mb-3 text-center">
                    Parking
                  </h1>
                  <div className="text-gray-400 text-sm">
                    <a>The Hyatt Regency SFO offers self-parking.</a>
                    <br />
                    <br />
                    <p className="font-bold">Self-Parking:</p>
                    <p className="leading-relaxed mb-3">
                      0-1 hour: $12 <br />
                      1-6 hours: $22/hour <br />
                      6+ hours or overnight: $40/night
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueConf

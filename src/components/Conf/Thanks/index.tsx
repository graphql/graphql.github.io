import React from "react"
import ButtonConf from "../Button"
import Lee from "../../../../static/img/conf/Gallery/3.jpg"
import SessionList, { ScheduleSession } from "../Schedule/session-list"

function shuffle<T extends any[]>(array: T): T {
  let currentIndex = array.length
  let randomIndex: number

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export default function ThanksConf({
  schedule,
}: {
  schedule: ScheduleSession[]
}) {
  const filteredSessions = schedule.filter(item => item.speakers.length === 1)

  return (
    <div className="bg-gray-100 py-24">
      <div className="container flex gap-20 flex-col">
        <div className="flex gap-12 lg:gap-24 max-md:flex-col">
          <div>
            <h2 className="text-5xl mt-0 font-bold">
              Thank you for Attending!
            </h2>
            <p>
              Thank you to all who joined us for <b>GraphQLConf&nbsp;2023</b>!
              We look forward to seeing you at future events.To experience the
              best of this year's event, be sure to watch session recordings and
              slides from speakers, available on the event schedule for each
              talk.
            </p>
          </div>
          {/* this div is really necessary otherwise img will appear outside from div */}
          <div>
            <img
              alt="Lee Byron"
              className="object-cover rounded-md max-w-full"
              src={Lee}
            />
          </div>
        </div>
        <SessionList
          showFilter={false}
          scheduleData={shuffle(filteredSessions).slice(0, 3)}
        />
        <ButtonConf href="/conf/sessions/" className="!block mx-auto">
          Explore recordings and slides
        </ButtonConf>
      </div>
    </div>
  )
}

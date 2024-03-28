import NextImage from "next/image"
import { SessionList } from "./schedule/session-list"
import { Button } from "./button"
import leeImage from "public/img/conf/Gallery/3.jpg"
import { schedule, speakers } from "@/app/conf/2023/_data"

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

export async function Thanks() {
  const filteredSessions = schedule
    .filter(item => item.speakers)
    .filter(item => item.speakers!.length === 1)

  return (
    <div className="bg-gray-100 conf-block">
      <div className="container flex gap-20 flex-col">
        <div className="flex gap-12 lg:gap-24 max-md:flex-col">
          <div className="flex flex-col gap-5">
            <h2 className="conf-heading">Thank you for Attending!</h2>
            <p className="lg:text-lg">
              Thank you to all who joined us for <b>GraphQLConf&nbsp;2023</b>!
              We look forward to seeing you at future events.To experience the
              best of this year's event, be sure to watch session recordings and
              slides from speakers, available on the event schedule for each
              talk.
            </p>
          </div>
          {/* this div is really necessary otherwise img will appear outside from div */}
          <div>
            <NextImage
              alt="Lee Byron"
              className="object-cover rounded-md aspect-video"
              src={leeImage}
            />
          </div>
        </div>
        <SessionList
          showFilter={false}
          // @ts-expect-error -- fixme
          scheduleData={shuffle(filteredSessions)
            .slice(0, 3)
            .map(schedule => ({
              ...schedule,
              speakers: schedule.speakers!.map(speaker =>
                speakers.find(s => s.username === speaker.username),
              ),
            }))}
        />
        <Button href="/conf/2023/sessions" className="!block mx-auto">
          Explore recordings and slides
        </Button>
      </div>
    </div>
  )
}

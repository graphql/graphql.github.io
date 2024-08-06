import { Button } from "@/app/conf/_components/button"
import { CheckIcon } from "@/icons"
import { clsx } from "clsx"
import { schedule, speakers } from "./_data"
import { InfiniteMovingSpeakers } from "../_components/infinite-moving-speakers"
import { SessionList } from "../_components/schedule/session-list"
import { filterCategories2024 } from "../_components/schedule/filter-categories"
import { eventsColors } from "./utils"

interface Pricing {
  title: string
  date: string
  price: string
  expiredDate: Date
}

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

const pricing: Pricing[] = [
  {
    title: "Early Bird",
    date: "Through May 31, 2024",
    price: "$599",
    expiredDate: new Date("2024-06-01"),
  },
  {
    title: "Standard",
    date: "Jun 1 - Sep 4, 2024",
    price: "$799",
    expiredDate: new Date("2024-09-05"),
  },
  {
    title: "Late/Onsite",
    date: "Sep 5 Through Event",
    price: "$899",
    expiredDate: new Date("2024-10-01"),
  },
]

const includes: string[] = [
  "All conference content",
  "Full-day GraphQL workshop",
  "All-Day Beverages and Morning and Afternoon Break",
  "Entry to Sponsor Showcase",
  "GraphQLConf event t-shirt",
  "Access to watch all sessions post-event",
]

const classes = {
  heading: "text-[45px] text-center font-bold mb-20",
  container: "conf-block container text-white",
}

export function Pricing() {
  return (
    <>
      <div id="attend" className={classes.container}>
        <h1 className={classes.heading}>Pricing & Registration</h1>
        <div className="my-20 flex gap-10 justify-center max-md:items-center max-md:flex-col flex-wrap">
          {pricing.map((pricing, index) => {
            const isExpired = pricing.expiredDate < new Date()
            return (
              <a
                key={index}
                href="https://cvent.me/gk2dRw"
                target="_blank"
                rel="noreferrer"
                className={clsx(
                  "shadow-md px-24 py-12 bg-[#251f30] flex flex-col items-center border border-transparent transition-colors outline-none",
                  isExpired
                    ? "opacity-50 line-through pointer-events-none"
                    : "hover:shadow-primary/20 focus:shadow-primary/20 focus:border-primary hover:border-primary",
                )}
              >
                <div className="text-3xl font-bold mb-2">{pricing.title}</div>
                <div className="text-lg mb-6">{pricing.date}</div>
                <div className="text-[45px] text-primary font-bold [text-decoration-line:inherit]">
                  {pricing.price}
                </div>
              </a>
            )
          })}
        </div>
        <Button href="https://cvent.me/gk2dRw" className="mx-auto !block">
          Register Now!
        </Button>
      </div>
      <div className={classes.container}>
        <h3 className={classes.heading}>What's Included?</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 text-2xl">
          {includes.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <CheckIcon className="text-primary h-7 shrink-0" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={clsx(classes.container, "flex flex-col items-center")}>
        <h3 className="text-[45px] text-center font-bold mb-20">
          Our Special Speakers
        </h3>

        <InfiniteMovingSpeakers pauseOnHover={true}>
          {speakers
            .filter(e => e.avatar)
            .map(speaker => (
              <div
                key={speaker.username}
                className="group border-[1.5px] border-[rgba(255,255,255,0.4)] cursor-pointer hover:-translate-y-3 transition-transform duration-300 relative rounded-full overflow-hidden md:size-[210px]"
              >
                <a href={`/conf/2024/speakers/${speaker.username}`}>
                  <img
                    className="size-[120px] md:size-[210px] rounded-full"
                    src={speaker.avatar}
                    alt={speaker.name}
                  />
                </a>
                <div className="pointer-events-none bg-[rgba(0,0,0,0.6)] h-[40px] text-sm md:text-base md:h-[55px] w-[120px] md:w-[210px] absolute left-0 bottom-0 opacity-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                  <span className="mt-2.5 md:mt-3.5 font-medium">
                    {speaker.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            ))}
        </InfiniteMovingSpeakers>

        <div className="mt-14 flex gap-4">
          <Button href="/conf/2024/speakers">See all Speakers</Button>
        </div>

        <div className="mt-16">
          <h3 className="text-[45px] text-center font-bold mb-16">
            The Schedule
          </h3>

          <SessionList
            minimalVersion
            year="2024"
            filterCategories={filterCategories2024}
            eventsColors={eventsColors}
            showFilter={false}
            // @ts-expect-error -- fixme
            scheduleData={shuffle(schedule.filter(e => e.speakers))
              .slice(0, 3)
              .map(schedule => ({
                ...schedule,
                speakers:
                  schedule?.speakers?.map(speaker =>
                    speakers.find(s => s.username === speaker.username),
                  ) || [],
              }))}
          />
        </div>

        <div className="mt-14 flex gap-4">
          <Button href="/conf/2024/speakers">View full schedule</Button>
        </div>
      </div>
    </>
  )
}

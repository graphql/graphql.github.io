import { Button } from "@/app/conf/_components/button"
import { CheckIcon, ClockIcon } from "@/icons"
import { clsx } from "clsx"

interface Pricing {
  title: string
  date: string
  price: string
  dateIsExpired: Date
}

const pricing: Pricing[] = [
  {
    title: "Early Bird",
    date: "Through May 31, 2024",
    price: "$599",
    dateIsExpired: new Date("2024-06-01"),
  },
  {
    title: "Standard",
    date: "Jun 1 - Sep 4, 2024",
    price: "$799",
    dateIsExpired: new Date("2024-09-05"),
  },
  {
    title: "Late/Onsite",
    date: "Sep 5 Through Event",
    price: "$899",
    dateIsExpired: new Date("2024-10-01"),
  },
]

const includes: string[] = [
  "All conference content",
  "Full-day GraphQL workshop",
  "Lunch and all-day beverages",
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
          {pricing.map((pricing, index) => (
            <a
              key={index}
              href="https://cvent.me/gk2dRw"
              target="_blank"
              rel="noreferrer"
              className="hover:shadow-primary/20 focus:shadow-primary/20 shadow-md px-24 py-12 bg-[#251f30] flex flex-col items-center border focus:border-primary hover:border-primary border-transparent transition-colors outline-none"
            >
              <div className="text-3xl font-bold mb-2">{pricing.title}</div>
              <div className="text-lg mb-6">{pricing.date}</div>
              <div className="text-[45px] text-primary font-bold">
                {pricing.price}
              </div>
            </a>
          ))}
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
        <ClockIcon className="text-primary h-10 mb-10" />
        <h3 className={classes.heading}>Speakers & Schedule</h3>
        <p className="-mt-10 text-2xl">Coming soon</p>
      </div>
    </>
  )
}

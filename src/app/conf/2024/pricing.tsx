import { Button } from "@/app/conf/_components/button"
import { CheckIcon } from "@/icons"
import { clsx } from "clsx"

interface Pricing {
  title: string
  date: string
  price: string
  expiredDate: Date
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
        <div className="my-20 flex flex-wrap justify-center gap-10 max-md:flex-col max-md:items-center">
          {pricing.map((pricing, index) => {
            const isExpired = pricing.expiredDate < new Date()
            return (
              <a
                key={index}
                href="https://cvent.me/gk2dRw"
                target="_blank"
                rel="noreferrer"
                className={clsx(
                  "flex flex-col items-center border border-transparent bg-[#251f30] px-24 py-12 shadow-md outline-none transition-colors",
                  isExpired
                    ? "pointer-events-none line-through opacity-50"
                    : "hover:border-primary hover:shadow-primary/20 focus:border-primary focus:shadow-primary/20",
                )}
              >
                <div className="mb-2 text-3xl font-bold">{pricing.title}</div>
                <div className="mb-6 text-lg">{pricing.date}</div>
                <div className="text-[45px] font-bold text-primary [text-decoration-line:inherit]">
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
        <div className="grid gap-10 text-2xl md:grid-cols-2 xl:grid-cols-3">
          {includes.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <CheckIcon className="h-7 shrink-0 text-primary" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

import React from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import ButtonConf from "../Button"

interface Pricing {
  title: string
  date: string
  price: string
  expierdDate: Date
}

const pricing: Pricing[] = [
  {
    title: "Early Bird",
    date: "Through May 31, 2023",
    price: "$599",
    expierdDate: new Date("2022-05-31"),
  },
  {
    title: "Standard",
    date: "Jun 1 - Sep 4, 2023",
    price: "$799",
    expierdDate: new Date("2023-09-04"),
  },
  {
    title: "Late/Onsite",
    date: "Sep 5 Through Event",
    price: "$899",
    expierdDate: new Date("2023-09-05"),
  },
]

const includes = [
  {
    title: "All conference content",
  },
  {
    title: "Full-day GraphQL workshop",
  },
  {
    title: "Lunch and all-day beverages",
  },
  {
    title: "Entry to Sponsor Showcase",
  },
  {
    title: "GraphQLConf event t-shirt",
  },
  {
    title: "Access to watch all sessions",
  },
]

const PricingConf = () => {
  const today = new Date()
  return (
    // Invisible padding so anchor links align to the header menu
    <div id="attend" className="-mt-16 pt-16">
      <div className="bg-[#171E26] container mb-6">
        <div className="flex flex-col text-center w-full">
          <h1 className="text-4xl text-white font-bold">Attend</h1>
        </div>
        <div className="mx-auto max-w-[80ch]">
          <div className="w-full grid grid-rows-1 md:grid-cols-3 gap-8 mt-8">
            {pricing.map((pricing, i) => (
              <a
                key={i}
                href="https://cvent.me/4zbxz9"
                target="_blank"
                className={`${
                  pricing.expierdDate < today
                    ? "block mx-auto w-64 p-6 overflow-hidden bg-[#474c52] shadow-xl rounded-2xl focus:outline-none hover:drop-shadow-lg hover:scale-[102%] hover:no-underline focus:no-underline transition ease-in-out cursor-not-allowed"
                    : "block mx-auto w-64 p-6 overflow-hidden bg-[#2E343C] shadow-xl rounded-2xl focus:outline-none hover:drop-shadow-lg hover:scale-[102%] hover:no-underline focus:no-underline transition ease-in-out"
                }`}
              >
                <div>
                  <div
                    className={
                      pricing.expierdDate < today
                        ? "text-center text-3xl text-gray-300 font-bold mb-2 line-through"
                        : "text-center text-3xl text-white font-bold mb-2"
                    }
                  >
                    {pricing.title}
                  </div>
                  <div className="text-white text-center text-sm">
                    {pricing.date}
                  </div>
                  <div
                    className={
                      pricing.expierdDate < today
                        ? "text-[--rhodamine] opacity-60 mt-4 p-4 rounded-full text-center text-4xl font-extrabold line-through"
                        : "text-[--rhodamine] mt-4 p-4 rounded-full text-center text-4xl font-extrabold"
                    }
                  >
                    {pricing.price}
                  </div>
                  {pricing.expierdDate < today && (
                    <div className="flex justify-end">
                      <div className="badge-rotate inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        Expired
                      </div>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
          <div className="my-8 flex justify-center">
            <ButtonConf href="https://cvent.me/4zbxz9">
              Buy a Ticket!
            </ButtonConf>
          </div>

          <div className="w-full">
            <div className="mx-auto flex flex-col items-center text-center">
              <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-2">
                What's included?
              </h3>
              <div className="md:grid md:grid-cols-2 w-[fit-content]">
                {includes.map((include, i) => (
                  <div
                    key={i}
                    className="flex mx-4 text-white items-center gap-4"
                  >
                    <CheckCircledIcon
                      className="text-[--rhodamine]"
                      height={20}
                      width={20}
                    />
                    <p className="leading-relaxed text-base md:text-md">
                      {include.title}
                    </p>
                  </div>
                ))}
              </div>
              <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-2">
                Need assistance?
              </h3>
              <p className="text-white">
                Apply for a <a href="/conf/faq/#visas">Visa</a> or{" "}
                <a href="/conf/faq/#scholarships">Scholarship</a> or find more
                help in our <a href="/conf/faq/">FAQ</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingConf

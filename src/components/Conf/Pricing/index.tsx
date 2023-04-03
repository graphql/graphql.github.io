import React from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"

interface Pricing {
  title: string
  date: string
  price: string
}

const pricing: Pricing[] = [
  {
    title: "Early Bird",
    date: "Through May 31, 2023",
    price: "$599",
  },
  {
    title: "Standard",
    date: "Jun 1 - Sep 4, 2023",
    price: "$799",
  },
  {
    title: "Late/Onsite",
    date: "Sep 5 Through Event",
    price: "$899",
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
  return (
    <div id="register">
      <div className="bg-[#0E031C] w-full mt-10 mb-6">
        <div className="flex flex-col text-center w-full">
          <h1 className="text-4xl title-font text-white font-bold">
            Pricing &amp; Registration
          </h1>
        </div>
        <div className="max-w-[80ch] mx-auto">
          <div className="mx-auto w-full flex flex-wrap justify-center text-center m-8">
            {pricing.map((pricing, i) => (
              <div key={i} className="lg:w-1/3">
                <a
                  href="https://cvent.me/4zbxz9"
                  target="_blank"
                  className="block mx-auto w-64 p-6 overflow-hidden bg-[#251C39] shadow-xl rounded-2xl focus:outline-none hover:drop-shadow-lg hover:scale-[102%] hover:no-underline focus:no-underline transition ease-in-out"
                >
                  <div>
                    <div className="title-font text-center text-3xl text-white font-bold mb-2">
                      {pricing.title}
                    </div>
                    <div className="text-white text-center text-sm">
                      {pricing.date}
                    </div>
                    <div className="text-[#B48EF1] mt-4 p-4 rounded-full text-center text-4xl text-white font-extrabold">
                      {pricing.price}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="w-full">
            <div className="mx-auto flex flex-col items-center text-center">
              <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-2">
                What's included?
              </h3>
              <div className="grid grid-cols-2 w-[fit-content]">
                {includes.map((include, i) => (
                  <div
                    key={i}
                    className="flex mx-4 my-2 text-white items-center gap-4"
                  >
                    <CheckCircledIcon
                      className="text-[#B48EF1]"
                      height={20}
                      width={20}
                    />
                    <p className="leading-relaxed">{include.title}</p>
                  </div>
                ))}
              </div>
              <h3 className="sm:text-2xl text-xl font-medium text-white mt-6 mb-2">
                Need assistance?
              </h3>
              <p className="text-white">
                Apply for a{" "}
                <a className="text-[#B48EF1]" href="/conf/faq/#visas">
                  Visa
                </a>{" "}
                or{" "}
                <a className="text-[#B48EF1]" href="/conf/faq/#scholarships">
                  Scholarship
                </a>{" "}
                or find more help in our{" "}
                <a className="text-[#B48EF1]" href="/conf/faq/">
                  FAQ
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingConf

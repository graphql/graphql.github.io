import React from "react"
import ButtonConf from "../Button"

interface Pricing {
  title: string
  date: string
  price: string
}

const pricing: Pricing[] = [
  {
    title: "Early Bird",
    date: "Mar 29 - May 31, 2023",
    price: "$599 USD",
  },
  {
    title: "Standard",
    date: "Jun 1 - Sep 4, 2023",
    price: "$799 USD",
  },
  {
    title: "Late",
    date: "Sep 5 - 21, 2023",
    price: "$899 USD",
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
    <div id="register" className="pt-32 -mt-32">
      <div className="bg-[url('/img/conf/graphql-conf-bg.png')]">
        <div className="flex flex-col text-center w-full">
          <h1 className="text-4xl title-font text-white font-bold">
            Pricing &amp; Registration
          </h1>
        </div>
        <div className="mx-auto my-8 w-[fit-content]">
          <ButtonConf
            text="Register Now!"
            href="https://cvent.me/4zbxz9"
            target="_blank"
          />
        </div>
        <div className="mx-auto max-w-screen-xl flex flex-wrap justify-center gap-8 m-8">
          {pricing.map((pricing, i) => (
            <div key={i} className="lg:w-1/4">
              <a
                href="https://cvent.me/4zbxz9"
                target="_blank"
                className="block mx-auto w-64 p-6 overflow-hidden bg-white shadow-xl rounded-2xl focus:outline-none hover:drop-shadow-lg hover:scale-110 hover:no-underline focus:no-underline transition ease-in-out"
              >
                <div>
                  <div className="title-font text-2xl text-[#862e69] font-bold mb-2 ">
                    {pricing.title}
                  </div>
                  <div className="text-black">{pricing.date}</div>
                  <div className="bg-[#862e69] mt-2 p-4 rounded-full text-center text-xl text-white font-extrabold">
                    {pricing.price}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
          <div className="px-0 lg:px-8 lg:w-full lg:mb-16">
            <div className="mx-auto h-full bg-gray-100 bg-opacity-75 px-8 pb-12 lg:max-w-prose lg:rounded-lg overflow-hidden text-center relative">
              <h1 className="title-font sm:text-2xl text-xl font-medium text-[#862e69]">
                What's included?
              </h1>
              <div className="grid grid-cols-2">
                {includes.map((include, i) => (
                  <div key={i} className="flex m-2 h-full items-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      className="text-[#862e69] w-6 h-6 flex-shrink-0 mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <p className="leading-relaxed">{include.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingConf

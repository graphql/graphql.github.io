import React from "react"
import ContantConf from "../Contant"

interface Pricing {
  title: string
  date: string
  price: string
}

const pricing: Pricing[] = [
  {
    title: "Early Bird",
    date: "Mar 29-May 31, 2023",
    price: "$ 599 USD",
  },
  {
    title: "Standard",
    date: "Jun 1-Sep 4, 2023",
    price: "$ 799 USD",
  },
  {
    title: "Late",
    date: "Sep 5-21, 2023",
    price: "$ 899 USD",
  },
]

const includes = [
  {
    title:
      "All conference content – keynotes, breakout sessions, BoFs, and more!",
  },
  {
    title: "Lunch and all-day beverages",
  },
  {
    title: "Sponsor Showcase entry",
  },
  {
    title: "GraphQLConf event t-shirt",
  },
  {
    title: "Access to watch all on-demand sessions post-event",
  },
]

const PricingConf = () => {
  return (
    <div className="bg-[url('/img/conf/graphql-conf-bg.png')] ">
      <div className="flex flex-col text-center w-full">
        <h1 className="text-4xl title-font text-white font-bold">
          GraphQL-Conf Rates
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {pricing.map((pricing, i) => (
          <div key={i} className="p-4 lg:w-1/5 md:w-1/2">
            <div className=" w-64 p-4 overflow-hidden bg-white shadow-lg rounded-2xl">
              <div>
                <p className=" title-font text-2xl text-[#862e69] font-bold mb-2 ">
                  {pricing.title}
                </p>
                <span>{pricing.date}</span>
                <p className="bg-[#862e69]  mr-2 px-2.5 py-0.5 rounded-full text-xl text-white font-extrabold">
                  {pricing.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        <ContantConf title={" WHAT’S INCLUDED?"} />
        <div className="w-full mx-8 overflow-hidden bg-white shadow-lg rounded-2xl">
          <div>
            <div className="text-center flex  w-full">
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
                  <span className="title-font font-bold">{include.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingConf

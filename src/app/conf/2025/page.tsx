import { Metadata } from "next"
import { HostedByGraphQLFoundation } from "@/icons"
import { Sponsors } from "./sponsors"
import { Button } from "@/app/conf/_components/button"
import clsx from "clsx"
import { InfiniteMovingSpeakers } from "../_components/infinite-moving-speakers"
import { SessionList } from "../_components/schedule/session-list"
import { filterCategories2024 } from "../_components/schedule/filter-categories"
import NextImage from "next-image-export-optimizer"
import { Rubik } from "next/font/google"

const rubik = Rubik({
  weight: ["700", "600", "500", "400", "300"],
  subsets: ["latin"],
})

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

const classes = {
  heading: "text-[45px] text-center font-bold mb-20",
  container: "conf-block container text-white",
}

export const metadata: Metadata = {
  title: "GraphQLConf 2024 — Sept 10-12",
}

export default function Page() {
  return (
    <div
      style={{
        fontFamily: rubik.style.fontFamily,
      }}
    >
      <div className="conf-hero-2025 relative">
        <div className="container h-full py-16 md:py-28 flex flex-col justify-center">
          <div className="flex items-center justify-center flex-col">
            <h1
              style={{
                fontSize: "min(calc(10px + 80vw / 12), 150px)",
                fontWeight: "bold",
                fontFamily: rubik.style.fontFamily,
              }}
            >
              GraphQLConf <span className="font-light">2025</span>
            </h1>
            <HostedByGraphQLFoundation className="w-full shrink-0 h-8 lg:h-10 mb-6 self-start" />
            <span className={`${rubik.className} font-medium text-xl`}>
              September 08 - 10, 2025 | Amsterdam, Netherlands
            </span>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-px bg-white/10"
          aria-hidden="true"
        ></div>
      </div>

      <div className="container flex gap-20 flex-col pt-24">
        <div className="flex gap-12 lg:gap-24 max-md:flex-col">
          <div className="flex flex-col gap-5 text-white flex-1">
            <h2 className="text-3xl lg:text-[45px]/[4rem] font-[400]">
              Celebrating 10 Years of GraphQL. Three transformative days of
              expert insights and innovation to shape the next decade of APIs
              together!
            </h2>

            <div className="relative w-full h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="grid gap-0"
                  style={{
                    gridTemplateColumns: "repeat(18, 60px)",
                    gridTemplateRows: "repeat(6, 60px)",
                    padding: "50px",
                    boxSizing: "border-box",
                  }}
                >
                  {Array.from({ length: 18 * 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="border border-white/10"
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <button className="relative z-10 px-44 py-6 text-white text-3xl font-semibold bg-[#E10098] hover:bg-[#ef00a3] flex items-center justify-center gap-2">
                Get Tickets
                <span className="text-xl">➔</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Sponsors />
    </div>
  )
}

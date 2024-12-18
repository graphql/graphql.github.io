import { Metadata } from "next"
import { HostedByGraphQLFoundation } from "@/icons"
import { Rubik } from "next/font/google"
import { GridButton } from "../_components/grid-button"
import { Sponsor } from "./sponsorship"
import { Venue } from "./venue"
import { FAQ } from "./faq"
import { Register } from "./register"
import { PastSponsors } from "./past-sponsors"

const rubik = Rubik({
  weight: ["700", "600", "500", "400", "300"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GraphQLConf 2025 — Sept 08-10",
}

function Hero() {
  return (
    <section className="conf-hero-2025 relative">
      <div className="h-full py-16 md:py-28 flex flex-col justify-center">
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
      />
    </section>
  )
}

function Intro() {
  return (
    <section className="flex flex-col gap-20 md:gap-32">
      <h2 className="text-3xl lg:text-5xl font-normal">
        Celebrating 10 Years of GraphQL. Three transformative days of expert
        insights and innovation to shape the next decade of APIs together!
      </h2>

      <GridButton
        title="Get Tickets"
        href="https://cvent.me/PBNYEe?utm_source=graphql_conf_2025&utm_medium=website&utm_campaign=cta"
      />
    </section>
  )
}

export default function Page() {
  return (
    <main
      style={{
        fontFamily: rubik.style.fontFamily,
      }}
      className="text-white"
    >
      <Hero />
      <div className="container flex flex-col gap-20 md:gap-32 my-20 md:my-32">
        <Intro />
        <PastSponsors />
        <Sponsor />
        <GridButton
          id="speakers"
          title="Notify Me About Speaking"
          href="https://forms.gle/jRsE2u8pokLX93RGA"
        />
        <Register />
        <Venue />
        <FAQ />
      </div>
    </main>
  )
}

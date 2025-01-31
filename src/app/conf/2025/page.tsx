import { Metadata } from "next"
import { HostedByGraphQLFoundation } from "@/icons"
import { GridButton } from "../_components/grid-button"
import { Sponsor } from "./sponsorship"
import { Venue } from "./venue"
import { FAQ } from "./faq"
import { Register } from "./register"
import { PastSponsors } from "./past-sponsors"
import { Speakers } from "./speakers"

export const metadata: Metadata = {
  title: "GraphQLConf 2025 — Sept 08-10",
}

function Hero() {
  return (
    <section className="conf-hero-2025 relative">
      <div className="flex h-full flex-col justify-center py-16 md:py-28">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-5xl font-bold md:text-7xl">
            GraphQLConf <span className="font-light">2025</span>
          </h1>
          <HostedByGraphQLFoundation className="mb-6 h-8 w-full shrink-0 self-start lg:h-10" />
          <div className="flex flex-col justify-center text-xl font-medium md:flex-row md:gap-2">
            <div className="flex items-center gap-1">
              <time dateTime="2025-09-08">September 08</time>
              <span>-</span>
              <time dateTime="2025-09-10">10, 2025</time>
            </div>
            <span className="hidden md:block">|</span>
            <address className="not-italic">Amsterdam, Netherlands</address>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 h-px w-[90%] -translate-x-1/2 bg-white/10"
        aria-hidden="true"
      />
    </section>
  )
}

function Intro() {
  return (
    <section className="flex flex-col gap-20 md:gap-32">
      <h2 className="text-3xl font-normal lg:text-5xl">
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
    <main className="text-white">
      <Hero />
      <div className="container my-20 flex flex-col gap-20 md:my-32 md:gap-32">
        <Intro />
        <PastSponsors />
        <Sponsor />
        <Speakers />
        <Register />
        <Venue />
        <FAQ />
      </div>
    </main>
  )
}

import { Metadata } from "next"
import { About } from "../_components/about"
import { Speakers } from "../_components/speakers"
import { Sponsors } from "../_components/sponsors"
import { Thanks } from "../_components/thanks"
import { CalendarIcon, GraphQLConf, HostedByGraphQLFoundation } from "@/icons"
import { Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "GraphQLConf 2023 — Sept 19-21 • SF Bay Area",
}

export default function ConfPage() {
  return (
    <>
      <Hero />
      <Thanks />
      <Speakers />
      <About />
      <Sponsors />
    </>
  )
}

function Hero() {
  return (
    <div className="bg-black/20 bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover text-white bg-blend-multiply max-md:text-base">
      <div className="container py-16 md:py-20">
        <div className="flex items-center gap-6">
          <GraphQLConf className="h-14" />
          <span className="select-none text-5xl">2023</span>
        </div>
        <HostedByGraphQLFoundation className="mt-5 h-10" />
        <div className="mt-5 flex gap-5 max-md:flex-col max-md:gap-3 md:items-center">
          <div className="flex items-center gap-5 max-md:gap-3">
            <CalendarIcon className="h-6" />
            <span>September 19-21, 2023</span>
          </div>
          <span />
          <div className="flex items-center gap-5 max-md:gap-3">
            <Globe className="size-6" />
            <span>San Francisco Bay Area, CA</span>
          </div>
        </div>
      </div>
    </div>
  )
}

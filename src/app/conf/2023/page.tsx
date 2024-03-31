import { GlobeIcon } from "@radix-ui/react-icons"
import { Metadata } from "next"
import { About } from "../_components/about"
import { Speakers } from "../_components/speakers"
import { Sponsors } from "../_components/sponsors"
import { Thanks } from "../_components/thanks"
import { CalendarIcon, GraphQLConf, HostedByGraphQLFoundation } from "@/icons"

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
    <div className="text-white max-md:text-base bg-[url('/img/conf/graphql-conf-bg.png')] bg-cover bg-blend-multiply bg-black/20">
      <div className="container py-16 md:py-20">
        <div className="flex gap-6 items-center">
          <GraphQLConf className="h-14" />
          <span className="text-5xl select-none">2023</span>
        </div>
        <HostedByGraphQLFoundation className="h-10 mt-5" />
        <div className="flex md:items-center max-md:gap-3 gap-5 mt-5 max-md:flex-col">
          <div className="flex items-center max-md:gap-3 gap-5">
            <CalendarIcon className="h-6" />
            <span>September 19-21, 2023</span>
          </div>
          <span />
          <div className="flex items-center max-md:gap-3 gap-5">
            <GlobeIcon className="size-6" />
            <span>San Francisco Bay Area, CA</span>
          </div>
        </div>
      </div>
    </div>
  )
}

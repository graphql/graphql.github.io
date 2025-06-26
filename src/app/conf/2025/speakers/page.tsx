import { Metadata } from "next"
import { speakers } from "../_data"
import { Hero } from "../components/hero"
import { Button } from "../../_design-system/button"
import { GET_TICKETS_LINK } from "../links"
import { SpeakerCard } from "../components/speaker-card"
import { CtaCardSection } from "../components/cta-card-section"
import { HERO_MARQUEE_ITEMS } from "../utils"
import { MarqueeRows } from "../components/marquee-rows"
import { FAQ } from "../faq"

export const metadata: Metadata = {
  title: "Speakers",
}

export default function Page() {
  const year = "2025"

  return (
    <main className="gql-all-anchors-focusable bg-neu-50 dark:bg-neu-0">
      <Hero pageName="Speakers" year={year}>
        <div className="mt-[18px] flex gap-4">
          <Button href={GET_TICKETS_LINK}>Get your tickets</Button>
          <Button variant="tertiary" href={`/conf/${year}/schedule`}>
            See the schedule
          </Button>
        </div>
      </Hero>

      {/* <NavbarPlaceholder className="top-0 bg-neu-50 before:bg-white/40 dark:bg-neu-0 dark:before:bg-blk/30" /> */}
      {/* <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30"> */}
      <div className="gql-conf-container gql-conf-section">
        <div className="grid lg:grid-cols-2 lg:gap-5 max-lg:[&>:not(:first-child)]:border-t-0">
          {speakers.map(speaker => (
            <SpeakerCard key={speaker.username} speaker={speaker} year="2025" />
          ))}
        </div>
      </div>

      <div className="gql-conf-navbar-strip border-t border-neu-200 bg-neu-0 py-8 text-neu-900 before:bg-white/40 dark:border-neu-100 before:dark:bg-blk/30 xl:py-16">
        <div className="gql-conf-container">
          <FAQ />

          <CtaCardSection
            title="Get your ticket"
            description="Join three transformative days of expert insights and innovation to shape the next decade of APIs!"
          >
            <Button variant="primary" href={GET_TICKETS_LINK}>
              Get tickets
            </Button>
          </CtaCardSection>
          <div className="py-8">
            <MarqueeRows variant="secondary" items={HERO_MARQUEE_ITEMS} />
          </div>
        </div>
      </div>
    </main>
  )
}

import { Metadata } from "next"

import { schedule } from "../_data"
import { ScheduleList, FiltersConfig } from "./_components/schedule-list"
import { eventsColors, HERO_MARQUEE_ITEMS } from "../utils"
import { Button } from "../../_design-system/button"
import { GET_TICKETS_LINK } from "../links"
import { Hero } from "../components/hero"
import { CtaCardSection } from "../components/cta-card-section"
import { MarqueeRows } from "../components/marquee-rows"
import { FAQ } from "../faq"

const year = "2025"

const FILTERS: FiltersConfig = {
  event_type: "Session Format",
  event_subtype: "Talk Category",
  audience: "Audience",
}

export const metadata: Metadata = {
  title: "Schedule",
}

export default function SchedulePage() {
  return (
    <main className="gql-all-anchors-focusable bg-neu-50 dark:bg-neu-0">
      <Hero pageName="Schedule" year={year}>
        <div className="mt-[18px] flex gap-4">
          <Button href={GET_TICKETS_LINK}>Get your tickets</Button>
          <Button variant="tertiary" href={`/conf/${year}/speakers`}>
            See the speakers
          </Button>
        </div>
      </Hero>
      <div className="gql-conf-container gql-conf-section 2xl:!px-24">
        <ScheduleList
          eventsColors={eventsColors}
          year={year}
          scheduleData={schedule}
          filterFields={FILTERS}
        />
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

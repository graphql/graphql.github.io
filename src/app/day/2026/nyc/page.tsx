import { Metadata } from "next"

import { Button } from "@/app/conf/_design-system/button"
import { Hero, HeroDateAndLocation } from "../components/hero"
import { AboutSection } from "../components/about-section"
import { WhyAttendSection } from "../components/why-attend-section"
import { EventPartnersSection } from "../components/event-partners"
import { MarqueeRows } from "@/app/conf/2026/components/marquee-rows"
import { PastSpeakersSection } from "../components/past-speakers"
import { NavbarPlaceholder } from "../components/navbar"
import { GallerySection } from "../../gallery-section"
import { EventScheduleSection } from "../components/event-schedule-section"
import {
  nycSessions,
  NYC_TIMEZONE,
  NYC_TIMEZONE_LABEL,
  tagColors,
} from "./schedule-data"

const SCHEDULE_ANCHOR = "#schedule"

const MARQUEE_ITEMS = [
  ["NEW YORK", "MAY 2026", "GRAPHQL DAY", "FOST", "COMMUNITY", "APIs"],
  [
    "OPEN SOURCE",
    "WORKSHOPS",
    "FEDERATION",
    "DEVELOPER EXPERIENCE",
    "GRAPHQL DAY",
    "NEW YORK",
  ],
]

export const metadata: Metadata = {
  title: "GraphQL Day @ FOST NYC — May 13-14",
}

export default function NYCPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-neu-50/50 dark:before:bg-blk/40" />
      <main className="gql-all-anchors-focusable">
        <Hero subtitle="@ FOST NYC" colorScheme="neutral">
          <HeroDateAndLocation
            date="May 13-14, 2026"
            dateTime="2026-05-13"
            location="Convene 360 Madison, New York"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:*:flex-1">
            <Button
              href={SCHEDULE_ANCHOR}
              className="whitespace-nowrap md:w-fit"
            >
              View the schedule
            </Button>
          </div>
        </Hero>
        <AboutSection />
        <MarqueeRows
          variant="primary"
          className="z-10 bg-neu-0 py-4 max-sm:pb-1 sm:py-6 md:space-y-2 md:py-12"
          items={MARQUEE_ITEMS}
        />
        <div className="gql-container gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30">
          <WhyAttendSection />
          <PastSpeakersSection />
          <EventPartnersSection />
          <GallerySection moving />
        </div>
        <EventScheduleSection
          sessions={nycSessions}
          timezone={NYC_TIMEZONE}
          timezoneLabel={NYC_TIMEZONE_LABEL}
          tagColors={tagColors}
        />
        <MarqueeRows
          variant="secondary"
          className="my-8 xl:my-16"
          items={MARQUEE_ITEMS}
        />
      </main>
    </>
  )
}

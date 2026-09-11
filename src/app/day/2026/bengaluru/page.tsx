import { Metadata } from "next"

import { Button } from "@/app/conf/_design-system/button"
import { Hero, HeroDateAndLocation } from "../components/hero"
import { AboutSection } from "../components/about-section"
import { WhyAttendSection } from "../components/why-attend-section"
import { EventPartnersSection } from "../components/event-partners"
import { MarqueeRows } from "@/app/conf/2026/components/marquee-rows"
import { NavbarPlaceholder } from "../components/navbar"
import { GallerySection } from "../../gallery-section"

import { EventScheduleSection } from "../components/event-schedule-section"
import {
  bengaluruSessions,
  BENGALURU_TIMEZONE,
  BENGALURU_TIMEZONE_LABEL,
  tagColors,
} from "./schedule-data"

const SCHEDULE_ANCHOR = "#schedule"

const MARQUEE_ITEMS = [
  ["BENGALURU", "AUGUST 2026", "GRAPHQL DAY", "FOST", "COMMUNITY", "APIs"],
  [
    "OPEN SOURCE",
    "WORKSHOPS",
    "FEDERATION",
    "DEVELOPER EXPERIENCE",
    "GRAPHQL DAY",
    "BENGALURU",
  ],
]

export const metadata: Metadata = {
  title: "GraphQL Day @ FOST BENGALURU — Aug 19-20",
}

export default function BengaluruPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-neu-50/50 dark:before:bg-blk/40" />
      <main className="gql-all-anchors-focusable">
        <Hero subtitle="@ FOST Bengaluru" colorScheme="neutral">
          <HeroDateAndLocation
            date="Aug 19-20, 2026"
            dateTime="2026-08-19"
            location="Conrad Bengaluru, India"
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
          <EventScheduleSection
            sessions={bengaluruSessions}
            timezone={BENGALURU_TIMEZONE}
            timezoneLabel={BENGALURU_TIMEZONE_LABEL}
            tagColors={tagColors}
          />
          <EventPartnersSection />
          <GallerySection moving />
          <MarqueeRows
            variant="secondary"
            className="my-8 xl:mb-16 xl:mt-10"
            items={MARQUEE_ITEMS}
          />
        </div>
      </main>
    </>
  )
}

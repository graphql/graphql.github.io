import { Metadata } from "next"

import { Button } from "@/app/conf/_design-system/button"
import { Hero, HeroDateAndLocation } from "../components/hero"
import { AboutSection } from "../components/about-section"
import { WhyAttendSection } from "../components/why-attend-section"
import { CfpButton } from "../components/become-a-speaker"
import { EventPartnersSection } from "../components/event-partners"
import { CtaCardSection } from "../components/cta-card-section"
import { MarqueeRows } from "@/app/conf/2026/components/marquee-rows"
import { NavbarPlaceholder } from "../components/navbar"
import { GallerySection } from "../../gallery-section"
import { ScheduleSection } from "@/app/day/2026/amsterdam/schedule-section.tsx"

const MARQUEE_ITEMS = [
  ["AMSTERDAM", "JUNE 2026", "GRAPHQL DAY", "FOST", "COMMUNITY", "APIs"],
  [
    "OPEN SOURCE",
    "WORKSHOPS",
    "FEDERATION",
    "DEVELOPER EXPERIENCE",
    "GRAPHQL DAY",
    "AMSTERDAM",
  ],
]

const TICKET_LINK =
  "https://portal.joinfost.io/event/future-of-software-technologies-amsterdam-2026/cf522e15-399f-4c1f-8365-3a72346f16f0"

export const metadata: Metadata = {
  title: "GraphQL Day @ FOST AMSTERDAM — June 9-10",
}

export default function AmsterdamPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-neu-50/50 dark:before:bg-blk/40" />
      <main className="gql-all-anchors-focusable">
        <Hero subtitle="@ FOST Amsterdam" colorScheme="neutral">
          <HeroDateAndLocation
            date="Jun 9-10, 2026"
            dateTime="2026-06-09"
            location="Amsterdam, The Netherlands"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:*:flex-1">
            <Button href={TICKET_LINK} className="whitespace-nowrap md:w-fit">
              Get your ticket
            </Button>
            <CfpButton className="whitespace-nowrap md:w-fit" />
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
          <ScheduleSection />
          <EventPartnersSection />
          <GallerySection moving />
          <CtaCardSection
            title="Stay tuned"
            description="Join us for a day of GraphQL talks, networking, and hands-on learning at FOST Amsterdam."
          >
            <Button href={TICKET_LINK} className="whitespace-nowrap md:w-fit">
              Get your ticket
            </Button>
          </CtaCardSection>
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

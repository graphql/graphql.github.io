import { Metadata } from "next"

import { Button } from "@/app/conf/_design-system/button"
import { Hero, HeroDateAndLocation } from "../components/hero"
import { AboutSection } from "../components/about-section"
import { WhyAttendSection } from "../components/why-attend-section"
import {
  BecomeASpeakerSection,
  CfpButton,
} from "../components/become-a-speaker"
import { EventPartnersSection } from "../components/event-partners"
import { CtaCardSection } from "../components/cta-card-section"
import { MarqueeRows } from "@/app/conf/2026/components/marquee-rows"
import { PastSpeakersSection } from "../components/past-speakers"
import { NavbarPlaceholder } from "../components/navbar"
import { GallerySection } from "../../gallery-section"

const MARQUEE_ITEMS = [
  ["MELBOURNE", "OCTOBER 2026", "GRAPHQL DAY", "FOST", "COMMUNITY", "APIs"],
  [
    "OPEN SOURCE",
    "WORKSHOPS",
    "FEDERATION",
    "DEVELOPER EXPERIENCE",
    "GRAPHQL DAY",
    "MELBOURNE",
  ],
]

export const metadata: Metadata = {
  title: "GraphQL Day @ FOST Melbourne — Oct 28-29",
}

export default function MelbournePage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-neu-50/50 dark:before:bg-blk/40" />
      <main className="gql-all-anchors-focusable">
        <Hero subtitle="@ FOST Melbourne" colorScheme="neutral">
          <HeroDateAndLocation
            date="October 28-29, 2026"
            dateTime="2026-10-28"
            location="Melbourne, Australia"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:*:flex-1">
            <Button disabled className="whitespace-nowrap opacity-55 md:w-fit">
              Tickets coming soon
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
          <BecomeASpeakerSection />
          <PastSpeakersSection />
          <EventPartnersSection />
          <GallerySection moving />
          <CtaCardSection
            title="Stay tuned"
            description="Join us for a day of GraphQL talks, networking, and hands-on learning at FOST Melbourne."
          >
            <Button
              disabled
              variant="primary"
              className="whitespace-nowrap opacity-55"
            >
              Tickets coming soon
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

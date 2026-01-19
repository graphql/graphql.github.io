import { Metadata } from "next"
import { BecomeASponsor } from "./components/become-a-sponsor"
import { Venue } from "./components/venue"
import { FAQ } from "./faq"
import { CallForProposals } from "./components/call-for-proposals"
import { RegisterToday } from "./components/register-today"
import { Hero, HeroDateAndLocation } from "./components/hero"
import WhatToExpectSection from "./components/what-to-expect"
import TopMindsSection from "./components/top-minds"
import { GetYourTicket } from "./components/get-your-ticket"
import { RegisterSection } from "./components/register-section"
import { Sponsors } from "./components/sponsors"
import { GraphQLFoundationCard } from "./components/graphql-foundation-card"
import { MarqueeRows } from "./components/marquee-rows"
import { CtaCardSection } from "./components/cta-card-section"
import { Button } from "../_design-system/button"
import { GALLERY_LINK, GET_TICKETS_LINK, BECOME_A_SPEAKER_LINK } from "./links"
import { GalleryStrip } from "./components/gallery-strip"
import { Testimonials } from "./components/testimonials"
import { HeroImage } from "./components/hero/hero-image"
import { HERO_MARQUEE_ITEMS } from "./utils"

export const metadata: Metadata = {
  title: "GraphQLConf 2026 — May 06-07",
}

export default function Page() {
  return (
    <main className="gql-all-anchors-focusable">
      <Hero year="2026" bottom={<HeroImage />}>
        <HeroDateAndLocation />
        <Button className="md:w-fit" href={BECOME_A_SPEAKER_LINK}>
          Submit Your Talk
        </Button>
      </Hero>
      <div className="gql-container gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30">
        <MarqueeRows
          variant="primary"
          className="pt-4 max-sm:pb-1 sm:pt-6 md:space-y-2 md:pt-12 xl:pt-16"
          items={HERO_MARQUEE_ITEMS}
        />
        <RegisterToday className="md:mb-8 md:mt-16" />
        <CallForProposals />
      </div>
      <div className="gql-conf-navbar-strip text-neu-900 before:bg-white/50 before:dark:bg-blk/30">
        <div className="gql-container">
          <Sponsors heading="Sponsors" />
        </div>
        <BecomeASponsor />
        <div className="gql-container">
          <MarqueeRows
            variant="secondary"
            items={[
              ["MENLO PARK", "MAY 2026", "TWO DAYS", "META CAMPUS"],
              ["TWO DAYS", "META CAMPUS", "CALIFORNIA", "GRAPHQL COMMUNITY"],
              ["CALIFORNIA", "10 YEARS OF GRAPHQL", "06-07 MAY", "MENLO PARK"],
            ]}
            className="my-8 xl:mb-16 xl:mt-10 2xl:mb-24"
          />
          <GalleryStrip />
          <Testimonials />
          <GraphQLFoundationCard />
          <CtaCardSection
            title="Get your ticket"
            description="Join two transformative days of expert insights and innovation to shape the next decade of APIs!"
          >
            <Button
              disabled
              className="opacity-55"
              variant="primary"
              href={GET_TICKETS_LINK}
            >
              Coming Soon
            </Button>
          </CtaCardSection>
          <MarqueeRows
            variant="secondary"
            items={HERO_MARQUEE_ITEMS}
            className="my-8 xl:my-16"
          />
        </div>
      </div>
    </main>
  )
}

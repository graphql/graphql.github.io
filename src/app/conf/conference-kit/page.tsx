import { Metadata } from "next"

import { Button } from "../_design-system/button"
import { Hero, HeroStripes } from "../2026/components/hero"
import { NavbarPlaceholder } from "../2026/components/navbar"

import { AmsterdamBanner } from "./_components/amsterdam-banner"
import { NycBanner } from "./_components/nyc-banner"
import { LanguageBanner } from "./_components/language-banner"
import { AiHeroBanner } from "./_components/ai-hero-banner"

export const metadata: Metadata = {
  title: "Conference Kit",
}

export default function ConferenceKitPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-[#181A12] dark:before:bg-blk/40" />
      <Hero
        pageName="Conference Kit"
        subtitle="Print-ready assets"
        colorScheme="neutral"
        stripes={
          <HeroStripes
            className="-scale-x-100 dark:data-[loaded=true]:opacity-80"
            evenClassName="bg-[linear-gradient(180deg,hsl(var(--color-sec-light))_0%,hsl(319deg_100%_90%_/_0.2)_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-sec-dark))_0%,hsl(var(--color-neu-100)/0.1)_100%)]"
            oddClassName="bg-[linear-gradient(180deg,hsl(319deg_100%_90%_/_0.2)_0%,hsl(var(--color-sec-base))_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-sec-dark))_0%,hsl(var(--color-neu-0)/0.6)_100%)]"
          />
        }
      >
        <p className="typography-body-lg max-w-screen-sm text-pretty text-neu-800">
          Print-ready roll-up banners for GraphQL Foundation conferences and
          community-organized events. Each design is sized for an 850 × 2000 mm
          stand and rendered here at the same 1:2.353 portrait ratio.
        </p>
      </Hero>

      <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30">
        <section className="gql-container">
          <header className="gql-section flex flex-wrap items-end justify-between gap-4">
            <h2 className="typography-h2">Roll-up banners</h2>
            <Button href="/conference-kit/conference-kit.zip" download>
              Download
            </Button>
          </header>

          <div className="flex max-w-full gap-4 overflow-scroll p-4">
            <AmsterdamBanner />
            <NycBanner />
            <LanguageBanner />
            <AiHeroBanner />
          </div>
        </section>
      </main>
    </>
  )
}

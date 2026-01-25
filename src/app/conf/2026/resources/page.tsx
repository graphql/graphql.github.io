import { Metadata } from "next"

import { Button } from "@/app/conf/_design-system/button"

import { NavbarPlaceholder } from "../components/navbar"
import { Hero, HeroStripes } from "../components/hero"

import Resources from "./client-mdx"
import "./prose.css"

export const metadata: Metadata = {
  title: "Resources | 6",
}

export default function ResourcesPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-[#181A12] dark:before:bg-blk/40" />
      <Hero
        pageName="Resources"
        year="2026"
        colorScheme="neutral"
        stripes={
          <HeroStripes
            className="-scale-x-100 dark:data-[loaded=true]:opacity-80"
            evenClassName="bg-[linear-gradient(180deg,hsl(var(--color-sec-light))_0%,hsl(319deg_100%_90%_/_0.2)_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-sec-dark))_0%,hsl(var(--color-neu-100))_100%)]"
            oddClassName="bg-[linear-gradient(180deg,hsl(319deg_100%_90%_/_0.2)_0%,hsl(var(--color-sec-base))_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-sec-dark))_0%,hsl(var(--color-neu-0))_100%)]"
          />
        }
      >
        <Button
          href="mailto:graphql_events@linuxfoundation.org"
          className="w-fit"
        >
          Talk to us
        </Button>
      </Hero>
      <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30">
        <div className="gql-container gql-section gql-prose xl:mb-16 xl:mt-8">
          <Resources />
        </div>
      </main>
    </>
  )
}

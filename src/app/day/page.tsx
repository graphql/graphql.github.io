import { Metadata } from "next"
import NextLink from "next/link"
import Image from "next/image"

import {
  asRgbString,
  MAP_COLORS,
} from "@/app/(main)/community/events/map/map-colors"

import { EventsMap } from "./events-map"
import { EVENTS, EventMapItem } from "./events-data"
import { PastSpeakersSection } from "./2026/components/past-speakers"
import { NavbarPlaceholder } from "./2026/components/navbar"
import fostLogo from "./2026/assets/fost-logo.avif"
import { GallerySection } from "./gallery-section"

const NUMBER_OF_CITIES_SPELLED_OUT = "six"
if (process.env.NODE_ENV === "development") {
  if (EVENTS.length !== 6)
    throw new Error(
      "EVENTS is expected to be 6, please update the NUMBER_OF_CITIES_SPELLED_OUT variable",
    )
}

export const metadata: Metadata = {
  title: "GraphQL Day 2026",
  description:
    "Community-organized GraphQL events at FOST conferences worldwide.",
}

export default function DayIndexPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-[#FBFCF4] before:bg-[#FBFCF4]/30 dark:bg-[#181A12] dark:before:bg-blk/40" />
      <main>
        <header
          className="bg-[--sea] [--sea:--sea-light] dark:[--sea:--sea-dark]"
          style={
            {
              "--sea-dark": asRgbString(MAP_COLORS.dark.sea),
              "--sea-light": asRgbString(MAP_COLORS.light.sea),
            } as React.CSSProperties
          }
        >
          <div className="gql-container relative isolate">
            <EventsMap>
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[--sea] to-transparent lg:bg-gradient-to-r lg:from-[--sea] lg:to-transparent lg:to-40%" />
            </EventsMap>
            <div className="gql-container pointer-events-none absolute inset-0 z-20 flex flex-col justify-end px-4 max-md:flex-col-reverse lg:justify-center lg:px-12 xl:px-24">
              <div className="pointer-events-auto flex h-full flex-col py-4 md:pb-12 lg:max-w-md lg:py-8 xl:max-w-2xl">
                <div className="flex-1" />
                <h1 className="typography-d1 mb-4 text-neu-900">GraphQL Day</h1>
                <p className="typography-body-lg text-balance text-neu-700 dark:text-neu-400">
                  Community-organized GraphQL events at conferences worldwide.
                </p>
                <div className="flex-1 max-md:hidden" />
                <div className="mt-4 flex h-fit items-center gap-2 lg:mt-8">
                  <div className="typography-body-sm text-neu-700 dark:text-neu-400">
                    hosted at
                  </div>
                  <a
                    href="https://www.joinfost.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={fostLogo}
                      alt="FOST"
                      width={80}
                      height={24}
                      placeholder="blur"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="gql-container gql-section">
          <h2 className="typography-h2 mb-6 md:mt-6">GraphQL Days in 2026</h2>
          <p className="typography-body-md text-neu-700 dark:text-neu-400">
            Started in Paris. Now in {NUMBER_OF_CITIES_SPELLED_OUT} cities
            worldwide. Whether you're deep in production or just getting
            started, this is your chance to connect, share best practices, and
            see what's new.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {EVENTS.map(event => (
              <GraphQLDayEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <PastSpeakersSection />
        <GallerySection />
      </main>
    </>
  )
}

function GraphQLDayEventCard({ event }: { event: EventMapItem }) {
  return (
    <NextLink
      href={event.href}
      className="group flex items-center justify-between gap-6 border border-neu-200 p-6 ring-inset ring-neu-400 hover:bg-sec-base/[.035] hover:ring-1 focus:outline-none focus:ring-1 dark:border-neu-50 dark:ring-neu-100 md:p-8"
    >
      <div className="flex flex-col gap-2">
        <h3 className="typography-h2 mt-1 [text-box:trim-both_cap_alphabetic]">
          {event.city}
        </h3>
        <p className="typography-body-md mt-6 text-neu-700 [text-box:trim-both_cap_alphabetic]">
          {event.date}, 2026
        </p>
      </div>
      <span className="typography-body-md hidden self-start text-pri-base dark:text-pri-light sm:block">
        GraphQL Day @ FOST {event.city}
      </span>
    </NextLink>
  )
}

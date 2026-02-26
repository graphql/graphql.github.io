import { Metadata } from "next"

import { Button } from "@/app/conf/_design-system/button"

import { Hero, HeroStripes } from "../components/hero"
import { NavbarPlaceholder } from "../components/navbar"

import NextImage from "next/image"
import WGImage from "./attendees.jpg"

export const metadata: Metadata = {
  title: "WG Day | GraphQLConf 2026",
  description:
    "Working Group Day at GraphQLConf 2026 on May 08 in Menlo Park for GraphQL working group members and maintainers of key GraphQL OSS, with intentionally unstructured time for technical discussion and social connection.",
}

export default function WGDayPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-[#181A12] dark:before:bg-blk/40" />
      <Hero
        pageName="WG Day"
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
        <p className="typography-body-lg max-w-3xl">
          A day for GraphQL working group members and maintainers of key GraphQL
          open source software to socialize, strategize, and build on the
          momentum of the main conference.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <p className="typography-body-md">
            <strong>Date:</strong>{" "}
            <time dateTime="2026-05-08">May 08, 2026</time>
          </p>
          <p className="typography-body-md">
            <strong>Time:</strong> 9:30 AM-4:30 PM PT
          </p>
          <p className="typography-body-md">
            <strong>Location:</strong> Meta MPK 21, Menlo Park
          </p>
        </div>
      </Hero>

      <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30">
        <section className="gql-container gql-section space-y-10 xl:mb-16 xl:mt-8">
          <div className="relative aspect-video max-h-[566px] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:h-[566px]">
            <NextImage
              src={WGImage}
              alt="GraphQL working group attendees"
              fill
              className="object-cover object-[52%_30%]"
              sizes="100vw"
              placeholder="blur"
              priority
            />
          </div>

          <article className="space-y-4">
            <h2 className="typography-h2">What is it?</h2>
            <p className="typography-body-lg max-w-4xl">
              WG Day is a low-overhead in-person collaboration day right after
              GraphQLConf. There is no fixed schedule, no recording, and no
              formal programming. This unstructured format is deliberate: it is
              equally valid to spend the day diving deep on proposals, planning
              across groups, or simply socializing and getting to know each
              other.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="typography-h2">Attendance</h2>
            <p className="typography-body-lg max-w-4xl">
              Capacity is limited, so invitations will go to regular working
              group participants first. Additional attendees can join via a
              waitlist, with priority for maintainers of GraphQL-related open
              source software (clients, servers, libraries, frameworks, tooling,
              and documentation), plus Foundation board members and GraphQL
              Ambassadors. Room capacity is 48.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="typography-h2">Logistics</h2>
            <ul className="typography-body-lg list-disc space-y-2 pl-5">
              <li>
                Location: Meta MPK 21 (adjacent to the main conference building)
              </li>
              <li>
                Time: Drop-in between 9:30 AM-4:30 PM PT (last entry 2:00 PM)
              </li>
              <li>
                Informal format: drop in and out as needed; early departures for
                travel are absolutely fine
              </li>
              <li>
                Lunch plan: we expect to head to the cafeteria; if you arrive
                around midday, you may need to meet the group there
              </li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="typography-h2">Join us</h2>
            <p className="typography-body-lg max-w-4xl">
              Attendance is managed by an invite system and waitlist. You can
              request to attend by filling out the form linked below. For
              questions about attendance, waitlist priority, or logistics, you
              can email the event team:
            </p>
            <div className="mt-4 flex gap-x-6 gap-y-4 max-sm:flex-col">
              <Button
                href="https://forms.gle/jV5seEm8VHhsNLUs6"
                className="w-fit"
              >
                Attend
              </Button>
              <Button
                href="mailto:operations@graphql.org?subject=GraphQLConf%202026%20WG%20Day"
                className="w-fit"
                variant="secondary"
              >
                Email the event team
              </Button>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}

import dynamic from "next/dynamic"

import { Breadcrumbs } from "@/_design-system/breadcrumbs"
import { Button } from "@/app/conf/_design-system/button"
import { NavbarFixed } from "@/components/navbar/navbar-fixed"
import { TocHero, TocHeroContents } from "@/components/toc-hero"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import { MeetupsMap } from "./meetups-map"
import { EventsList } from "./events-list"
import { BenefitsSection } from "./benefits-section"
import { GetYourMeetupNoticedSection } from "./get-your-meetup-noticed-section"
import { BringGraphQLToYourCommunity } from "./bring-graphql-to-your-community"
import { getAllEvents } from "./get-all-events"
import { SubscribeToRssLink } from "./subscribe-to-rss-link"
import blurBean from "./events-blur-bean.webp"

const ISSUE_TEMPLATE_LINK =
  "https://github.com/graphql/community-wg/issues/new?assignees=&labels=event&template=event-submission.yml"

const GalleryStrip = dynamic(
  () =>
    import("@/app/conf/2025/components/gallery-strip").then(
      mod => mod.GalleryStrip,
    ),
  { ssr: false },
)

export default async function EventsPage() {
  const { upcomingEvents, pastEvents } = await getAllEvents()

  return (
    <>
      <NavbarFixed />
      <TocHero
        heading="Events"
        text="Connect with the GraphQL community through events and meetups around the world."
        decoration={<Stripes />}
      >
        <TocHeroContents
          className="max-w-screen-md"
          sections={[
            "Upcoming events",
            "Meetups",
            { name: "Past events & meetups", href: "#past-events-and-meetups" },
            "Events gallery",
            "Benefits of getting involved",
            "Get your meetup noticed",
          ]}
        />
      </TocHero>
      <div className="gql-container">
        <div className="gql-section xl:mt-8">
          <Breadcrumbs
            activePath={[
              {
                name: "Community",
                title: "Community",
                route: "/community",
                type: "page",
                children: [],
                frontMatter: {},
              },
              {
                name: "Events",
                title: "Events",
                route: "/community/events",
                type: "page",
                children: [],
                frontMatter: {},
              },
            ]}
          />
        </div>

        {upcomingEvents.length > 0 && (
          <section className="gql-section" id="upcoming-events">
            <header className="mb-6 flex w-full gap-4 max-md:flex-col lg:mb-12 lg:gap-6">
              <div className="flex-1">
                <h2 className="typography-h2">Upcoming events</h2>
                <p className="typography-body-md col-start-1 mt-4 lg:mt-6">
                  See what’s coming up across the GraphQL ecosystem.
                </p>
              </div>
              <Button
                className="w-fit self-end max-md:hidden lg:row-span-2"
                href={ISSUE_TEMPLATE_LINK}
              >
                Add a new event
              </Button>
            </header>
            <EventsList events={upcomingEvents.reverse()}>
              <SubscribeToRssLink />
            </EventsList>
            <Button className="md:hidden" href={ISSUE_TEMPLATE_LINK}>
              Add a new event
            </Button>
          </section>
        )}

        <BringGraphQLToYourCommunity />

        <section className="gql-section" id="meetups">
          <h2 className="typography-h2">Meetups</h2>
          <p className="typography-body-md mt-6">
            Find and join local GraphQL meetups happening around the world.
            Select a city to explore upcoming events.
          </p>

          <MeetupsMap />
        </section>

        <section className="gql-section" id="past-events-and-meetups">
          <h2 className="typography-h2">Past events & meetups</h2>
          <p className="typography-body-md my-6 lg:mb-12">
            A look back at how the GraphQL community connects and grows
            together.
          </p>
          <EventsList events={pastEvents} />
        </section>

        <h2 className="typography-h2 text-center">Event gallery</h2>
        <p className="typography-body-md mt-6 text-center">
          A look back at what’s been happening.
        </p>
        <GalleryStrip
          className="[&>:first-child]:mx-auto"
          id="events-gallery"
        />

        <BenefitsSection id="benefits-of-getting-involved" />
        <GetYourMeetupNoticedSection id="get-your-meetup-noticed" />
      </div>
    </>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="pointer-events-none absolute inset-0 overflow-visible [--end-1:hsl(var(--color-sec-base))] [--end-2:hsl(var(--color-sec-light))] [--start-1:hsl(var(--color-sec-lighter))] [--start-2:hsl(var(--color-sec-dark))]"
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskSize: "2200px 100%",
        WebkitMaskSize: "2200px 100%",
        maskPosition: "50% -100px",
        // WebkitMaskPosition: "50% 20%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(180deg_in_hsl,var(--start-1)_-288px,var(--end-1)_100%)]"
        oddClassName="bg-[linear-gradient(180deg,var(--start-2)_-288px,var(--end-2)_100%)]"
      />
    </div>
  )
}

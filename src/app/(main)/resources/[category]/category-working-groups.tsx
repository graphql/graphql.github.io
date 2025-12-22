import { clsx } from "clsx"
import { EventCard } from "@/app/(main)/community/events/event-card"
import { EventsScrollview } from "@/app/(main)/community/events/events-scrollview"
import { loadWorkingGroupMeetings } from "@/app/(main)/community/events/get-all-events"
import type { Topic } from "@/resources/types"

import { categoriesConfig, sectionIds } from "./categories-config"
import { Eyebrow } from "@/_design-system/eyebrow"
import { Button } from "@/app/conf/_design-system/button"

export async function CategoryWorkingGroups({
  className,
  category,
}: {
  className?: string
  category: Topic
}) {
  const predicate = categoriesConfig[category]?.sections.event?.predicate
  if (!predicate) return null
  const { heading, text } = categoriesConfig[category].sections.event || {}

  const meetings = await loadWorkingGroupMeetings()
  const matchingMeetings = meetings.filter(predicate)

  const futureEvents = matchingMeetings.filter(
    event => new Date(event.start).getTime() >= Date.now(),
  )

  const hasFutureEvents = futureEvents.length > 0

  // soonest/most recent first
  const events = hasFutureEvents ? futureEvents : matchingMeetings.reverse()

  if (events.length === 0) return null

  return (
    <section
      id={sectionIds.event}
      className={clsx("gql-section gql-container", className)}
    >
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 xl:gap-6">
          <Eyebrow>
            {hasFutureEvents ? "Upcoming events" : "Past events"}
          </Eyebrow>
          <h2 className="typography-h2 max-w-[700px] text-pretty">{heading}</h2>
          <p className="typography-body-md max-w-[577px] text-neu-800">
            {text}
          </p>
        </div>
        <Button
          href="/community/events"
          variant="secondary"
          size="md"
          className="md:w-fit"
        >
          View all events
        </Button>
      </header>
      <EventsScrollview
        className={clsx(
          "mt-4 !max-w-[unset] lg:mt-10",
          events.length < 4 && "!grid-rows-1",
        )}
      >
        {events.map(event => (
          <EventCard
            key={event.id}
            href={event.htmlLink}
            date={new Date(event.start)}
            name={event.summary ?? "Working Group"}
            city="Online" // event.location is a zoom link, we could potentially use but we'd have to refactor the event-card to avoid nested anchors
            kind="working-group"
            className={clsx(events.length < 4 && "!w-full")}
          />
        ))}
      </EventsScrollview>
    </section>
  )
}

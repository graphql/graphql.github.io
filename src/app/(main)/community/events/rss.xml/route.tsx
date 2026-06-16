import RSS from "rss"

import { getAllEvents } from "../get-all-events"

export const dynamic = "force-static"

export async function GET() {
  const { upcomingEvents, pastEvents } = await getAllEvents()

  const allEvents = [...upcomingEvents, ...pastEvents]

  const feed = new RSS({
    title: "GraphQL Community Events & Meetups",
    description:
      "Stay updated with the latest GraphQL community events and meetups.",
    feed_url: "https://the-guild.dev/graphql/community/events/feed.xml",
    site_url: "https://the-guild.dev/graphql/community/events",
  })

  for (const event of allEvents) {
    if ("start" in event) {
      feed.item({
        title: event.summary || "GraphQL Working Group",
        date: event.start,
        url: event.htmlLink,
        description: event.description || "",
      })
    } else {
      feed.item({
        title: event.name,
        date: event.date,
        url: event.eventLink,
        description: `Host: ${event.host} | Location: ${event.location}`,
      })
    }
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}

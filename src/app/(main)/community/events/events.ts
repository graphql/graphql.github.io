export * from "./event-card"

export interface Event {
  name: string
  slug: string
  location: string
  date: string
  coverImage?: string
  eventLink: string
  host: string
  hostLink?: string
}

export const events: Event[] = [
  {
    name: "GraphQLConf 2026",
    slug: "graphql-conf-2026",
    location: "Menlo Park, California",
    date: "2026-05-06T16:00:00+00:00",
    eventLink: "/conf/2026",
    host: "GraphQL Foundation",
  },
  {
    name: "GraphQL Day at APIDays",
    slug: "graphql-day-at-apidays",
    location: "CNIT La Defense, Paris",
    date: "2025-12-11T08:00:00+00:00",
    eventLink: "https://graphql.day",
    host: "APIDays & GraphQL Community",
    hostLink: "https://apidays.co",
  },
  {
    name: "GraphQLConf 2025",
    slug: "graphql-conf-2025",
    location: "Amsterdam",
    date: "2025-09-08T07:00:00+00:00",
    eventLink: "/conf/2025",
    host: "GraphQL Foundation",
  },
  {
    name: "GraphQLConf 2024",
    slug: "graphql-conf-2024",
    location: "San Francisco",
    date: "2024-09-09T07:00:00+00:00",
    eventLink: "/conf/2024",
    host: "GraphQL Foundation",
  },
  {
    name: "GraphQL Bali 001",
    slug: "graphql-bali",
    location: "Bali",
    date: "2023-12-21T19:00:00+07:00",
    coverImage:
      "https://ik.imagekit.io/guild/prod/ed2b952c-2c05-46ab-bb11-3fe6dda18516.png?tr=w-1067:c-at_max,w-1067,h-533",
    eventLink: "https://guild.host/events/graphql-bali-001-2s7fso",
    host: "BWork Bali",
    hostLink: "https://bwork.id/",
  },
  {
    name: "GraphQL Taipei 001",
    slug: "graphql-taipei",
    location: "Taipei",
    date: "2023-12-14T19:00:00+08:00",
    coverImage:
      "https://ik.imagekit.io/guild/prod/eb7af47f-c624-4ca0-9b68-19fe6c724f8b.png?tr=w-1067:c-at_max,w-1067,h-533",
    eventLink: "https://guild.host/events/graphql-taipei-001-aepqx5",
    host: "Oursky",
    hostLink: "https://www.oursky.com/",
  },
  {
    name: "GraphQL Paris before APIDays",
    slug: "graphql-paris-pre-apidays",
    location: "Paris",
    date: "2023-12-07T18:00:00+02:00",
    coverImage: "/banner.png",
    eventLink: "https://www.meetup.com/parisgraphql/events/297676783/",
    host: "Escape, Stellate, Hasura",
    hostLink: "https://escape.tech/",
  },
  {
    name: "Sydney December",
    slug: "graphql-sydney-01",
    location: "Sydney",
    date: "2023-12-05T18:00:00+11:00",
    coverImage:
      "https://secure.meetupstatic.com/photos/event/c/9/6/c/600_517551564.webp?w=750",
    eventLink: "https://www.meetup.com/graphql-sydney/events/297415925/",
    host: "Microsoft Reactor",
    hostLink: "https://developer.microsoft.com/en-us/reactor/",
  },
  {
    name: "GraphQL Singapore Meetup #6",
    slug: "graphql-sigapore-6",
    location: "Singapore",
    date: "2023-11-15T18:00:00+08:00",
    coverImage:
      "https://secure.meetupstatic.com/photos/event/e/1/1/e/600_517197630.webp?w=750",
    eventLink: "https://www.meetup.com/graphql-sg/events/296809027/",
    host: "Life Long Learning Institute",
    hostLink: "https://www.lli.sg/",
  },
  {
    name: "What's wrong with GraphQL?!",
    slug: "whats-wrong-with-graphql",
    location: "New York",
    date: "2023-11-15T16:00:00-05:00",
    coverImage:
      "https://guild.host/social/event/whats-wrong-with-graphql-rn47hs/card.svg",
    eventLink: "https://guild.host/events/whats-wrong-with-graphql-rn47hs",
    host: "Pinterest",
    hostLink: "https://www.pinterest.com/",
  },
  {
    name: "GraphQL BKK 12.0",
    slug: "graphql-bangkok-12",
    location: "Bangkok",
    date: "2023-11-02T18:00:00+07:00",
    coverImage:
      "https://secure.meetupstatic.com/photos/event/b/7/5/3/600_516646931.webp?w=750",
    eventLink: "https://www.meetup.com/graphql-bangkok/events/296635356/",
    host: "Seven Peaks",
    hostLink: "https://sevenpeakssoftware.com/",
  },
  {
    name: "GraphQL Seattle #1",
    slug: "graphql-seattle-01",
    location: "Seattle",
    date: "2023-10-26T18:00:00-07:00",
    coverImage:
      "https://secure.meetupstatic.com/photos/event/9/5/d/1/600_515858353.webp?w=750",
    eventLink: "https://www.meetup.com/graphql-seattle/events/296065732",
    host: "Microsoft",
    hostLink: "https://www.microsoft.com/",
  },
  {
    name: "GraphQL SF #12",
    slug: "graphql-sf-12",
    location: "San Francisco",
    date: "2023-09-19T18:00:00-07:00",
    coverImage:
      "https://secure.meetupstatic.com/photos/event/5/f/a/a/600_515784490.webp?w=750",
    eventLink: "https://www.meetup.com/graphql-sf/events/295804141/",
    host: "GitHub",
    hostLink: "https://github.com/",
  },
  {
    name: "GraphQL London #1",
    slug: "graphql-london-01",
    location: "London",
    date: "2023-09-07T17:30:00+01:00",
    coverImage:
      "https://ik.imagekit.io/guild/prod/681642ce-8bd6-4902-9b5a-5f1492614a4f.png?tr=w-1067:c-at_max,w-1067,h-533",
    eventLink: "https://guild.host/events/september-meetup-lxmkv4",
    host: "Neo4j",
    hostLink: "https://neo4j.com/",
  },
  {
    name: "GraphQL BKK 11.0",
    slug: "graphql-bangkok-11",
    location: "Bangkok",
    date: "2023-07-31T18:00:00+07:00",
    coverImage:
      "https://secure.meetupstatic.com/photos/event/4/3/4/9/600_514637225.webp?w=750",
    eventLink: "https://www.meetup.com/graphql-bangkok/events/294721074/",
    host: "True Digital Park",
    hostLink: "https://www.truedigitalpark.com/",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

import type { meetups } from "@/components/meetups"

export type Meetup = (typeof meetups)[number]

import type { StaticImageData } from "next/image"

import anNgoAvatar from "./speakers/an-ngo.webp"
import christianErnstAvatar from "./speakers/christian-ernst.webp"
import jensNeuseAvatar from "./speakers/jens-neuse.webp"
import martinBonninAvatar from "./speakers/martin-bonnin.webp"
import michaelStaibAvatar from "./speakers/michael-staib.webp"
import thoreKoritziusAvatar from "./speakers/thore-koritzius.webp"

export interface AmsterdamSpeaker {
  id: number
  name: string
  company: string
  jobtitle: string
  avatar: StaticImageData
  socialurls: { service: string; url: string }[]
}

export interface AmsterdamSession {
  id: number
  uuid: string
  title: string
  /** ISO 8601 in venue local time, Europe/Amsterdam. */
  start: string
  /** ISO 8601 in venue local time, Europe/Amsterdam. */
  end: string
  /** Topic tags derived from the session description. */
  tags: string[]
  /** HTML */
  description: string
  venue: string
  speakers: AmsterdamSpeaker[]
}

export const AMSTERDAM_TIMEZONE = "Europe/Amsterdam"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  Security: "#CC6BB0",
  MCP: "#894545",
  "Service Mesh": "#36C1A0",
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  "Public Sector": "#4e6e82",
  "Schema Evolution": "#cbc749",
  Observability: "#1a5b77",
}

export const amsterdamSessions: AmsterdamSession[] = [
  {
    id: 3224,
    uuid: "80952503-07dd-4e31-acaf-b9e400f55126",
    title: '18 things "everyone knows" about GraphQL vs REST',
    start: "2026-06-10T09:30:00+02:00",
    end: "2026-06-10T09:55:00+02:00",
    tags: ["GraphQL", "REST"],
    description:
      '<p>Living in the GraphQL bubble for the last few years, I\'ve watched the ecosystem grow up in a way that\'s hard to appreciate from the outside. The spec, the tooling, the vendors, the federation story, all visibly stronger than just two years ago. GraphQL was never bad, It was misunderstood, overhyped and overused. Fast forward to today, the dust has settled. Enterprises are on the slope of enlightenment, yet the people who pick the query language still have to handle pushback: ""GraphQL breaks caching!,"" ""it has the N+1 problem,"" ""OpenAPI is much simpler."" Almost all of that pushback is grounded in views that were already outdated when first written down. So I traced 18 of the most repeated GraphQL vs REST claims back to their primary sources: papers, RFCs, doc pages, security reports. Only three survived cleanly. This talk sends you home able to articulate GraphQL\'s real strengths, and its honest trade-offs, with receipts. We\'ll close on where GraphQL\'s value is growing fastest: as an abstraction layer for LLMs and agents, where a single typed graph is a far simpler surface to integrate against than hundreds of REST API endpoints.</p>\n',
    venue: "TBA",
    speakers: [
      {
        id: 1011,
        name: "Jens Neuse",
        company: "WunderGraph",
        jobtitle: "CEO",
        avatar: jensNeuseAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/jens-neuse/",
          },
        ],
      },
    ],
  },
  {
    id: 3225,
    uuid: "2a24223a-16d0-40fa-821b-b91c491ff9a6",
    title: "What's next in GraphQL",
    start: "2026-06-10T09:55:00+02:00",
    end: "2026-06-10T10:20:00+02:00",
    tags: ["GraphQL"],
    description:
      "<p>GraphQL is a wonderful piece of technology. The GraphQL spec has been a very solid foundation for the past 10 years. It's not (yet!) perfect though. Friction points exist and the community has been hard at work improving the daily GraphQL experience.\n</p>\n",
    venue: "TBA",
    speakers: [
      {
        id: 1012,
        name: "Martin Bonnin",
        company: "Apollo",
        jobtitle: "Mobile Engineer",
        avatar: martinBonninAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "",
          },
        ],
      },
    ],
  },
  {
    id: 3227,
    uuid: "9fe789cb-67b5-4aae-ace4-943ab8f46a43",
    title: "Teaching LLMs to Understand GraphQL with Schema-Aware Embeddings",
    start: "2026-06-10T09:55:00+02:00",
    end: "2026-06-10T10:20:00+02:00",
    tags: ["GraphQL", "MCP", "AI Agents"],
    description:
      "<p>As AI assistants and MCP-style tools increasingly sit in front of GraphQL APIs, embeddings have become critical for fuzzy schema search, field retrieval, and natural-language-to-query systems. Yet most teams rely on general-purpose embedding models that were not specifically designed to understand GraphQL type systems, relationships, or naming patterns. This talk shares practical experience building schema-aware embedding pipelines with off-the-shelf and fine-tuned models while exploring how far preprocessing, chunking, and schema structuring can take you before custom training is needed. We’ll discuss evaluation methods, common failure modes like field confusion and hallucinated types, and the tradeoffs between large hosted models and compact, GraphQL-focused embeddings that can run with lightweight CPU inference. The goal is to give GraphQL platform teams concrete, production-ready guidelines for choosing, adapting, and shipping embeddings that actually understand their schemas.</p>\n",
    venue: "TBA",
    speakers: [
      {
        id: 1013,
        name: "Thore Koritzius",
        company: "",
        jobtitle: "Software Engineer",
        avatar: thoreKoritziusAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "",
          },
        ],
      },
    ],
  },
  {
    id: 3228,
    uuid: "50beb1a7-7a3f-4dad-a760-a00ad96233e1",
    title: "GraphQL: Schema evolution at the largest e-commerce in NL/BE",
    start: "2026-06-10T11:10:00+02:00",
    end: "2026-06-10T11:35:00+02:00",
    tags: ["GraphQL", "Federation", "Schema Evolution"],
    description:
      "<p>We'll dive deeper into the concept of GraphQL Schema Evolution. How at bol, the largest ecommerce of The Netherlands and Belgium we evolve our GraphQL schemas. During this talk we'll share concrete examples of schema evolution at bol and which best practices we applied, and all the lessons learned on Schema evolution.</p>\n",
    venue: "TBA",
    speakers: [
      {
        id: 1014,
        name: "An Ngo",
        company: "bol",
        jobtitle: "Lead Engineer",
        avatar: anNgoAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/vliegveld5/",
          },
        ],
      },
    ],
  },
  {
    id: 3228,
    uuid: "a47f5fdb-9faa-40f6-9e7b-7f5a5c531b22",
    title: "GraphQL Mocking at Scale",
    start: "2026-06-10T11:35:00+02:00",
    end: "2026-06-10T12:00:00+02:00",
    tags: ["GraphQL", "Federation", "Mocking"],
    description:
      "<p>With thousands of developers acting as both consumers and producers on the Graph, friction is inevitable, often stifling development velocity. At Booking.com, we addressed this challenge by leveraging mocks throughout every stage of the software development lifecycle, from ideation to production. By building solutions that facilitate these stages, we successfully decoupled frontend and backend workflows, empowering teams to move at their own pace.</p>\n",
    venue: "TBA",
    speakers: [
      {
        id: 1015,
        name: "Christian Ernst",
        company: "booking.com",
        jobtitle: "Senior Software Engineer",
        avatar: christianErnstAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/christian-ernst11/",
          },
        ],
      },
    ],
  },
  {
    id: 3226,
    uuid: "02d9d427-d1ff-4f78-8d8c-243565d0f1cd",
    title:
      "Closing the Loop: How GraphQL Gives Coding Agents Eyes on What Actually Matters",
    start: "2026-06-10T12:00:00+02:00",
    end: "2026-06-10T12:25:00+02:00",
    tags: ["AI Agents", "Schema Evolution", "Observability"],
    description:
      "<p>Coding agents are reshaping how we build software. Implementing features, refactoring systems, and shipping changes at a pace unthinkable 6 months ago. But to be successful with agents you need the right feedback loop. One that guides your agent to success, not into the spiral of death.</p>\n<p>Ask Claude to add a review system to your product API. Without knowing what's in use, it might reshape your types, move fields, and break your deployed clients because it is missing a crucial feedback loop of what's in use in your clients.</p>\n<p>GraphQL changes this. Every client operation explicitly declares the exact fields and types it needs. That gives you something rare: field-level usage data across your entire consumer base. Not endpoint hits, but actual demand, broken down to the individual field.</p>\n<p>When coding agents can access this data, they stop guessing. Evolve your schema grounded in reality, not assumptions.</p>\n<p>This talk shows how GraphQL's inherent usage visibility and the rise of coding agents create a feedback loop that didn't exist before. And why it matters for anyone building APIs that need to evolve fast.</p>\n",
    venue: "TBA",
    speakers: [
      {
        id: 1881,
        name: "Michael Staib",
        company: "ChilliCream",
        jobtitle: "Founder",
        avatar: michaelStaibAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/michael-staib-31519571/",
          },
          { service: "github", url: "https://github.com/michaelstaib" },
          { service: "website", url: "https://chillicream.com" },
        ],
      },
    ],
  },
]

import braxtonBraggAvatar from "./speakers/braxton-bragg.jpg"
import elenaBukarevaAvatar from "./speakers/elena-bukareva.jpg"
import jeffAuriemmaAvatar from "./speakers/jeff-auriemma.jpg"
import michaelStaibAvatar from "./speakers/michael-staib.webp"
import pascalSennAvatar from "./speakers/pascal-senn.webp"
import vanessaJohnsonAvatar from "./speakers/vanessa-johnson.webp"

import type { EventSession } from "../components/event-schedule-section"

export const NYC_TIMEZONE = "America/New_York"
export const NYC_TIMEZONE_LABEL =
  "All times in Eastern Daylight Time (EDT, UTC−4)"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  GraphQL: "#e07b39",
  "GraphQL History": "#e07b39",
  "Open Source": "#36C1A0",
  Learning: "#3c8fc1",
  "Schema Design": "#9f7aea",
  "Best Practices": "#5c8a52",
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  "Public Sector": "#4e6e82",
  "Schema Evolution": "#cbc749",
  Observability: "#1a5b77",
  Accessibility: "#CC6BB0",
  "CI/CD": "#4a7c59",
}

export const nycSessions: EventSession[] = [
  {
    id: 1,
    uuid: "built-to-evolve-13-years-of-graphql",
    title: "Built to Evolve: 13 Years of GraphQL",
    start: "2026-05-13T14:10:00-04:00",
    end: "2026-05-13T14:35:00-04:00",
    tags: ["GraphQL History", "Open Source"],
    description:
      "<p>In 2015, we promised GraphQL would be “easy to learn and use.” Ten years, and hundreds of billions of daily API calls later, we’ve learned that not all our hopes and promises turned out to be true.</p>\n",
    venue: "GraphQL Stage",
    speakers: [
      {
        id: 1,
        name: "Braxton Bragg",
        company: "Meta",
        jobtitle: "Product Manager",
        avatar: braxtonBraggAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/braxtonbragg/",
          },
        ],
      },
      {
        id: 2,
        name: "Elena Bukareva",
        company: "Meta",
        jobtitle: "Engineering Manager",
        avatar: elenaBukarevaAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/elena-bukareva/",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    uuid: "teach-yourself-graphql-2026",
    title: "Teach yourself GraphQL in 2026: an anti-blueprint",
    start: "2026-05-13T14:40:00-04:00",
    end: "2026-05-13T15:05:00-04:00",
    tags: ["Learning", "Schema Design", "Best Practices"],
    description:
      "<p>After eleven years as an open source technology, GraphQL has never had a more favorable learning curve. Clearer mental models, better educational materials, and a deeper collective understanding of best practices have transformed the “wild west” of 2015 to a much more manageable landscape today.</p>\n<p>You and your team are unique, so rather than a one-size-fits-all blueprint, this talk presents a practical guide to teaching yourself GraphQL in 2026. We’ll examine how beginners typically build their first mental model of GraphQL, the most common misconceptions, and the key design questions they encounter early.</p>\n<p>Special attention will be paid to different modalities: schema-first vs. code-first, schema design principles, common pitfalls when considering enums, the proper use of fragments, and security and performance by default. Attendees will leave with a conceptual roadmap for self-study, a recipe book for context engineering in their agent, and an understanding of the major decision points along the journey ahead.</p>\n",
    venue: "GraphQL Stage",
    speakers: [
      {
        id: 3,
        name: "Jeff Auriemma",
        company: "Apollo",
        jobtitle: "Senior Engineering Manager",
        avatar: jeffAuriemmaAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/jeffreyauriemma/",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    uuid: "graphql-execution-layer-ai-agents",
    title: "GraphQL as the Execution Layer for AI Agents",
    start: "2026-05-13T15:10:00-04:00",
    end: "2026-05-13T15:35:00-04:00",
    tags: ["AI Agents", "Federation", "Public Sector"],
    description:
      "<p>Your next million API consumers won’t be developers. They’ll be AI agents. And they don’t read documentation, parse hypermedia links, or guess which of your 200 REST endpoints returns the data they need.</p>\n<p>This talk examines what happens when autonomous AI agents become the primary consumers of your API layer. Drawing on real data from Singapore’s public government APIs, I’ll show how REST responses waste 30–60% of an agent’s token budget on structural overhead, and how a typed, self-describing schema changes the equation entirely.</p>\n<p>We’ll walk through the three properties that make an API truly agent-native: discoverability, precision, and composability. We’ll look at what it would take to unify API estates like Singapore’s 3,000+ government APIs across 75+ agencies into a single, self-describing surface. A pattern Gartner expects 30% of enterprises to adopt by 2027.</p>\n<p>You’ll leave with a framework for what makes an API truly agent-native, why GraphQL’s type system and federation model get you there, and how to start without a rewrite.</p>\n",
    venue: "GraphQL Stage",
    speakers: [
      {
        id: 4,
        name: "Pascal Senn",
        company: "ChilliCream",
        jobtitle: "Founder",
        avatar: pascalSennAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/pascal-senn-90899a15a",
          },
          { service: "github", url: "https://github.com/PascalSenn" },
          { service: "website", url: "https://chillicream.com" },
        ],
      },
    ],
  },
  {
    id: 4,
    uuid: "closing-the-loop-coding-agents",
    title:
      "Closing the Loop: How GraphQL Gives Coding Agents Eyes on What Actually Matters",
    start: "2026-05-13T15:40:00-04:00",
    end: "2026-05-13T16:05:00-04:00",
    tags: ["AI Agents", "Schema Evolution", "Observability"],
    description:
      "<p>Coding agents are reshaping how we build software. Implementing features, refactoring systems, and shipping changes at a pace unthinkable 6 months ago. But to be successful with agents you need the right feedback loop. One that guides your agent to success, not into the spiral of death.</p>\n<p>Ask Claude to add a review system to your product API. Without knowing what’s in use, it might reshape your types, move fields, and break your deployed clients because it is missing a crucial feedback loop of what’s in use in your clients.</p>\n<p>GraphQL changes this. Every client operation explicitly declares the exact fields and types it needs. That gives you something rare: field-level usage data across your entire consumer base. Not endpoint hits, but actual demand, broken down to the individual field.</p>\n<p>When coding agents can access this data, they stop guessing. Evolve your schema grounded in reality, not assumptions.</p>\n<p>This talk shows how GraphQL’s inherent usage visibility and the rise of coding agents create a feedback loop that didn’t exist before. And why it matters for anyone building APIs that need to evolve fast.</p>\n",
    venue: "GraphQL Stage",
    speakers: [
      {
        id: 5,
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
  {
    id: 5,
    uuid: "tbd-slot-1630",
    title: "TBD",
    start: "2026-05-13T16:30:00-04:00",
    end: "2026-05-13T16:55:00-04:00",
    tags: ["GraphQL"],
    description: "",
    venue: "GraphQL Stage",
    speakers: [],
  },
  {
    id: 6,
    uuid: "server-assisted-accessibility-graphql-ci",
    title:
      "Server Assisted Accessibility (Part 2): Enforcing Consistent Semantics via GraphQL + CI",
    start: "2026-05-13T17:00:00-04:00",
    end: "2026-05-13T17:25:00-04:00",
    tags: ["Accessibility", "Schema Design", "CI/CD"],
    description:
      "<p>In my apidays Paris session last year, I introduced a “shift left” pattern for accessibility: attach accessibility metadata to GraphQL fields using lightweight directives, expose it through code generation, and let Android (Jetpack Compose), iOS (SwiftUI), and web clients map it into native accessibility semantics for consistent defaults.</p>\n<p>This follow-up, Part 2, focuses on the next problem teams hit in production: keeping that metadata accurate as the schema changes. We’ll walk through a practical, low-friction approach adding CI-friendly validation that catches common contract regressions before changes ship: missing required metadata, invalid values, and template drift.</p>\n<p>This approach standardizes the repeatable, high-leverage semantics (labels, roles, states, templated summaries) so clients can focus on the platform-specific work that truly belongs in the UI (complex interactions, focus order, and behavior). You’ll leave with schema examples you can adapt, a realistic enforcement blueprint that fits into pull requests and CI, and rollout patterns for introducing rules gradually without breaking existing clients.</p>\n",
    venue: "GraphQL Stage",
    speakers: [
      {
        id: 7,
        name: "Vanessa Johnson",
        company: "The New York Times",
        jobtitle: "Android Engineer",
        avatar: vanessaJohnsonAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/vanessa-johnson999/",
          },
        ],
      },
    ],
  },
]

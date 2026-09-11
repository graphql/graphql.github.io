import michaelStaibAvatar from "../amsterdam/speakers/michael-staib.webp"

import type { EventSession } from "../components/event-schedule-section"

export const BENGALURU_TIMEZONE = "Asia/Kolkata"
export const BENGALURU_TIMEZONE_LABEL =
  "All times in Bengaluru Time (IST, UTC+5:30)"

// Source: https://confengine.com/conferences/apidays-india-2026/schedule
// Graphql track: August 19, 2026, Junior Ball Room 2.
// Descriptions below are editorial summaries, except Michael's existing abstract.
// New speaker avatars are left undefined until the image files are added.
// UUID is omitted for this manually maintained schedule.
export const bengaluruSessions: Omit<EventSession, "uuid">[] = [
  {
    id: 5001,
    title:
      "Closing the Loop: How GraphQL Gives Coding Agents Eyes on What Actually Matters",
    start: "2026-08-19T11:00:00+05:30",
    end: "2026-08-19T11:25:00+05:30",
    tags: ["AI Agents", "Schema Evolution", "Observability"],
    description:
      "<p>Coding agents are reshaping how we build software. Implementing features, refactoring systems, and shipping changes at a pace unthinkable 6 months ago. But to be successful with agents you need the right feedback loop. One that guides your agent to success, not into the spiral of death.</p>\n<p>Ask Claude to add a review system to your product API. Without knowing what's in use, it might reshape your types, move fields, and break your deployed clients because it is missing a crucial feedback loop of what's in use in your clients.</p>\n<p>GraphQL changes this. Every client operation explicitly declares the exact fields and types it needs. That gives you something rare: field-level usage data across your entire consumer base. Not endpoint hits, but actual demand, broken down to the individual field.</p>\n<p>When coding agents can access this data, they stop guessing. Evolve your schema grounded in reality, not assumptions.</p>\n<p>This talk shows how GraphQL's inherent usage visibility and the rise of coding agents create a feedback loop that didn't exist before. And why it matters for anyone building APIs that need to evolve fast.</p>\n",
    venue: "Junior Ball Room 2",
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
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50124/rest-in-peace-graphql-vs-rest-in-the-age-of-agentic-ai
  {
    id: 5002,
    title: "REST in Peace? GraphQL vs REST in the Age of Agentic AI",
    start: "2026-08-19T11:30:00+05:30",
    end: "2026-08-19T11:55:00+05:30",
    tags: ["GraphQL", "REST", "AI Agents"],
    description:
      "<p>A comparison of REST and GraphQL for autonomous agents, using experiments to examine token consumption and the accuracy of tool calls. The session offers a decision framework based on the complexity of the tasks an agent needs to perform.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5101,
        name: "Santhosh Jose",
        company: "IBS Software Plc",
        jobtitle: "Product Head",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50168/zero-to-federation-in-60-seconds-how-a-graphql-middleware-replaced-500-legacy-apis-and-saved-3-years-of-migration
  {
    id: 5003,
    title:
      "Zero-to-Federation in 60 Seconds: How a GraphQL Middleware Replaced 500+ Legacy APIs and Saved 3 Years of Migration",
    start: "2026-08-19T12:00:00+05:30",
    end: "2026-08-19T12:25:00+05:30",
    tags: ["GraphQL", "Federation"],
    description:
      "<p>A Red Hat migration case study showing how middleware connects Salesforce to an Apollo supergraph. The session covers generating schemas dynamically, adapting federation metadata, translating authentication, rewriting queries, and propagating upstream schema changes.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5102,
        name: "Rigin Oommen",
        company: "Red Hat LLC",
        jobtitle: "Principal Software Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50233/a-mock-is-a-promise-making-graphql-mocks-enforceable
  {
    id: 5004,
    title: "A Mock Is a Promise: Making GraphQL Mocks Enforceable",
    start: "2026-08-19T12:30:00+05:30",
    end: "2026-08-19T12:55:00+05:30",
    tags: ["GraphQL", "Mocking", "Contract Testing"],
    description:
      "<p>A demonstration of using one GraphQL contract both to mock an API during frontend development and to verify its eventual implementation. A resolver mapping bug illustrates how contract tests can detect failures that schema validation alone misses and prevent them from reaching production.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5103,
        name: "Yogesh Nikam",
        company: "Specmatic",
        jobtitle: "Senior Software Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50334/human-in-the-loop-governing-api-evolution-in-the-age-of-agents
  {
    id: 5005,
    title: "Human in the Loop: Governing API Evolution in the Age of Agents",
    start: "2026-08-19T14:00:00+05:30",
    end: "2026-08-19T14:25:00+05:30",
    tags: ["GraphQL", "AI Agents", "Schema Evolution"],
    description:
      "<p>A demonstration of reviewing agent-proposed schema changes through explicit ownership, proposals, impact assessment, and approval. Reviewers can evaluate effects on consumers before accepting a change, while rejected proposals give agents feedback for their next attempt.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5104,
        name: "Nithin Kumar B",
        company: "WunderGraph",
        jobtitle: "Senior Founding Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50253/just-ask-building-a-natural-language-graphql-agent-from-the-graph-you-already-have-the-easy-way
  {
    id: 5006,
    title:
      "Just Ask: Building a Natural Language GraphQL Agent from the Graph You Already Have (the Easy Way)",
    start: "2026-08-19T14:30:00+05:30",
    end: "2026-08-19T14:55:00+05:30",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>A demonstration of representing a GraphQL schema in a graph database so an agent can explore its relationships and build queries from natural-language requests. The session also covers turning persisted operations into agent tools and evaluating tool calls with Benchmark Broccoli.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5105,
        name: "Shriya Chauhan",
        company: "Red Hat",
        jobtitle: "Software Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/schedule
  {
    id: 5007,
    title:
      "Evolving GraphQL: Designing APIs That Deliver Insights with Intelligent Resolvers",
    start: "2026-08-19T15:00:00+05:30",
    end: "2026-08-19T15:25:00+05:30",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>An exploration of adding AI capabilities to resolvers so APIs return useful interpretations alongside raw data. Examples cover schema design and implementation tradeoffs around response time, dependability, and expense.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5106,
        name: "Vyshnavi Devi",
        company: "Snaphomz",
        jobtitle: "AI Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
      {
        id: 5107,
        name: "CHANDA RAJ KUMAR",
        company: "KL UNIVERSITY HYDERABAD",
        jobtitle: "Assistant Professor, GraphQL Ambassador",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50276/ask-dont-fetch-why-graphql-mcp-is-the-native-language-of-ai-agents
  {
    id: 5008,
    title:
      "Ask, Don't Fetch: Why GraphQL + MCP Is the Native Language of AI Agents",
    start: "2026-08-19T16:00:00+05:30",
    end: "2026-08-19T16:25:00+05:30",
    tags: ["GraphQL", "MCP", "AI Agents"],
    description:
      "<p>An introduction to combining GraphQL with MCP for agents that discover capabilities and choose data at runtime. The session examines typed contracts, introspection, selective fetching, and approaches to adapting existing REST services for agent use.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5108,
        name: "Akshay N Shaju",
        company: "IBM",
        jobtitle: "Senior Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
      {
        id: 5109,
        name: "Akhil Muralidharan",
        company: "IBM",
        jobtitle: "Advisory Software Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/schedule
  {
    id: 5009,
    title:
      "Streaming the Graph: Architecting Flow-Based Progressive Hydration in Android",
    start: "2026-08-19T16:30:00+05:30",
    end: "2026-08-19T16:55:00+05:30",
    tags: ["GraphQL", "Android", "Error Handling"],
    description:
      "<p>A walkthrough of incremental loading with Apollo Kotlin, Kotlin Flow, and Jetpack Compose. Topics include rendering deferred results, managing partial failures, and measuring network and battery costs.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5110,
        name: "Dinoy Raj k",
        company: "Strollby",
        jobtitle: "Product Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
  // Source: https://confengine.com/conferences/apidays-india-2026/proposal/50222/functional-testing-of-graphql-apis-simple-checks-that-catch-real-bugs
  {
    id: 5010,
    title:
      "Functional Testing of GraphQL APIs: Simple Checks That Catch Real Bugs",
    start: "2026-08-19T17:00:00+05:30",
    end: "2026-08-19T17:25:00+05:30",
    tags: ["GraphQL", "Testing"],
    description:
      "<p>Practical API testing techniques using Altair and Postman, covering valid and invalid inputs, missing data, nullability, and response mapping. The session also examines query complexity limits and how to catch failures through everyday functional checks.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5111,
        name: "Nachiket Zadap",
        company: "Red hat",
        jobtitle: "Software quality Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
      {
        id: 5112,
        name: "mahima malhotra",
        company: "RED HAT",
        jobtitle: "Software Quality Engineer",
        avatar: undefined, // TODO: Add speaker image.
        socialurls: [],
      },
    ],
  },
]

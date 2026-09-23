import michaelStaibAvatar from "../amsterdam/speakers/michael-staib.webp"
import santhoshJoseAvatar from "./speakers/santhoshJose.jpg"
import riginOommenAvatar from "./speakers/riginOommen.jpg"
import yogeshNikamAvatar from "./speakers/yogeshNikam.jpg"
import nithinKumarAvatar from "./speakers/nithinKumar.jpg"
import shriyaChauhanAvatar from "./speakers/shriyaChauhan.jpg"
import vyshnaviDeviAvatar from "./speakers/vyshnaviDevi.jpg"
import chandaRajKumarAvatar from "./speakers/chandaRajKumar.jpg"
import akshayShajuAvatar from "./speakers/akshayShaju.webp"
import akhilMuralidharanAvatar from "./speakers/akhilMuralidharan.webp"
import dinoyRajAvatar from "./speakers/dinoyRaj.jpg"
import nachiketZadapAvatar from "./speakers/nachiketZadap.jpg"
import mahimaMalhotraAvatar from "./speakers/mahimaMalhotra.jpg"

import type { EventSession } from "../components/event-schedule-section"

export const BENGALURU_TIMEZONE = "Asia/Kolkata"
export const BENGALURU_TIMEZONE_LABEL =
  "All times in Bengaluru Time (IST, UTC+5:30)"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  Mocking: "#CC6BB0",
  MCP: "#894545",
  "Contract Testing": "#36C1A0",
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  Android: "#4e6e82",
  "Schema Evolution": "#cbc749",
  Observability: "#1a5b77",
  Testing: "#e07b39",
}

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
      "<p>Coding agents are reshaping how we build software. Implementing features, refactoring systems, and shipping changes at a pace unthinkable 6 months ago. But to be successful with agents you need the right feedback loop. One that guides your agent to success, not into the spiral of death.</p><p>Ask Claude to add a review system to your product API. Without knowing what's in use, it might reshape your types, move fields, and break your deployed clients because it is missing a crucial feedback loop of what's in use in your clients.</p><p>GraphQL changes this. Every client operation explicitly declares the exact fields and types it needs. That gives you something rare: field-level usage data across your entire consumer base. Not endpoint hits, but actual demand, broken down to the individual field.</p><p>When coding agents can access this data, they stop guessing. Evolve your schema grounded in reality, not assumptions.</p><p>This talk shows how GraphQL's inherent usage visibility and the rise of coding agents create a feedback loop that didn't exist before. And why it matters for anyone building APIs that need to evolve fast.</p>",
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
          { service: "twitter", url: "https://twitter.com/michael_staib" },
          { service: "github", url: "https://github.com/michaelstaib" },
          { service: "website", url: "https://chillicream.com" },
        ],
      },
    ],
  },
  {
    id: 5002,
    title: "REST in Peace? GraphQL vs REST in the Age of Agentic AI",
    start: "2026-08-19T11:30:00+05:30",
    end: "2026-08-19T11:55:00+05:30",
    tags: ["AI Agents"],
    description:
      "As Large Language Models (LLMs) transition from static chatbots to autonomous agents, the interface through which they interact with the world (APIs or tools) becomes the primary bottleneck for performance. While the industry has spent decades optimizing APIs for human developers and web browsers, the &ldquo;agentic consumer&rdquo; introduces a radical new set of requirements: semantic density, schema discoverability, and context window economy.</p><p>This talk presents a systematic, data-driven analysis comparing REST and GraphQL as the backbone for agentic tool calling. We move beyond the &ldquo;REST is standard&rdquo; versus &ldquo;GraphQL is flexible&rdquo; debate to measure what truly matters for an AI-driven workflow: Token Efficiency and Reasoning Accuracy.</p><p>Through a series of tiered experiments, ranging from atomic data retrieval to complex relational discovery, we quantify how REST and GraphQL perform in Agentic tool calling use-cases to help you determine which one you should use.</p><p>Why this matters: In an era where every token has a financial and computational cost, choosing the wrong API architecture will slow down your app and make your agent &ldquo;dimmer&rdquo; by burying signals in noise. Attendees will walk away with a rubric for selecting the right architecture based on their agent’s &ldquo;Reasoning Depth&rdquo; and a blueprint for building&ldquo;LLM-friendly&rdquo; interfaces that maximize the intelligence of their autonomous systems.",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5101,
        name: "Santhosh Jose",
        company: "IBS Software Plc",
        jobtitle: "Product Head",
        avatar: santhoshJoseAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/josesanthosh/",
          },
          { service: "website", url: "https://www.santhoshjose.dev/" },
        ],
      },
    ],
  },
  {
    id: 5003,
    title:
      "Zero-to-Federation in 60 Seconds: How a GraphQL Middleware Replaced 500+ Legacy APIs and Saved 3 Years of Migration",
    start: "2026-08-19T12:00:00+05:30",
    end: "2026-08-19T12:25:00+05:30",
    tags: ["Federation"],
    description:
      "<p>When Red Hat needed to migrate hundreds of customer-facing systems away from a legacy Salesforce REST integration, the team faced a daunting reality: 500+ custom REST APIs, each hand-written to bridge Red Hat's ecosystem with Salesforce as the data source. Rebuilding them for the new architecture would take years and a massive engineering effort.</p><p>Instead, we built a lightweight GraphQL middleware that sits between Apollo Federation's supergraph and Salesforce's GraphQL API — and it changed everything.</p><p>From day zero, every Salesforce object, field, mutation, and relationship was available in Red Hat's federated supergraph. No hand-written schema. No custom resolvers. No months of API development per object.</p><p>In this talk, I'll walk through how we:<ul><li>Auto-introspect Salesforce's GraphQL schema at runtime, even though Salesforce's own introspection endpoint is broken and non-functional - by querying the underlying introspection JSON and reconstructing a valid SDL from scratch.</li><li>Dynamically federate the schema by programmatically injecting Apollo Federation directives (@key, @shareable), applying naming-convention prefixes (SalesforceSupport, salesforce_support_) to prevent type collisions in the supergraph, and transparently rewriting queries using GraphQL aliases so Salesforce never sees the prefixed names.</li><li>Bridge two authentication systems — translating Red Hat SSO (Keycloak) JWT tokens into Salesforce OAuth access tokens on the fly, so customers authenticate once with their Red Hat identity and transparently access Salesforce data.</li><li>Reflect upstream changes in real time — when Salesforce's object model changes (new fields, new objects, schema modifications), the middleware's scheduled introspection picks it up and the supergraph updates automatically with zero developer intervention.</li></ul></p><p>The result: what was estimated as a 3+ year migration effort was reduced to weeks. Hundreds of developers were unblocked immediately. And the entire Salesforce surface area — every object, every field, every relationship — is now queryable through a single federated GraphQL endpoint with full type safety.</p><p>This is a story about choosing the right abstraction, trusting GraphQL's composability, and how a single middleware service replaced years of planned API development.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5102,
        name: "Rigin Oommen",
        company: "Red Hat LLC",
        jobtitle: "Principal Software Engineer",
        avatar: riginOommenAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/riginoommen/",
          },
          { service: "twitter", url: "https://twitter.com/riginoommen" },
        ],
      },
    ],
  },
  {
    id: 5004,
    title: "A Mock Is a Promise: Making GraphQL Mocks Enforceable",
    start: "2026-08-19T12:30:00+05:30",
    end: "2026-08-19T12:55:00+05:30",
    tags: ["Mocking", "Contract Testing"],
    description:
      "<p>GraphQL mocks help frontend teams start before the API implementation is ready. But this creates a dangerous question: when the real service arrives, who verifies that it fulfils the promise made by the mock?</p><p>In this session, I will demonstrate a contract-first workflow where the same GraphQL SDL and examples serve two purposes. Before implementation, Specmatic turns them into a standalone GraphQL mock against which the frontend can develop and test. After implementation, Specmatic uses that same contract to test the real GraphQL service.</p><p>The demo follows a realistic failure. A frontend works correctly against the agreed mock, but the real GraphQL resolver incorrectly maps fields returned by a downstream REST service. The GraphQL schema remains valid, yet the frontend receives an HTTP 200 response containing GraphQL errors and unusable data.</p><p>We will reproduce this failure, catch it through contract tests, fix the resolver, and place the verification in CI as a release gate. The downstream dependency will be isolated using an OpenAPI-backed mock, allowing us to test the real resolver behaviour without requiring a shared integration environment.</p><p>The central idea is simple: mocks move feedback earlier, but provider verification prevents that early feedback from becoming fiction.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5103,
        name: "Yogesh Nikam",
        company: "Specmatic",
        jobtitle: "Senior Software Engineer",
        avatar: yogeshNikamAvatar,
        socialurls: [
          { service: "github", url: "https://github.com/yogeshnikam671" },
        ],
      },
    ],
  },
  {
    id: 5005,
    title: "Human in the Loop: Governing API Evolution in the Age of Agents",
    start: "2026-08-19T14:00:00+05:30",
    end: "2026-08-19T14:25:00+05:30",
    tags: ["AI Agents", "Schema Evolution"],
    description:
      "<p>AI agents are now proposing, consuming, and evolving GraphQL schemas faster than any human review process was designed for. Subgraphs drift in days, ownership blurs across teams, and breaking changes ship into the supergraph before anyone notices.</p><p>This session is about a pattern for keeping humans in the loop without slowing agents down: proposal-based schema governance. Four primitives hold it together, which are ownership, change proposal, impact analysis, and approval. Every schema change, whether from a developer or an agent, flows through these before it touches the supergraph.</p><p>Through a live demonstration, you'll see this end-to-end. An agent proposes a schema change, the system routes it to the right subgraph owners, reviewers see the blast radius across consumers, and the change ships safely or gets rejected with reasoning the agent can learn from. Agents move fast, but humans still own the schema..</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5104,
        name: "Nithin Kumar B",
        company: "WunderGraph",
        jobtitle: "Senior Founding Engineer",
        avatar: nithinKumarAvatar,
        socialurls: [
          { service: "twitter", url: "https://twitter.com/_thisisnithin" },
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/nithinkumarb/",
          },
          { service: "website", url: "https://wundergraph.com/" },
        ],
      },
    ],
  },
  {
    id: 5006,
    title:
      "Just Ask: Building a Natural Language GraphQL Agent from the Graph You Already Have (the Easy Way)",
    start: "2026-08-19T14:30:00+05:30",
    end: "2026-08-19T14:55:00+05:30",
    tags: ["AI Agents"],
    description:
      "<p>GraphQL is powerful, but querying a GraphQL API isn't easy for everyone. Non-developers struggle with schema structure and query syntax. And even experienced developers spend time navigating deeply nested types just to fetch the right data. The promise of &ldquo;just ask a question and get an answer&rdquo; feels obvious, yet making it happen has been anything but simple.</p><p>Most teams land on RAG pipelines: chunking schema documentation into vectors, embedding it, and retrieving it at query time. It works, but adds unnecessary complexity.</p><p>Your GraphQL schema is already a graph. Instead of flattening that structure into vectors and hoping retrieval picks the right pieces, we can store the schema directly in a graph database and let the LLM navigate it.</p><p>I'll demonstrate how to model your schema as a graph, build an agent that traverses it to construct and execute queries and return human-readable answers. For common patterns, we'll see how persisted GraphQL queries become reusable tools, making your query library into an agent toolkit.</p><p>I'll also introduce Benchmark Broccoli, an open-source project I built that evaluates your mcp tool call performance, running locally.</p><p>If you're a GraphQL developer, a platform engineer, or a team exploring LLM-powered APIs, this talk gives a practical, simpler architecture you can start building with today.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5105,
        name: "Shriya Chauhan",
        company: "Red Hat",
        jobtitle: "Software Engineer",
        avatar: shriyaChauhanAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/shriya-chauhan23",
          },
        ],
      },
    ],
  },
  {
    id: 5007,
    title:
      "Evolving GraphQL: Designing APIs That Deliver Insights with Intelligent Resolvers",
    start: "2026-08-19T15:00:00+05:30",
    end: "2026-08-19T15:25:00+05:30",
    tags: ["AI Agents"],
    description:
      "<p>GraphQL transformed API design by enabling flexible and efficient data fetching. However, in many real-world systems, the data returned by APIs still requires additional processing and analysis before it becomes truly useful to users.</p><p>This session explores how GraphQL can evolve beyond a traditional data-fetching layer by incorporating intelligent capabilities directly into resolvers. By integrating AI into GraphQL workflows, APIs can deliver higher-level outputs such as summaries, recommendations, contextual insights, and natural-language-driven interactions — while still preserving GraphQL’s core strengths of structure, flexibility, and developer experience.</p><p>Through practical examples and architectural patterns, we’ll demonstrate how to design schemas that expose capabilities alongside data, integrate AI-powered resolver logic, and handle challenges such as latency, reliability, and cost.</p><p>Attendees will leave with a practical understanding of how GraphQL can become not just a query layer, but an intelligent interface for modern applications.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5106,
        name: "Vyshnavi Devi",
        company: "Snaphomz",
        jobtitle: "AI Engineer",
        avatar: vyshnaviDeviAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/vyshnavi-devi",
          },
        ],
      },
      {
        id: 5107,
        name: "Chanda Raj Kumar",
        company: "KL UNIVERSITY HYDERABAD",
        jobtitle: "Assistant Professor, GraphQL Ambassador",
        avatar: chandaRajKumarAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/chanda-raj-kumar-88799a1b3/",
          },
        ],
      },
    ],
  },
  {
    id: 5008,
    title:
      "Ask, Don't Fetch: Why GraphQL + MCP Is the Native Language of AI Agents",
    start: "2026-08-19T16:00:00+05:30",
    end: "2026-08-19T16:25:00+05:30",
    tags: ["MCP", "AI Agents"],
    description:
      "<p>REST APIs were designed for human-built clients that know exactly what URL to call. AI agents are different — they reason, plan, and decide what data they need at runtime. That mismatch is quietly becoming one of the biggest friction points in enterprise AI adoption.</p><p>In this session, we explore why GraphQL, paired with the Model Context Protocol (MCP), is uniquely positioned to become the standard interface layer for agentic systems. You'll learn how GraphQL's strong typing and introspection eliminate the hallucination risk of ambiguous REST contracts, how its precise data retrieval model solves the over-fetching and under-fetching problems that make LLM tool calls expensive and unpredictable, and how MCP builds on top of this to give AI agents a standardised, self-describing surface to discover and invoke capabilities — without custom glue code per integration.</p><p>Walk away with a clear mental model of the GraphQL-MCP stack, a practical pattern for evolving existing REST endpoints into agent-ready GraphQL APIs, and real examples of AI agents successfully navigating complex multi-step queries using schema-declared tools.</p><p>Whether you're an API architect, a backend engineer, or a developer building your first AI agent, this session gives you the vocabulary and the blueprint to make your APIs first-class citizens in the agentic world.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5108,
        name: "Akshay N Shaju",
        company: "IBM",
        jobtitle: "Senior Engineer",
        avatar: akshayShajuAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/akshaynshaju",
          },
        ],
      },
      {
        id: 5109,
        name: "Akhil Muralidharan",
        company: "IBM",
        jobtitle: "Advisory Software Engineer",
        avatar: akhilMuralidharanAvatar,
        socialurls: [
          { service: "linkedin", url: "https://www.linkedin.com/in/akhiltm/" },
        ],
      },
    ],
  },
  {
    id: 5009,
    title:
      "Streaming the Graph: Architecting Flow-Based Progressive Hydration in Android",
    start: "2026-08-19T16:30:00+05:30",
    end: "2026-08-19T16:55:00+05:30",
    tags: ["Android", "Error Handling"],
    description:
      "<p>In the world of mobile, the &ldquo;all-or-nothing&rdquo; data fetching model is a UX killer. When a single slow field in your GraphQL query—like a complex pricing calculation or an AI-generated summary—holds up the entire response, your users are left staring at a blank screen.</p><p>The GraphQL @defer directive offers a solution, but implementing it on Android requires more than just adding a keyword to your schema. It requires a fundamental shift in how we architect our data layer.</p><p>In this session, we will dive deep into building a Flow-based Defer Architecture. We will explore how to leverage Apollo Kotlin 4.x to transform multi-part GraphQL responses into a seamless stream of data using Kotlin Flow.</p><p>Key takeaways from this session:<ul><li>The Blueprint: How to structure your domain layer to handle incremental updates without triggering unnecessary UI &ldquo;flicker.&rdquo;</li><li>Flow & Compose Integration: Techniques for collecting deferred emissions in Jetpack Compose to achieve smooth, progressive UI hydration.</li><li>Error Handling in a Partial World: Strategies for managing failures when the primary data arrives but the deferred fragment fails.</li><li>Performance Deep Dive: Monitoring the impact of @defer on battery life and network overhead compared to traditional polling or multiple queries.</li></ul></p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5110,
        name: "Dinoy Raj k",
        company: "Strollby",
        jobtitle: "Product Engineer",
        avatar: dinoyRajAvatar,
        socialurls: [
          { service: "twitter", url: "https://twitter.com/dinoy_raj" },
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/dinoy-raj/",
          },
          { service: "website", url: "https://linktr.ee/dinoyraj" },
        ],
      },
    ],
  },
  {
    id: 5010,
    title:
      "Functional Testing of GraphQL APIs: Simple Checks That Catch Real Bugs",
    start: "2026-08-19T17:00:00+05:30",
    end: "2026-08-19T17:25:00+05:30",
    tags: ["Testing"],
    description:
      "<pGraphQL APIs are flexible, but this flexibility makes functional testing more important and sometimes tricky.</p><p>In this talk, I will share simple and practical ways to test GraphQL APIs using tools like opensource (Altair)/Postman. The focus will be on real testing scenarios that help catch actual bugs.</p><p>I will cover how to test positive and negative cases, validate query inputs, and check how APIs behave with wrong or missing data. I will also explain how to test GraphQL-specific concepts like cost parameters (cost, height, depth) to avoid heavy queries.</p><p>Another important part is datatype validation—how to verify nullable and non-nullable fields, and ensure correct data mapping in responses.</p><p>This session is based on real testing experience and will focus on simple steps that testers and developers can apply directly in their projects.</p>",
    venue: "Junior Ball Room 2",
    speakers: [
      {
        id: 5111,
        name: "Nachiket Zadap",
        company: "Red Hat",
        jobtitle: "Software quality Engineer",
        avatar: nachiketZadapAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/nachiketa-zadap-72a35933/",
          },
        ],
      },
      {
        id: 5112,
        name: "Mahima Malhotra",
        company: "Red Hat",
        jobtitle: "Software Quality Engineer",
        avatar: mahimaMalhotraAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/mahima-malhotra-a46a1a131/",
          },
        ],
      },
    ],
  },
]

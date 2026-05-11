import akshatSharmaAvatar from "./speakers/akshat-sharma.webp"
import michaelStaibAvatar from "./speakers/michael-staib.webp"
import pascalSennAvatar from "./speakers/pascal-senn.webp"

import type { EventSession } from "../components/event-schedule-section"

export const SINGAPORE_TIMEZONE = "Asia/Singapore"
export const SINGAPORE_TIMEZONE_LABEL = "All times in Singapore Time (SGT, UTC+8)"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  Security: "#CC6BB0",
  "Zero Trust": "#894545",
  "Service Mesh": "#36C1A0",
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  "Public Sector": "#4e6e82",
  "Schema Evolution": "#cbc749",
  Observability: "#1a5b77",
}

export const singaporeSessions: EventSession[] = [
  {
    id: 3224,
    uuid: "80952503-07dd-4e31-acaf-b9e400f55126",
    title: "Securing GraphQL at Scale with Zero Trust APIs",
    start: "2026-04-15T15:55:00+08:00",
    end: "2026-04-15T16:20:00+08:00",
    tags: ["Security", "Zero Trust", "Service Mesh"],
    description:
      "<p>Modern microservice architectures often decentralize authentication and authorization, leading to inconsistent security policies and increased attack surfaces. GraphQL, while powerful, introduces unique risks such as over-fetching, query batching abuse, and introspection-based attacks that many teams underestimate.</p>\n<p>In this talk, I present a real-world case study of building a secure, identity-aware GraphQL gateway that enforces Zero Trust principles across distributed services. By integrating centralized identity management with Keycloak and leveraging service mesh technologies like Istio and Envoy, we created a unified layer for authentication, authorization, and traffic governance.</p>\n<p>The session will walk through practical challenges, including enforcing fine-grained access control, implementing query cost analysis, and mitigating abuse patterns in production. Attendees will gain insights into designing secure GraphQL APIs that scale without compromising performance or developer experience.</p>\n<p>This talk matters because API security is no longer optional. As organizations increasingly adopt GraphQL, understanding how to secure it in real-world systems is critical to preventing data leaks and maintaining trust.</p>\n",
    venue: "Stage 3",
    speakers: [
      {
        id: 4557,
        name: "Akshat Sharma",
        company: "Deskree",
        jobtitle: "Technology Advocate",
        avatar: akshatSharmaAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/akshat-sharma11",
          },
        ],
      },
    ],
  },
  {
    id: 3225,
    uuid: "2a24223a-16d0-40fa-821b-b91c491ff9a6",
    title: "GraphQL as the Execution Layer for AI Agents",
    start: "2026-04-15T16:20:00+08:00",
    end: "2026-04-15T16:45:00+08:00",
    tags: ["AI Agents", "Federation", "Public Sector"],
    description:
      "<p>Your next million API consumers won't be developers. They'll be AI agents. And they don't read documentation, parse hypermedia links, or guess which of your 200 REST endpoints returns the data they need.</p>\n<p>This talk examines what happens when autonomous AI agents become the primary consumers of your API layer. Drawing on real data from Singapore's public government APIs, I'll show how REST responses waste 30–60% of an agent's token budget on structural overhead, and how a typed, self-describing schema changes the equation entirely.</p>\n<p>We'll walk through the three properties that make an API truly agent-native: discoverability, precision, and composability. We'll look at what it would take to unify API estates like Singapore's 3,000+ government APIs across 75+ agencies into a single, self-describing surface. A pattern Gartner expects 30% of enterprises to adopt by 2027.</p>\n<p>You'll leave with a framework for what makes an API truly agent-native, why GraphQL's type system and federation model get you there, and how to start without a rewrite.</p>\n",
    venue: "Stage 3",
    speakers: [
      {
        id: 2446,
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
    id: 3226,
    uuid: "02d9d427-d1ff-4f78-8d8c-243565d0f1cd",
    title:
      "Closing the Loop: How GraphQL Gives Coding Agents Eyes on What Actually Matters",
    start: "2026-04-15T16:45:00+08:00",
    end: "2026-04-15T17:10:00+08:00",
    tags: ["AI Agents", "Schema Evolution", "Observability"],
    description:
      "<p>Coding agents are reshaping how we build software. Implementing features, refactoring systems, and shipping changes at a pace unthinkable 6 months ago. But to be successful with agents you need the right feedback loop. One that guides your agent to success, not into the spiral of death.</p>\n<p>Ask Claude to add a review system to your product API. Without knowing what's in use, it might reshape your types, move fields, and break your deployed clients because it is missing a crucial feedback loop of what's in use in your clients.</p>\n<p>GraphQL changes this. Every client operation explicitly declares the exact fields and types it needs. That gives you something rare: field-level usage data across your entire consumer base. Not endpoint hits, but actual demand, broken down to the individual field.</p>\n<p>When coding agents can access this data, they stop guessing. Evolve your schema grounded in reality, not assumptions.</p>\n<p>This talk shows how GraphQL's inherent usage visibility and the rise of coding agents create a feedback loop that didn't exist before. And why it matters for anyone building APIs that need to evolve fast.</p>\n",
    venue: "Stage 3",
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

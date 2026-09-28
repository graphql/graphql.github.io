import michaelStaibAvatar from "../amsterdam/speakers/michael-staib.jpg"
import daleSeoAvatar from "../london/speakers/dale-seo.jpg"
import akshayShajuAvatar from "../bengaluru/speakers/akshayShaju.jpg"
import andreasMarekAvatar from "./speakers/andreas-marek.jpg"
import eddyNguyenAvatar from "./speakers/eddy-nguyen.jpg"
import timHingstonAvatar from "./speakers/tim-hingston.jpg"
import wishulaJayathungaAvatar from "./speakers/wishula-jayathunga.jpg"

import type { EventSession } from "../components/event-schedule-section"

export const MELBOURNE_TIMEZONE = "Australia/Melbourne"
export const MELBOURNE_TIMEZONE_LABEL =
  "All times in Melbourne Time (AEDT, UTC+11)"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  Observability: "#36C1A0",
  Security: "#E0559B",
}

export const melbourneSessions: EventSession[] = [
  {
    id: 5001,
    uuid: "64a4db37-cbc2-4726-8637-025e7efa4b49",
    title: "Federation for the JVM",
    start: "2026-10-29T11:00:00+11:00",
    end: "2026-10-29T11:25:00+11:00",
    tags: ["GraphQL", "Federation"],
    description:
      "<p>Feddi gateway is the first open source implementation of the community driven GraphQL spec. This talk will introduce feddi gateway.</p>\n",
    venue: "",
    speakers: [
      {
        id: 5101,
        name: "Andreas Marek",
        company: "",
        jobtitle: "",
        avatar: andreasMarekAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/andimarek/",
          },
        ],
      },
    ],
  },
  {
    id: 5002,
    uuid: "2362071a-320d-448c-9384-f8dbe2e64a62",
    title:
      "Closing the Loop: How GraphQL Gives Coding Agents Eyes on What Actually Matters",
    start: "2026-10-29T11:30:00+11:00",
    end: "2026-10-29T11:55:00+11:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>Coding agents are reshaping how we build software. Implementing features, refactoring systems, and shipping changes at a pace unthinkable 6 months ago. But to be successful with agents you need the right feedback loop. One that guides your agent to success, not into the spiral of death.</p>\n<p>Ask Claude to add a review system to your product API. Without knowing what's in use, it might reshape your types, move fields, and break your deployed clients because it is missing a crucial feedback loop of what's in use in your clients.</p>\n<p>GraphQL changes this. Every client operation explicitly declares the exact fields and types it needs. That gives you something rare: field-level usage data across your entire consumer base. Not endpoint hits, but actual demand, broken down to the individual field.</p>\n<p>When coding agents can access this data, they stop guessing. Evolve your schema grounded in reality, not assumptions.</p>\n<p>This talk shows how GraphQL's inherent usage visibility and the rise of coding agents create a feedback loop that didn't exist before. And why it matters for anyone building APIs that need to evolve fast.</p>\n",
    venue: "",
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
  {
    id: 5003,
    uuid: "0dfb8add-40b2-4f26-9c25-2f69616b9318",
    title:
      "Ask, Don't Fetch: Why GraphQL + MCP Is the Native Language of AI Agents",
    start: "2026-10-29T12:00:00+11:00",
    end: "2026-10-29T12:25:00+11:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>REST APIs were designed for human-built clients that know exactly what URL to call. AI agents are different — they reason, plan, and decide what data they need at runtime. That mismatch is quietly becoming one of the biggest friction points in enterprise AI adoption.</p>\n<p>In this session, we explore why GraphQL, paired with the Model Context Protocol (MCP), is uniquely positioned to become the standard interface layer for agentic systems. You'll learn how GraphQL's strong typing and introspection eliminate the hallucination risk of ambiguous REST contracts, how its precise data retrieval model solves the over-fetching and under-fetching problems that make LLM tool calls expensive and unpredictable, and how MCP builds on top of this to give AI agents a standardised, self-describing surface to discover and invoke capabilities — without custom glue code per integration.</p>\n<p>Walk away with a clear mental model of the GraphQL-MCP stack, a practical pattern for evolving existing REST endpoints into agent-ready GraphQL APIs, and real examples of AI agents successfully navigating complex multi-step queries using schema-declared tools.</p>\n<p>Whether you're an API architect, a backend engineer, or a developer building your first AI agent, this session gives you the vocabulary and the blueprint to make your APIs first-class citizens in the agentic world.</p>\n",
    venue: "",
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
            url: "https://www.linkedin.com/in/akshaynshaju/",
          },
        ],
      },
    ],
  },
  {
    id: 5004,
    uuid: "2ca7fe95-80c2-40d1-a2e9-f1ff3ea25dee",
    title:
      "Telling Your Success Story: Illustrating Graph Impact Through Observability",
    start: "2026-10-29T12:30:00+11:00",
    end: "2026-10-29T12:55:00+11:00",
    tags: ["GraphQL", "Observability"],
    description:
      "<p>Building a graph requires real up-front investment - designing schemas, deploying new infrastructure, and onboarding teams onto unfamiliar platforms costs precious time and energy. So why bother?</p>\n<p>You've heard the success stories, from startups to enterprise companies, who've transformed their businesses by bringing them onto the graph. But don't believe the hype - believe the data! YOUR data.</p>\n<p>This talk is for anyone who wants to tell their own story, backed by their own data, about how the graph is driving business impact. We'll illustrate the key signals for growth that can help you paint a compelling picture of value delivered, starting with some of the obvious data points and delving into deeper insights.</p>\n<p>You'll learn how to leverage GraphQL telemetry to track adoption of a graph platform over time. Come away with new tools to spot high-performing areas, friction signals, and other opportunities for improvement that will unlock even more value from your graph.</p>\n",
    venue: "",
    speakers: [
      {
        id: 5104,
        name: "Tim Hingston",
        company: "Apollo GraphQL",
        jobtitle: "",
        avatar: timHingstonAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/timhingston/",
          },
        ],
      },
    ],
  },
  {
    id: 5005,
    uuid: "e3ff6be8-9b34-49e5-ba50-7deea5de55dd",
    title:
      "GraphQL in the Real World: The Security and Governance Playbook Nobody Gives You",
    start: "2026-10-29T14:00:00+11:00",
    end: "2026-10-29T14:25:00+11:00",
    tags: ["GraphQL", "Security"],
    description:
      "<p>GraphQL makes APIs remarkably flexible: clients can ask for exactly the data they need, compose resources through a single endpoint, and evolve schemas without constantly introducing new URLs. But that flexibility changes the security and governance problem.</p>\n<p>Once GraphQL moves beyond a demo and into production, familiar API concerns become surprisingly different. How do you control expensive queries? How do you prevent abusive or unintended data access? Where should authorization live? How do you handle introspection, depth, complexity, rate limiting, caching, observability, and schema evolution without turning GraphQL into a collection of arbitrary restrictions?</p>\n<p>In this practical, vendor-neutral session, we'll build a production GraphQL security and governance playbook from first principles. Using realistic failure scenarios, we'll examine the most common mistakes teams make and the patterns that avoid them.</p>\n<p>You'll leave with a concrete checklist for taking a GraphQL API from \"it works\" to \"we can safely run this in production.\"</p>\n<p>What I'll cover:<br />Authorization: securing fields, types, and relationships<br />Query depth and complexity: controlling expensive operations<br />Introspection: when it helps and when it becomes a risk<br />Rate limiting and abuse prevention<br />N+1 problems and why performance is a security concern too<br />Caching and the challenges of GraphQL's flexible queries<br />Observability: understanding what clients actually request<br />Schema evolution without breaking consumers<br />Governance without killing GraphQL's flexibility</p>\n<p>Audience takeaway: a practical mental model and production checklist for designing GraphQL APIs that remain secure, observable, performant, and governable as they scale.</p>\n",
    venue: "",
    speakers: [
      {
        id: 5105,
        name: "Wishula Jayathunga",
        company: "WSO2",
        jobtitle: "",
        avatar: wishulaJayathungaAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/wishula-jayathunga/",
          },
        ],
      },
    ],
  },
  {
    id: 5006,
    uuid: "44ca595b-2b0f-4b59-88e0-3d2d131ccab2",
    title: "Teach Your AI Agent GraphQL",
    start: "2026-10-29T14:30:00+11:00",
    end: "2026-10-29T14:55:00+11:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>You can hand your GraphQL work to an AI agent today, but it tends to make the same mistakes developers have made for years: schemas that are nullable everywhere, anonymous queries, and code that ignores partial errors. Most of the time the model isn't the problem. It just doesn't know your API or your team's conventions, so it guesses.</p>\n<p>Agent Skills are a lightweight, open format for giving an agent that missing context. In this talk, I'll walk through real examples from Apollo's open-source skills and show how a few Markdown files can nudge an agent toward efficient operations that respect your conventions and intentional schema design that scales with your team, instead of leaving it to guess.</p>\n<p>You don't need to be an expert in AI or GraphQL to follow along. If you've ever used a coding assistant and wished it understood GraphQL better, this talk is for you.</p>\n",
    venue: "",
    speakers: [
      {
        id: 4103,
        name: "Dale Seo",
        company: "Apollo GraphQL",
        jobtitle: "Software Engineer",
        avatar: daleSeoAvatar,
        socialurls: [
          { service: "linkedin", url: "https://www.linkedin.com/in/daleseo" },
        ],
      },
    ],
  },
  {
    id: 5007,
    uuid: "05db7eb0-02d4-4348-a72f-deb01da4613a",
    title: "Beyond the Experience Graph: The Data Graph Meets AI",
    start: "2026-10-29T15:00:00+11:00",
    end: "2026-10-29T15:25:00+11:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>Most of us know GraphQL as the \"Experience Graph\", shaped around screens and clients. But GraphQL can be used elsewhere in your architecture: as a Data Graph, a strongly-typed abstraction directly over your data layer, giving every consumer - services and AI agents alike - a single place to access all your data.</p>\n<p>In this talk, I'll show how modelling your databases behind a GraphQL schema gives you a self-describing, introspectable contract and why that turns out to be a remarkably good surface for AI. Through demos, we'll see AI agents introspect a Data Graph to explore data, assist developers in writing and refining queries, and even propose schema improvements by spotting gaps and ambiguities humans miss.</p>\n<p>You'll leave with a clear mental model of when a Data Graph makes sense, how it differs from the experience graph you already know, and practical patterns for making your graphs AI-ready.</p>\n",
    venue: "",
    speakers: [
      {
        id: 5107,
        name: "Eddy Nguyen",
        company: "",
        jobtitle: "",
        avatar: eddyNguyenAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/eddeee888/",
          },
        ],
      },
    ],
  },
]

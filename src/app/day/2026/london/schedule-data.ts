import pascalSennAvatar from "./speakers/pascal-senn.webp"
import ivanJancicAvatar from "./speakers/ivan-jancic.webp"
import davidStuttAvatar from "./speakers/david-stutt.jpg"
import daleSeoAvatar from "./speakers/dale-seo.jpg"
import zeljkoKozinaAvatar from "./speakers/zeljko-kozina.jpg"

import type { EventSession } from "../components/event-schedule-section"

export const LONDON_TIMEZONE = "Europe/London"
export const LONDON_TIMEZONE_LABEL = "All times in London Time (BST, UTC+1)"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  "Error Handling": "#36C1A0",
}

export const londonSessions: EventSession[] = [
  {
    id: 4001,
    uuid: "5e5d195e-4143-42ce-a4bf-99bcdec2e30e",
    title: "GraphQL as the Execution Layer for AI Agents",
    start: "2026-10-01T09:30:00+01:00",
    end: "2026-10-01T09:55:00+01:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>Your next million API consumers won't be developers. They'll be AI agents. And they don't read documentation, parse hypermedia links, or guess which of your 200 REST endpoints returns the data they need.</p>\n<p>This talk examines what happens when autonomous AI agents become the primary consumers of your API layer. Drawing on real data from Singapore's public government APIs, I'll show how REST responses waste 30–60% of an agent's token budget on structural overhead, and how a typed, self-describing schema changes the equation entirely.</p>\n<p>We'll walk through the three properties that make an API truly agent-native: discoverability, precision, and composability. We'll look at what it would take to unify API estates like Singapore's 3,000+ government APIs across 75+ agencies into a single, self-describing surface. A pattern Gartner expects 30% of enterprises to adopt by 2027.</p>\n<p>You'll leave with a framework for what makes an API truly agent-native, why GraphQL's type system and federation model get you there, and how to start without a rewrite.</p>\n",
    venue: "",
    speakers: [
      {
        id: 1012,
        name: "Pascal Senn",
        company: "ChilliCream",
        jobtitle: "COO",
        avatar: pascalSennAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/pascal-senn-90899a15a/",
          },
        ],
      },
    ],
  },
  {
    id: 4002,
    uuid: "52b3a4d6-b5ac-40d8-bc1a-c4bb5cf2bb2f",
    title: "Explaining GraphQL Federation to my non-technical spouse",
    start: "2026-10-01T10:00:00+01:00",
    end: "2026-10-01T10:25:00+01:00",
    tags: ["GraphQL", "Federation"],
    description:
      "<p>In this talk, I will explain the core concepts of GraphQL Federation as accessibly as possible. The goal is that you could show this talk to anyone non-technical (such as my wife!) and they'd be able to understand and follow along. Some example topics include what subgraphs and supergraphs are, what entities are, what composition directives are, etc. It will be a fun, interactive (with audience participation!) experience.</p>\n",
    venue: "",
    speakers: [
      {
        id: 4102,
        name: "David Stutt",
        company: "WunderGraph",
        jobtitle: "Senior Founding Software Engineer",
        avatar: davidStuttAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/davidstutt",
          },
        ],
      },
    ],
  },
  {
    id: 4003,
    uuid: "4178e7d1-37fd-4f70-8519-1aab3b34a48b",
    title: "Teach Your AI Agent GraphQL",
    start: "2026-10-01T10:30:00+01:00",
    end: "2026-10-01T10:55:00+01:00",
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
    id: 4004,
    uuid: "0d452c7b-b0a5-4021-ae49-46f3d75da007",
    title: "TBA",
    start: "2026-10-01T11:30:00+01:00",
    end: "2026-10-01T11:55:00+01:00",
    tags: [],
    description: "<p>Full abstract coming soon.</p>",
    venue: "",
    speakers: [],
  },
  {
    id: 4005,
    uuid: "47efc864-717c-4258-90f3-dc5ed0839b82",
    title: "Houston, We Have a Partial Response: GraphQL Error Handling",
    start: "2026-10-01T12:00:00+01:00",
    end: "2026-10-01T12:25:00+01:00",
    tags: ["GraphQL", "Error Handling"],
    description:
      "<p>Your REST instincts are lying to you. In GraphQL the status code is almost always 200, errors travel in an array alongside your data, and one null in the wrong place can wipe out the entire response. Welcome to the partial response: a successful failure.</p>\n<p>We'll work on problems like mission control: how errors propagate and bubble, top-level errors versus errors as data, union result types, and what clients should do when half the payload burns up on re-entry. You'll leave with a clear framework for which errors belong in your schema and which belong in the errors array.</p>\n<p>Failure is not an option. It's a field.</p>\n",
    venue: "",
    speakers: [
      {
        id: 4105,
        name: "Željko Kozina",
        company: "Chronomill",
        jobtitle: "Technical Architect",
        avatar: zeljkoKozinaAvatar,
        socialurls: [
          { service: "linkedin", url: "https://www.linkedin.com/in/zkozina" },
        ],
      },
    ],
  },
  {
    id: 4006,
    uuid: "4d529f8a-1208-4e7d-a9d3-ee2694581cf0",
    title: "GraphQL with AWS AppSync - Building a Product API at HEMA",
    start: "2026-10-01T12:30:00+01:00",
    end: "2026-10-01T12:55:00+01:00",
    tags: ["GraphQL"],
    description:
      '<p>I will talk about "pioneer phase" of GraphQL adoption at HEMA and using AWS AppSync for the composable commerce migration, where I will share the raw and honest lessons learned when introducing a new tech stack to a 100-year-old Dutch icon.</p>\n',
    venue: "",
    speakers: [
      {
        id: 1014,
        name: "Ivan Jančić",
        company: "Brighting",
        jobtitle: "Solutions Architect",
        avatar: ivanJancicAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/ivan-jan%C4%8Di%C4%87/",
          },
        ],
      },
    ],
  },
]

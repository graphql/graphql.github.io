import bartRijksenAvatar from "./speakers/bart-rijksen.jpg"
import aurelienDavidAvatar from "./speakers/aurelien-david.jpg"
import camilleLawrenceAvatar from "./speakers/camille-lawrence.jpg"
import gabrielaColomboAvatar from "./speakers/gabriela-colombo.jpg"
import ivanJancicAvatar from "../amsterdam/speakers/ivan-jancic.jpg"
import pascalSennAvatar from "../amsterdam/speakers/pascal-senn.jpg"
import davidStuttAvatar from "../london/speakers/david-stutt.jpg"
import zeljkoKozinaAvatar from "../london/speakers/zeljko-kozina.jpg"

import type { EventSession } from "../components/event-schedule-section"

export const PARIS_TIMEZONE = "Europe/Paris"
export const PARIS_TIMEZONE_LABEL = "All times in Paris Time (CET, UTC+1)"

/** Color per topic, picked to read clearly against the cream/dark backgrounds. */
export const tagColors: Record<string, string> = {
  "AI Agents": "#7e66cc",
  Federation: "#FC8251",
  "Schema Evolution": "#cbc749",
  "AWS AppSync": "#36C1A0",
}

export const parisSessions: EventSession[] = [
  {
    id: 6001,
    uuid: "fdf41134-fa71-4bd0-ac52-1f3978252e27",
    title: "Beyond the Query: GraphQL Features That Make Frontends Simpler",
    start: "2026-12-01T11:30:00+01:00",
    end: "2026-12-01T11:55:00+01:00",
    tags: ["GraphQL"],
    description:
      "<p>Fetching data is only the beginning. Some of GraphQL’s most useful features help with what comes next: organizing components, loading another page, keeping the UI in sync after a mutation, and catching mistakes before they reach production.</p><p>At GraphQL Day 2025, I ended my talk with a slide listing everything I didn’t have time to cover. This talk picks up that list: fragments, connections and pagination, mutations and updates, and generated types.</p><p>Through practical examples, we’ll explore how fragments keep data requirements close to the components that use them, how connections bring consistency to pagination, how mutation responses work with normalized caches, and how generated types connect your schema to your application code. We’ll also distinguish what GraphQL provides from what client libraries automate—and where you still need to do the work.</p><p>You’ll leave with concrete patterns for reducing frontend plumbing and making everyday GraphQL development easier.</p>",
    venue: "",
    speakers: [
      {
        id: 6101,
        name: "Aurelien David",
        company: "Pennylane",
        jobtitle: "Engineering Manager",
        avatar: aurelienDavidAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/aurel-spyl/",
          },
        ],
      },
    ],
  },
  {
    id: 6002,
    uuid: "465d0909-30e3-41cc-912f-41cd726338ec",
    title:
      "One to many without breaking anyone: evolving a GraphQL schema with many consumers",
    start: "2026-12-01T14:30:00+01:00",
    end: "2026-12-01T14:55:00+01:00",
    tags: ["GraphQL", "Schema Evolution"],
    description:
      '<p>Changing a field from "one" to "many" sounds trivial until three different consumers depend on it: an admin studio, a GraphQL API used by web and mobile apps, and a public API used by customers\' own integrations. This talk walks through a real migration on an event technology platform, where a single-value relationship became a multi-value, ordered one. We will cover how we designed the new schema alongside the old one, how we kept existing queries working, how we backfilled data safely, and how we decided when a deprecated field could finally go.</p>',
    venue: "",
    speakers: [
      {
        id: 6102,
        name: "Gabriela Colombo",
        company: "Swapcard",
        jobtitle: "Software Engineer II",
        avatar: gabrielaColomboAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/gabrielacolomboalveslongo/",
          },
        ],
      },
    ],
  },
  {
    id: 6003,
    uuid: "4bf424bf-901c-4589-ba92-c508ff9b2723",
    title: "Explaining GraphQL Federation to my non-technical wife",
    start: "2026-12-02T11:20:00+01:00",
    end: "2026-12-02T11:45:00+01:00",
    tags: ["GraphQL", "Federation"],
    description:
      "<p>In this talk, I will explain the core concepts of GraphQL Federation as accessibly as possible. The goal is that you could show this talk to anyone non-technical (such as my wife!) and they'd be able to understand and follow along. Some example topics include what subgraphs and supergraphs are, what entities are, what composition directive are, etc. It will be a fun, interactive (with audience participation!) experience.</p>",
    venue: "",
    speakers: [
      {
        id: 6103,
        name: "David Stutt",
        company: "WunderGraph",
        jobtitle: "Senior Founding Engineer",
        avatar: davidStuttAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/davidstutt/",
          },
        ],
      },
    ],
  },
  {
    id: 6004,
    uuid: "baabec13-619b-4912-991b-d27f5b65da39",
    title:
      "GraphQL Variables Meet JSON Schema: The New Pitfall When AI Agents Call Your API",
    start: "2026-12-02T14:00:00+01:00",
    end: "2026-12-02T14:25:00+01:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>When an MCP server exposes a GraphQL operation as a tool for AI agents, the operation's variables get turned into a JSON Schema, and that schema is what the agent sees. The two type systems look close enough that the translation seems mechanical. It isn't, and the gaps are easy to miss because nothing fails loudly.</p><p>Take a variable with a default value. GraphQL fills in the default when the caller leaves the variable out, but in JSON Schema a default is only a hint, and validators ignore it. Or take Int: GraphQL caps it at 32 bits, while JSON Schema's integer has no limit unless the generator adds one. So which contract is the real one? MCP says servers must validate tool inputs, but not against what.</p><p>We'll go through a set of these cases, look at how a few open-source GraphQL and OpenAPI MCP generators handle them, and work out which gaps a better generator could close, which come with the type systems, and which are decisions someone has to make on purpose. If you're putting a GraphQL API in front of agents, it should help you decide which parts of a generated schema to trust.</p>",
    venue: "",
    speakers: [
      {
        id: 6104,
        name: "Camille Lawrence",
        company: "Apollo GraphQL",
        jobtitle: "Senior Software Engineer",
        avatar: camilleLawrenceAvatar,
        socialurls: [
          {
            service: "linkedin",
            url: "https://www.linkedin.com/in/camillelawrence/",
          },
        ],
      },
    ],
  },
  {
    id: 6005,
    uuid: "5a9c3bf4-aab7-420e-9942-d1aee9b78717",
    title: "GraphQL as the Execution Layer for AI Agents",
    start: "2026-12-02T16:30:00+01:00",
    end: "2026-12-02T16:55:00+01:00",
    tags: ["GraphQL", "AI Agents"],
    description:
      "<p>Your next million API consumers won't be developers. They'll be AI agents. And they don't read documentation, parse hypermedia links, or guess which of your 200 REST endpoints returns the data they need.</p><p>This talk examines what happens when autonomous AI agents become the primary consumers of your API layer. Drawing on real data from Singapore's public government APIs, I'll show how REST responses waste 30–60% of an agent's token budget on structural overhead, and how a typed, self-describing schema changes the equation entirely.</p><p>We'll walk through the three properties that make an API truly agent-native: discoverability, precision, and composability. We'll look at what it would take to unify API estates like Singapore's 3,000+ government APIs across 75+ agencies into a single, self-describing surface. A pattern Gartner expects 30% of enterprises to adopt by 2027.</p><p>You'll leave with a framework for what makes an API truly agent-native, why GraphQL's type system and federation model get you there, and how to start without a rewrite.</p>",
    venue: "",
    speakers: [
      {
        id: 6105,
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
    id: 6006,
    uuid: "8d24ed80-8ebc-4a72-8fea-aad900a18983",
    title: "Houston, We Have a Partial Response: GraphQL Error Handling",
    start: "2026-12-03T10:15:00+01:00",
    end: "2026-12-03T10:40:00+01:00",
    tags: ["GraphQL"],
    description:
      "<p>Your REST instincts are lying to you. In GraphQL the status code is almost always 200, errors travel in an array alongside your data, and one null in the wrong place can wipe out the entire response. Welcome to the partial response: a successful failure.</p><p>We'll work on problems like mission control: how errors propagate and bubble, top-level errors versus errors as data, union result types, and what clients should do when half the payload burns up on re-entry. You'll leave with a clear framework for which errors belong in your schema and which belong in the errors array.</p><p>Failure is not an option. It's a field.</p>",
    venue: "",
    speakers: [
      {
        id: 6106,
        name: "Željko Kozina",
        company: "Chronomill",
        jobtitle: "Technical Architect",
        avatar: zeljkoKozinaAvatar,
        socialurls: [
          { service: "linkedin", url: "https://www.linkedin.com/in/zkozina/" },
        ],
      },
    ],
  },
  {
    id: 6007,
    uuid: "1eee12bd-0f13-4c00-8a60-404ee14ff76f",
    title: "GraphQL with AWS AppSync - Building a Product API at HEMA",
    start: "2026-12-03T12:00:00+01:00",
    end: "2026-12-03T12:25:00+01:00",
    tags: ["GraphQL", "AWS AppSync"],
    description:
      '<p>I will talk about "pioneer phase" of GraphQL adoption at HEMA and using AWS AppSync for the composable commerce migration, where I will share the raw and honest lessons learned when introducing a new tech stack to a 100-year-old Dutch icon.</p>',
    venue: "",
    speakers: [
      {
        id: 6107,
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
      {
        id: 6108,
        name: "Bart Rijksen",
        company: "HEMA",
        jobtitle: "",
        avatar: bartRijksenAvatar,
        socialurls: [],
      },
    ],
  },
]

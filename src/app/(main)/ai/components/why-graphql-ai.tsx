"use client"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import ZapIcon from "@/app/conf/_design-system/pixelarticons/zap.svg?svgr"
import SlidersIcon from "@/app/conf/_design-system/pixelarticons/sliders.svg?svgr"
import { snippetComponents } from "./snippets"
import SelfDescribingSnippet from "./snippets/why-self-describing.mdx"
import StronglyTypedSnippet from "./snippets/why-strongly-typed.mdx"
import ComposableSnippet from "./snippets/why-composable.mdx"

const benefits = [
  {
    title: "Self-describing",
    eyebrow: "Introspection",
    icon: SearchIcon,
    description:
      "Every GraphQL API ships with a built-in type system. AI agents query `__schema` and immediately understand what data is available, what arguments each field accepts, and how types relate — no hand-written tool descriptions needed.",
    Snippet: SelfDescribingSnippet,
    bullets: [
      "Auto-generated tool definitions for LLMs",
      "Agents discover capabilities at runtime",
      "Generate an MCP server from the schema, not beside it",
    ],
  },
  {
    title: "Strongly typed",
    eyebrow: "Type Safety",
    icon: ZapIcon,
    description:
      "Every field has a known, validated type. LLMs can reason about inputs and outputs with confidence. A wrong guess comes back as a named validation error the agent can correct, rather than a 200 with the wrong data in it.",
    Snippet: StronglyTypedSnippet,
    bullets: [
      "LLMs understand data shapes natively",
      "Validated responses prevent parsing errors",
      "Type system reduces hallucinated API interactions",
    ],
  },
  {
    title: "Composable",
    eyebrow: "Flexibility",
    icon: SlidersIcon,
    description:
      "Request exactly what you need, nothing more. GraphQL lets AI agents compose precise queries on the fly — requesting nested data, using aliases, and applying filters. One endpoint serves any data access pattern without client-side stitching.",
    Snippet: ComposableSnippet,
    bullets: [
      "Response size tracks the query, not the endpoint",
      "Dynamic query composition by AI agents",
      "One endpoint serves any access pattern the schema allows",
    ],
  },
]

export function WhyGraphQLAI() {
  return (
    <section className="gql-container gql-section lg:py-16 xl:py-24">
      <SectionLabel className="mb-6">Why GraphQL for AI</SectionLabel>
      <h2 className="typography-h2 mb-2 lg:mb-4">
        Built for machines
        <br />
        to understand
      </h2>
      <p className="typography-body-lg mb-8 max-w-2xl text-pretty text-neu-800 lg:mb-16">
        GraphQL was designed from day one to be machine-readable. Its
        introspection system, type safety and composability were built for
        tooling and clients, and they turn out to be what an agent needs to work
        out what an API offers and ask for part of it.
      </p>

      <div className="grid gap-px bg-neu-200 dark:bg-neu-100 lg:grid-cols-3">
        {benefits.map(benefit => (
          <div
            key={benefit.eyebrow}
            className="flex flex-col bg-neu-0 p-6 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0 xl:px-10"
          >
            <div className="flex items-center gap-3">
              <benefit.icon className="size-6 text-pri-base" />
              <span className="typography-body-sm w-fit bg-sec-light px-2 py-0.5 font-medium dark:bg-sec-darker">
                {benefit.eyebrow}
              </span>
            </div>
            <h3 className="typography-h3 mt-4">{benefit.title}</h3>
            <p className="typography-body-md mt-4 text-pretty text-neu-800">
              {benefit.description}
            </p>

            <div className="mt-5">
              <benefit.Snippet components={snippetComponents} />
            </div>

            <ul className="typography-body-sm mt-auto flex flex-col gap-2 pt-5">
              {benefit.bullets.map(bullet => (
                <li key={bullet} className="flex items-start gap-1.5">
                  <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-pri-base dark:text-pri-lighter" />
                  <span className="text-neu-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

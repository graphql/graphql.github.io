"use client"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import ZapIcon from "@/app/conf/_design-system/pixelarticons/zap.svg?svgr"
import SlidersIcon from "@/app/conf/_design-system/pixelarticons/sliders.svg?svgr"
import {
  highlightGraphQL,
  highlightGraphQLSchema,
  SYNTAX_CSS,
} from "./syntax-highlight"

const benefits = [
  {
    title: "Self-describing",
    eyebrow: "Introspection",
    icon: SearchIcon,
    description:
      "Every GraphQL API ships with a built-in type system. AI agents query `__schema` and immediately understand what data is available, what arguments each field accepts, and how types relate — no hand-written tool descriptions needed.",
    bullets: [
      "Auto-generated tool definitions for LLMs",
      "Agents discover capabilities at runtime",
      "Zero-config MCP server from any GraphQL endpoint",
    ],
    code: `# Agent introspects your API
query {
  __schema {
    types {
      name
      fields {
        name
      }
    }
  }
}`,
    highlight: highlightGraphQL as (s: string) => string,
  },
  {
    title: "Strongly typed",
    eyebrow: "Type Safety",
    icon: ZapIcon,
    description:
      "Every field has a known, validated type. LLMs can reason about inputs and outputs with confidence. Structured, predictable responses eliminate parsing errors and prevent hallucinated API calls that plague unstructured REST endpoints.",
    bullets: [
      "LLMs understand data shapes natively",
      "Validated responses prevent parsing errors",
      "Type system reduces hallucinated API interactions",
    ],
    code: `# Every field has a known type
type Query {
  human(id: ID!): Human
}
type Human {
  name: String!
  height(unit: Unit): Float
}`,
    highlight: highlightGraphQLSchema as (s: string) => string,
  },
  {
    title: "Composable",
    eyebrow: "Flexibility",
    icon: SlidersIcon,
    description:
      "Request exactly what you need, nothing more. GraphQL lets AI agents compose precise queries on the fly — requesting nested data, using aliases, and applying filters. One endpoint serves any data access pattern without client-side stitching.",
    bullets: [
      "Up to 90% less token usage vs equivalent REST",
      "Dynamic query composition by AI agents",
      "Single endpoint replaces dozens of REST routes",
    ],
    code: `# Agent fetches related data in 1 call
{
  human(id: "1000") {
    name
    friends {
      name
      starships {
        name
      }
    }
  }
}`,
    highlight: highlightGraphQL as (s: string) => string,
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
        introspection system, type safety, and composability are the same
        properties that make it the ideal protocol for AI-agent-to-API
        communication.
      </p>

      <style dangerouslySetInnerHTML={{ __html: SYNTAX_CSS }} />
      <div className="grid gap-px bg-neu-200 dark:bg-neu-100 lg:grid-cols-3">
        {benefits.map(benefit => (
          <div
            key={benefit.eyebrow}
            className="flex flex-col bg-neu-0 p-6 lg:p-8 xl:p-10"
          >
            <div className="flex items-center gap-3">
              <benefit.icon className="size-6 text-pri-base" />
              <span className="typography-body-sm w-fit bg-sec-light px-2 py-0.5 font-medium dark:bg-sec-darker">
                {benefit.eyebrow}
              </span>
            </div>
            <h3 className="typography-h3 mt-4">{benefit.title}</h3>
            <p className="typography-body-md mt-4 flex-1 text-pretty text-neu-800">
              {benefit.description}
            </p>

            {/* Code preview */}
            <div className="mt-5 overflow-hidden rounded-lg border border-neu-200 bg-[#1e1e2e] dark:border-neu-100">
              <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{
                    __html: benefit.highlight(benefit.code),
                  }}
                />
              </pre>
            </div>

            <ul className="typography-body-sm mt-5 flex flex-col gap-2">
              {benefit.bullets.map(bullet => (
                <li key={bullet} className="flex items-start gap-1.5">
                  <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-pri-base" />
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

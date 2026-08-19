"use client"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import CodeIcon from "@/app/conf/_design-system/pixelarticons/code.svg?svgr"
import PlayIcon from "@/app/conf/_design-system/pixelarticons/play.svg?svgr"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import { snippetComponents } from "./snippets"
import PromptSnippet from "./snippets/step-prompt.mdx"
import IntrospectionSnippet from "./snippets/step-introspection.mdx"
import QuerySnippet from "./snippets/step-query.mdx"
import ResponseSnippet from "./snippets/step-response.mdx"

const steps = [
  {
    number: "01",
    title: "Agent receives a task",
    icon: PlayIcon,
    description:
      'A user gives an AI agent a natural language instruction — "Show me Q4 revenue by region." The agent needs to access business data through an API to fulfill this request.',
    Snippet: PromptSnippet,
  },
  {
    number: "02",
    title: "Agent introspects the API",
    icon: SearchIcon,
    description:
      "Using GraphQL introspection, the agent queries `__schema` and discovers the available types: `Product`, `Order`, `Region`, `RevenueMetrics`. It learns field names, arguments, and relationships automatically.",
    Snippet: IntrospectionSnippet,
  },
  {
    number: "03",
    title: "Agent composes a query",
    icon: CodeIcon,
    description:
      "The LLM maps the user's intent to the discovered schema. It constructs a precise GraphQL query that fetches exactly the right data — revenue by region, top 5 categories, all in a single request — with no over-fetching.",
    Snippet: QuerySnippet,
  },
  {
    number: "04",
    title: "Structured response returned",
    icon: CheckIcon,
    description:
      "The API returns typed JSON matching the shape of the query. The server validates every field before it responds. A nullable field can still resolve to null with an entry in `errors`, but the agent knows the shape in advance, so it handles a partial result rather than having to detect one.",
    Snippet: ResponseSnippet,
  },
]

export function HowItWorks() {
  return (
    <section className="overflow-hidden bg-neu-50 dark:bg-neu-50/25">
      <div className="gql-container gql-section lg:py-16 xl:py-24">
        <SectionLabel className="mb-6">How it works</SectionLabel>
        <h2 className="typography-h2 mb-2 lg:mb-4">
          From natural language
          <br />
          to structured data
        </h2>
        <p className="typography-body-lg mb-8 max-w-2xl text-pretty text-neu-800 lg:mb-16">
          Here&apos;s what happens when an AI agent uses a GraphQL API to answer
          a real business question — from initial request to typed response.
        </p>

        <div className="grid gap-px bg-neu-200 dark:bg-neu-100 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col bg-neu-50 p-5 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0 xl:px-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="typography-d1 font-bold leading-none text-pri-base/15">
                  {step.number}
                </span>
                <step.icon className="size-6 shrink-0 text-pri-base" />
              </div>

              <h3 className="typography-h4 mt-3">{step.title}</h3>
              <p className="typography-body-sm mt-2 flex-1 text-pretty text-neu-700">
                {step.description}
              </p>

              <div className="mt-4 *:bg-neu-0">
                <step.Snippet components={snippetComponents} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

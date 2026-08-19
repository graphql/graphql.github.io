import { clsx } from "clsx"

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
      "The response is JSON in the query's shape. A nullable field can still come back null with an `errors` entry, but the agent already knows the shape, so it can use a partial result as-is.",
    Snippet: ResponseSnippet,
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-neu-50 dark:bg-neu-50/25"
    >
      <div className="gql-container gql-section pb-0 lg:pb-0 lg:pt-16 xl:pb-0 xl:pt-24">
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
      </div>

      <div className="border-y border-neu-200 dark:border-neu-50">
        <div className="gql-container px-4 lg:px-12 xl:px-24 3xl:px-[240px]">
          <div className="grid grid-cols-1 gap-x-px border-x border-neu-200 bg-neu-200 dark:border-neu-50 dark:bg-neu-50 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={clsx(
                  "row-span-4 grid min-w-0 grid-cols-1 grid-rows-subgrid overflow-hidden bg-neu-50 dark:bg-[#181914]",
                  "border-b border-neu-200 dark:border-neu-50 lg:border-b-0",
                  i === steps.length - 1 && "max-sm:border-b-0",
                  i >= 2 && "sm:max-lg:border-b-0",
                )}
              >
                <div className="flex items-center justify-between gap-3 px-4 pt-5 sm:px-5">
                  <span className="typography-d1 font-bold leading-none text-pri-base/15 dark:text-pri-base/20">
                    {step.number}
                  </span>
                  <step.icon className="size-6 shrink-0 text-pri-base dark:text-pri-light" />
                </div>

                <h3 className="typography-h4 text-balance px-4 pt-3 sm:px-5">
                  {step.title}
                </h3>

                <p className="typography-body-sm text-pretty px-4 pb-4 pt-2 text-neu-700 sm:px-5">
                  {step.description}
                </p>

                <div
                  className={clsx(
                    "min-w-0 *:bg-neu-0 [&>div>div:first-child]:rounded-none [&>div>div:first-child]:border-x-0 [&_.pre]:rounded-none [&_code]:text-xs [&_pre]:rounded-none [&_pre]:border-x-0 [&_pre]:text-xs",
                    "lg:flex lg:h-full lg:flex-col lg:[&>div]:flex lg:[&>div]:min-h-0 lg:[&>div]:flex-1 lg:[&>div]:flex-col lg:[&_pre]:min-h-0 lg:[&_pre]:flex-1",
                  )}
                >
                  <step.Snippet components={snippetComponents} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

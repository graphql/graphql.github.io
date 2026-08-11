"use client"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import { Button } from "@/app/conf/_design-system/button"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import MCPIcon from "@/app/conf/_design-system/pixelarticons/modem.svg?svgr"
import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import CodeIcon from "@/app/conf/_design-system/pixelarticons/code.svg?svgr"
import { snippetComponents } from "./snippets"
import McpSnippet from "./snippets/use-case-mcp.mdx"
import RagSnippet from "./snippets/use-case-rag.mdx"
import AgentsSnippet from "./snippets/use-case-agents.mdx"

const useCases = [
  {
    icon: MCPIcon,
    title: "MCP Servers",
    description:
      "Build Model Context Protocol servers powered by GraphQL. Every query, mutation, and subscription becomes an auto-discoverable tool. Zero hand-written tool definitions — the schema is the contract.",
    bullets: [
      "Auto-generate tool definitions from schema",
      "Type-safe inputs and structured outputs",
      "One MCP server exposes your entire API surface",
    ],
    Snippet: McpSnippet,
    href: "/blog/2025-10-14-announcing-ai-wg/",
    cta: "Join the AI Working Group",
  },
  {
    icon: SearchIcon,
    title: "RAG Applications",
    description:
      "Power Retrieval-Augmented Generation with GraphQL. Query your knowledge base with precision — fetch documents, embeddings, and cross-references in a single request. No more REST pagination + client-side merging.",
    bullets: [
      "Fetch documents + embeddings in one call",
      "Join data across collections and sources",
      "Minimize context window waste with field selection",
    ],
    Snippet: RagSnippet,
    href: "/resources/ai",
    cta: "Explore AI resources",
  },
  {
    icon: CodeIcon,
    title: "AI Agents & Tool Calling",
    description:
      "Give AI agents structured, type-safe access to your data layer. GraphQL's query composition lets LLMs build complex, multi-step data fetches in a single round-trip — calling multiple services, filtering, and aggregating.",
    bullets: [
      "Agents compose queries at inference time",
      "Real-time subscriptions for streaming agents",
      "Single endpoint for all data operations",
    ],
    Snippet: AgentsSnippet,
    href: "/blog/2025-07-03-graphql-supercharging-ai/",
    cta: "Read the blog post",
  },
]

export function UseCases() {
  return (
    <section className="gql-container gql-section lg:py-16 xl:py-24">
      <SectionLabel className="mb-6">Use cases</SectionLabel>
      <h2 className="typography-h2 mb-2 lg:mb-4">
        GraphQL powers
        <br />
        the AI stack
      </h2>
      <p className="typography-body-lg mb-8 max-w-2xl text-pretty text-neu-800 lg:mb-16">
        From MCP servers to RAG pipelines to autonomous agents, GraphQL is
        already the protocol of choice for connecting AI systems to real data.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {useCases.map(useCase => (
          <div
            key={useCase.title}
            className="flex flex-col rounded-xl border border-neu-200 bg-neu-0 p-6 transition-shadow hover:shadow-lg dark:border-neu-100 lg:p-7"
          >
            <div className="flex items-center gap-3">
              <useCase.icon className="size-7 text-pri-base" />
              <h3 className="typography-h4">{useCase.title}</h3>
            </div>
            <p className="typography-body-md mt-3 flex-1 text-pretty text-neu-800">
              {useCase.description}
            </p>

            {/* Code example */}
            <div className="mt-5">
              <useCase.Snippet components={snippetComponents} />
            </div>

            <ul className="typography-body-sm mt-5 flex flex-col gap-1.5">
              {useCase.bullets.map(bullet => (
                <li
                  key={bullet}
                  className="flex items-start gap-1.5 text-neu-700"
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-pri-base" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5">
              <Button href={useCase.href} variant="secondary" size="md">
                {useCase.cta}
                <ArrowDownIcon className="size-4 shrink-0 -rotate-90 text-neu-900" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

"use client"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import {
  highlightGraphQLSchema,
  highlightGraphQL,
  highlightJSON,
  SYNTAX_CSS,
} from "./syntax-highlight"

const schemaWithDocs = `"""A product in the catalog."""
type Product {
  """Human-readable display name."""
  name: String!

  """Price in minor units (cents)."""
  price: Int!

  """Units in stock. 0 means unavailable."""
  stock: Int!
}

type Query {
  """Full-text search across the catalog."""
  products(query: String!): [Product!]!
}`

const introspectionQuery = `{
  __type(name: "Product") {
    description
    fields {
      name
      description
    }
  }
}`

const introspectionResponse = `{
  "__type": {
    "description": "A product in the catalog.",
    "fields": [
      { "name": "name",  "description": "Human-readable display name." },
      { "name": "price", "description": "Price in minor units (cents)." },
      { "name": "stock", "description": "Units in stock. 0 means unavailable." }
    ]
  }
}`

const stats = [
  {
    label: "Token reduction",
    graphQL: "90%",
    graphQLDesc: "fewer tokens",
    rest: "10× more",
    restDesc: "token waste",
    explanation:
      "GraphQL lets AI agents request only the fields they need. REST endpoints return fixed payloads — often 10x the data an LLM actually needs to process. Every extra token costs money and context window space.",
  },
  {
    label: "API calls per task",
    graphQL: "1",
    graphQLDesc: "single request",
    rest: "3–7",
    restDesc: "sequential calls",
    explanation:
      "GraphQL's composability means agents can fetch nested, related data in one query. REST requires multiple endpoints, forcing agents to make sequential calls and stitch responses client-side.",
  },
  {
    label: "Tool definitions",
    graphQL: "0",
    graphQLDesc: "auto-discovered",
    rest: "3",
    restDesc: "files to wire",
    explanation:
      "REST frameworks can auto-generate OpenAPI, so this isn't about hand-writing schemas. The edge is plug-and-play: GraphQL's introspection and per-field, per-type, and per-query documentation are built into the spec and discoverable from one endpoint. With REST, an agent needs the API, its schema, and an instruction file (AGENT.md) — and you must point it to each. One GraphQL schema replaces all three.",
  },
  {
    label: "Type safety",
    graphQL: "100%",
    graphQLDesc: "typed responses",
    rest: "100%",
    restDesc: "if used with correct tooling",
    explanation:
      "Both are typed — OpenAPI gives REST schemas too. The real difference for agents is traversal: one GraphQL query follows relationships across types, so an agent never needs to hold the entire type graph in context at once. REST splits data across endpoints, forcing agents to remember deep, nested relationships to compose what one field resolves.",
  },
]

export function ByTheNumbers() {
  return (
    <section className="gql-container gql-section lg:py-12 xl:py-16">
      <SectionLabel className="mb-6">By the numbers</SectionLabel>
      <h2 className="typography-h2 mb-2 lg:mb-4">GraphQL vs REST for AI</h2>
      <p className="typography-body-lg mb-6 max-w-2xl text-pretty text-neu-800">
        Where GraphQL pays off when AI agents talk to your API.
      </p>
      {/* Mobile: compact stacked panels */}
      <div className="md:hidden">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="border-b border-neu-200 py-3 last:border-b-0 dark:border-neu-100"
          >
            <p className="typography-body-sm font-medium text-neu-900">
              {stat.label}
            </p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="typography-body-sm font-medium text-sec-dark">
                {stat.graphQL}{" "}
                <span className="typography-body-xs text-neu-600">
                  {stat.graphQLDesc}
                </span>
              </span>
              <span className="typography-body-xs text-neu-400">vs</span>
              <span className="typography-body-sm text-neu-500">
                {stat.rest}{" "}
                <span className="typography-body-xs text-neu-400">
                  {stat.restDesc}
                </span>
              </span>
            </div>
            <p className="typography-body-xs mt-1 text-pretty text-neu-600">
              {stat.explanation}
            </p>
          </div>
        ))}
      </div>
      {/* Desktop: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-neu-200 dark:border-neu-100">
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-neu-500">
                Metric
              </th>
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-sec-dark">
                GraphQL
              </th>
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-neu-500">
                REST
              </th>
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-neu-500">
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr
                key={stat.label}
                className="border-b border-neu-200 align-top dark:border-neu-100"
              >
                <th
                  scope="row"
                  className="typography-body-sm whitespace-nowrap px-4 py-3 font-medium text-neu-900"
                >
                  {stat.label}
                </th>
                <td className="typography-body-sm whitespace-nowrap px-4 py-3 font-medium text-sec-dark">
                  {stat.graphQL}
                  <span className="typography-body-xs mt-0.5 block text-neu-600">
                    {stat.graphQLDesc}
                  </span>
                </td>
                <td className="typography-body-sm whitespace-nowrap px-4 py-3 text-neu-500">
                  {stat.rest}
                  <span className="typography-body-xs mt-0.5 block text-neu-400">
                    {stat.restDesc}
                  </span>
                </td>
                <td className="typography-body-sm text-pretty px-4 py-3 text-neu-700">
                  {stat.explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="typography-body-xs mt-3 text-neu-500">
        Both protocols are typed; the gap is in traversal and discoverability,
        not in whether types exist.
      </p>

      {/* Documentation is part of the schema, queryable via introspection */}
      <div className="mt-10">
        <h3 className="typography-h3 mb-2">
          Docs live in the schema — and agents can query them
        </h3>
        <p className="typography-body-md mb-6 max-w-3xl text-pretty text-neu-700">
          Descriptions written with{" "}
          <code className="rounded bg-neu-100 px-1 py-0.5 font-mono text-sm text-neu-800 dark:bg-neu-100/80">
            """
          </code>{" "}
          are stored on the type and every field. An agent reads them back with
          the built-in{" "}
          <code className="rounded bg-neu-100 px-1 py-0.5 font-mono text-sm text-neu-800 dark:bg-neu-100/80">
            __type
          </code>{" "}
          introspection query — no separate docs file or AGENT.md to point it
          to.
        </p>
        <style dangerouslySetInnerHTML={{ __html: SYNTAX_CSS }} />
        <div className="grid gap-px overflow-hidden rounded-xl border border-neu-200 bg-neu-200 dark:border-neu-100 dark:bg-neu-100 lg:grid-cols-3">
          <CodePane
            label="Schema (with embedded docs)"
            code={schemaWithDocs}
            highlight={highlightGraphQLSchema}
          />
          <CodePane
            label="Introspection query"
            code={introspectionQuery}
            highlight={highlightGraphQL}
          />
          <CodePane
            label="Response (docs returned)"
            code={introspectionResponse}
            highlight={highlightJSON}
          />
        </div>
      </div>
    </section>
  )
}

function CodePane({
  label,
  code,
  highlight,
}: {
  label: string
  code: string
  highlight: (source: string) => string
}) {
  return (
    <div className="bg-[#1e1e2e]">
      <div className="border-b border-neu-100/10 px-3 py-1.5">
        <span className="font-mono text-[11px] text-[#6c7086]">{label}</span>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-relaxed">
        <code
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </pre>
    </div>
  )
}

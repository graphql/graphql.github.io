"use client"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import { Anchor } from "@/app/conf/_design-system/anchor"
import { snippetComponents } from "./snippets"
import SchemaSnippet from "./snippets/numbers-schema.mdx"
import IntrospectionSnippet from "./snippets/numbers-introspection.mdx"
import ResponseSnippet from "./snippets/numbers-response.mdx"

const stats = [
  {
    label: "Discovery",
    graphQL: "Introspection",
    graphQLDesc: "from the endpoint itself",
    rest: "OpenAPI document",
    restDesc: "published alongside",
    explanation:
      "Most REST frameworks generate an OpenAPI document from the code, so this is not about hand-writing a schema. The difference is that introspection is part of the GraphQL spec and answers on the same endpoint the agent already calls, with no second artifact to locate or keep in sync.",
  },
  {
    label: "Response shape",
    graphQL: "The query names the fields",
    graphQLDesc: "caller decides",
    rest: "The endpoint decides",
    restDesc: "sparse fieldsets optional",
    explanation:
      "A GraphQL response contains the fields the query asked for. A REST endpoint returns its payload, and narrowing it means a sparse-fieldset convention or another endpoint. An agent pays for the difference in context window.",
  },
  {
    label: "Traversal",
    graphQL: "One query, many types",
    graphQLDesc: "follows relationships",
    rest: "One endpoint per resource",
    restDesc: "client stitches",
    explanation:
      "A GraphQL query walks relationships across types, so the agent never has to hold the whole type graph in context at once. With REST the relationships live in the agent's head, and it composes the result itself.",
  },
  {
    label: "Documentation",
    graphQL: "On types and fields",
    graphQLDesc: "returned by introspection",
    rest: "In the spec document",
    restDesc: "plus an instructions file",
    explanation:
      "Descriptions attach to the type, every field and every argument, and come back through the same introspection call. There is no separate docs file to point the agent at.",
  },
]

export function ByTheNumbers() {
  return (
    <section className="gql-container gql-section lg:py-12 xl:py-16">
      <SectionLabel className="mb-6">GraphQL and REST</SectionLabel>
      <h2 className="typography-h2 mb-2 lg:mb-4">
        What changes when the API describes itself
      </h2>
      <p className="typography-body-lg mb-6 max-w-2xl text-pretty text-neu-800">
        Both can be typed and both can be documented. The difference is where
        that description lives, and how much of it an agent has to carry.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="max-md:sr-only">
            <tr className="border-b border-neu-200 dark:border-neu-100">
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-neu-500">
                Property
              </th>
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-sec-dark">
                GraphQL
              </th>
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-neu-500">
                REST + OpenAPI
              </th>
              <th className="typography-body-xs px-4 py-3 font-medium uppercase tracking-wider text-neu-500">
                Why
              </th>
            </tr>
          </thead>
          <tbody className="max-md:block">
            {stats.map(stat => (
              <tr
                key={stat.label}
                className="border-b border-neu-200 align-top dark:border-neu-100 max-md:block max-md:py-3"
              >
                <th
                  scope="row"
                  className="typography-body-sm px-4 py-3 text-left font-medium text-neu-900 max-md:block max-md:py-0 md:whitespace-nowrap"
                >
                  {stat.label}
                </th>
                <td className="typography-body-sm px-4 py-3 font-medium text-sec-dark max-md:block max-md:py-0 md:whitespace-nowrap">
                  <span className="typography-body-xs mr-1 uppercase tracking-wider text-neu-500 md:hidden">
                    GraphQL
                  </span>
                  {stat.graphQL}
                  <span className="typography-body-xs text-neu-600 max-md:ml-1 md:mt-0.5 md:block">
                    {stat.graphQLDesc}
                  </span>
                </td>
                <td className="typography-body-sm px-4 py-3 text-neu-500 max-md:block max-md:py-0 md:whitespace-nowrap">
                  <span className="typography-body-xs mr-1 uppercase tracking-wider text-neu-500 md:hidden">
                    REST
                  </span>
                  {stat.rest}
                  <span className="typography-body-xs text-neu-400 max-md:ml-1 md:mt-0.5 md:block">
                    {stat.restDesc}
                  </span>
                </td>
                <td className="typography-body-sm text-pretty px-4 py-3 text-neu-700 max-md:block max-md:pt-1">
                  {stat.explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="typography-body-xs mt-3 text-neu-500">
        Both protocols are typed, and both can describe themselves. The gap is
        in traversal and discoverability, not in whether types exist. Where a
        task maps cleanly onto one purpose-built endpoint, REST is the simpler
        thing for an agent to call.
      </p>

      <div className="mt-6 border-l-2 border-neu-200 pl-4 dark:border-neu-100">
        <p className="typography-body-sm max-w-3xl text-pretty text-neu-700">
          The public numbers we can point at come from Apollo, who report{" "}
          <Anchor
            href="https://www.apollographql.com/blog/smart-schema-discovery-how-apollo-mcp-server-maximizes-ai-context-efficiency"
            className="underline"
          >
            around 40% less schema context and 40–75% fewer tool calls
          </Anchor>{" "}
          when an MCP server exposes a curated set of operations instead of a
          whole schema. Those are Apollo&apos;s own measurements of their own
          server, not an independent benchmark, and they describe tool selection
          rather than GraphQL against REST.
        </p>
        <p className="typography-body-sm mt-2 max-w-3xl text-pretty text-neu-700">
          If you have reproducible figures for agents against a GraphQL API, the{" "}
          <Anchor href="https://github.com/graphql/ai-wg" className="underline">
            AI Working Group
          </Anchor>{" "}
          would like to see them, and this page will cite them.
        </p>
      </div>

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
        <div className="grid gap-4 lg:grid-cols-3">
          <SchemaSnippet components={snippetComponents} />
          <IntrospectionSnippet components={snippetComponents} />
          <ResponseSnippet components={snippetComponents} />
        </div>
      </div>
    </section>
  )
}

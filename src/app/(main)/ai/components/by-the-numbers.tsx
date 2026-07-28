"use client"

import { useState, useEffect, useRef } from "react"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import ArrowUpIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

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
    restDesc: "via OpenAPI",
    explanation:
      "Both are typed — OpenAPI gives REST schemas too. The real difference for agents is traversal: one GraphQL query follows relationships across types, so an agent never needs to hold the entire type graph in context at once. REST splits data across endpoints, forcing agents to remember deep, nested relationships to compose what one field resolves.",
  },
]

export function ByTheNumbers() {
  return (
    <section className="gql-container gql-section lg:py-16 xl:py-24">
      <SectionLabel className="mb-6">By the numbers</SectionLabel>
      <h2 className="typography-h2 mb-2 lg:mb-4">GraphQL vs REST for AI</h2>
      <p className="typography-body-lg mb-8 max-w-2xl text-pretty text-neu-800 lg:mb-16">
        When AI agents interact with APIs, the protocol matters. Here&apos;s how
        GraphQL compares to traditional REST APIs across the metrics that
        directly impact LLM efficiency and accuracy.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(stat => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const [animated, setAnimated] = useState(false)
  const [gqlCount, setGqlCount] = useState(0)
  const [restCount, setRestCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!animated) return

    const gqlTarget =
      stat.graphQL === "90%"
        ? 90
        : stat.graphQL === "0"
          ? 0
          : stat.graphQL === "100%"
            ? 100
            : parseInt(stat.graphQL) || 1
    const restTarget =
      stat.rest === "10× more"
        ? 10
        : stat.rest === "3–7"
          ? 5
          : stat.rest === "3"
            ? 3
            : stat.rest === "100%"
              ? 100
              : parseInt(stat.rest) || 0

    const gqlMax = Math.max(gqlTarget, 1)
    const restMax = Math.max(restTarget, 1)

    const duration = 1200
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setGqlCount(Math.round(gqlTarget * eased))
      setRestCount(Math.round(restMax * eased))

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [animated, stat.graphQL, stat.rest])

  return (
    <div
      ref={ref}
      className="group rounded-xl border border-neu-200 bg-neu-0 p-6 transition-shadow hover:shadow-md dark:border-neu-100 lg:p-7"
    >
      <h3 className="typography-h4 text-center">{stat.label}</h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* GraphQL side */}
        <div className="text-center">
          <p className="typography-body-xs font-medium uppercase tracking-wider text-neu-500">
            GraphQL
          </p>
          <p className="typography-d1 mt-1 font-bold leading-none text-sec-dark">
            {animated ? gqlCount : 0}
            {stat.graphQL === "90%" || stat.graphQL === "100%"
              ? "%"
              : stat.graphQL === "0"
                ? ""
                : ""}
          </p>
          <p className="typography-body-xs mt-1 text-neu-600">
            {stat.graphQLDesc}
          </p>
        </div>

        {/* REST side */}
        <div className="text-center">
          <p className="typography-body-xs font-medium uppercase tracking-wider text-neu-500">
            REST
          </p>
          <p className="typography-d1 mt-1 font-bold leading-none text-neu-400">
            {animated ? restCount : 0}
            {stat.rest === "10× more"
              ? "×"
              : stat.rest === "3"
                ? ""
                : stat.rest === "3–7"
                  ? ""
                  : stat.rest === "100%"
                    ? "%"
                    : ""}
          </p>
          <p className="typography-body-xs mt-1 text-neu-500">
            {stat.restDesc}
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neu-100 dark:bg-neu-100/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sec-base to-sec-dark transition-all duration-1000 ease-out"
          style={{
            width: animated
              ? stat.graphQL === "90%"
                ? "90%"
                : stat.graphQL === "0"
                  ? "5%"
                  : stat.graphQL === "100%"
                    ? "95%"
                    : "50%"
              : "0%",
          }}
        />
      </div>

      <p className="typography-body-sm mt-4 text-pretty text-neu-700">
        <span className="font-medium text-neu-900">Why: </span>
        {stat.explanation}
      </p>

      {/* Advantage callout */}
      <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-sec-light/20 px-3 py-2 dark:bg-sec-darker/20">
        <ArrowUpIcon className="size-3.5 shrink-0 rotate-180 text-sec-dark" />
        <span className="typography-body-xs font-medium text-sec-dark">
          GraphQL advantage:{" "}
          {stat.graphQL === "90%"
            ? "~10× token savings"
            : stat.graphQL === "1"
              ? "single round-trip"
              : stat.graphQL === "0"
                ? "zero-config"
                : "graph traversal"}
        </span>
      </div>
    </div>
  )
}

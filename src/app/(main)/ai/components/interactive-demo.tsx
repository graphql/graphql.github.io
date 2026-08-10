"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { graphql } from "graphql"
import { StarWarsSchema } from "@/components/interactive-code-block/swapi-schema"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import SparklesIcon from "@/app/conf/_design-system/pixelarticons/zap.svg?svgr"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import SearchIcon from "@/app/conf/_design-system/pixelarticons/search.svg?svgr"
import CodeIcon from "@/app/conf/_design-system/pixelarticons/code.svg?svgr"
import CloseIcon from "@/app/conf/_design-system/pixelarticons/close.svg?svgr"
import { highlightGraphQL, highlightJSON, SYNTAX_CSS } from "./syntax-highlight"

/* ─────────────────────────────────────────────
   Demo data
   ───────────────────────────────────────────── */

type DemoPrompt = {
  id: string
  prompt: string
  icon: string
  query: string
  explanation: string
  discoveredTypes: string[]
}

const demoPrompts: DemoPrompt[] = [
  {
    id: "all-characters",
    prompt: "Find all Star Wars characters",
    icon: "👥",
    query: `{
  allHumans: __type(name: "Human") {
    name
  }
  search(text: "") {
    ... on Human {
      name
      height
      appearsIn
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}`,
    explanation:
      "The AI used introspection to discover the Human, Droid, and Starship types, then composed a single query with inline fragments to fetch across all types — one request instead of three.",
    discoveredTypes: ["Human", "Droid", "Starship"],
  },
  {
    id: "luke-friends",
    prompt: "Show me Luke's friends and their starships",
    icon: "🚀",
    query: `{
  human(id: "1000") {
    name
    friends {
      name
      ... on Human {
        starships {
          name
        }
      }
    }
  }
}`,
    explanation:
      "The AI followed the schema relationships: human → friends → Character. It used an inline fragment to conditionally fetch starships only when the friend is a Human, showing how GraphQL handles polymorphic types naturally.",
    discoveredTypes: ["Human", "Character", "Starship"],
  },
  {
    id: "r2-c3po",
    prompt: "What movies did R2-D2 and C-3PO appear in?",
    icon: "🤖",
    query: `{
  r2d2: droid(id: "2001") {
    name
    appearsIn
  }
  c3po: droid(id: "2000") {
    name
    appearsIn
  }
}`,
    explanation:
      "Using GraphQL aliases, the AI fetched both droids in a single request — no over-fetching, no multiple API calls. Each alias produces a separately keyed result for easy processing.",
    discoveredTypes: ["Droid", "Episode"],
  },
  {
    id: "tallest",
    prompt: "Find the tallest Star Wars character",
    icon: "📏",
    query: `{
  search(text: "") {
    ... on Human {
      name
      height
    }
  }
}`,
    explanation:
      "The AI requested only the fields it needs (name, height) from the Human type. This minimized payload — no unnecessary starship or planet data was transferred, unlike a typical REST endpoint.",
    discoveredTypes: ["Human"],
  },
  {
    id: "starships-feet",
    prompt: "Compare starship lengths in meters and feet",
    icon: "📐",
    query: `{
  search(text: "") {
    ... on Starship {
      name
      lengthInMeters: length
      lengthInFeet: length(unit: FOOT)
    }
  }
}`,
    explanation:
      "The AI discovered the `length` field, then used field arguments and aliases to compute both units in one query. No client-side conversion needed — the schema handles it server-side via GraphQL arguments.",
    discoveredTypes: ["Starship"],
  },
  {
    id: "heroes",
    prompt: "Show me the hero of each episode and their friends",
    icon: "⚔️",
    query: `{
  newHope: hero(episode: NEWHOPE) {
    name
    friends { name }
  }
  empire: hero(episode: EMPIRE) {
    name
    friends { name }
  }
  jedi: hero(episode: JEDI) {
    name
    friends { name }
  }
}`,
    explanation:
      "The AI composed three parallel queries using aliases and the `episode` argument. All three datasets return in a single network round-trip — REST would typically need 3+ sequential calls.",
    discoveredTypes: ["Character", "Episode"],
  },
]

/* ─────────────────────────────────────────────
   Step state machine
   ───────────────────────────────────────────── */

type Step =
  | { kind: "idle" }
  | { kind: "introspecting"; prompt: DemoPrompt }
  | { kind: "types-discovered"; prompt: DemoPrompt }
  | { kind: "composing"; prompt: DemoPrompt; chars: number }
  | { kind: "executing"; prompt: DemoPrompt; query: string }
  | { kind: "result"; prompt: DemoPrompt; query: string; result: string }

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

export function InteractiveDemo() {
  const [step, setStep] = useState<Step>({ kind: "idle" })
  const [isRunning, setIsRunning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null!)
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const activePrompt = step.kind !== "idle" ? step.prompt : null

  const runDemo = useCallback(
    async (prompt: DemoPrompt) => {
      if (isRunning) return
      const update = (next: Step) => {
        if (mountedRef.current) setStep(next)
      }
      setIsRunning(true)

      // Step 1: Introspection (show types being discovered)
      update({ kind: "introspecting", prompt })
      await delay(600)
      update({ kind: "types-discovered", prompt })
      await delay(1000)

      // Step 2: Composing (type out the query with a cursor)
      update({ kind: "composing", prompt, chars: 0 })
      for (let i = 1; i <= prompt.query.length; i++) {
        await delay(Math.random() * 12 + 5)
        update({ kind: "composing", prompt, chars: i })
      }
      await delay(250)

      // Step 3: Executing
      update({ kind: "executing", prompt, query: prompt.query })
      await delay(400)

      // Step 4: Result
      try {
        const execResult = await graphql({
          schema: StarWarsSchema,
          source: prompt.query,
        })
        update({
          kind: "result",
          prompt,
          query: prompt.query,
          result: JSON.stringify(execResult, null, 2),
        })
      } catch (error) {
        update({
          kind: "result",
          prompt,
          query: prompt.query,
          result: JSON.stringify({ error: String(error) }, null, 2),
        })
      }
      if (mountedRef.current) setIsRunning(false)
    },
    [isRunning],
  )

  return (
    <section
      id="interactive-demo"
      className="overflow-hidden bg-neu-50 dark:bg-neu-50/25"
    >
      <div className="gql-container gql-section lg:py-16 xl:py-24">
        <style dangerouslySetInnerHTML={{ __html: SYNTAX_CSS }} />
        <SectionLabel className="mb-6">Interactive Demo</SectionLabel>
        <h2 className="typography-h2 mb-2 lg:mb-4">
          See GraphQL + AI in action
        </h2>
        <p className="typography-body-lg mb-8 max-w-2xl text-pretty text-neu-800 lg:mb-12">
          Pick a prompt below and watch an AI agent introspect the schema,
          compose a precise GraphQL query, and fetch structured results — all in
          real time.
        </p>

        <div ref={containerRef} className="gap-8 lg:flex">
          {/* ── Left: Prompt picker ── */}
          <div className="lg:w-[380px] lg:shrink-0 xl:w-[440px]">
            <div className="flex flex-col gap-2">
              {demoPrompts.map(p => {
                const isActive = activePrompt?.id === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    disabled={isRunning}
                    onClick={() => runDemo(p)}
                    className={`gql-focus-visible group flex items-start gap-3 rounded-lg border p-3.5 text-left transition-all duration-200 disabled:cursor-not-allowed ${
                      isActive
                        ? "border-pri-base bg-pri-lightest/40 shadow-sm dark:bg-pri-darker/30"
                        : "border-neu-200 bg-neu-0 hover:border-pri-base/40 hover:bg-pri-lightest/20 dark:border-neu-100 dark:hover:bg-pri-darker/15"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-base leading-none">
                      {p.icon}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`typography-body-sm truncate font-medium ${
                          isActive ? "text-pri-dark" : "text-neu-900"
                        }`}
                      >
                        {p.prompt}
                      </p>
                      <p className="typography-body-xs mt-0.5 text-neu-500">
                        {p.discoveredTypes.length} type
                        {p.discoveredTypes.length > 1 ? "s" : ""} discovered
                        {isActive && " · running…"}
                      </p>
                    </div>
                    {isActive && (
                      <span className="ml-auto mt-0.5 shrink-0">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-2 animate-ping rounded-full bg-pri-base opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-pri-base" />
                        </span>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Right: Visualization ── */}
          <div className="mt-8 flex-1 lg:mt-0">
            <DemoVisualization step={step} containerRef={containerRef} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Visualization panel
   ───────────────────────────────────────────── */

function DemoVisualization({
  step,
  containerRef,
}: {
  step: Step
  containerRef: React.RefObject<HTMLDivElement>
}) {
  switch (step.kind) {
    case "idle":
      return <IdleState />
    case "introspecting":
      return <Introspecting prompt={step.prompt} />
    case "types-discovered":
      return <TypesDiscovered prompt={step.prompt} />
    case "composing":
      return <Composing prompt={step.prompt} chars={step.chars} />
    case "executing":
      return <Executing prompt={step.prompt} query={step.query} />
    case "result":
      return (
        <ResultView
          prompt={step.prompt}
          query={step.query}
          result={step.result}
          containerRef={containerRef}
        />
      )
  }
}

/* ── Idle ── */

function IdleState() {
  return (
    <div className="flex min-h-[440px] items-center justify-center rounded-xl border-2 border-dashed border-neu-300 bg-neu-0 p-8 dark:border-neu-100">
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-pri-lightest/40 dark:bg-pri-darker/20">
          <SparklesIcon className="size-8 text-pri-base/60" />
        </div>
        <p className="typography-body-md mt-5 text-neu-600">
          Select an example prompt to begin
        </p>
        <p className="typography-body-sm mt-2 text-neu-400">
          Watch the AI → GraphQL translation step by step
        </p>
      </div>
    </div>
  )
}

/* ── Introspecting ── */

function Introspecting({ prompt }: { prompt: DemoPrompt }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neu-200 bg-neu-0 shadow-sm dark:border-neu-100">
      <PanelHeader
        icon={<SearchIcon className="size-4 text-pri-base" />}
        label="Introspection"
      >
        <span className="typography-body-xs flex items-center gap-1.5 text-pri-base">
          <span className="flex size-1.5 animate-pulse rounded-full bg-pri-base" />
          Querying __schema…
        </span>
      </PanelHeader>
      <div className="bg-[#1e1e2e] p-5">
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-[#6c7086]">{`# AI sends introspection query
{
  __schema {
    queryType { name }
    types {
      name
      kind
      fields { name type { name kind } }
    }
  }
}`}</code>
        </pre>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-neu-100/10" />
          <span className="typography-body-xs flex items-center gap-2 text-[#6c7086]">
            <span className="flex gap-1">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="inline-block size-1.5 animate-bounce rounded-full bg-pri-base"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </span>
            Discovering schema for:{" "}
            <span className="text-[#f9e2af]">{prompt.prompt}</span>
          </span>
          <div className="h-px flex-1 bg-neu-100/10" />
        </div>
      </div>
    </div>
  )
}

/* ── Types Disclosed ── */

function TypesDiscovered({ prompt }: { prompt: DemoPrompt }) {
  return (
    <div className="overflow-hidden rounded-xl border border-pri-base/30 bg-neu-0 shadow-sm shadow-pri-base/5 dark:border-pri-base/40">
      <PanelHeader
        icon={<SearchIcon className="size-4 text-pri-base" />}
        label="Introspection"
        highlight
      >
        <span className="typography-body-xs flex items-center gap-1.5 text-sec-dark">
          <CheckIcon className="size-3" />
          Found {prompt.discoveredTypes.length} relevant type
          {prompt.discoveredTypes.length > 1 ? "s" : ""}
        </span>
      </PanelHeader>
      <div className="bg-[#1e1e2e] p-5">
        <p className="mb-3 font-mono text-xs text-[#6c7086]">
          <span className="text-[#cba6f7]">__schema</span> → types discovered:
        </p>
        <div className="flex flex-wrap gap-2">
          {prompt.discoveredTypes.map((type, i) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#f9e2af]/30 bg-[#f9e2af]/10 px-2.5 py-1.5 font-mono text-sm text-[#f9e2af]"
              style={{
                animationDelay: `${i * 200}ms`,
                animation: "fadeInUp 0.4s ease-out both",
              }}
            >
              <span className="text-xs text-[#6c7086]">"type"</span>
              {type}
            </span>
          ))}
        </div>
        <p className="typography-body-xs mt-4 text-[#a6e3a1]">
          ✓ Self-describing schema — no hand-written tool definitions required
        </p>
      </div>
    </div>
  )
}

/* ── Composing ── */

function Composing({ prompt, chars }: { prompt: DemoPrompt; chars: number }) {
  const visible = prompt.query.slice(0, chars)
  const cursor = chars < prompt.query.length

  return (
    <div className="overflow-hidden rounded-xl border border-pri-base/20 bg-neu-0 shadow-sm dark:border-pri-base/30">
      <PanelHeader
        icon={<CodeIcon className="size-4 text-pri-base" />}
        label="AI-generated GraphQL query"
        highlight
      >
        <span className="typography-body-xs flex items-center gap-1.5 text-pri-base">
          <span className="flex size-1.5 animate-pulse rounded-full bg-pri-base" />
          Composing…
        </span>
      </PanelHeader>
      <div className="bg-[#1e1e2e] p-5">
        <pre className="font-mono text-sm leading-relaxed">
          <code
            dangerouslySetInnerHTML={{
              __html:
                highlightGraphQL(visible) +
                (cursor
                  ? '<span class="inline-block w-2 h-[1.1em] bg-[#f5c2e7] ml-0.5 align-text-bottom animate-pulse" />'
                  : ""),
            }}
          />
        </pre>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#6c7086]">
          <span>
            {chars} / {prompt.query.length} chars
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-neu-100/10">
            <div
              className="h-full rounded-full bg-pri-base/60 transition-all duration-100"
              style={{
                width: `${((chars / prompt.query.length) * 100).toFixed(1)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Executing ── */

function Executing({ prompt, query }: { prompt: DemoPrompt; query: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-pri-base/20 bg-neu-0 shadow-sm dark:border-pri-base/30">
      <PanelHeader
        icon={<CodeIcon className="size-4 text-pri-base" />}
        label="AI-generated GraphQL query"
        highlight
      >
        <span className="typography-body-xs flex items-center gap-1.5 text-sec-dark">
          <CheckIcon className="size-3" />
          Query complete
        </span>
      </PanelHeader>
      <div className="bg-[#1e1e2e] p-5">
        <pre className="font-mono text-sm leading-relaxed">
          <code dangerouslySetInnerHTML={{ __html: highlightGraphQL(query) }} />
        </pre>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex gap-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="inline-block size-1.5 animate-bounce rounded-full bg-[#a6e3a1]"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </span>
          <span className="font-mono text-xs text-[#a6e3a1]">
            Executing against GraphQL endpoint…
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Result ── */

function ResultView({
  prompt,
  query,
  result,
  containerRef,
}: {
  prompt: DemoPrompt
  query: string
  result: string
  containerRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <div className="space-y-4">
      {/* Query */}
      <div className="overflow-hidden rounded-xl border border-neu-200 bg-neu-0 shadow-sm dark:border-neu-100">
        <PanelHeader
          icon={<SparklesIcon className="size-4 text-pri-base" />}
          label="AI-generated GraphQL query"
        >
          <span className="typography-body-xs flex items-center gap-1.5 text-sec-dark">
            <CheckIcon className="size-3" />
            Executed
          </span>
        </PanelHeader>
        <div className="bg-[#1e1e2e] p-5">
          <pre className="font-mono text-sm leading-relaxed">
            <code
              dangerouslySetInnerHTML={{ __html: highlightGraphQL(query) }}
            />
          </pre>
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-xl border border-sec-dark/20 bg-sec-light/15 p-4 dark:border-sec-base/15 dark:bg-sec-darker/15">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-sm">{prompt.icon}</span>
          <div>
            <p className="typography-body-sm font-medium text-neu-900">
              What just happened
            </p>
            <p className="typography-body-sm mt-1 text-neu-700">
              {prompt.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* JSON Result */}
      <div className="overflow-hidden rounded-xl border border-neu-200 bg-neu-0 shadow-sm dark:border-neu-100">
        <PanelHeader
          icon={<CheckIcon className="size-4 text-sec-dark" />}
          label="Structured response (JSON)"
        >
          <span className="typography-body-xs text-neu-500">
            {result.length.toLocaleString()} bytes
          </span>
        </PanelHeader>
        <div
          ref={containerRef}
          className="max-h-[400px] overflow-auto bg-[#1e1e2e] p-5"
        >
          <pre className="font-mono text-sm leading-relaxed">
            <code dangerouslySetInnerHTML={{ __html: highlightJSON(result) }} />
          </pre>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Shared sub-components
   ───────────────────────────────────────────── */

function PanelHeader({
  icon,
  label,
  highlight,
  children,
}: {
  icon: React.ReactNode
  label: string
  highlight?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      className={`flex items-center gap-2 border-b px-4 py-2.5 ${
        highlight
          ? "border-pri-base/20 bg-pri-lightest/40 dark:border-pri-base/30 dark:bg-pri-darker/20"
          : "border-neu-200 bg-neu-50 dark:border-neu-100 dark:bg-neu-50/25"
      }`}
    >
      {icon}
      <span className="typography-body-sm flex-1 font-mono font-medium text-neu-700">
        {label}
      </span>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

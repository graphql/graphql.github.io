"use client"

import clsx from "clsx"
import { useState, Fragment, ReactNode } from "react"

import { Button } from "@/app/conf/_design-system/button"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

import blurBean from "./blur-bean.webp"

type UseCase = {
  label: string
  description: ReactNode
  cta: string
  href: string
}

const USE_CASES: UseCase[] = [
  {
    label: "A large backend with many services",
    description:
      "GraphQL serves as a unified data layer across multiple services. This way you simplify API management and reduce dependencies between teams. It enables efficient data fetching while keeping the API surface flexible and maintainable.",
    cta: "Best Practices for Large-Scale Systems",
    href: "/learn/best-practices",
  },
  {
    label: "A mobile app",
    description: (
      <>
        GraphQL lets you request exactly what you need in one call with no
        overfetching to preserve battery and work on slow networks. With a
        persistent normalized cache, your app can work offline on planes and
        trains, and versionless schema evolution makes it easy to iterate
        without breaking old versions of the app.
      </>
    ),
    cta: "Performance Optimization",
    href: "/learn/performance",
  },
  {
    label: "A frontend-heavy app with advanced UI needs",
    description:
      "GraphQL makes building complex UIs easier by allowing components to declare their data needs directly alongside their code with no performance hit. You can aggregate data from multiple services into a single request and maintain consistent state without creating custom endpoints for every view.",
    cta: "GraphQL Queries",
    href: "/learn/queries",
  },
  {
    label: "An app with real-time updates",
    description:
      "Replace polling and complex WebSocket management with GraphQL subscriptions. Your app gets notified instantly when data changes, using the same queries and types you already have. Real-time becomes part of your API instead of a separate system to maintain.",
    cta: "Real-time with Subscriptions",
    href: "/learn/subscriptions",
  },
  {
    label: "A simple full stack TypeScript app",
    description:
      "Define your GraphQL schema once and GraphQL Codegen does the rest. Your frontend gets perfectly typed API calls, your backend stays in sync, and any schema changes immediately show up as TypeScript errors throughout your app. Full-stack type safety reduces bugs and makes pivots and refactors easier.",
    cta: "Schema-First Development",
    href: "/learn/schema",
  },
  {
    label: "An AI-powered app",
    description:
      "GraphQL’s self-describing schemas, strong typing, and composability make it perfect for Model Context Protocol servers and applications with LLMs at their cores. Models can explore your API capabilities, understand data relationships, and dynamically interact with your system.",
    cta: "GraphQL & AI",
    href: "/blog/2025-07-03-graphql-supercharging-ai/",
  },
]

export function UseCases({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = USE_CASES[selectedIndex]

  return (
    <section
      id="graphql-use-cases"
      className={clsx("gql-container dark:text-neu-0", className)}
      {...props}
    >
      <div className="mx-auto flex max-w-[1440px] *:basis-1/2 max-lg:flex-col 3xl:min-h-[800px]">
        <div className="relative flex flex-col bg-sec-light p-4 dark:bg-neu-50 dark:text-neu-900 lg:p-8 xl:p-16">
          <h2 className="typography-h2">Is GraphQL right for&nbsp;me?</h2>
          <p className="typography-body-lg mt-6 text-balance text-neu-800">
            Choose a use case most relevant for your project and learn how
            GraphQL can help you build faster, modern solutions.
          </p>

          <div className="3xl:flex-1" />
          <div
            role="tablist"
            className="mt-8 divide-y divide-sec-dark border border-sec-dark max-lg:sr-only lg:mt-16"
          >
            {USE_CASES.map((useCase, i) => (
              <button
                role="tab"
                aria-controls={`graphql-use-case-${i}`}
                type="button"
                key={useCase.label}
                tabIndex={i === 0 ? 0 : -1}
                onKeyDown={arrowsMoveSideways}
                onPointerDown={() => setSelectedIndex(i)}
                onFocus={() => setSelectedIndex(i)}
                aria-selected={i === selectedIndex ? "true" : undefined}
                className="gql-focus-visible group flex w-full items-center justify-between gap-6 border-sec-dark px-3 py-4 text-left transition-colors hover:bg-sec-lighter aria-selected:bg-sec-base aria-selected:hover:bg-sec-lighter hover:dark:bg-neu-100/25 dark:aria-selected:bg-sec-darker"
              >
                <span className="typography-body-lg">{useCase.label}</span>
                <ArrowDownIcon className="size-10 shrink-0 -rotate-90 text-sec-dark opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-aria-selected:opacity-100 dark:text-neu-900" />
              </button>
            ))}
          </div>
          <div className="3xl:flex-1" />
        </div>

        <div className="relative flex h-auto flex-col bg-sec-base dark:bg-sec-darker">
          <Stripes />
          <div className="flex flex-1 justify-center overflow-hidden max-lg:flex-col lg:items-center">
            {USE_CASES.map((useCase, i) => (
              <Fragment key={useCase.label}>
                <button
                  type="button"
                  role="none" // we already have one copy of this tab
                  onPointerDown={() => setSelectedIndex(i)}
                  onFocus={() => setSelectedIndex(i)}
                  className={clsx(
                    "z-[1] flex w-full items-center justify-between gap-6 border-b border-sec-dark bg-sec-light px-3 py-4 text-left first:border-t hover:bg-sec-lighter dark:bg-sec-darker dark:hover:bg-sec-dark max-lg:dark:bg-neu-50 lg:hidden",
                  )}
                >
                  <span className="typography-body-lg text-neu-900">
                    {useCase.label}
                  </span>
                  <ArrowDownIcon className="size-6 shrink-0 text-sec-dark transition-transform [[aria-selected=false]>&]:rotate-180" />
                </button>
                <div
                  role="tabpanel"
                  id={`graphql-use-case-${i}`}
                  className={clsx(
                    "relative h-full flex-1 p-8 lg:p-12 xl:p-16",
                    selectedIndex === i ? "border-b border-sec-dark" : "hidden",
                  )}
                >
                  <div className="relative z-10 my-auto max-h-[528px] max-w-2xl">
                    <h3 className="typography-body-lg text-sec-darker dark:text-sec-lighter max-lg:hidden">
                      {useCase.label}
                    </h3>
                    <p className="typography-h3 text-neu-800 lg:mt-10 lg:max-xl:text-xl">
                      {useCase.description}
                    </p>
                    <div className="mt-8 flex xl:mt-[120px]">
                      <Button href={useCase.href} variant="primary">
                        {useCase.cta}
                        <ArrowDownIcon className="size-6 shrink-0 -rotate-90 text-neu-0" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stripes() {
  const mask = `url(${blurBean.src})`
  return (
    <div
      role="presentation"
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskPosition: "bottom 150% right 50%",
        WebkitMaskPosition: "bottom 150% right 50%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(0deg,_hsl(var(--color-sec-dark))_0%,_hsl(var(--color-sec-base))_100%)] dark:bg-[linear-gradient(0deg,_hsl(var(--color-sec-dark))_0%,_hsl(var(--color-sec-darker))_100%)]"
        oddClassName="bg-[linear-gradient(0deg,_hsl(var(--color-sec-lighter))_0%,_hsl(79_81%_40%/0)_100%)] dark:bg-[linear-gradient(0deg,_hsl(var(--color-neu-dark))_0%,_rgba(133,185,19,0.00)_100%)]"
      />
    </div>
  )
}

function arrowsMoveSideways(event: React.KeyboardEvent<HTMLButtonElement>) {
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    const previousElement = event.currentTarget.previousElementSibling
    if (previousElement) {
      event.preventDefault()
      ;(previousElement as HTMLElement).focus()
    }
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    const nextElement = event.currentTarget.nextElementSibling
    if (nextElement) {
      event.preventDefault()
      ;(nextElement as HTMLElement).focus()
    }
  }
}

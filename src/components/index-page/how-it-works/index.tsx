import { useRef, useState } from "react"
import { useInView } from "motion/react"
import dynamic from "next/dynamic"
import { clsx } from "clsx"

import { Button } from "@/app/conf/_design-system/button"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import InfoIcon from "@/app/conf/_design-system/pixelarticons/info.svg?svgr"
import {
  HowItWorks_Schema,
  HowItWorks_Query,
  HowItWorks_Result,
} from "@/components/code-blocks"

import { HowItWorksListItem } from "./how-it-works-list-item"
import { PlayButton } from "./play-button"
import { Kbd } from "../../../_design-system/kbd"

const InteractiveEditor = dynamic(() => import("./interactive-editor"), {
  ssr: false,
})

const TRY_IT_OUT_URL = "https://graphql.org/swapi-graphql"

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  // todo: we could technically consider loading the chunk on hover or focus,
  // just so people scrolling through the page don't download CodeMirror
  const inView = useInView(sectionRef)
  const [interacted, setInteracted] = useState(false)

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="gql-container gql-section xl:py-20"
      // this is mostly for Playwright, we're not getting a hydration warning normally
      suppressHydrationWarning
    >
      <SectionLabel className="mb-6">How it works</SectionLabel>
      <h2 className="typography-h2 mb-6 lg:mb-16">A GraphQL Query</h2>
      <div className="relative">
        {/* eslint-disable-next-line tailwindcss/no-custom-classname*/}
        <ol className="gql-radial-gradient list-none gap-px max-lg:before:absolute max-lg:before:inset-x-0 max-lg:before:-top-2 max-lg:before:bottom-[98%] max-lg:before:bg-[rgb(var(--nextra-bg))] max-md:bg-gradient-to-r max-md:from-transparent max-md:via-neu-400 max-md:to-transparent lg:grid lg:grid-cols-3">
          <HowItWorksListItem
            text="Describe your data"
            code={<HowItWorks_Schema />}
          />
          <HowItWorksListItem
            text="Ask for what you want"
            icon={<PlayButton disabled={inView} />}
            code={<HowItWorks_Query />}
          />
          <HowItWorksListItem
            text="Get predictable results"
            code={<HowItWorks_Result />}
          />
        </ol>
        {inView && (
          <ol
            // this is rendered *on top* of the static version to avoid layout shift
            className="max-lg:before pointer-events-none absolute inset-0 list-none gap-px [counter-set:list-item_1] *:pointer-events-auto max-lg:before:absolute max-lg:before:inset-x-0 max-lg:before:-top-2 max-lg:before:bottom-[98%] max-lg:before:bg-[rgb(var(--nextra-bg))] max-sm:top-[191px] sm:max-lg:top-[214px] lg:grid lg:grid-cols-3 lg:[&>:first-child]:col-start-2"
            onKeyDown={() => {
              if (!interacted) setInteracted(true)
            }}
          >
            <InteractiveEditor />
          </ol>
        )}
      </div>
      <FigureInfo
        className={clsx("transition-opacity", interacted ? "opacity-0" : "")}
      />

      <Button className="mx-auto mt-8 w-fit lg:mt-16" href={TRY_IT_OUT_URL}>
        Try GraphiQL
      </Button>
    </section>
  )
}

function FigureInfo({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "typography-body-sm mx-auto mt-12 flex w-fit gap-2 text-neu-800 hover-none:hidden dark:text-neu-600",
        className,
      )}
    >
      <InfoIcon className="size-4 shrink-0 translate-y-[2.25px]" />
      <p className="text-neu-800">
        Press <Kbd>Ctrl</Kbd>
        <Kbd className="ml-0.5">Space</Kbd> to open the completions menu,{" "}
        <MetaKey />
        <Kbd>Enter</Kbd> to run the query.
      </p>
    </div>
  )
}

function MetaKey() {
  return (
    <>
      <Kbd className="mx-0.5 hidden [.mac_&]:inline-flex">⌘</Kbd>
      <Kbd className="mx-0.5 [.mac_&]:hidden">Ctrl</Kbd>
    </>
  )
}

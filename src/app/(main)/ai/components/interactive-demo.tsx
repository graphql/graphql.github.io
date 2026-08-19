"use client"

import { useRef, useState, type ComponentType, type SVGProps } from "react"
import { useInView } from "motion/react"
import dynamic from "next/dynamic"

import { SectionLabel } from "@/app/conf/_design-system/section-label"
import { Button } from "@/app/conf/_design-system/button"
import { useCodeAnimation } from "@/components/code-animation/use-code-animation"

import UsersIcon from "@/app/conf/_design-system/pixelarticons/users.svg?svgr"
import HumanIcon from "@/app/conf/_design-system/pixelarticons/human.svg?svgr"
import RobotIcon from "@/app/conf/_design-system/pixelarticons/robot.svg?svgr"
import ScaleIcon from "@/app/conf/_design-system/pixelarticons/scale.svg?svgr"
import ShipIcon from "@/app/conf/_design-system/pixelarticons/ship.svg?svgr"
import SwordIcon from "@/app/conf/_design-system/pixelarticons/sword.svg?svgr"

import { demoPrompts, type DemoPrompt } from "./demo-prompts"

const icons: Record<string, ComponentType<SVGProps<SVGElement>>> = {
  users: UsersIcon,
  human: HumanIcon,
  robot: RobotIcon,
  scale: ScaleIcon,
  ship: ShipIcon,
  sword: SwordIcon,
}

const DemoEditor = dynamic(
  () => import("./demo-editor").then(m => m.DemoEditor),
  { ssr: false },
)

export function InteractiveDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef)
  const hasEntered = useInView(sectionRef, { once: true })
  const [selected, setSelected] = useState<DemoPrompt>(demoPrompts[0])
  const [editedQuery, setEditedQuery] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const animation = useCodeAnimation(selected.query, {
    active: inView && editedQuery === null,
    restartKey: animationKey,
    initialDelay: 400,
  })
  const query = editedQuery ?? animation.code

  return (
    <section
      ref={sectionRef}
      id="interactive-demo"
      className="overflow-hidden bg-neu-50 dark:bg-neu-50/25"
      suppressHydrationWarning
    >
      <div className="gql-container gql-section lg:py-16 xl:py-24">
        <SectionLabel className="mb-6">Interactive Demo</SectionLabel>
        <h2 className="typography-h2 mb-2 lg:mb-4">
          See GraphQL + AI in action
        </h2>
        <p className="typography-body-lg mb-8 max-w-2xl text-pretty text-neu-800 lg:mb-12">
          Pick a question an agent might get, and see the query it composes
          against the Star Wars schema. The editor is live: change the query and
          the response updates.
        </p>

        <div className="gap-8 lg:flex">
          <div className="lg:w-[380px] lg:shrink-0 xl:w-[440px]">
            <ul className="flex list-none flex-col gap-2 p-0">
              {demoPrompts.map(p => {
                const isSelected = selected.id === p.id
                const Icon = icons[p.icon]
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelected(p)
                        setEditedQuery(null)
                        setAnimationKey(key => key + 1)
                        panelRef.current?.scrollIntoView({ block: "nearest" })
                      }}
                      className={`gql-focus-visible flex w-full items-start gap-3 border p-3.5 text-left transition-colors ${
                        isSelected
                          ? "border-pri-base bg-pri-lightest/40 dark:bg-pri-darker/30"
                          : "border-neu-200 bg-neu-0 hover:border-pri-base/40 hover:bg-pri-lightest/20 dark:border-neu-100 dark:hover:bg-pri-darker/15"
                      }`}
                    >
                      <Icon
                        aria-hidden
                        className={`mt-0.5 size-5 shrink-0 ${
                          isSelected ? "text-pri-base" : "text-neu-500"
                        }`}
                      />
                      <span className="min-w-0">
                        <span
                          className={`typography-body-sm block font-medium ${
                            isSelected
                              ? "text-pri-dark dark:text-pri-light"
                              : "text-neu-900"
                          }`}
                        >
                          {p.prompt}
                        </span>
                        <span className="typography-body-xs mt-0.5 block text-neu-700">
                          {p.types.join(" · ")}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <Button
              href="https://graphql.org/swapi-graphql"
              variant="secondary"
              size="md"
              className="mt-4 w-full"
            >
              Open the full API in GraphiQL
            </Button>
          </div>

          <div ref={panelRef} className="mt-8 flex-1 lg:mt-0">
            {hasEntered && (
              <DemoEditor
                query={query}
                onEdit={setEditedQuery}
                queryComplete={editedQuery !== null || animation.isComplete}
              />
            )}
            <p className="typography-body-sm mt-4 text-pretty text-neu-700">
              {selected.explanation}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

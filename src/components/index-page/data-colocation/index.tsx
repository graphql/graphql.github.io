import * as React from "react"
import { clsx } from "clsx"
import { Code } from "nextra/components"
import {
  cloneElement,
  ComponentPropsWithoutRef,
  ReactElement,
  useRef,
} from "react"

import { Pre } from "@/components/pre"
import { SectionLabel } from "@/app/conf/_design-system/section-label"
import InfoIcon from "@/app/conf/_design-system/pixelarticons/info.svg?svgr"
import { useOnClickOutside } from "@/app/conf/_design-system/utils/useOnClickOutside"
import { isSpanElement } from "@/app/conf/_design-system/utils/isSpanElement"

import { ComponentTree } from "./component-tree"
import { FriendList } from "./friend-list"

import json from "./data-colocation.json"
import Query from "./data-colocation.mdx"
import "./data-colocation.css"

const highlightedFragments = {
  GetFriendList: 1,
  FriendList: 2,
  FriendListItem: 3,
  FriendInfo: 4,
}

const components = {
  pre: (props: ComponentPropsWithoutRef<typeof Pre>) => (
    <Pre
      {...props}
      // todo: this bg style might need to become global for all code blocks
      className={clsx(
        props.className,
        "sector-opacity !border-none pr-4 leading-[1.459em] backdrop-blur-[6px] max-xs:leading-[16px] max-xs:[&_span]:!text-xs",
      )}
      tabIndex={-1}
    />
  ),
  code: function Code2({
    children,
    ...rest
  }: ComponentPropsWithoutRef<typeof Code>) {
    const childrenTransformed = React.useMemo(() => {
      let sectorIndex: number | undefined
      let depth = 0

      return React.Children.map(children, child => {
        if (isSpanElement(child)) {
          let children = (child as ReactElement).props.children

          if (isSpanElement(children)) {
            children = children.props.children
          } else if (Array.isArray(children)) {
            children = children
              .map(child => {
                if (isSpanElement(child)) {
                  return child.props.children
                }
                return child
              })
              .join("")
          }

          if (/query|fragment/.test(children)) {
            for (const [name, index] of Object.entries(highlightedFragments)) {
              if (children.includes(` ${name} `)) sectorIndex = index
              depth++
            }
          }

          if (children.includes("{")) depth++
          if (children.includes("}")) {
            depth--
            if (depth === 0) sectorIndex = undefined
          }

          if (sectorIndex) {
            return cloneElement(child, {
              ...child.props,
              "data-sector": sectorIndex,
            } as React.HTMLAttributes<HTMLSpanElement>)
          }

          return child
        }

        return child
      })
    }, [children])

    return <Code {...rest}>{childrenTransformed}</Code>
  },
}

export function DataColocation() {
  const markSector = (event: React.MouseEvent<HTMLElement>) => {
    const target =
      event.target && event.target instanceof HTMLElement ? event.target : null

    const sectorElement = target?.closest("[data-sector]") as HTMLElement | null
    const sector = sectorElement?.dataset.sector

    if (sector == null) return

    const currentTarget = event.currentTarget

    if (currentTarget.dataset.activeSector !== sector) {
      currentTarget.dataset.activeSector = sector
    }
  }

  const unmarkSector = (event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(hover: none)").matches) return

    const target =
      event.relatedTarget && event.relatedTarget instanceof HTMLElement
        ? event.relatedTarget
        : null

    const currentTarget = event.currentTarget

    const sectorElement = target?.closest("[data-sector]") as HTMLElement | null
    const targetSector = sectorElement?.dataset.sector
    const currentActiveSector = currentTarget.dataset.activeSector

    if (!targetSector) {
      delete currentTarget.dataset.activeSector
      return
    }

    if (!currentActiveSector) return

    currentTarget.dataset.activeSector = targetSector
  }

  const sectionRef = useRef<HTMLElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const componentTreeRef = useRef<HTMLDivElement>(null)
  useOnClickOutside([figureRef, componentTreeRef], () => {
    const section = sectionRef.current
    if (section && section.dataset.activeSector) {
      delete section.dataset.activeSector
    }
  })

  return (
    <section
      ref={sectionRef}
      className="gql-container gql-section flex justify-between gap-4 max-xl:flex-wrap sm:max-xl:gap-y-8 xl:p-24"
      onMouseOver={markSector}
      onMouseOut={unmarkSector}
      onPointerDown={markSector}
    >
      <div className="basis-full justify-between gap-x-8 sm:max-xl:flex lg:shrink">
        <header>
          <SectionLabel>Data Colocation</SectionLabel>
          <h2 className="typography-h2 mt-6">Data Colocation</h2>
          <p className="typography-body-md mt-6 text-pretty lg:max-w-[500px] xl:max-w-[438px]">
            GraphQL fragments let you define each component’s data needs close
            to it, and satisfy them with a single query.
          </p>
        </header>
        <ComponentTree
          ref={componentTreeRef}
          className="mt-6 max-sm:mx-auto md:mt-8 lg:mt-12 xl:mt-16"
          names={[
            "Server",
            "<FriendList>",
            "<FriendListItem>",
            "<FriendInfo/>",
          ]}
        />
      </div>
      <article
        className="flex shrink-0 divide-neu-100 dark:divide-neu-50 dark:shadow-[0_.5px_20px_0_hsl(0_0_0/.25)] max-xl:w-full max-lg:gap-4 max-md:flex-col lg:rounded-lg lg:shadow-[0_.5px_20px_0_hsl(var(--color-neu-400))] lg:dark:bg-neu-50/10 xl:divide-x"
        ref={figureRef}
      >
        <div className="flex shrink-0 grow flex-col gap-y-4 sm:flex-col-reverse lg:p-4">
          <FigureInfo />
          <div className="sector-ring">
            <FriendList friends={json.friends} />
          </div>
        </div>
        <div className="flex grow *:w-full *:rounded-lg *:border *:border-neu-100 *:bg-neu-50/50 lg:p-4">
          <Query components={components} />
        </div>
      </article>
    </section>
  )
}

function FigureInfo() {
  return (
    <div className="flex w-full grow gap-2 hover-none:items-center xl:max-w-[240px]">
      <InfoIcon className="size-4 shrink-0 hover-hover:size-5 hover-hover:translate-y-[0.5px]" />
      <p className="typography-body-sm text-neu-800">
        <span className="hover-hover:hidden">Click on</span>
        <span className="hover-none:hidden">Hover over</span> the components to
        see their GraphQL fragments.
      </p>
    </div>
  )
}

"use client"

import clsx from "clsx"

import ArrowDown from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import ExternalLink from "@/app/conf/_design-system/pixelarticons/external-link.svg?svgr"

import { Anchor } from "./anchor"

export interface AccordionItem {
  title: string
  description: React.ReactNode
  link?: string
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[]
  multiple?: boolean
}

export function Accordion({
  items,
  multiple = false,
  className,
  ...rest
}: AccordionProps) {
  return (
    <div className={clsx("grow space-y-4", className)} {...rest}>
      {items.map((item, index) => (
        <details
          open={index === 0}
          key={index}
          className="group/q w-full border border-sec-darker @container dark:border-sec-dark"
          onClick={event => {
            if (!multiple) {
              const allDetails =
                event.currentTarget.parentElement?.querySelectorAll("details")
              if (allDetails) {
                allDetails.forEach(details => {
                  if (details !== event.currentTarget) {
                    details.open = false
                  }
                })
              }
            }
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 border-sec-darker p-2 px-3 focus:outline-none group-open/q:border-b dark:border-sec-dark [&::-webkit-details-marker]:hidden">
            <span className="typography-body-lg select-none">{item.title}</span>
            <ArrowDown className="size-10 shrink-0 text-sec-darker group-open/q:rotate-180" />
          </summary>
          <div className="flex items-start p-3">
            <div className="typography-body-md text-pretty">
              {item.description}
            </div>
            {item.link && (
              <Anchor
                href={item.link}
                className="ml-auto p-2 hover:bg-neu-800/10"
              >
                <ExternalLink className="size-6" />
              </Anchor>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}

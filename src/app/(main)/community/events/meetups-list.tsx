"use client"

import { clsx } from "clsx"
import ExternalLinkIcon from "@/app/conf/_design-system/pixelarticons/external-link.svg?svgr"

import { meetups as meetupNodes } from "@/components/meetups"
import { useEffect } from "react"

type MeetupListItem = {
  id: string
  city: string
  country: string
  name: string
  href: string
}

const DEFAULT_MEETUPS: MeetupListItem[] = meetupNodes
  .map(({ node }) => ({
    id: node.id,
    city: node.city || node.name,
    country: node.country,
    name: node.name,
    href: node.link,
  }))
  .filter(item => Boolean(item.href))
  .sort((a, b) =>
    a.city.localeCompare(b.city, undefined, {
      sensitivity: "base",
      numeric: true,
    }),
  )

export interface MeetupsListProps {
  className?: string
  activeMeetupId?: string | null
  onActiveMeetupChange?: (meetupId: string | null) => void
  meetups?: MeetupListItem[]
}

/**
 * Displays the catalog of GraphQL meetups in a condensed, scrollable list.
 */
export function MeetupsList({
  className,
  activeMeetupId,
  onActiveMeetupChange,
  meetups = DEFAULT_MEETUPS,
}: MeetupsListProps) {
  useEffect(() => {
    if (activeMeetupId) {
      const list = document.querySelector("#meetups-list")
      if (!list) return

      const activeAnchor = list.querySelector<HTMLAnchorElement>(
        `a[aria-current="true"]`,
      )
      if (!activeAnchor) return

      if (list.scrollTop + list.clientHeight < activeAnchor.offsetTop) {
        list.scrollTo({ top: activeAnchor.offsetTop, behavior: "smooth" })
      }
    }
  }, [activeMeetupId])

  if (meetups.length === 0) return null

  return (
    <ul
      id="meetups-list"
      className={clsx(
        "nextra-scrollbar overflow-y-auto scrollview-fade-y-16 scrollview-fade md:h-full",
        className,
      )}
    >
      {meetups.map((meetup, index) => {
        const isActive = meetup.id === activeMeetupId

        return (
          <li key={meetup.id}>
            <a
              href={meetup.href}
              target="_blank"
              rel="noreferrer"
              aria-current={isActive ? "true" : undefined}
              title={`${meetup.city}, ${meetup.country} — ${meetup.name}`}
              className={clsx(
                "gql-focus-visible gql-focus-visible group/li flex items-center justify-between gap-3 border-b border-neu-300 px-3 py-2 text-sm text-neu-800 transition-colors last:border-0 hover:bg-neu-200 hover:duration-0 dark:hover:bg-neu-900/5",
                isActive &&
                  "[ul:not(:hover)_&]:bg-neu-200 [ul:not(:hover)_&]:dark:bg-neu-900/5",
              )}
              onMouseOver={() => onActiveMeetupChange?.(meetup.id)}
              onFocus={() => onActiveMeetupChange?.(meetup.id)}
              data-index={index}
            >
              <span className="typography-body-md truncate">{meetup.city}</span>
              <ExternalLinkIcon
                aria-hidden
                className={clsx(
                  "size-4 shrink-0 text-neu-600 opacity-0 transition-opacity duration-150 group-hover/li:opacity-100 group-focus-visible/li:opacity-100",
                )}
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

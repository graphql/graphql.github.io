"use client"

import { meetups } from "@/components/meetups"

const meetupCityById = new Map(meetups.map(({ node }) => [node.id, node.city]))

type MapTooltipProps = {
  id: string
  activeMeetupIds: string[]
}

export function MapTooltip({ id, activeMeetupIds }: MapTooltipProps) {
  return (
    <span
      id={id}
      role="tooltip"
      className="pointer-events-none absolute left-0 top-0 z-10 hidden min-w-0 flex-col whitespace-nowrap border border-neu-200/40 bg-neu-0/40 px-2 py-[3px] text-xs text-neu-900 shadow-sm backdrop-blur-sm group-hover/map:flex"
      style={{
        transform: `translate3d(calc(var(--x) - 50%), calc(var(--y) - 100% - 12px), 0)`,
        visibility: activeMeetupIds.length > 0 ? "visible" : "hidden",
      }}
    >
      {activeMeetupIds.map(meetupId => (
        <span key={meetupId}>{meetupCityById.get(meetupId)}</span>
      ))}
    </span>
  )
}

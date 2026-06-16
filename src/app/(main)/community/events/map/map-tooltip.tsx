"use client"

import { meetups } from "@/components/meetups"

const meetupNameById = new Map(meetups.map(({ node }) => [node.id, node.name]))

type MapTooltipProps = {
  id: string
  activeMeetupId: string | null
}

export function MapTooltip({ id, activeMeetupId }: MapTooltipProps) {
  const name = activeMeetupId && meetupNameById.get(activeMeetupId)
  return (
    <span
      id={id}
      role="tooltip"
      className="pointer-events-none absolute left-0 top-0 z-10 hidden min-w-0 whitespace-nowrap border border-neu-200/40 bg-neu-0/40 px-2 py-[3px] text-xs text-neu-900 shadow-sm backdrop-blur-sm group-hover/map:flex"
      style={{
        transform: `translate3d(calc(var(--x) - 50%), calc(var(--y) - 50% - 22px), 0)`,
        visibility: activeMeetupId ? "visible" : "hidden",
      }}
    >
      {name}
    </span>
  )
}

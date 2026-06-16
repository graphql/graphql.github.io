import clsx from "clsx"
import React from "react"

import { ScheduleSession } from "@/app/conf/2023/types"
import { Tag } from "@/app/conf/_design-system/tag"

import { eventsColors } from "../utils"

export interface SessionTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  session: ScheduleSession
  className?: string
}

export function SessionTags({ session, className, ...rest }: SessionTagsProps) {
  const eventType = session.event_type.endsWith("s")
    ? session.event_type.slice(0, -1)
    : session.event_type

  return (
    <div className={clsx("flex flex-wrap gap-2 md:gap-3", className)} {...rest}>
      {eventType && (
        <Tag color={eventsColors[session.event_type || ""]}>{eventType}</Tag>
      )}
      {session.company && (
        <Tag
          color={eventsColors[session.company] || "hsl(var(--color-neu-500))"}
        >
          {session.company}
        </Tag>
      )}
      {session.event_subtype && (
        <Tag
          color={
            eventsColors[session.event_subtype] || "hsl(var(--color-sec-dark))"
          }
        >
          {session.event_subtype}
        </Tag>
      )}
    </div>
  )
}

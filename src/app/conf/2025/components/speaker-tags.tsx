import clsx from "clsx"

import { SchedSpeaker } from "@/app/conf/2023/types"
import { Tag } from "@/app/conf/_design-system/tag"
import ReloadIcon from "@/app/conf/_design-system/pixelarticons/reload.svg?svgr"

import { speakerSessions } from "../_data"
import { eventsColors } from "../utils"

export function SpeakerTags({
  speaker,
  className,
  showEventType = true,
}: {
  speaker: SchedSpeaker
  className?: string
  showEventType?: boolean
}) {
  const firstTalk = speakerSessions.get(speaker.username)?.[0]
  let tag = showEventType && firstTalk?.event_subtype

  const tagColor = (tag && eventsColors[tag]) || "hsl(var(--color-sec-dark))"
  if (tag && tag.includes(" and ")) {
    tag = tag.replace(" and ", " & ")
  }

  return (
    <div className={clsx("flex basis-0 flex-wrap gap-2", className)}>
      {tag && <Tag color={tagColor}>{tag}</Tag>}

      {speaker._years.length > 1 && (
        <Tag color="hsl(var(--color-neu-500))">
          <ReloadIcon className="-mx-0.5 size-3" />
          returning speaker
        </Tag>
      )}
    </div>
  )
}

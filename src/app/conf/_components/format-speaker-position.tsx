import type { SchedSpeaker } from "@/app/conf/2023/types"

export function formatSpeakerPosition(speaker: SchedSpeaker) {
  return [speaker.company === "-" ? "" : speaker.company, speaker.position]
    .filter(Boolean)
    .join(", ")
}

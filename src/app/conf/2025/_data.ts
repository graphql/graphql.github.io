import "server-only"

import { SchedSpeaker, ScheduleSession } from "@/app/conf/2023/types"
import { readSpeakers } from "../_api/sched-data"

export const schedule: ScheduleSession[] = require("../../../../scripts/sync-sched/schedule-2025.json")

type SpeakerUsername = SchedSpeaker["username"]

export const speakerSessions = new Map<SpeakerUsername, ScheduleSession[]>()

for (const session of schedule) {
  for (const speaker of session.speakers || []) {
    if (!speakerSessions.has(speaker.username)) {
      speakerSessions.set(speaker.username, [])
    }

    speakerSessions.get(speaker.username)!.push(session)
  }
}

export const speakers: SchedSpeaker[] = readSpeakers(2025).filter(speaker =>
  speakerSessions.has(speaker.username),
)

export const previousEditionSessions = new Map<
  SpeakerUsername,
  ScheduleSession[]
>()

{
  const schedule2023 = require("../../../../scripts/sync-sched/schedule-2023.json")
  const schedule2024 = require("../../../../scripts/sync-sched/schedule-2024.json")

  for (const session of schedule2023) {
    for (const speaker of session.speakers || []) {
      if (!previousEditionSessions.has(speaker.username)) {
        previousEditionSessions.set(speaker.username, [])
      }

      previousEditionSessions.get(speaker.username)!.push(session)
    }
  }

  for (const session of schedule2024) {
    for (const speaker of session.speakers || []) {
      if (!previousEditionSessions.has(speaker.username)) {
        previousEditionSessions.set(speaker.username, [])
      }

      previousEditionSessions.get(speaker.username)!.push(session)
    }
  }
}

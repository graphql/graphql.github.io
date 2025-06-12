import { ConferenceYear, SchedSpeaker } from "./sched-types"

const allSpeakers: SchedSpeaker[] = require("../../../../scripts/sync-sched/speakers.json")

export function readSpeakers(year: ConferenceYear): SchedSpeaker[] {
  return (
    allSpeakers
      .filter(speaker => speaker._years.includes(year))
      .sort((a, b) => a.name.localeCompare(b.name))
      // show speakers without avatars last
      .sort((a, b) => {
        if (a.avatar && !b.avatar) return -1
        if (!a.avatar && b.avatar) return 1
        return 0
      })
  )
}

// TODO: We need to be able to say that a speaker is returning even if they don't share username, only first name and last name.
//       But this needs to be done without adding to `~years` so we don't show duplicates.

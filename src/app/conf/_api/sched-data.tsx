import { ConferenceYear, SchedSpeaker } from "./sched-types"
import { mergeSpeaker } from "./sched-client"

const speakersData = require("../../../../scripts/sync-sched/speakers.json")
const allSpeakers: SchedSpeaker[] = speakersData.speakers
const equalitySets: string[][] = speakersData.equal || []

export function readSpeakers(year: ConferenceYear): SchedSpeaker[] {
  const speakersThisYear = allSpeakers.filter(speaker =>
    speaker._years.includes(year),
  )

  const speakersWithDuplicates = new Set(equalitySets.flat())

  const res = speakersThisYear.map(speaker => {
    if (speakersWithDuplicates.has(speaker.username)) {
      return (
        equalitySets
          .find(set => set.includes(speaker.username))! // we will definitely find, because we checked .has above
          .map(username => allSpeakers.find(s => s.username === username))
          .filter(x => !!x)
          // we prefer the data from the most recent years
          .sort((a, b) => Math.max(...a._years) - Math.max(...b._years))
          // and the `year` of the conference we're fetching data for
          .concat([speaker])
          .reduce(mergeSpeaker)
      )
    }
    return speaker
  })

  return (
    res
      .sort((a, b) => a.name.localeCompare(b.name))
      // show speakers without avatars last
      .sort((a, b) => {
        if (a.avatar && !b.avatar) return -1
        if (!a.avatar && b.avatar) return 1
        return 0
      })
  )
}

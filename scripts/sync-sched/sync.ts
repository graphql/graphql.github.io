#!/usr/bin/env tsx

import assert from "node:assert"
import { parseArgs } from "node:util"
import { join } from "node:path"
import { readFile, writeFile } from "node:fs/promises"
import pLimit from "p-limit"

import {
  getSchedule,
  getSpeakerDetails,
  getSpeakers,
  mergeSpeaker,
  RequestContext,
} from "@/app/conf/_api/sched-client"
import type { ConferenceYear, SchedSpeaker } from "@/app/conf/_api/sched-types"

/**
 * Sched API rate limit is 30 requests per minute per token.
 * This scripts fires:
 *  - one request for the entire schedule which overwritten
 *  - one request for the list of speakers with partial details
 *  - and N requests for the full details of each speaker
 */
const DEFAULT_SPEAKER_DETAILS_REQUEST_QUOTA = 10

const PRINT_UNCHANGED = false

const unsafeKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

;(async function main() {
  try {
    const { values } = parseArgs({
      options: {
        year: {
          type: "string",
          short: "y",
        },
        quota: {
          type: "string",
          short: "q",
        },
        help: {
          type: "boolean",
          short: "h",
        },
      },
    })

    if (values.help) {
      help()
      process.exit(0)
    }

    const year = parseInt(
      values.year || new Date().getFullYear().toString(),
    ) as ConferenceYear
    const quota = parseInt(
      values.quota || DEFAULT_SPEAKER_DETAILS_REQUEST_QUOTA.toString(),
    )

    console.log(`Syncing schedule for year: ${year}`)

    const token = process.env[`SCHED_ACCESS_TOKEN_${year}`]
    assert(token, `SCHED_ACCESS_TOKEN_${year} is not set`)

    await sync(year, quota, token)
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unknown option")) {
      console.error(`Error: ${error.message}`)
      help()
      process.exit(1)
    }
    throw error
  }
})()

async function sync(
  year: ConferenceYear,
  detailsRequestsQuota: number,
  token: string,
) {
  const apiUrl = {
    2023: "https://graphqlconf23.sched.com/api",
    2024: "https://graphqlconf2024.sched.com/api",
    2025: "https://graphqlconf2025.sched.com/api",
  }[year]

  assert(apiUrl, `API URL for year ${year} not found`)

  const ctx: RequestContext = { apiUrl, token }

  const speakersFilePath = join(import.meta.dirname, "speakers.json")
  const scheduleFilePath = join(import.meta.dirname, `schedule-${year}.json`)

  console.log("Getting schedule and speakers list...")

  const schedule = getSchedule(ctx)
  const thisYearSpeakers = getSpeakers(ctx)
  const existingSchedule = readFile(scheduleFilePath, "utf-8").then(JSON.parse)
  const existingSpeakers = readFile(speakersFilePath, "utf-8").then(JSON.parse)

  const scheduleComparison = compare(
    await existingSchedule,
    await schedule,
    "id",
  )
  printComparison(scheduleComparison, "sessions", "id")

  const writeSchedule = writeFile(
    scheduleFilePath,
    JSON.stringify(await schedule, null, 2),
  )

  const speakerComparison = compare(
    await existingSpeakers.then(data => data.speakers),
    await thisYearSpeakers.then(speakers =>
      speakers.map(s => ({
        ...s,
        _years: [year as ConferenceYear],
      })),
    ),
    "username",
    { merge: mergeSpeaker },
  )

  await updateSpeakerDetails(ctx, speakerComparison, detailsRequestsQuota, year)

  printComparison(speakerComparison, "speakers", "username", {
    printRemoved: false,
  })

  const { keptRemovedSpeakers, actuallyRemovedSpeakers } =
    partitionRemovedSpeakers(speakerComparison.removed, year)

  if (actuallyRemovedSpeakers.length > 0) {
    console.log(
      bold(
        `${actuallyRemovedSpeakers.length} speakers removed (only appeared in ${year}):`,
      ),
    )
    for (const speaker of actuallyRemovedSpeakers) {
      console.log(red(`- ${speaker.username}`))
    }
  }

  const updatedSpeakers = [
    ...keptRemovedSpeakers,
    ...speakerComparison.unchanged,
    ...speakerComparison.changed.map(change => change.new),
    ...speakerComparison.added,
  ].sort((a, b) => a.username.localeCompare(b.username))

  const equal: string[][] = (await existingSpeakers).equal
  updateEqualitySets(equal, updatedSpeakers)

  const writeSpeakers = writeFile(
    speakersFilePath,
    JSON.stringify(
      {
        equal,
        speakers: updatedSpeakers,
      },
      null,
      2,
    ),
  )

  await writeSchedule
  await writeSpeakers
}

async function updateSpeakerDetails(
  ctx: RequestContext,
  /** mutated in place */
  comparison: Comparison<SchedSpeaker>,
  quota: number,
  year: ConferenceYear,
) {
  const locations = new Map<
    string /* username */,
    [key: keyof Comparison<unknown>, index: number]
  >()

  for (const key of unsafeKeys(comparison)) {
    const items = comparison[key as keyof Comparison<SchedSpeaker>]
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      if (!("username" in item)) item = item.new
      locations.set(item.username, [key, i])
    }
  }

  const allSpeakers = [
    ...comparison.unchanged,
    ...comparison.changed.map(change => change.new),
    ...comparison.added,
  ]
  const byUpdateTime = allSpeakers
    .filter(x => x._years?.includes(year))
    .sort((a, b) => {
      const aTime = a["~syncedDetailsAt"] ?? 0
      const bTime = b["~syncedDetailsAt"] ?? 0
      return aTime - bTime
    })

  const toUpdate = byUpdateTime.slice(0, quota)
  console.log(`Fetching additional details for ${toUpdate.length} speakers...`)
  console.log(
    toUpdate
      .map(s =>
        [
          `- ${s.username.padEnd(32, " ")}`,
          s["~syncedDetailsAt"]
            ? `last synced at ${new Date(s["~syncedDetailsAt"]).toLocaleString()}`
            : "without details yet",
        ].join("\t"),
      )
      .join("\n"),
  )

  const limit = pLimit(5)
  const updated = await Promise.all(
    toUpdate.map(speaker =>
      limit(() => getSpeakerDetails(ctx, speaker.username)),
    ),
  )

  for (const speaker of updated) {
    const location = locations.get(speaker.username)
    if (location) {
      const [key, index] = location
      const current =
        key === "changed" ? comparison[key][index].new : comparison[key][index]

      const newValue = mergeSpeaker(current, speaker)
      const diff = objectDiff({ old: current, new: newValue })
      if (diff.trim()) {
        console.log(diff)
      }
      newValue["~syncedDetailsAt"] = Date.now()

      if (key === "changed") {
        comparison[key][index].new = newValue
      } else {
        comparison[key][index] = newValue
      }
    }
  }

  // Re-classify after speaker details update
  const actuallyChanged = comparison.changed.filter(
    change => !deepStrictEqualWithoutInternals(change.old, change.new),
  )
  const nowUnchanged = comparison.changed
    .filter(change => deepStrictEqualWithoutInternals(change.old, change.new))
    .map(change => change.new)

  comparison.changed = actuallyChanged
  comparison.unchanged.push(...nowUnchanged)
}

function help() {
  return console.log("Usage: tsx sync.ts --year <year>")
}

function partitionRemovedSpeakers(
  removedSpeakers: SchedSpeaker[],
  currentYear: ConferenceYear,
) {
  const keptRemovedSpeakers: SchedSpeaker[] = []
  const actuallyRemovedSpeakers: SchedSpeaker[] = []

  for (const speaker of removedSpeakers) {
    // We only remove the speakers removed from Sched if they didn't have talks in other years.
    if (speaker._years?.length === 1 && speaker._years[0] === currentYear) {
      actuallyRemovedSpeakers.push(speaker)
    } else {
      keptRemovedSpeakers.push(speaker)
    }
  }

  return { keptRemovedSpeakers, actuallyRemovedSpeakers }
}

type EqualitySet = string[][]

function updateEqualitySets(old: EqualitySet, speakers: SchedSpeaker[]) {
  for (const a of speakers) {
    for (const b of speakers) {
      if (a.username === b.username) continue

      // if the name or one of the social URLs is the same we add the username to a set
      if (
        a.name === b.name ||
        a.socialurls?.some(url =>
          b.socialurls?.some(bUrl => bUrl.url === url.url),
        )
      ) {
        const existing = old.find(
          set => set.includes(a.username) || set.includes(b.username),
        )
        if (existing) {
          const length = existing.length
          const newSet = [...new Set([...existing, a.username, b.username])]
          if (newSet.length !== length) {
            existing.length = 0
            existing.push(...newSet)
            console.log("Found more duplicate speakers:", newSet)
          }
        } else {
          old.push([a.username, b.username])
          console.log("Found duplicate speakers:", a.username, b.username)
        }
      }
    }
  }
}

// #region utility

type Change<T> = { old: T; new: T }
type Comparison<T> = {
  added: T[]
  removed: T[]
  changed: Change<T>[]
  unchanged: T[]
}

function compare<T extends object>(
  olds: T[],
  news: T[],
  key: keyof T,
  options: { merge?: (oldItem: T, newItem: T) => T } = {},
) {
  const oldMap = new Map(olds.map(o => [o[key], o]))
  const newMap = new Map(news.map(n => [n[key], n]))

  const added: T[] = []
  const removed: T[] = []
  const changed: Change<T>[] = []
  const unchanged: T[] = []

  for (const newItem of news) {
    const oldItem = oldMap.get(newItem[key])
    if (oldItem) {
      if (deepStrictEqualWithoutInternals(oldItem, newItem)) {
        unchanged.push(oldItem)
      } else {
        changed.push({
          old: oldItem,
          new: options.merge ? options.merge(oldItem, newItem) : newItem,
        })
      }
    } else {
      added.push(newItem)
    }
  }

  for (const oldItem of olds) {
    if (!newMap.has(oldItem[key])) {
      removed.push(oldItem)
    }
  }

  return { added, removed, changed, unchanged }
}

function printComparison<T extends object>(
  comparison: Comparison<T>,
  name: string,
  key: keyof T,
  options: { printRemoved?: boolean } = { printRemoved: true },
) {
  if (comparison.added.length > 0) {
    console.log(bold(`${comparison.added.length} ${name} added.`))
    for (const item of comparison.added) {
      console.log(green(`+ ${JSON.stringify(item)}`))
    }
  }

  if (options.printRemoved) {
    if (comparison.removed.length > 0) {
      console.log(bold(`${comparison.removed.length} ${name} removed.`))
      for (const item of comparison.removed) {
        console.log(red(`- ${JSON.stringify(item)}`))
      }
    }
  }

  if (comparison.unchanged.length > 0) {
    console.log(bold(`${comparison.unchanged.length} ${name} not changed.`))
    if (PRINT_UNCHANGED) {
      for (const item of comparison.unchanged) {
        console.log(yellow(`{ ${String(key)}: ${item[key]}, ... }`))
      }
    }
  }

  if (comparison.changed.length > 0) {
    console.log(bold(`${comparison.changed.length} ${name} changed.`))
    for (const change of comparison.changed) {
      console.log(change.new[key] + "\n", objectDiff(change))
    }
  }
}

function objectDiff<T extends object>(change: Change<T>): string {
  const allKeys = [
    ...new Set([...unsafeKeys(change.old), ...unsafeKeys(change.new)]),
  ]
    .sort()
    .filter(key => !String(key).startsWith("~"))

  const diff = allKeys
    .map(key => {
      const oldValue = change.old[key]
      const newValue = change.new[key]

      if (JSON.stringify(oldValue) === JSON.stringify(newValue)) {
        return null
      }

      return { key, oldValue, newValue }
    })
    .filter(x => !!x)

  return diff
    .map(diff => {
      return `${yellow(String(diff.key))}:\n  ${red("-" + JSON.stringify(diff.oldValue))}\n  ${green("+" + JSON.stringify(diff.newValue))}`
    })
    .join("\n")
}

function green(text: string) {
  return `\x1b[32m${text}\x1b[0m`
}

function red(text: string) {
  return `\x1b[31m${text}\x1b[0m`
}

function yellow(text: string) {
  return `\x1b[33m${text}\x1b[0m`
}

function bold(text: string) {
  return `\x1b[1m${text}\x1b[0m`
}

function deepStrictEqualWithoutInternals(a: unknown, b: unknown): boolean {
  if (a === b) return true

  if (a === null || b === null || a === undefined || b === undefined) {
    return a === b
  }

  if (typeof a !== typeof b) return false

  if (typeof a !== "object") return false

  if (Array.isArray(a) !== Array.isArray(b)) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
      if (!deepStrictEqualWithoutInternals(a[i], b[i])) {
        return false
      }
    }
    return true
  }

  const aObj = a as Record<string, unknown>
  const bObj = b as Record<string, unknown>

  const aKeys = Object.keys(aObj).filter(key => !key.startsWith("~"))
  const bKeys = Object.keys(bObj).filter(key => !key.startsWith("~"))

  if (aKeys.length !== bKeys.length) return false

  aKeys.sort()
  bKeys.sort()

  for (const key of aKeys) {
    if (!deepStrictEqualWithoutInternals(aObj[key], bObj[key])) {
      return false
    }
  }

  return true
}

// #endregion utility

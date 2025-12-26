#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises"
import { type } from "arktype"

const CALENDAR_ID =
  "linuxfoundation.org_ik79t9uuj2p32i3r203dgv5mo8@group.calendar.google.com"
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY
const OUTPUT_FILE = new URL("./working-group-events.ndjson", import.meta.url)
const DAYS_BACK = 30
const DAYS_TO_KEEP = 90
const DAYS_AHEAD = 30

const Instant = type({
  "dateTime?": "string",
  "date?": "string", // full day events have just date
})
  .pipe((value): string => {
    if (value.dateTime) return value.dateTime
    if (value.date) return `${value.date}T00:00:00Z`
    throw new Error("Instant is missing date/dateTime")
  })
  .to("string.date")

const calendarEventSchema = type({
  id: "string",
  "summary?": "string",
  "status?": "string",
  "description?": "string",
  "location?": "string",
  start: Instant,
  end: Instant,
  htmlLink: "string.url",
  updated: "string",
})

const responseSchema = type({
  items: calendarEventSchema.array(),
  "nextSyncToken?": "string",
  "nextPageToken?": "string",
})

export type WorkingGroupMeeting =
  typeof calendarEventSchema.inferIntrospectableOut

async function main() {
  if (!API_KEY) {
    console.warn(
      "GOOGLE_CALENDAR_API_KEY is not set, skipping sync (using existing file)",
    )
    return
  }

  const now = new Date()
  const existingMeetings = await readExistingMeetings()
  console.log(`Found ${existingMeetings.length} existing event(s) in file`)

  const lastMeetingStart = existingMeetings.at(-1)?.start ?? null
  const cutoffDate = new Date(
    now.getTime() - DAYS_TO_KEEP * 24 * 60 * 60 * 1000,
  )

  const searchParams = new URLSearchParams({
    key: API_KEY,
    singleEvents: "true",
  })

  const timeMin =
    lastMeetingStart !== null && lastMeetingStart !== undefined
      ? new Date(Math.min(Date.parse(lastMeetingStart), now.getTime()))
      : new Date(now.getTime() - DAYS_BACK * 24 * 60 * 60 * 1000)

  const timeMax = new Date(now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000)
  searchParams.set("timeMin", timeMin.toISOString())
  searchParams.set("timeMax", timeMax.toISOString())
  searchParams.set("orderBy", "startTime")
  console.log(
    `\nSyncing from: ${timeMin.toLocaleDateString()} (${timeMin.toISOString()})`,
  )
  console.log(
    `Limiting to before: ${timeMax.toLocaleDateString()} (${timeMax.toISOString()})`,
  )

  const endpoint = new URL(
    `calendars/${encodeURIComponent(CALENDAR_ID)}/events?${searchParams}`,
    "https://www.googleapis.com/calendar/v3/",
  )

  console.log(`Fetching events for calendar: ${CALENDAR_ID}`)

  const response = await fetch(endpoint)
  const body = await response.json()

  if (!response.ok) {
    const errorDetails = body.error?.message || response.statusText
    throw new Error(
      `Calendar API request failed: ${response.status} ${errorDetails}`,
    )
  }

  const payload = responseSchema.assert(body)

  let newMeetings = payload.items
    .filter(event => event.status !== "cancelled")
    .map(event => calendarEventSchema.out.assert(event))

  if (payload.nextPageToken) {
    let pageToken: string | undefined = payload.nextPageToken
    while (pageToken) {
      const pageParams = new URLSearchParams(searchParams)
      pageParams.set("pageToken", pageToken)
      const pageEndpoint = new URL(
        `${encodeURIComponent(CALENDAR_ID)}/events?${pageParams}`,
        "https://www.googleapis.com/calendar/v3/calendars/",
      )
      const pageResponse = await fetch(pageEndpoint)
      const pageBody = await pageResponse.json()
      if (!pageResponse.ok) {
        throw new Error(`Page fetch failed: ${pageResponse.status}`)
      }
      const pagePayload = responseSchema.assert(pageBody)
      newMeetings = [
        ...newMeetings,
        ...pagePayload.items
          .filter(event => event.status !== "cancelled")
          .map(event => calendarEventSchema.out.assert(event)),
      ]
      pageToken = pagePayload.nextPageToken
    }
  }

  const newIds = new Set(newMeetings.map(meeting => meeting.id))
  const existingIds = new Set(existingMeetings.map(meeting => meeting.id))
  const newCount = Array.from(newIds).filter(id => !existingIds.has(id)).length
  console.log(
    `Fetched ${newMeetings.length} event(s) from API (${newCount} new)`,
  )

  const allMeetings = mergeMeetings(existingMeetings, newMeetings)
  const netChange = allMeetings.length - existingMeetings.length

  if (netChange > 0) {
    console.log(`Added ${netChange} new event(s)`)
  } else if (netChange < 0) {
    console.log(`Removed ${Math.abs(netChange)} event(s)`)
  }
  const cutoffDateStr = cutoffDate.toISOString().split("T")[0]
  const futureLimit = new Date(now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000)
  const futureLimitStr = futureLimit.toISOString().split("T")[0]
  const filteredMeetings = allMeetings.filter(meeting => {
    const startDate = meeting.start.split("T")[0]
    return startDate >= cutoffDateStr && startDate <= futureLimitStr
  })

  console.log(
    `Keeping events from ${cutoffDate.toLocaleDateString()} onwards (${DAYS_TO_KEEP} days)`,
  )
  console.log(
    `Filtered to ${filteredMeetings.length} event(s) after removing old entries`,
  )

  const sortedMeetings = filteredMeetings.sort((a, b) =>
    a.start.localeCompare(b.start),
  )

  const ndjson = sortedMeetings.map(event => JSON.stringify(event)).join("\n")
  const content = sortedMeetings.length > 0 ? `${ndjson}\n` : ""
  await writeFile(OUTPUT_FILE, content, "utf8")

  console.log(
    `Saved ${sortedMeetings.length} event(s) (${newCount} new) to ${OUTPUT_FILE.pathname}`,
  )
}

async function readExistingMeetings(): Promise<WorkingGroupMeeting[]> {
  try {
    const content = await readFile(OUTPUT_FILE, "utf8")
    return content
      .trim()
      .split("\n")
      .filter(line => line.trim())
      .map(line => calendarEventSchema.out.assert(JSON.parse(line)))
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return []
    }
    throw error
  }
}

function mergeMeetings(
  existing: WorkingGroupMeeting[],
  incoming: WorkingGroupMeeting[],
): WorkingGroupMeeting[] {
  const byId = new Map<string, WorkingGroupMeeting>()

  for (const meeting of existing) {
    byId.set(meeting.id, meeting)
  }

  for (const meeting of incoming) {
    const existing = byId.get(meeting.id)
    if (!existing || meeting.updated > existing.updated) {
      byId.set(meeting.id, meeting)
    }
  }

  return Array.from(byId.values())
}

try {
  await main()
} catch (error: unknown) {
  console.error(error)
  process.exit(1)
}

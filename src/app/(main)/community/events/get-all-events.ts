import { join } from "node:path"
import { readFile } from "node:fs/promises"
import { cache } from "react"

import type { WorkingGroupMeeting } from "@/../scripts/sync-working-groups/sync-working-groups"

import { events, type Event } from "./events"

type AnyEvent = Event | WorkingGroupMeeting

const WORKING_GROUP_MEETINGS_FILE = join(
  process.cwd(),
  "scripts/sync-working-groups/working-group-events.ndjson",
)

export const getAllEvents = cache(async () => {
  const workingGroupMeetings = await loadWorkingGroupMeetings()

  let pastEvents: AnyEvent[] = []
  let upcomingEvents: AnyEvent[] = []

  const now = new Date()

  for (const event of events) {
    const date = new Date(event.date)
    if (date < now) {
      pastEvents.push(event)
    } else {
      upcomingEvents.push(event)
    }
  }

  for (const meeting of workingGroupMeetings) {
    if (meeting.start && new Date(meeting.start) < now) {
      pastEvents.push(meeting)
    } else upcomingEvents.push(meeting)
  }

  const getDate = (event: AnyEvent) => {
    if ("date" in event) return new Date(event.date)
    return new Date(event.start)
  }

  function sortByDate(a: AnyEvent, b: AnyEvent) {
    const aDate = getDate(a)
    const bDate = getDate(b)
    return bDate.getTime() - aDate.getTime()
  }

  pastEvents = pastEvents.sort(sortByDate)
  upcomingEvents = upcomingEvents.sort(sortByDate)

  return { pastEvents, upcomingEvents }
})

export const loadWorkingGroupMeetings = cache(async () => {
  try {
    const raw = (await readFile(WORKING_GROUP_MEETINGS_FILE, "utf8")).trim()
    if (!raw) return []
    return raw
      .split("\n")
      .filter(Boolean)
      .map(line => JSON.parse(line) as WorkingGroupMeeting)
  } catch (error) {
    console.error("Failed to read working group meetings", error)
    return []
  }
})

import { join } from "node:path"
import { readFile } from "node:fs/promises"

import { meetups } from "@/components/meetups"

import type { WorkingGroupMeeting } from "@/../scripts/sync-working-groups/sync-working-groups"

import { events, type Event, type Meetup } from "./events"

type AnyEvent = Event | Meetup | WorkingGroupMeeting

const WORKING_GROUP_MEETINGS_FILE = join(
  process.cwd(),
  "scripts/sync-working-groups/working-group-events.ndjson",
)

export async function getAllEvents() {
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

  for (const meetup of meetups) {
    const { next, prev } = meetup.node

    // if next is in the past we treat it as past event
    if (next && new Date(next) < now) {
      pastEvents.push(meetup)
    }
    // if prev is in the past it is obviously a past event
    else if (prev && new Date(prev) < now) {
      pastEvents.push({
        node: {
          ...meetup.node,
          // we disregard .next, it's checked in nexdt if statement
          next: "",
        },
      })
    }

    // if next is in the future, it is an upcoming event
    if (next && new Date(next) >= now) {
      upcomingEvents.push(meetup)
    }
  }

  const getDate = (event: AnyEvent) => {
    if ("date" in event) return new Date(event.date)
    if ("node" in event) return new Date(event.node.next || event.node.prev)
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
}

async function loadWorkingGroupMeetings(): Promise<WorkingGroupMeeting[]> {
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
}

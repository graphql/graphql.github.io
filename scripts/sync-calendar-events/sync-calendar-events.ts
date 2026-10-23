#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises"
import { type } from "arktype"
import ICAL from "ical.js"

const CALENDAR_ID =
  "linuxfoundation.org_ik79t9uuj2p32i3r203dgv5mo8@group.calendar.google.com"
const ICAL_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`
const OUTPUT_FILE = new URL("./calendar-events.ndjson", import.meta.url)
const DAYS_BACK = 36
const DAYS_TO_KEEP = 5 * 365
const DAYS_AHEAD = 500

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

/** An event from the public GraphQL Foundation calendar */
export type CalendarEvent = typeof calendarEventSchema.inferIntrospectableOut

async function main() {
  const now = new Date()
  const existingEvents = await readExistingEvents()
  console.log(`Found ${existingEvents.length} existing event(s) in file`)

  const cutoffDate = new Date(
    now.getTime() - DAYS_TO_KEEP * 24 * 60 * 60 * 1000,
  )
  const timeMin = new Date(now.getTime() - DAYS_BACK * 24 * 60 * 60 * 1000)
  const timeMax = new Date(now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000)

  console.log(
    `\nSyncing from: ${timeMin.toLocaleDateString()} (${timeMin.toISOString()})`,
  )
  console.log(
    `Limiting to before: ${timeMax.toLocaleDateString()} (${timeMax.toISOString()})`,
  )
  console.log(`Fetching events for calendar: ${CALENDAR_ID}`)

  const response = await fetch(ICAL_URL)
  if (!response.ok) {
    throw new Error(
      `Calendar request failed: ${response.status} ${response.statusText}`,
    )
  }

  const newEvents = parseCalendar(await response.text(), timeMin, timeMax)

  const newIds = new Set(newEvents.map(event => event.id))
  const existingIds = new Set(existingEvents.map(event => event.id))
  const newCount = Array.from(newIds).filter(id => !existingIds.has(id)).length
  console.log(
    `Fetched ${newEvents.length} event(s) from calendar (${newCount} new)`,
  )

  const allEvents = mergeEvents(existingEvents, newEvents, timeMin)
  const netChange = allEvents.length - existingEvents.length

  console.log(`Net change: ${(netChange > 0 ? "+" : "") + netChange} event(s)`)

  const cutoffDateStr = cutoffDate.toISOString().split("T")[0]
  const futureLimitStr = timeMax.toISOString().split("T")[0]
  const filteredEvents = allEvents.filter(event => {
    const startDate = event.start.split("T")[0]
    return startDate >= cutoffDateStr && startDate <= futureLimitStr
  })

  console.log(
    `Keeping events from ${cutoffDate.toLocaleDateString()} onwards (${DAYS_TO_KEEP} days)`,
  )
  console.log(
    `Filtered to ${filteredEvents.length} event(s) after removing old entries`,
  )

  const sortedEvents = filteredEvents.sort((a, b) =>
    a.start.localeCompare(b.start),
  )

  const ndjson = sortedEvents.map(event => JSON.stringify(event)).join("\n")
  const content = sortedEvents.length > 0 ? `${ndjson}\n` : ""
  await writeFile(OUTPUT_FILE, content, "utf8")

  console.log(
    `Saved ${sortedEvents.length} event(s) (${newCount} new) to ${OUTPUT_FILE.pathname}`,
  )
}

/**
 * Expands the public iCal feed into one entry per occurrence, with the same
 * ids and links the Calendar API returns with `singleEvents=true`.
 */
function parseCalendar(
  text: string,
  timeMin: Date,
  timeMax: Date,
): CalendarEvent[] {
  const calendar = new ICAL.Component(ICAL.parse(text))
  for (const timezone of calendar.getAllSubcomponents("vtimezone")) {
    ICAL.TimezoneService.register(timezone)
  }

  const eventsByUid = new Map<string, ICAL.Event[]>()
  for (const vevent of calendar.getAllSubcomponents("vevent")) {
    const event = new ICAL.Event(vevent)
    eventsByUid.set(event.uid, [...(eventsByUid.get(event.uid) ?? []), event])
  }

  const calendarEvents: CalendarEvent[] = []

  const add = (
    item: ICAL.Event,
    start: ICAL.Time,
    end: ICAL.Time,
    id: string,
  ) => {
    if (item.component.getFirstPropertyValue("status") === "CANCELLED") return
    const startDate = start.toJSDate()
    if (startDate < timeMin || startDate > timeMax) return

    const updated = (item.component.getFirstPropertyValue("last-modified") ??
      item.component.getFirstPropertyValue("dtstamp")) as ICAL.Time
    const eid = Buffer.from(
      `${id} ${CALENDAR_ID.slice(0, CALENDAR_ID.indexOf("@") + 2)}`,
    )
      .toString("base64")
      .replace(/=+$/, "")

    calendarEvents.push({
      id,
      summary: item.summary || undefined,
      status: "confirmed",
      description: item.description || undefined,
      location: item.location || undefined,
      start: start.isDate
        ? `${start.toString()}T00:00:00Z`
        : startDate.toISOString(),
      end: end.isDate
        ? `${end.toString()}T00:00:00Z`
        : end.toJSDate().toISOString(),
      htmlLink: `https://www.google.com/calendar/event?eid=${eid}`,
      updated: updated.toJSDate().toISOString(),
    })
  }

  for (const [uid, events] of eventsByUid) {
    // Recurring events share `${id}_R${firstStart}` as UID, instances are `${id}_${start}`
    const baseId = uid
      .replace(/@google\.com$/, "")
      .replace(/_R\d{8}T\d{6}$/, "")
    const master = events.find(event => !event.isRecurrenceException())
    const exceptions = events.filter(event => event.isRecurrenceException())

    const instanceId = (recurrenceId: ICAL.Time) =>
      `${baseId}_${
        recurrenceId.isDate
          ? recurrenceId.toString().replaceAll("-", "")
          : recurrenceId
              .toJSDate()
              .toISOString()
              .replace(/[-:]|\.\d{3}/g, "")
      }`

    if (!master?.isRecurring()) {
      if (master) add(master, master.startDate, master.endDate, baseId)
      // Exceptions whose recurring master is gone from the feed
      for (const exception of exceptions) {
        add(
          exception,
          exception.startDate,
          exception.endDate,
          instanceId(exception.recurrenceId),
        )
      }
      continue
    }

    for (const exception of exceptions) master.relateException(exception)
    const iterator = master.iterator()
    for (let next = iterator.next(); next; next = iterator.next()) {
      const { recurrenceId, item, startDate, endDate } =
        master.getOccurrenceDetails(next)
      if (startDate.toJSDate() > timeMax) break
      add(item, startDate, endDate, instanceId(recurrenceId))
    }
  }

  return calendarEvents
}

async function readExistingEvents(): Promise<CalendarEvent[]> {
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

function mergeEvents(
  existing: CalendarEvent[],
  incoming: CalendarEvent[],
  checkForDeletionsAfter: Date,
): CalendarEvent[] {
  const toDelete = new Set<string>()
  const byId = new Map<string, CalendarEvent>()

  for (const event of existing) {
    byId.set(event.id, event)
    if (Date.parse(event.start) > +checkForDeletionsAfter) {
      toDelete.add(event.id)
    }
  }

  for (const event of incoming) {
    toDelete.delete(event.id)
    const existing = byId.get(event.id)
    if (!existing || event.updated > existing.updated) {
      byId.set(event.id, event)
    }
  }

  if (toDelete.size) {
    console.log(`Deleted ${toDelete.size} event(s)`)
  }
  for (const id of toDelete) {
    byId.delete(id)
  }

  return Array.from(byId.values())
}

try {
  await main()
} catch (error: unknown) {
  console.error(error)
  process.exit(1)
}

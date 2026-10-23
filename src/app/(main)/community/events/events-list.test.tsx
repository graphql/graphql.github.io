import { describe, it } from "node:test"
import { strict as assert } from "node:assert"

import type { CalendarEvent } from "@/../scripts/sync-calendar-events/sync-calendar-events"

import { categorizeEvent } from "./events-list"

describe(categorizeEvent.name, () => {
  it("categorizes conference planning events as working group meetings", () => {
    const event = {
      id: "conference-planning",
      summary: "Conference planning",
      start: "2026-07-29T21:00:00+02:00",
      end: "2026-07-29T22:00:00+02:00",
      htmlLink: "https://calendar.google.com/event?eid=conference-planning",
      updated: "2026-07-26T08:35:09.000Z",
    } satisfies CalendarEvent

    assert.equal(categorizeEvent(event), "working-group")
  })

  it("categorizes virtual meetups as meetups", () => {
    const event = {
      id: "virtual-meetup",
      summary: "GraphQL Virtual Meetup",
      start: "2026-12-08T18:00:00.000Z",
      end: "2026-12-08T19:00:00.000Z",
      htmlLink: "https://calendar.google.com/event?eid=virtual-meetup",
      updated: "2026-10-20T15:13:22.000Z",
    } satisfies CalendarEvent

    assert.equal(categorizeEvent(event), "meetup")
  })
})

import { describe, it } from "node:test"
import { strict as assert } from "node:assert"

import type { WorkingGroupMeeting } from "@/../scripts/sync-working-groups/sync-working-groups"

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
    } satisfies WorkingGroupMeeting

    assert.equal(categorizeEvent(event), "working-group")
  })
})

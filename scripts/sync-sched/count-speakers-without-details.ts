#!/usr/bin/env tsx

import { join } from "node:path"
import { readFile } from "node:fs/promises"

import type { SchedSpeaker } from "@/app/conf/_api/sched-types"

/**
 * We count the number of speakers we didn't sync details for
 * to make sure we have social URLs for everybody.
 */
;(async function main() {
  try {
    const speakersFilePath = join(import.meta.dirname, "speakers.json")

    console.log("Reading speakers.json...")

    const speakersData = await readFile(speakersFilePath, "utf-8")
    const speakers: SchedSpeaker[] = JSON.parse(speakersData)

    const speakersWithoutDetails = speakers.filter(
      speaker => !speaker["~syncedDetailsAt"],
    )

    console.log(`Total speakers: ${speakers.length}`)
    console.log(
      `Speakers without ~syncedDetailsAt: ${speakersWithoutDetails.length}`,
    )

    if (speakersWithoutDetails.length > 0) {
      console.log("\nSpeakers missing details:")
      for (const speaker of speakersWithoutDetails) {
        console.log(`- ${speaker.username} (${speaker.name || "No name"})`)
      }
    }
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
})()

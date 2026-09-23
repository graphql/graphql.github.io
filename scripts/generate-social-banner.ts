#!/usr/bin/env tsx

/**
 * Generates social banners (announcement, one per speaker, CFP) for a
 * virtual meetup from a YAML manifest, and adds the event to
 * src/app/(main)/community/events/events.ts. Expects a dev/prod server to
 * already be running on $URL (default http://localhost:3000) — invoke
 * after `pnpm dev` is up, same convention as `pnpm conference-kit`.
 *
 * Usage: pnpm generate:social-banner path/to/meetup.yaml
 *
 * Manifest schema: see scripts/meetups/EXAMPLE.yaml.
 */

import { parseArgs } from "node:util"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import prettier from "prettier"
import { parse as parseYaml } from "yaml"

interface MeetupManifest {
  event: {
    name: string
    slug: string
    date: string
    location?: string
    eventLink: string
    host: string
    hostLink?: string
  }
  cfp?: {
    deadline?: string
    link?: string
  }
  speakers?: Array<{
    name: string
    title?: string
    company?: string
    photo?: string
    talkTitle?: string
  }>
}

const BASE_URL = process.env.URL ?? "http://localhost:3000"
const OUTPUT_DIR = resolve(process.cwd(), "social-banners")
const EVENTS_FILE = resolve(
  process.cwd(),
  "src/app/(main)/community/events/events.ts",
)
const EVENTS_ARRAY_ANCHOR = "const allEvents: Event[] = ["

function formatEventDate(iso: string) {
  const formatted = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(iso))
  return `${formatted} UTC`
}

function formatEventDateOnly(iso: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(iso))
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function fetchBanner(type: string, data: unknown) {
  const url = `${BASE_URL}/social/meetup-banner?type=${type}&data=${encodeURIComponent(JSON.stringify(data))}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to generate ${type} banner (${response.status}): ${await response.text()}`,
    )
  }
  return Buffer.from(await response.arrayBuffer())
}

function buildEventEntry(event: MeetupManifest["event"]) {
  const fields: Record<string, string> = {
    name: event.name,
    slug: event.slug,
    location: event.location ?? "Zoom",
    date: event.date,
    eventLink: event.eventLink,
    host: event.host,
  }
  if (event.hostLink) fields.hostLink = event.hostLink
  fields.kind = "meetup"

  const body = Object.entries(fields)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(", ")

  return `{ ${body} },`
}

async function addEventToCommunityEvents(event: MeetupManifest["event"]) {
  const source = await readFile(EVENTS_FILE, "utf8")

  if (source.includes(`slug: "${event.slug}"`)) {
    console.log(
      `[social-banner] events.ts already has slug "${event.slug}", skipping`,
    )
    return
  }

  const anchorIndex = source.indexOf(EVENTS_ARRAY_ANCHOR)
  if (anchorIndex === -1) {
    throw new Error(
      `Could not find "${EVENTS_ARRAY_ANCHOR}" in ${EVENTS_FILE} — has the file changed shape?`,
    )
  }

  const insertAt = anchorIndex + EVENTS_ARRAY_ANCHOR.length
  const updated =
    source.slice(0, insertAt) +
    `\n  ${buildEventEntry(event)}` +
    source.slice(insertAt)

  const config = await prettier.resolveConfig(EVENTS_FILE)
  const formatted = await prettier.format(updated, {
    ...config,
    filepath: EVENTS_FILE,
  })

  await writeFile(EVENTS_FILE, formatted)
  console.log(`[social-banner] added "${event.name}" to events.ts`)
}

async function main() {
  const { positionals } = parseArgs({ allowPositionals: true })
  const manifestPath = positionals[0]

  if (!manifestPath) {
    console.error("Usage: pnpm generate:social-banner <manifest.yaml>")
    process.exit(1)
  }

  const manifest = parseYaml(
    await readFile(resolve(process.cwd(), manifestPath), "utf8"),
  ) as MeetupManifest

  const { event, cfp, speakers } = manifest

  for (const field of ["name", "slug", "date", "eventLink", "host"] as const) {
    if (!event?.[field]) {
      throw new Error(`Manifest is missing required field "event.${field}"`)
    }
  }

  const location = event.location ?? "Zoom"
  const date = formatEventDate(event.date)
  const outDir = resolve(OUTPUT_DIR, event.slug)
  await mkdir(outDir, { recursive: true })

  const announcement = await fetchBanner("announcement", {
    title: event.name,
    date,
    location,
    host: event.host,
    eventLink: event.eventLink,
  })
  await writeFile(resolve(outDir, "announcement.png"), announcement)
  console.log("[social-banner] wrote announcement.png")

  for (const speaker of speakers ?? []) {
    const png = await fetchBanner("speaker", {
      name: speaker.name,
      title: speaker.title,
      company: speaker.company,
      photo: speaker.photo,
      talkTitle: speaker.talkTitle,
      eventName: event.name,
      date,
      location,
    })
    const filename = `speaker-${slugify(speaker.name)}.png`
    await writeFile(resolve(outDir, filename), png)
    console.log(`[social-banner] wrote ${filename}`)
  }

  if (cfp) {
    const png = await fetchBanner("cfp", {
      eventName: event.name,
      date,
      location,
      deadline: cfp.deadline ? formatEventDateOnly(cfp.deadline) : undefined,
      link: cfp.link,
    })
    await writeFile(resolve(outDir, "cfp.png"), png)
    console.log("[social-banner] wrote cfp.png")
  }

  await addEventToCommunityEvents(event)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

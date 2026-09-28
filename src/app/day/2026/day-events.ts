import type { EventSession } from "./components/event-schedule-section"
import {
  amsterdamSessions,
  AMSTERDAM_TIMEZONE,
  tagColors as amsterdamTagColors,
} from "./amsterdam/schedule-data"
import {
  bengaluruSessions,
  BENGALURU_TIMEZONE,
  tagColors as bengaluruTagColors,
} from "./bengaluru/schedule-data"
import {
  londonSessions,
  LONDON_TIMEZONE,
  tagColors as londonTagColors,
} from "./london/schedule-data"
import {
  melbourneSessions,
  MELBOURNE_TIMEZONE,
  tagColors as melbourneTagColors,
} from "./melbourne/schedule-data"
import {
  nycSessions,
  NYC_TIMEZONE,
  tagColors as nycTagColors,
} from "./nyc/schedule-data"
import {
  singaporeSessions,
  SINGAPORE_TIMEZONE,
  tagColors as singaporeTagColors,
} from "./singapore/schedule-data"

export interface DayEvent {
  city: string
  /** Short date shown in social previews. */
  date: string
  location: string
  timezone: string
  sessions: EventSession[]
  tagColors: Record<string, string>
}

/** Keyed by the city's URL segment under /day/2026/. */
export const dayEvents = {
  singapore: {
    city: "Singapore",
    date: "Apr 14-15, 2026",
    location: "Singapore",
    timezone: SINGAPORE_TIMEZONE,
    sessions: singaporeSessions,
    tagColors: singaporeTagColors,
  },
  nyc: {
    city: "NYC",
    date: "May 13-14, 2026",
    location: "Convene 360 Madison, New York",
    timezone: NYC_TIMEZONE,
    sessions: nycSessions,
    tagColors: nycTagColors,
  },
  amsterdam: {
    city: "Amsterdam",
    date: "Jun 9-10, 2026",
    location: "Tolhuistuin, Amsterdam",
    timezone: AMSTERDAM_TIMEZONE,
    sessions: amsterdamSessions,
    tagColors: amsterdamTagColors,
  },
  bengaluru: {
    city: "Bengaluru",
    date: "Aug 19-20, 2026",
    location: "Conrad Bengaluru, India",
    timezone: BENGALURU_TIMEZONE,
    sessions: bengaluruSessions,
    tagColors: bengaluruTagColors,
  },
  london: {
    city: "London",
    date: "Oct 1, 2026",
    location: "Convene Sancroft, London",
    timezone: LONDON_TIMEZONE,
    sessions: londonSessions,
    tagColors: londonTagColors,
  },
  melbourne: {
    city: "Melbourne",
    date: "Oct 29, 2026",
    location: "Melbourne, Australia",
    timezone: MELBOURNE_TIMEZONE,
    sessions: melbourneSessions,
    tagColors: melbourneTagColors,
  },
  paris: {
    city: "Paris",
    date: "Dec 1-3, 2026",
    location: "CNIT Forest, Paris",
    timezone: "Europe/Paris",
    sessions: [],
    tagColors: {},
  },
} satisfies Record<string, DayEvent>

export type DayEventSlug = keyof typeof dayEvents

export function findDayTalk(city: string, id: string) {
  const event: DayEvent | undefined = dayEvents[city as DayEventSlug]
  const session = event?.sessions.find(s => s.uuid === id)
  return event && session ? { event, session } : undefined
}

export function getDayTalkParams() {
  return Object.entries(dayEvents).flatMap(([city, event]) =>
    event.sessions.map(s => ({ city, id: s.uuid })),
  )
}

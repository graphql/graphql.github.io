export type ScheduleSession = {
  id: string
  active: "Y" | "N"
  audience: string
  /**
   * can include HTML tags
   */
  description: string
  event_end: string
  event_start: string
  event_subtype: string
  event_type: string
  name: string
  venue: string
  /**
   * This can actually be audience too.
   */
  company: string
  speakers?: SchedSpeaker[]
  files?: { name: string; path: string }[]
}

export type SchedSpeaker = {
  username: string
  name: string
  about: string
  company?: string
  position?: string
  avatar?: string
  url?: string
  role?: string
  location?: string
  /* merged on conflict */
  socialurls: { service: string; url: string }[]
  /* unix timestamp, ignored when diffing */
  ["~syncedDetailsAt"]?: number
  /* added on export, merged on conflict */
  _years: ConferenceYear[]
}

export type ConferenceYear = 2026 | 2025 | 2024 | 2023

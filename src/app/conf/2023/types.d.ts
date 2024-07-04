export type ScheduleSession = {
  id: string
  audience: string
  description: string
  event_end: string
  event_start: string
  event_subtype: string
  event_type: string
  name: string
  venue: string
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
  role: string
  location?: string
  socialurls: { service: string; url: string }[]
  year: "2024" | "2023"
}

import { ScheduleSession } from "./types"

export const eventsColors: Record<string, string> = {
  Breaks: "#a7b7c4",
  "Keynote Sessions": "#a887ee",
  "Lightning Talks": "#1a5b77",
  "Session Presentations": "#7c399b",
  Workshops: "#637cff",
  Unconference: "#a07eff",
}

export function getEventTitle(
  event: ScheduleSession,
  speakers: string[],
): string {
  if (!speakers) {
    return event.name
  }

  speakers?.forEach(speaker => {
    const speakerInTitle = event.name.indexOf(`- ${speaker.replace("ı", "i")}`)
    if (speakerInTitle > -1) {
      event.name = event.name.slice(0, speakerInTitle)
    }
  })

  return event.name
}

import { ScheduleSession } from "../components/Conf/Schedule/ScheduleList"

export function getEventTitle(
  event: ScheduleSession,
  speakers: string[] | undefined
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

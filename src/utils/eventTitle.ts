import { ScheduleSession } from "../components/Conf/Schedule/ScheduleList"

export function getEventTitle(
  event: ScheduleSession,
  speakers: string[] | undefined
): string {
  if (!speakers) {
    return event.name
  }

  let speakerInTitle = -1
  speakers?.forEach(speaker => {
    speakerInTitle = event.name.indexOf(`- ${speaker.replace("ı", "i")}`)
  })

  if (speakerInTitle === -1) {
    return event.name
  }

  return event.name.substring(0, speakerInTitle)
}

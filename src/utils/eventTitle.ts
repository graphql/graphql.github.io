import { ScheduleSession } from "../components/Conf/Schedule/ScheduleList"

export function getEventTitle(
  event: ScheduleSession,
  speaker: string | undefined
): string {
  if (!speaker) {
    return event.name
  }

  console.log(speaker, event)
  const speakerInTitle = event.name.indexOf(`- ${speaker.replace("ı", "i")}`)

  if (speakerInTitle === -1) {
    return event.name
  }

  return event.name.substring(0, speakerInTitle)
}

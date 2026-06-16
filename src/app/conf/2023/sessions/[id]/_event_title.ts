import { ScheduleSession } from "@/app/conf/_api/sched-types"

export function getEventTitle(
  event: ScheduleSession,
  speakers: string[],
): string {
  let { name } = event

  if (!speakers) {
    return name
  }

  speakers?.forEach(speaker => {
    const speakerInTitle = name.indexOf(`- ${speaker.replace("ı", "i")}`)
    if (speakerInTitle > -1) {
      name = name.slice(0, speakerInTitle)
    }
  })

  return name
}

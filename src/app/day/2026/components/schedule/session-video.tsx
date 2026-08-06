import clsx from "clsx"
import { findBestMatch } from "string-similarity"

import { SchedSpeaker, ScheduleSession } from "@/app/conf/_api/sched-types"

import { getEventTitle } from "../../utils"

export interface SessionVideoProps {
  video: {
    id: string
    title: string
  }
  className?: string
}

export function SessionVideo({ video, className }: SessionVideoProps) {
  return (
    <iframe
      className={clsx("mx-auto aspect-video w-full", className)}
      src={`https://youtube.com/embed/${video.id}`}
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export function buildVideoIndex(
  schedule: ScheduleSession[],
  speakers: SchedSpeaker[],
  videos: { id: string; title: string }[],
) {
  const sessionIdByTitle: Record<string, string> = Object.create(null)
  for (const session of schedule) {
    const speakerNames = (session.speakers || []).map(speaker => {
      const s = speakers.find(s => s.username === speaker.username)
      if (!s) {
        throw new Error(
          `Speaker "${speaker.username}" not found for "${session.name}"`,
        )
      }
      return s.name
    })

    const eventTitle = getEventTitle(session, speakerNames)
    const title = `${eventTitle} ${speakerNames.join(" ")}`
    sessionIdByTitle[title] = session.id
  }

  const videoBySessionId: Record<string, { id: string; title: string }> =
    Object.create(null)
  if (Object.keys(sessionIdByTitle).length > 0) {
    for (const video of videos) {
      const result = findBestMatch(video.title, Object.keys(sessionIdByTitle))
      if (result.ratings[result.bestMatchIndex].rating < 0.17) {
        console.warn(
          `Could not find suitable schedule item for video "${video.title}"`,
        )
        continue
      }
      const recordingTitle = result.bestMatch.target
      const sessionId = sessionIdByTitle[recordingTitle]
      videoBySessionId[sessionId] = video
    }
  }

  return (event: ScheduleSession) => videoBySessionId[event.id]
}

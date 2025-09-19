import clsx from "clsx"
import { findBestMatch } from "string-similarity"

import { ScheduleSession } from "@/app/conf/2023/types"

import { videos } from "../../_videos"
import { speakers, schedule } from "../../_data"
import { getEventTitle } from "../../utils"

const sessionIdByTitle = Object.create(null)
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

const videoBySessionId = Object.create(null)
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

export function findVideo(event: ScheduleSession, _eventTitle: string) {
  return videoBySessionId[event.id]
}

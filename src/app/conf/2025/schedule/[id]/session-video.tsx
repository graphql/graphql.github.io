import clsx from "clsx"
import { findBestMatch } from "string-similarity"

import { ScheduleSession } from "@/app/conf/2023/types"

import { videos } from "../../_videos"

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

export function findVideo(event: ScheduleSession, eventTitle: string) {
  if (videos.length === 0) {
    return null
  }

  const result = findBestMatch(
    `${eventTitle} ${event.speakers!.map(e => e.name).join(" ")}`,
    videos.map(e => e.title),
  )

  if (result.ratings[result.bestMatchIndex].rating < 0.17) {
    return null
  }

  const recordingTitle = result.bestMatch

  const video = videos.find(e => e.title === recordingTitle.target)

  if (!video) {
    throw new Error(`Video "${recordingTitle.target}" not found`)
  }

  return video
}

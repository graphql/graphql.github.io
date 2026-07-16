import clsx from "clsx"
import { findBestMatch } from "string-similarity"

import { ScheduleSession } from "@/app/conf/2023/types"

import { videos } from "../../_videos"
import { speakers, schedule } from "../../_data"
import { getEventTitle } from "../../utils"

// Reuse the exact Gold-tier logos and links from the sponsors section so the
// recording credit stays in sync with components/sponsors.tsx.
import TheGuild from "public/img/conf/Sponsors/TheGuild.svg?svgr"
import Wundergraph from "public/img/conf/Sponsors/WunderGraph-graded.svg?svgr"

const videoSponsors = [
  {
    name: "The Guild",
    link: "https://the-guild.dev/graphql/hive",
    icon: TheGuild,
  },
  {
    name: "Wundergraph",
    link: "https://wundergraph.com/",
    icon: Wundergraph,
  },
]

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
    <div className={clsx("mx-auto w-full", className)}>
      <VideoSponsors />
      <iframe
        className="aspect-video w-full"
        src={`https://youtube.com/embed/${video.id}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

function VideoSponsors() {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 text-center">
      <span className="typography-body-sm text-neu-700 dark:text-neu-800">
        Session recordings brought to you by our Gold Sponsors
      </span>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {videoSponsors.map(({ name, link, icon: Icon }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noreferrer"
            title={name}
            className="flex items-center justify-center hover:opacity-80 dark:opacity-90 dark:hover:opacity-100"
          >
            <Icon className="size-auto max-h-8 shrink-0 object-contain [&_path]:fill-[#15252D] dark:[&_path]:fill-white" />
          </a>
        ))}
      </div>
    </div>
  )
}

export function findVideo(event: ScheduleSession, _eventTitle: string) {
  return videoBySessionId[event.id]
}

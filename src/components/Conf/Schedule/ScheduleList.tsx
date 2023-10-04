import React, { ComponentProps, FC } from "react"
import { eventsColors } from "../../../utils/eventsColors"
import { SchedSpeaker } from "../Speakers/Speaker"

export interface ScheduleSession {
  id: string
  audience: string
  description: string
  event_end: string
  event_start: string
  event_subtype: string
  event_type: string
  name: string
  venue: string
  speakers?: SchedSpeaker[] | string
  files?: { name: string; path: string }[]
}

interface Props {
  scheduleData: ScheduleSession[]
}

const ScheduleList: FC<Props> = ({ scheduleData }) => {
  return (
    <div className="grid grid-cols-3 gap-6 not-prose">
      {scheduleData.map(session => {
        const speakers = session.speakers as SchedSpeaker[]

        const borderColor = eventsColors[session.event_type]

        const countSpeakers = speakers.length > 3 ? 3 : speakers.length

        const gridColumn = `span ${countSpeakers} / span ${countSpeakers}`
        return (
          <a
            key={session.event_key}
            className="shadow-2xl rounded-md overflow-hidden flex flex-col text-current hover:no-underline focus:no-underline"
            style={{ gridColumn }}
            href={`/conf/schedule/${session.id}`}
          >
            <div className="bg-[#251F30] text-white flex justify-between py-5 px-7 relative">
              <div className="text-sm flex flex-col gap-2 [*:hover>&]:opacity-0 transition-opacity duration-300 opacity-100">
                <div className="flex gap-3">
                  <div className="w-4 text-center">▶</div>
                  Recording
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-4 h-4" />
                  {(Number(new Date(session.event_end)) -
                    Number(new Date(session.event_start))) /
                    1000 /
                    60}
                  m
                </div>
              </div>
              <span className="font-sans text-lg leading-none">↗</span>
              <div className="transition-opacity duration-300 opacity-0 [*:hover>&]:opacity-100 flex items-center justify-center leading-none rounded-full bg-gray-100/10 absolute top-7 left-1/2 translate-x-1/2 p-2">
                ▶
              </div>
            </div>
            <div className="p-7 flex flex-col grow">
              <span
                className="group-hover:no-underline flex py-1 px-3 mb-3 self-start justify-center items-center text-white border rounded-3xl text-sm"
                style={{
                  backgroundColor: borderColor,
                }}
              >
                {session.event_type}
              </span>
              <b className="grow">{session.name}</b>
              <div className="flex gap-5 flex-wrap">
                {speakers.map(s => (
                  <div
                    className="flex items-center gap-5 mt-5"
                    key={s.username}
                  >
                    <img
                      src={s.avatar}
                      width="70"
                      height="70"
                      className="object-cover rounded-full shrink-0 !m-0"
                    />
                    <div className="flex flex-col text-sm">
                      <b>{s.name}</b>
                      <span>{s.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

function ClockIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="11.489"
        cy="11.6252"
        r="8.53681"
        stroke="white"
        strokeWidth="1.65229"
      />
      <path
        d="M11.5205 7.59863V12.0107L14.2194 14.1285"
        stroke="white"
        strokeWidth="1.65229"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ScheduleList

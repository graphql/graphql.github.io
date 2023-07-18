import { format, parseISO } from "date-fns"
import React, { FC, useEffect, useState } from "react"

interface Session {
  speakers: string
}
interface SessionGroup {
  date: string
  sessions: Session[]
}

interface Props {
  scheduleData: any
  filterSchedule?: (sessions: Session[]) => Session[]
}
const ScheduleList: FC<Props> = ({ filterSchedule, scheduleData }) => {
  const [sessions, setSessions] = useState<SessionGroup[]>([])

  useEffect(() => {
    const filteredSessions = !!filterSchedule
      ? filterSchedule(scheduleData)
      : scheduleData

    // Sort sessions in ascending order by date
    const sortedSessions = filteredSessions.sort(
      (a: any, b: any) =>
        new Date(a.event_start).getTime() - new Date(b.event_start).getTime()
    )

    // Group sessions by date
    const sessionGroups: { [date: string]: any[] } = {}

    sortedSessions.forEach((session: any) => {
      const date = format(parseISO(session.event_start), "yyyy-MM-dd")
      if (!sessionGroups[date]) {
        sessionGroups[date] = []
      }
      sessionGroups[date].push(session)
    })

    // Convert session groups to an array and sort by date
    const sessionGroupArray = Object.keys(sessionGroups)
      .sort()
      .map(date => ({ date, sessions: sessionGroups[date] }))

    setSessions(sessionGroupArray)
  }, [])

  return (
    <>
      {sessions.map(({ date, sessions }) => (
        <div key={date}>
          <h3 className="mt-10 mb-5">
            {format(parseISO(date), "EEEE, MMMM d")}
          </h3>
          {sessions.map((session: any) => (
            <div key={session.id}>
              <div className="flex mb-4">
                <span className="mr-5 whitespace-nowrap text-gray-500 font-light lg:w-28 lg:mt-0 lg:text-base w-20 text-sm mt-3">
                  {format(parseISO(session.event_start), "hh:mmaaaa 'PDT'")}
                </span>
                <div
                  style={{
                    backgroundColor: getSessionColor(
                      session.event_type.toLowerCase()
                    ),
                  }}
                  className="text-black py-2 px-4 rounded-md shadow-lg w-full"
                >
                  {session.name} ({/* Sigular */}
                  {(session.event_type as string).substring(
                    0,
                    session.event_type.length - 1
                  )}
                  )
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default ScheduleList

function getSessionColor(sessionType: string) {
  if (sessionType.includes("breaks")) {
    return "#fffc5c"
  } else if (sessionType.includes("keynote")) {
    return "#42a1cd"
  } else if (sessionType.includes("lightning")) {
    return "#3db847"
  } else if (sessionType.includes("presentations")) {
    return "#d64292"
  } else if (sessionType.includes("workshops")) {
    return "#f3a149"
  } else {
    return "#E05CAA" // default color if none of the keywords match
  }
}

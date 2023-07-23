import { format, parseISO, compareAsc } from "date-fns"
import React, { FC, useEffect, useState } from "react"
import { eventsColors } from "../../../templates/schedule"

function groupByKey<T>(arr: T[], getKey: (entity: T) => any) {
  return Array.from<[string, T[]]>(
    arr.reduce(
      (entryMap, e) =>
        entryMap.set(getKey(e) as keyof T, [
          ...(entryMap.get(getKey(e) as keyof T) || []),
          e,
        ]),
      new Map()
    )
  )
}

export interface ScheduleSession {
  id: string
  audience: string
  description: string
  event_end: string
  event_start: string
  event_subtype: string
  event_type: string
  name: string
  speakers?: string
}

type Date = string
type ConcurrentSessionsGroups = [Date, ScheduleSession[]][]
type SessionsGroupByDay = [Date, ConcurrentSessionsGroups][]

interface Props {
  showEventType?: boolean
  scheduleData: ScheduleSession[]
  filterSchedule?: (sessions: ScheduleSession[]) => ScheduleSession[]
}
const ScheduleList: FC<Props> = ({
  showEventType,
  filterSchedule,
  scheduleData,
}) => {
  const [groupedSessionsByDay, setGroupedSessionsByDay] =
    useState<SessionsGroupByDay>([])

  useEffect(() => {
    const filteredSortedSchedule = (
      filterSchedule ? filterSchedule(scheduleData) : scheduleData
    ).sort((a, b) =>
      compareAsc(new Date(a.event_start), new Date(b.event_start))
    )

    const groupedConcurrentSessions = groupByKey(
      filteredSortedSchedule,
      e => e.event_start
    )

    const groupedSessionsByDay = groupByKey(
      groupedConcurrentSessions,
      // e[0] is the event date `yyyy/mm/dd hh:mm` and we split it by empty space to only get the day date excluding time.
      e => e[0].split(" ")[0]
    )

    setGroupedSessionsByDay(groupedSessionsByDay)
  }, [])

  return (
    <>
      {groupedSessionsByDay.map(([date, concurrentSessionsGroup]) => (
        <div key={date} className="border-2 border-red-600 text-[#111827]">
          <h3 className="mt-10 mb-5">
            {format(parseISO(date), "EEEE, MMMM d")}
          </h3>
          {concurrentSessionsGroup.map(([sharedStartDate, sessions]) => (
            <div key={`concurrent sessions on ${sharedStartDate}`}>
              <div className="lg:flex-row flex flex-col mb-4">
                <div className="relative">
                  <span className="lg:mr-7 mb-5 whitespace-nowrap text-gray-500 font-light lg:mt-0 text-base mt-3 inline-block lg:w-28 w-20">
                    {format(parseISO(sharedStartDate), "hh:mmaaaa 'PDT'")}
                  </span>
                  <div className="lg:block hidden absolute right-3 top-0 h-full w-0.5 bg-gray-200" />
                </div>
                <div className="lg:flex-row flex flex-col gap-5 relative lg:items-start items-end w-full lg:pl-0 pl-[28px]">
                  <div className="block lg:hidden absolute left-3 top-0 h-full w-0.5 bg-gray-200" />

                  {sessions.map(session => {
                    const singularEventType = (
                      session.event_type as string
                    ).substring(0, session.event_type.length - 1)

                    return session.event_type === "Breaks" ? (
                      <div
                        key={session.id}
                        style={{
                          backgroundColor: getSessionColor(
                            session.event_type.toLowerCase()
                          ),
                        }}
                        className="text-black py-2 px-4 rounded-md shadow-lg w-full h-full font-light"
                      >
                        {showEventType ? singularEventType + " / " : ""}
                        {session.name}
                      </div>
                    ) : (
                      <a
                        href={`/conf/schedule/${session.id}?name=${session.name}`}
                        key={session.id}
                        style={{
                          backgroundColor: getSessionColor(
                            session.event_type.toLowerCase()
                          ),
                        }}
                        className="text-black py-2 px-4 rounded-md shadow-lg w-full h-full font-light underline"
                      >
                        {showEventType ? singularEventType + " / " : ""}
                        {session.name}
                      </a>
                    )
                  })}
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
  return eventsColors.find(e => sessionType.includes(e[0].toLowerCase()))?.[1]
}

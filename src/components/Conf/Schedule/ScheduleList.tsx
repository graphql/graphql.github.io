import { format, parseISO, compareAsc } from "date-fns"
import React, { FC, useReducer } from "react"
import { eventsColors } from "../../../utils/eventsColors"
import { getEventTitle } from "../../../utils/eventTitle"

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

export interface ConcurrentSessions {
  [date: string]: ScheduleSession[]
}

export interface ScheduleSessionsByDay {
  [date: string]: ConcurrentSessions
}

type State = {
  sessions: ScheduleSessionsByDay | undefined
}
type Action =
  | { type: "set-audience"; tags: string[] }
  | { type: "set-subtype"; tags: string[] }
  | { type: "set-eventtype"; tags: string[] }
  | { type: "reset-filters" }
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set-audience": {
      const sessions = Object.entries(state.sessions || {}).reduce(
        (acc, [date, concurrentSessions]) => {
          const sessions = Object.entries(concurrentSessions).reduce(
            (acc, [date, sessions]) => {
              const filteredSessions = sessions.filter(session =>
                action.tags.some(tag => session.audience.includes(tag))
              )
              return {
                ...acc,
                [date]: filteredSessions,
              }
            },
            {} as ConcurrentSessions
          )
          return {
            ...acc,
            [date]: sessions,
          }
        },
        {} as ScheduleSessionsByDay
      )
      return {
        ...state,
        sessions,
      }
    }

    case "set-subtype": {
      const sessions = Object.entries(state.sessions || {}).reduce(
        (acc, [date, concurrentSessions]) => {
          const sessions = Object.entries(concurrentSessions).reduce(
            (acc, [date, sessions]) => {
              const filteredSessions = sessions.filter(session =>
                action.tags.some(tag => session.event_subtype.includes(tag))
              )
              return {
                ...acc,
                [date]: filteredSessions,
              }
            },
            {} as ConcurrentSessions
          )
          return {
            ...acc,
            [date]: sessions,
          }
        },
        {} as ScheduleSessionsByDay
      )
      return {
        ...state,
        sessions,
      }
    }

    case "set-eventtype": {
      const sessions = Object.entries(state.sessions || {}).reduce(
        (acc, [date, concurrentSessions]) => {
          const sessions = Object.entries(concurrentSessions).reduce(
            (acc, [date, sessions]) => {
              const filteredSessions = sessions.filter(session =>
                action.tags.some(tag => session.event_type.includes(tag))
              )
              return {
                ...acc,
                [date]: filteredSessions,
              }
            },
            {} as ConcurrentSessions
          )
          return {
            ...acc,
            [date]: sessions,
          }
        },
        {} as ScheduleSessionsByDay
      )
      return {
        ...state,
        sessions,
      }
    }

    case "reset-filters": {
      return {
        ...state,
        sessions: undefined,
      }
    }

    default:
      return state
  }
}

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
  const [sessionsState, dispatch] = useReducer<typeof reducer, State>(
    reducer,
    {} as State,
    () => {
      const data = filterSchedule ? filterSchedule(scheduleData) : scheduleData

      const filteredSortedSchedule = (data || []).sort((a, b) =>
        compareAsc(new Date(a.event_start), new Date(b.event_start))
      )

      const concurrentSessions: ConcurrentSessions = {}
      filteredSortedSchedule.forEach(session => {
        if (!concurrentSessions[session.event_start]) {
          concurrentSessions[session.event_start] = []
        }
        concurrentSessions[session.event_start].push(session)
      })

      const sessionsByDay: ScheduleSessionsByDay = {}
      Object.entries(concurrentSessions).forEach(([date, sessions]) => {
        const day = date.split(" ")[0]
        if (!sessionsByDay[day]) {
          sessionsByDay[day] = {}
        }
        sessionsByDay[day] = {
          ...sessionsByDay[day],
          [date]: sessions,
        }
      })

      return { sessions: sessionsByDay }
    }
  )

  if (sessionsState.sessions === undefined) {
    return <p>Not available yet. Please check soon.</p>
  }

  return (
    <>
      {Object.entries(sessionsState.sessions).map(
        ([date, concurrentSessionsGroup]) => (
          <div key={date} className="text-gray-800 text-sm">
            <h3 className="mt-10 mb-5">
              {format(parseISO(date), "EEEE, MMMM d")}
            </h3>
            {Object.entries(concurrentSessionsGroup).map(
              ([sessionDate, sessions]) => (
                <div key={`concurrent sessions on ${sessionDate}`}>
                  <div className="lg:flex-row flex flex-col mb-4">
                    <div className="relative">
                      <span className="lg:mr-7 mb-5 whitespace-nowrap text-gray-500 lg:mt-0 mt-3 inline-block lg:w-28 w-20">
                        {format(parseISO(sessionDate), "hh:mmaaaa 'PDT'")}
                      </span>
                      <div className="lg:block hidden absolute right-3 top-0 h-full w-0.5 bg-gray-200" />
                    </div>
                    <div className="lg:flex-row flex flex-col gap-5 relative lg:items-start items-end w-full lg:pl-0 pl-[28px]">
                      <div className="block lg:hidden absolute left-3 top-0 h-full w-0.5 bg-gray-200" />

                      {sessions.map(session => {
                        const eventType = session.event_type.endsWith("s")
                          ? session.event_type.slice(0, -1)
                          : session.event_type

                        const speakers = session.speakers?.split(",") || []
                        const eventTitle = getEventTitle(session, speakers)

                        const borderColor = eventsColors[session.event_type]

                        return session.event_type === "Breaks" ? (
                          <div
                            key={session.id}
                            style={{
                              borderLeft: `10px solid ${borderColor}`,
                              borderRadius: "5px",
                              backgroundColor: "white",
                            }}
                            className="shadow-[-5px_10px_30px_20px_#d0d3da33] font-normal flex items-center py-2 px-4 rounded-md w-full h-full text-black"
                          >
                            {showEventType ? eventType + " / " : ""}
                            {eventTitle}
                          </div>
                        ) : (
                          <a
                            id={`session-${session.id}`}
                            data-tooltip-id="my-tooltip"
                            href={`/conf/schedule/${session.id}?name=${session.name}`}
                            key={session.id}
                            style={{
                              borderLeft: `10px solid ${borderColor}`,
                              borderRadius: "5px",
                              backgroundColor: "white",
                            }}
                            className="group no-underline hover:no-underline shadow-[-5px_10px_30px_20px_#d0d3da33] font-normal relative py-2 px-4 rounded-md w-full h-full text-black"
                          >
                            <div className="flex flex-col justify-start h-full py-3 gap-y-2">
                              {borderColor && (
                                <span
                                  className="group-hover:no-underline flex py-1 px-3 mb-3 self-start justify-center items-center text-white border rounded-3xl"
                                  style={{
                                    backgroundColor: borderColor,
                                  }}
                                >
                                  {eventType}
                                </span>
                              )}
                              <div className="group-hover:underline flex flex-col justify-between h-full gap-y-2">
                                {showEventType ? eventType + " / " : ""}
                                {eventTitle}
                                {speakers.length > 0 && (
                                  <span className="font-light">
                                    {speakers.join(", ")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )
      )}
    </>
  )
}

export default ScheduleList

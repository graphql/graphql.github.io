import { format, parseISO, compareAsc } from "date-fns"
import React, { FC, useEffect, useState } from "react"
import { eventsColors } from "../../../utils/eventsColors"
import { getEventTitle } from "../../../utils/eventTitle"
import Filters from "./Filters"

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
  speakers?: string
}

export interface ConcurrentSessions {
  [date: string]: ScheduleSession[]
}

export interface ScheduleSessionsByDay {
  [date: string]: ConcurrentSessions
}

export type CategoryName = "Audience" | "Talk category" | "Event type"

const filterCategories: Array<{ name: CategoryName; options: string[] }> = [
  {
    name: "Audience",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    name: "Talk category",
    options: [
      "Beyond Javascript",
      "Spec Fusion",
      "Platform and Backend",
      "GraphQL and Data",
      "GraphQL Security",
      "GraphQL in Production",
      "GraphQL Clients",
      "GraphQL Core",
      "Scaling",
      "Emerging Community Trends",
    ],
  },
  {
    name: "Event type",
    options: [
      "Workshops",
      "Unconference",
      "Keynote Sessions",
      "Sponsor Showcase",
      "Session Presentations",
      "Lightning Talks",
      "Events & Experiences",
    ],
  },
]

function getSessionsByDay(
  scheduleData: ScheduleSession[],
  initialFilter:
    | ((sessions: ScheduleSession[]) => ScheduleSession[])
    | undefined,
  filters: Record<CategoryName, string[]>
) {
  const data = initialFilter ? initialFilter(scheduleData) : scheduleData
  const filteredSortedSchedule = (data || []).sort((a, b) =>
    compareAsc(new Date(a.event_start), new Date(b.event_start))
  )

  const concurrentSessions: ConcurrentSessions = {}
  filteredSortedSchedule.forEach(session => {
    const audienceFilter = filters.Audience
    const talkCategoryFilter = filters["Talk category"]
    const eventTypeFilter = filters["Event type"]

    let include = true
    if (audienceFilter.length > 0) {
      include = include && audienceFilter.includes(session.audience)
    }
    if (talkCategoryFilter.length > 0) {
      include = include && talkCategoryFilter.includes(session.event_subtype)
    }
    if (eventTypeFilter.length > 0) {
      include = include && eventTypeFilter.includes(session.event_type)
    }

    if (!include) {
      return
    }

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
      [date]: sessions.sort((a, b) => a.venue.localeCompare(b.venue)),
    }
  })

  return sessionsByDay
}

interface Props {
  showEventType?: boolean
  showFilter?: boolean
  scheduleData: ScheduleSession[]
  filterSchedule?: (sessions: ScheduleSession[]) => ScheduleSession[]
}

const ScheduleList: FC<Props> = ({
  showEventType,
  showFilter = true,
  filterSchedule,
  scheduleData,
}) => {
  const [filtersState, setFiltersState] = useState<
    Record<CategoryName, string[]>
  >({
    Audience: [],
    "Talk category": [],
    "Event type": [],
  })
  const [sessionsState, setSessionState] = useState<ScheduleSessionsByDay>(
    () => {
      return getSessionsByDay(scheduleData, filterSchedule, filtersState)
    }
  )

  useEffect(() => {
    setSessionState(
      getSessionsByDay(scheduleData, filterSchedule, filtersState)
    )
  }, [filtersState, scheduleData])

  return (
    <>
      <div className="h-0.5 bg-gray-200 my-6" />
      {showFilter && (
        <Filters
          categories={filterCategories}
          filterState={filtersState}
          onFilterChange={(category, option, checked) => {
            setFiltersState(prev => ({
              ...prev,
              [category]: checked
                ? [...prev[category as CategoryName], option]
                : prev[category as CategoryName].filter(
                    option => option !== option
                  ),
            }))
          }}
          onReset={() => {
            setFiltersState({
              Audience: [],
              "Talk category": [],
              "Event type": [],
            })
          }}
        />
      )}
      {Object.entries(sessionsState).length === 0 ? (
        <div className="text-gray-800 text-sm">
          <h3 className="mb-5">No sessions found</h3>
        </div>
      ) : (
        <>
          <div className="flex space-x-4">
            {Object.keys(sessionsState).map((date, index) => (
              <a
                href={`#day-${index + 1}`}
                key={date}
                className={"text-gray-800 text-xs"}
              >
                Day {index + 1}
              </a>
            ))}
          </div>
          {Object.entries(sessionsState).map(
            ([date, concurrentSessionsGroup], index) => (
              <div key={date} className="text-gray-800 text-sm">
                <h3 className="mb-5" id={`day-${index + 1}`}>
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
                                    <div className="flex flex-col">
                                      {speakers.length > 0 && (
                                        <span className="font-light">
                                          {speakers.join(", ")}
                                        </span>
                                      )}
                                      <span className="font-light">
                                        Room: {session.venue}
                                      </span>
                                    </div>
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
      )}
    </>
  )
}

export default ScheduleList

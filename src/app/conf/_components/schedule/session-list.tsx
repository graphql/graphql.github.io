"use client"

import { compareAsc } from "date-fns"
import { ComponentProps, ReactElement, useEffect, useState } from "react"
import { eventsColors } from "@/app/conf/2023/utils"
import { Filters } from "./filters"
import { SchedSpeaker } from "../../2023/types"
import { clsx } from "clsx"
import NextLink from "next/link"
import { filterCategories } from "./filter-categories"

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

export interface ConcurrentSessions {
  [date: string]: ScheduleSession[]
}

export interface ScheduleSessionsByDay {
  [date: string]: ConcurrentSessions
}

export type CategoryName = "Audience" | "Talk category" | "Event type"

function getSessionsByDay(
  scheduleData: ScheduleSession[],
  initialFilter:
    | ((sessions: ScheduleSession[]) => ScheduleSession[])
    | undefined,
  filters: Record<CategoryName, string[]>,
) {
  const data = initialFilter ? initialFilter(scheduleData) : scheduleData
  const filteredSortedSchedule = (data || []).sort((a, b) =>
    compareAsc(new Date(a.event_start), new Date(b.event_start)),
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
  showFilter?: boolean
  scheduleData: ScheduleSession[]
  filterSchedule?: (sessions: ScheduleSession[]) => ScheduleSession[]
}

export function SessionList({
  showFilter = true,
  filterSchedule,
  scheduleData,
}: Props): ReactElement {
  const [filtersState, setFiltersState] = useState<
    Record<CategoryName, string[]>
  >({
    Audience: [],
    "Talk category": [],
    "Event type": [],
  })
  const [sessionsState, setSessionState] = useState<ScheduleSessionsByDay>(() =>
    getSessionsByDay(scheduleData, filterSchedule, filtersState),
  )

  useEffect(() => {
    setSessionState(
      getSessionsByDay(scheduleData, filterSchedule, filtersState),
    )
  }, [filtersState, scheduleData])

  return (
    <div>
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
                    option => option !== option,
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
          {Object.entries(sessionsState).flatMap(
            ([, concurrentSessionsGroup]) =>
              Object.entries(concurrentSessionsGroup).flatMap(([, sessions]) =>
                sessions.flatMap(session => {
                  const speakers = session.speakers as SchedSpeaker[]

                  const borderColor = eventsColors[session.event_type]

                  return (
                    <NextLink
                      key={session.id}
                      className={clsx(
                        "shadow-2xl rounded-md overflow-hidden flex flex-col text-current hover:no-underline focus:no-underline",
                      )}
                      href={`/conf/2023/sessions/${session.id}`}
                    >
                      <div className="bg-[#251F30] text-white flex justify-between py-5 px-7 relative">
                        <div className="text-sm flex flex-col gap-2 [*:hover>*>&]:opacity-0 transition-opacity duration-300 opacity-100">
                          <div className="flex gap-3">
                            <div className="font-mono w-4 text-center">▶</div>
                            Recording
                          </div>
                          <div className="flex items-center gap-3">
                            <ClockIcon className="size-4" />
                            {(Number(new Date(session.event_end)) -
                              Number(new Date(session.event_start))) /
                              1000 /
                              60}
                            m
                          </div>
                        </div>
                        <span className="font-sans text-lg leading-none">
                          ↗
                        </span>
                        <div
                          className={clsx(
                            "right-1/2 translate-x-1/2 absolute",
                            "font-mono leading-none text-2xl",
                            "transition-opacity duration-300 opacity-0 size-12",
                            "[*:hover>*>&]:opacity-100 rounded-full bg-white/30 pl-[18px] pt-2.5",
                          )}
                        >
                          ▶
                        </div>
                      </div>
                      <div className="p-7 flex flex-col">
                        <span
                          className="group-hover:no-underline flex py-1 px-3 mb-3 self-start justify-center items-center text-white border rounded-3xl text-sm"
                          style={{
                            backgroundColor: borderColor,
                          }}
                        >
                          {session.event_type}
                        </span>
                        <b>{session.name}</b>
                        <div className="flex gap-5 flex-wrap">
                          {speakers.map(s => (
                            <div
                              className="flex items-center gap-5 mt-5"
                              key={s.username}
                            >
                              <img
                                src={s.avatar}
                                alt={`${s.name} avatar`}
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
                    </NextLink>
                  )
                }),
              ),
          )}
        </div>
      )}
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

"use client"

import { format, parseISO, compareAsc } from "date-fns"
import { ReactElement, useMemo, useState } from "react"

import { ScheduleSession } from "@/app/conf/_api/sched-types"
import {
  ConcurrentSessions,
  ScheduleSessionsByDay,
} from "@/app/conf/_components/schedule/session-list"

import { ScheduleSessionCard } from "./schedule-session-card"
import {
  FilterCategoryConfig,
  Filters,
  FilterStates,
  ResetFiltersButton,
} from "./filters"
import { formatBlockTime } from "./format-block-time"
import { useCurrentTimeMarker } from "./use-current-time-marker"
import { Button } from "@/app/conf/_design-system/button"

export interface FiltersConfig
  extends Partial<
    Record<keyof ScheduleSession /* key */, string /* label */>
  > {}

function getSessionsByDay(
  scheduleData: ScheduleSession[],
  filterStates: FilterStates,
) {
  const filteredSortedSchedule = (scheduleData || []).sort((a, b) =>
    compareAsc(new Date(a.event_start), new Date(b.event_start)),
  )

  const states = Object.entries<FilterStates[keyof FilterStates]>(filterStates)
  const concurrentSessions: ConcurrentSessions = {}

  filteredSortedSchedule.forEach(session => {
    for (const [property, filterState] of states) {
      if (
        filterState &&
        filterState.length > 0 &&
        !filterState.includes(
          session[property as keyof ScheduleSession] as string,
        )
      ) {
        return
      }
    }

    ;(concurrentSessions[session.event_start] ||= []).push(session)
  })

  const sessionsByDay: ScheduleSessionsByDay = {}
  Object.entries(concurrentSessions).forEach(([date, sessions]) => {
    const day = date.split(" ")[0]
    if (!sessionsByDay[day]) {
      sessionsByDay[day] = {}
    }
    sessionsByDay[day] = {
      ...sessionsByDay[day],
      [date]: sessions.sort((a, b) =>
        (a?.venue ?? "").localeCompare(b?.venue ?? ""),
      ),
    }
  })

  return {
    sessionsByDay,
    enabledOptions: Object.fromEntries(
      Object.keys(filterStates).map(currentField => {
        // Apply filters from ALL OTHER fields, not this one
        const otherFilters = Object.entries(filterStates).filter(
          ([field]) => field !== currentField,
        )

        const filteredData = scheduleData.filter(session => {
          // Check if session passes all OTHER filters
          for (const [property, filterState] of otherFilters) {
            const filters = filterState as string[]
            if (
              filters &&
              filters.length > 0 &&
              !filters.includes(
                session[property as keyof ScheduleSession] as string,
              )
            ) {
              return false
            }
          }
          return true
        })

        const enabledOptionsForField = new Set(
          filteredData
            .map(session => session[currentField as keyof ScheduleSession])
            .filter((x): x is string => !!x && typeof x === "string"),
        )

        return [currentField, enabledOptionsForField]
      }),
    ),
  }
}

export interface ScheduleListProps {
  showFilter?: boolean
  scheduleData: ScheduleSession[]
  year: `202${number}`
  eventsColors: Record<string, string>
  filterFields: FiltersConfig
}

export function ScheduleList({
  showFilter = true,
  scheduleData,
  year,
  eventsColors,
  filterFields,
}: ScheduleListProps): ReactElement {
  const [filtersState, setFiltersState] = useState<FilterStates>(() =>
    FilterStates.initial(
      Object.keys(filterFields) as (keyof ScheduleSession)[],
    ),
  )

  const { sessionsByDay: filteredSessions, enabledOptions } = useMemo(
    () => getSessionsByDay(scheduleData, filtersState),
    [scheduleData, filtersState],
  )

  const filterCategories: FilterCategoryConfig[] = useMemo(
    () => FilterCategoryConfig.fromFields(filterFields, scheduleData),
    [filterFields, scheduleData],
  )

  const firstDay = Object.values(filteredSessions)[0]
  // if the first day has less than 3 sessions, it's probably a "day zero" with extra events or workshops
  const firstDayIsDayZero = Object.keys(firstDay).length < 3
  const startIndex = firstDayIsDayZero ? 0 : 1

  const { getTimeMarker } = useCurrentTimeMarker()

  return (
    <>
      <div className="flex justify-between gap-1 max-lg:flex-col">
        <BookmarkOnSched year={year} />
        <div className="flex gap-2">
          <Button
            href="#current-time-marker"
            variant="tertiary"
            className="hidden h-fit items-center gap-x-2 bg-neu-100 !p-2 text-neu-700 transition-opacity hover:bg-neu-200/80 hover:text-neu-900 disabled:opacity-0 [body:has(#current-time-marker)_&]:flex"
          >
            Scroll to current block
          </Button>
          <ResetFiltersButton
            filters={filtersState}
            onReset={() =>
              setFiltersState(
                FilterStates.initial(
                  Object.keys(filterFields) as (keyof ScheduleSession)[],
                ),
              )
            }
            className="max-lg:mb-4 max-lg:w-fit max-lg:self-end"
          />
        </div>
      </div>
      {showFilter && (
        <Filters
          categories={filterCategories}
          filterState={filtersState}
          enabledOptions={enabledOptions}
          onFilterChange={(category, newSelectedOptions) => {
            setFiltersState(prev => ({
              ...prev,
              [category]: newSelectedOptions,
            }))
          }}
        />
      )}
      {Object.entries(filteredSessions).length === 0 ? (
        <div className="typography-body-sm">
          <h3 className="mb-5">No sessions found</h3>
        </div>
      ) : (
        <>
          <div className="mb-4 flex space-x-4">
            {Object.keys(filteredSessions).map((date, index) => (
              <a
                href={`#day-${index + startIndex}`}
                key={date}
                className="typography-link"
              >
                Day {index + startIndex}
              </a>
            ))}
          </div>
          {Object.entries(filteredSessions).map(
            ([date, concurrentSessionsGroup], index) => (
              <div
                key={date}
                className="typography-body-sm bg-neu-200 pb-px dark:bg-neu-50"
              >
                <h3
                  className="bg-neu-50 py-4 dark:bg-neu-0"
                  id={`day-${index + startIndex}`}
                >
                  {format(parseISO(date), "EEEE, MMMM d")}
                </h3>
                {Object.entries(concurrentSessionsGroup).map(
                  ([sessionDate, sessions], i, blocks) => {
                    const blockEnd = new Date(
                      Math.max(
                        ...sessions.map(session =>
                          new Date(session.event_end).getTime(),
                        ),
                      ),
                    )

                    const nextBlock = blocks[i + 1]
                    const nextBlockStart = nextBlock?.[0]
                      ? new Date(nextBlock[0])
                      : undefined

                    const isBreak =
                      sessions[0]?.event_type
                        ?.toLowerCase()
                        .includes("break") ||
                      blocks[i + 1]?.[1]?.[0]?.event_type
                        ?.toLowerCase()
                        .includes("break")
                    const hasDashedBorder =
                      blockEnd &&
                      blockEnd.getTime() === nextBlockStart?.getTime() &&
                      !isBreak

                    const endTimesDiffer = sessions.some(
                      session =>
                        new Date(session.event_end).getTime() !==
                        blockEnd.getTime(),
                    )

                    let timeMarker = getTimeMarker(sessionDate, blockEnd)
                    // if end times differ and blockEnd is far from start, we treat this as a long event, like "solutions showcase"
                    if (
                      endTimesDiffer &&
                      blockEnd.getTime() - new Date(sessionDate).getTime() >
                        1000 * 60 * 60 * 2
                    ) {
                      timeMarker = null
                    }

                    return (
                      <div
                        key={`concurrent sessions on ${sessionDate}`}
                        className="relative lg:mt-px [&_div:has(a:hover)]:z-[1]"
                      >
                        <div className="mr-px flex flex-col max-lg:ml-px lg:flex-row">
                          <div className="relative border-neu-50 bg-neu-50 dark:bg-neu-0 max-lg:-mx-px max-lg:my-px max-lg:border-x lg:mr-px">
                            <span className="typography-body-sm mt-3 inline-block w-28 whitespace-nowrap pb-0.5 pl-4 lg:mr-6 lg:pb-4 lg:pl-0">
                              {formatBlockTime(
                                sessionDate,
                                endTimesDiffer ? undefined : blockEnd,
                              )}
                            </span>
                          </div>
                          <div className="relative flex w-full flex-col items-end gap-px lg:flex-row lg:items-start">
                            {sessions.map(session => (
                              <ScheduleSessionCard
                                key={session.id}
                                session={session}
                                year={year}
                                eventsColors={eventsColors}
                                blockEnd={blockEnd}
                                durationVisible={endTimesDiffer}
                              />
                            ))}
                          </div>
                        </div>
                        {timeMarker && (
                          <div
                            id="current-time-marker"
                            className="typography-body-xs pointer-events-none absolute -right-1 z-10 -translate-y-full font-mono tabular-nums text-pri-base before:absolute before:inset-x-0 before:bottom-0 before:border-b before:border-pri-base before:opacity-80 after:absolute after:bottom-0 after:left-[-100vw] after:w-screen after:border-t after:border-pri-base after:opacity-20 dark:text-pri-light dark:before:border-pri-light dark:after:border-pri-light max-xl:bg-neu-0 xl:translate-x-full"
                            style={{
                              top: `${timeMarker.positionPercentage}%`,
                            }}
                          >
                            <span className="max-2xl:hidden">now: </span>
                            {timeMarker.currentTime}
                          </div>
                        )}
                        {hasDashedBorder && (
                          <svg
                            className="absolute -bottom-px left-0 h-px w-full text-neu-50"
                            viewBox="0 0 100 1"
                            preserveAspectRatio="none"
                          >
                            <line
                              x1="0"
                              y1="0.5"
                              x2="100"
                              y2="0.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeDasharray="4,4"
                              strokeDashoffset="4"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        )}
                      </div>
                    )
                  },
                )}
              </div>
            ),
          )}
        </>
      )}
    </>
  )
}

function BookmarkOnSched({ year }: { year: `202${number}` }) {
  return (
    <a
      href={`https://graphqlconf${year}.sched.com`}
      target="_blank"
      rel="noreferrer"
      className="typography-link mb-8 block w-fit decoration-neu-400 max-lg:hidden"
    >
      Bookmark sessions & plan your days on Sched
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="m-1 mb-2 inline-block size-4"
      >
        <path
          d="M21 11V3h-8v2h4v2h-2v2h-2v2h-2v2H9v2h2v-2h2v-2h2V9h2V7h2v4h2zM11 5H3v16h16v-8h-2v6H5V7h6V5z"
          fill="currentColor"
        />
      </svg>
    </a>
  )
}

import { Metadata } from "next"
import { SessionList } from "@/app/conf/_components/schedule/session-list"
import { schedule, speakers } from "@/app/conf/2023/_data"
import { eventsColors } from "../utils"
import { filterCategories2023 } from "../../_components/schedule/filter-categories"

export const metadata: Metadata = {
  title: "Sessions",
}

export default function SessionsPage() {
  return (
    <div className="bg-[#f4f6f8]">
      <div className="conf-block container">
        <SessionList
          year="2023"
          eventsColors={eventsColors}
          filterCategories={filterCategories2023}
          // @ts-expect-error -- fixme
          scheduleData={schedule
            .filter(schedule => schedule.speakers)
            .map(schedule => ({
              ...schedule,
              speakers: schedule.speakers!.map(speaker =>
                speakers.find(s => s.username === speaker.username),
              ),
            }))}
        />
      </div>
    </div>
  )
}

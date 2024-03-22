import { Metadata } from "next"
import { SessionList } from "@/app/conf/_components/schedule/session-list"
import { schedule, speakers } from "@/app/conf/2023/_data"

export const metadata: Metadata = {
  title: "Sessions",
}

export default function SessionsPage() {
  return (
    <div className="bg-[#f4f6f8]">
      <div className="container conf-block">
        <SessionList
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

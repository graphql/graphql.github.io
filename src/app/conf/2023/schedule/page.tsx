import { schedule } from "@/app/conf/2023/_data"
import { ScheduleList } from "@/app/conf/_components/schedule/schedule-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schedule",
}

export default function SchedulePage() {
  return (
    <>
      <div className="container">
        <div className="prose lg:prose-lg py-10 text-white max-w-full">
          <h1 className="text-white">GraphQLConf 2023 Schedule</h1>
          <section className="px-0 mx-0 my-8">
            <div className="flex gap-8 mb-1.5">
              <span className="flex items-center">
                <svg
                  className="mr-3 mb-0.5"
                  width={20}
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
                </svg>
                September 19-21, 2023
              </span>
              <span className="flex items-center">
                <svg
                  className="mr-3 mb-0.5"
                  width="20px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                San Francisco Bay Area, CA
              </span>
            </div>
            <h3 className="text-white">Important Notes</h3>
            <ul>
              <li>All session times are in Pacific Daylight Time (UTC -7).</li>
              <li>
                Timing of sessions and room locations are subject to change.
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="bg-[#f4f6f8] conf-block">
        <div className="container">
          <a
            href="https://graphqlconf23.sched.com"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 underline"
          >
            🔗 Bookmark sessions & plan your days on Sched
          </a>
          <ScheduleList scheduleData={schedule} />
        </div>
      </div>
    </>
  )
}

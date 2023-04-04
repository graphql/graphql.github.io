import React from "react"

interface Day {
  date: string
  list: string[]
}
const Days: Day[] = [
  {
    date: "September 19",
    list: ["Workshops", "Sponsor Showcase"],
  },
  {
    date: "September 20",
    list: ["Keynotes", "Breakouts", "Sponsor Showcase"],
  },
  {
    date: "September 21",
    list: ["Keynotes", "Breakouts", "Sponsor Showcase"],
  },
]
const ScheduleGlanceConf = () => {
  return (
    <div id="schedule">
      <div className="bg-[#171E26] w-full mt-10 mb-6">
        <div className="text-center mx-auto text-white">
          <h1 className="text-4xl text-white font-bold mb-8">Schedule</h1>
        </div>
        <div className="max-w-[80ch] mx-auto">
          <div className="mx-auto w-full grid grid-rows-1 md:grid-cols-3 justify-center gap-8 mb-5">
            {Days.map((day, i) => (
              <div key={i}>
                <div className="h-full mx-auto w-64 px-4 overflow-hidden bg-[#2E343C] shadow-lg rounded-2xl">
                  <div className="p-4">
                    <p className="text-2xl text-center text-white font-bold mb-2">
                      {day.date}
                    </p>
                    <ul className="list-disc pl-0 marker:text-[--rhodamine]">
                      {day.list.map((item, i) => (
                        <li key={i} className="text-white mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGlanceConf

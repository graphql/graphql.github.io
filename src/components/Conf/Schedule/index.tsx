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
      <div className="bg-[#0E031C] mt-20 mb-6 container">
        <div className="text-center mx-auto text-white">
          <h1 className="text-4xl text-white font-bold mb-8">Schedule</h1>
        </div>
        <div className="flex max-md:flex-wrap justify-center gap-8 mb-5">
          {Days.map((day, i) => (
            <div key={i}>
              <div className="h-full p-4 overflow-hidden bg-[#251C39] shadow-lg rounded-2xl">
                <div className="p-4">
                  <p className="text-2xl text-center text-white font-bold mb-2">
                    {day.date}
                  </p>
                  <ul className="list-disc pl-6 marker:text-[#B48EF1]">
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
  )
}

export default ScheduleGlanceConf

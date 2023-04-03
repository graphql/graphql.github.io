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
    <div id="schedule" className="-mt-16 pt-16">
      <div className="bg-[#0E031C] w-full">
        <div className="text-center mx-auto text-white">
          <h1 className="text-4xl text-white font-bold mb-2">Schedule</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {Days.map((day, i) => (
            <div key={i} className="mx-5 mt-5 mb-5">
              <div className="h-full w-64 p-4 overflow-hidden bg-white shadow-lg rounded-2xl">
                <div>
                  <p className=" title-font text-2xl text-[#862e69] text-center font-bold mb-2">
                    {day.date}
                  </p>
                  <ul className="list-disc">
                    {day.list.map((item, i) => (
                      <li key={i} className="text-gray-500 mb-2">
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

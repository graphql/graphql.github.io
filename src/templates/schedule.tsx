import React, { FC } from "react"
import FooterConf from "../components/Conf/Footer"
import HeaderConf from "../components/Conf/Header"
import LayoutConf from "../components/Conf/Layout"
import SeoConf from "../components/Conf/Seo"
import { PageProps } from "gatsby"
import ScheduleList, {
  ScheduleSession,
} from "../components/Conf/Schedule/ScheduleList"

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "GraphQL Conf / GraphQL Foundation",
      },
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    throw new Error(
      `Error fetching data from ${url}: ${error.message || error.toString()}`
    )
  }
}

export async function getServerData() {
  try {
    const schedule: ScheduleSession[] = await fetchData(
      `https://graphqlconf23.sched.com/api/session/list?api_key=${process.env.SCHED_ACCESS_TOKEN}&format=json`
    )

    return {
      props: {
        schedule,
      },
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}

const ScheduleTemplate: FC<
  PageProps<{}, {}, {}, { schedule: ScheduleSession[] }>
> = ({ serverData: { schedule } }) => {
  return (
    <LayoutConf>
      <HeaderConf className="shadow-none" />

      <div className="bg-[#F4F6F8] pb-10">
        <div className="bg-[#171e26] w-full">
          <div className="md:container px-2 xs:px-0 prose lg:prose-lg mx-auto py-10">
            <h1 className="text-white">GraphQLConf 2023 Schedule</h1>
            <section className="text-white px-0 mx-0 my-8">
              <div className="flex gap-8 mb-1.5">
                <span className="flex items-center">
                  <svg
                    className="mr-3 mb-0.5"
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {/* <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <path
                      fill="white"
                      d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                    />
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
                  >
                    {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <path
                      fill="white"
                      d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                    />
                  </svg>
                  San Francisco Bay Area, CA
                </span>
              </div>
              <h3 className="text-white">Important Notes</h3>
              <ul className="mx-0 px-0 list">
                <li>
                  All session times are in Pacific Daylight Time (UTC -7).
                </li>
                <li>
                  Timing of sessions and room locations are subject to change.
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="md:container prose px-2 xs:px-0 my-8">
          <a
            href="https://graphqlconf23.sched.com/"
            className="rounded-md border-2 py-2 font-normal underline-offset-2"
          >
            🔗 Bookmark sessions & plan your days on Sched
          </a>
          <ScheduleList scheduleData={schedule} />
        </div>
      </div>
      <FooterConf includePartners={false} includeSponors={false} />
    </LayoutConf>
  )
}

export function Head() {
  return <SeoConf title="GraphQLConf 2023 Schedule" />
}

export default ScheduleTemplate

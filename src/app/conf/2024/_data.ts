import "server-only"
import { stripHtml } from "string-strip-html"
import { SchedSpeaker, ScheduleSession } from "@/app/conf/2023/types"
import pLimit from "p-limit"

async function fetchData<T>(url: string): Promise<T> {
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
  } catch (error) {
    throw new Error(
      `Error fetching data from ${url}: ${(error as Error).message || (error as Error).toString()}`,
    )
  }
}

const token = process.env.SCHED_ACCESS_TOKEN_2024

async function getUsernames(): Promise<string[]> {
  const response = await fetchData<{ username: string }[]>(
    `https://graphqlconf2024.sched.com/api/user/list?api_key=${token}&format=json&fields=username`,
  )
  return response.map(user => user.username)
}

const limit = pLimit(40) // rate limit is 30req/min

async function getSpeakers(): Promise<SchedSpeaker[]> {
  const usernames = await getUsernames()

  const users = await Promise.all(
    usernames.map(username =>
      limit(() => {
        return fetchData<SchedSpeaker>(
          `https://graphqlconf2024.sched.com/api/user/get?api_key=${token}&by=username&term=${username}&format=json&fields=username,company,position,name,about,location,url,avatar,role,socialurls`,
        )
      }),
    ),
  )

  const result = users
    .filter(speaker => speaker.role.includes("speaker"))
    .map(user => {
      return {
        ...user,
        about: stripHtml(user.about).result,
      }
    })

  return result
}

async function getSchedule(): Promise<ScheduleSession[]> {
  const sessions = await fetchData<ScheduleSession[]>(
    `https://graphqlconf2024.sched.com/api/session/export?api_key=${token}&format=json`,
  )

  const result = sessions.map(session => {
    const { description } = session
    if (description?.includes("<")) {
      // console.log(`Found HTML element in about field for session "${session.name}"`)
    }

    return {
      ...session,
      description: description && stripHtml(description).result,
    }
  })

  return result
}

// @ts-expect-error -- fixme
export const speakers = await getSpeakers()

// @ts-expect-error -- fixme
export const schedule = await getSchedule()

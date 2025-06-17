import { stripHtml } from "string-strip-html"

import { SchedSpeaker, ScheduleSession } from "./sched-types"

/**
 * Sched's API has a rate limit of 30 requests per minute.
 */
let rateLimitResetAt: number | null = null

type RequestURL = string
type RequestPending = Promise<unknown>
type RequestSuccess = "ok"
type RequestError = Error

const requestsRetried = new Map<
  RequestURL,
  RequestPending | RequestSuccess | RequestError
>()

export type RequestContext = {
  apiUrl: string
  token: string
}

export async function fetchSchedData(
  ctx: RequestContext,
  path: string,
  searchParams: Record<string, string> = {},
): Promise<object> {
  const url = new URL(ctx.apiUrl + path)
  const search = new URLSearchParams(searchParams)
  search.set("api_key", ctx.token)
  search.set("format", "json")
  url.search = search.toString()

  try {
    if (rateLimitResetAt && Date.now() < rateLimitResetAt) {
      const wait = rateLimitResetAt - Date.now()
      await new Promise(resolve => setTimeout(resolve, wait))
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "GraphQL Conf / GraphQL Foundation",
      },
      cache: "force-cache",
    })

    // Take note that this is feasible only because
    // we're currently only using this API at build time.
    if (response.status === 429) {
      let wait = 60_000
      const xRateLimitResetAt = response.headers.get("x-rate-limit-reset-at")
      if (xRateLimitResetAt) {
        rateLimitResetAt = Number(xRateLimitResetAt) * 1000
        console.warn(
          `Rate limit reset at ${new Date(rateLimitResetAt).toISOString()}`,
        )
        wait = rateLimitResetAt - Date.now()
      }

      const later = Promise.withResolvers<object>()
      requestsRetried.set(url.toString(), later.promise)
      const queueSize = requestsRetried.size

      console.warn(
        `Rate limit exceeded, retrying in ${Math.round(wait / 1000)}s: ${url} (queue size: ${queueSize})`,
      )

      const size = Object.entries(requestsRetried).filter(
        ([_, status]) => status instanceof Promise,
      ).length

      console.warn(`${size} requests retrying...`)

      setTimeout(
        () =>
          later.resolve(
            fetchSchedData(ctx, path, searchParams).then(data => {
              rateLimitResetAt = null
              requestsRetried.set(url.toString(), "ok")
              return data
            }),
          ),
        wait,
      )

      return later.promise
    }

    const data = await response.json()
    return data
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))
    requestsRetried.set(url.toString(), error)

    throw new Error(
      `Error fetching data from ${url}: ${(error as Error).message || (error as Error).toString()}`,
    )
  }
}

export async function getSchedule(
  ctx: RequestContext,
): Promise<ScheduleSession[]> {
  const sessions = (await fetchSchedData(
    ctx,
    "/session/export",
  )) as ScheduleSession[]

  const result = sessions
    .filter(session => session.active === "Y")
    .map(session => {
      const { description } = session

      // This field is sometimes sent as a string, sometimes as a number,
      // so it creates noise in our diffs, but we don't use it anyway.
      delete (session as Record<string, unknown>)["event_type_sort"]

      // If Sched form includes just event type or event subtype and its a phrase separated by a dash,
      // we split it into two fields.

      let event_type = session.event_type || ""
      let event_subtype = session.event_subtype || ""

      if (!event_type && event_subtype.includes(" - ")) {
        ;[event_type, event_subtype] = event_subtype.split(" - ")
      } else if (!event_subtype && event_type.includes(" - ")) {
        ;[event_type, event_subtype] = event_type.split(" - ")
      }

      return {
        ...session,
        event_type,
        event_subtype,
        description: preprocessDescription(description),
      }
    })

  return result
}

const SPEAKER_FIELDS =
  "username,company,position,name,about,location,url,avatar,role,socialurls"

// We receive this fields despite the fact we don't ask for them.
const SPEAKER_IGNORED_FIELDS = ["plusones", "tickets"]

export async function getSpeakers(
  ctx: RequestContext,
): Promise<SchedSpeaker[]> {
  const users = (await fetchSchedData(ctx, "/user/list", {
    fields: SPEAKER_FIELDS,
  })) as SchedSpeaker[]

  const result = users
    .filter(speaker => speaker.role?.includes("speaker"))
    .map(shapeSpeaker)
    .sort((a, b) => {
      if (a.avatar && !b.avatar) return -1
      if (!a.avatar && b.avatar) return 1
      return 0
    })

  return result
}

/**
 * `/user/list` is insufficient, as it does not return `socialurls` nor any other custom fields
 */
export async function getSpeakerDetails(
  ctx: RequestContext,
  username: string,
): Promise<SchedSpeaker> {
  const data = await fetchSchedData(ctx, "/user/get", {
    by: "username",
    term: username,
    fields: SPEAKER_FIELDS,
  })

  return shapeSpeaker(data as SchedSpeaker)
}

function preprocessDescription(description: string | undefined | null): string {
  let res = description || ""

  // we respect manual line breaks
  res = res.replace(/<br\s*\/?>/g, "\n")

  // respecting <li> and <a> tags doesn't make sense, because speakers don't use them consistently
  // we'll improve how the descriptions look later down the tree in the session details page
  return stripHtml(res).result
}

function shapeSpeaker(user: SchedSpeaker): SchedSpeaker {
  const res: SchedSpeaker = {
    ...user,
    _years: user._years || [],
    socialurls: user.socialurls || [],
    about: preprocessDescription(user.about),
  }

  for (const field of SPEAKER_IGNORED_FIELDS) {
    delete res[field as keyof typeof res]
  }
  delete res.role

  if (res.avatar?.startsWith("http://")) {
    res.avatar = res.avatar.slice(5)
  }

  return res
}

/**
 * Merges speaker data from API with existing local data,
 * preserving important local fields when API returns empty values.
 */
export function mergeSpeaker(
  oldSpeaker: SchedSpeaker,
  newSpeaker: SchedSpeaker,
): SchedSpeaker {
  return {
    ...oldSpeaker,
    ...newSpeaker,
    socialurls: newSpeaker.socialurls?.length
      ? newSpeaker.socialurls
      : oldSpeaker.socialurls,
    ["_years"]: [
      ...new Set([
        ...(oldSpeaker["_years"] || []),
        ...(newSpeaker["_years"] || []),
      ]),
    ].sort(),
  }
}

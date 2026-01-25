import { setTimeout as sleep } from "node:timers/promises"
import { execute } from "./execute.ts"
import { QUERY } from "./query.ts"
import { log, warn } from "./logger.ts"
import type { State } from "./state.ts"
import { writeState } from "./state.ts"

/**
 * Fetch contributors (by commit authors tied to GitHub users) for a single repo.
 * Traverses the full commit history of the default branch using pagination.
 * Updates state file incrementally.
 */
export async function fetchRepoContributors(
  owner: string,
  repo: string,
  accessToken: string,
  state: State,
  options: {
    forceRefresh?: boolean
    onProgress?: (data: { page: number; repoSlug: string }) => void
  } = {},
) {
  const repoSlug = `${owner}/${repo}`
  const repoState = state.repositories[repoSlug]

  const contributors = new Map<
    string /* handle */,
    { contributions: number; website?: string }
  >()

  let after: string | null = options.forceRefresh
    ? null
    : repoState?.lastCursor || null

  if (options.forceRefresh) {
    log(`Force refreshing ${repoSlug}, deleting existing state.`)
    delete state.repositories[repoSlug]
  } else if (after) {
    log(`Resuming ${repoSlug} from cursor: ${after.substring(0, 10)}...`)
  } else {
    log(`Starting fresh sync for ${repoSlug}`)
  }

  let page = 0
  let hasMore = true
  let processedAnyCommits = false

  const fetchMore = () =>
    execute(
      QUERY,
      {
        owner,
        name: repo,
        after,
      },
      {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "graphql.org contributors sync client",
      },
    )

  while (hasMore) {
    const response = await fetchMore()

    if (response.errors?.length) {
      throw new Error(
        `GitHub GraphQL errors for ${repoSlug}: ${response.errors
          .map((e: { message: string }) => e.message)
          .join("; ")}`,
      )
    }

    const repoData = response.data?.repository
    if (!repoData) {
      warn(`Repository not found: ${repoSlug}`)
      break
    }

    const defaultBranchRef = repoData.defaultBranchRef
    if (!defaultBranchRef?.target) {
      warn(`Default branch not found for ${repoSlug}`)
      break
    }

    if (!("history" in defaultBranchRef.target)) {
      warn(`History not found for ${repoSlug}`)
      break
    }

    const history = defaultBranchRef.target.history

    for (const node of history.nodes || []) {
      processedAnyCommits = true
      const user = node?.author?.user
      if (!user?.login) continue
      const prev = contributors.get(user.login)
      if (prev) {
        prev.contributions += 1
        prev.website ||= user.websiteUrl
      } else {
        contributors.set(user.login, {
          contributions: 1,
          website: user.websiteUrl ?? undefined,
        })
      }
    }

    const hasNext = history.pageInfo?.hasNextPage
    after = history.pageInfo?.endCursor || null
    hasMore = !!hasNext
    page += 1

    state.repositories[repoSlug] = {
      ...state.repositories[repoSlug],
      status: "in-progress",
      ...(processedAnyCommits && after && { lastCursor: after }),
    }
    await writeState(state)
    log(`processed page ${page}`, repoSlug)
    if (options.onProgress) {
      options.onProgress({ page, repoSlug })
    }

    if (page % 5 === 0) await sleep(200)
  }

  state.repositories[repoSlug] = {
    ...state.repositories[repoSlug],
    ...(processedAnyCommits && after && { lastCursor: after }),
    lastProcessed: new Date().toISOString(),
    status: undefined,
  }
  await writeState(state)
  log(`Finished processing ${repoSlug}.`)

  return contributors
}

#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import { dirname, resolve } from "node:path"
import { fetchRepoContributors } from "./fetch-repo-contributors.ts"
import * as logger from "./logger.ts"
import { readState, writeState } from "./state.ts"

type RepoRef = `${string}/${string}`
interface Contributor {
  id: string
  website?: string
  contributions: number
}
type ContributorsForProjects = {
  [projectName: string]: Contributor[]
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, "../data.json")
const LAST_RUN_PATH = resolve(__dirname, "../.last-sync.isodate")

export const REPO_TO_PROJECT: Record<RepoRef, string> = {
  "graphql/graphql-spec": "GraphQL",
  "graphql/graphql-wg": "GraphQL",
  "graphql/graphql-js": "graphql-js",
  "graphql/graphiql": "GraphiQL",
}

/**
 * Fetch contributors for the repos listed in REPO_TO_PROJECT and aggregate by project.
 * - Uses GitHub GraphQL API (v4) with a personal access token in env GITHUB_ACCESS_TOKEN
 * - Aggregates contributors across multiple repos that map to the same project
 * - Sorts contributors per project by contributions (desc)
 */
export async function getContributors(
  repoToProject: Record<RepoRef, string> = REPO_TO_PROJECT,
  options: {
    forceRefresh?: boolean
    onProgress?: (data: { page: number; repoSlug: string }) => void
    onContributorFound?: (
      contributor: Contributor & { project: string },
    ) => void
  } = {},
): Promise<ContributorsForProjects> {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  if (!accessToken) {
    logger.warn(
      "No GITHUB_ACCESS_TOKEN environment variable found. Skipping contributors sync.",
    )
    return {}
  }

  let existingData: ContributorsForProjects = {}
  if (!options.forceRefresh) {
    try {
      existingData = JSON.parse(await readFile(outPath, "utf8"))
    } catch (error) {
      logger.log("No existing data.json found, starting fresh.")
    }
  } else {
    logger.log(
      "Force refresh: starting with empty data to prevent double-counting",
    )
  }

  const perProject = new Map<string, Map<string, Contributor>>()
  for (const projectName in existingData) {
    const projectMap = new Map<string, Contributor>()
    for (const contributor of existingData[projectName]) {
      projectMap.set(contributor.id, contributor)
    }
    perProject.set(projectName, projectMap)
  }

  const state = await readState()
  const repos = Object.keys(repoToProject) as RepoRef[]

  for (const fullName of repos) {
    const repoState = state.repositories[fullName]
    const lastProcessed = repoState?.lastProcessed
    if (lastProcessed) {
      logger.log(`Syncing ${fullName} (last synced: ${lastProcessed})`)
    } else {
      logger.log(`Syncing ${fullName} (first time)`)
    }

    const project = repoToProject[fullName]
    const [owner, name] = fullName.split("/") as [string, string]

    try {
      const counts = await fetchRepoContributors(
        owner,
        name,
        accessToken,
        state,
        options,
      )

      if (options.onContributorFound) {
        for (const [login, info] of counts) {
          options.onContributorFound({
            project,
            id: login,
            contributions: info.contributions,
            website: info.website,
          })
        }
      }

      let projectMap = perProject.get(project)
      if (!projectMap) {
        projectMap = new Map()
        perProject.set(project, projectMap)
      }

      for (const [login, info] of counts) {
        const existing = projectMap.get(login)
        if (existing) {
          existing.contributions += info.contributions
          if (!existing.website && info.website) {
            existing.website = info.website
          }
        } else {
          projectMap.set(login, {
            id: login,
            website: info.website,
            contributions: info.contributions,
          })
        }
      }
    } catch (err: unknown) {
      logger.warn(`Failed to fetch contributors for ${fullName}:`, String(err))
      state.repositories[fullName] = {
        ...state.repositories[fullName],
        status: "error",
      }
      await writeState(state)
    }
  }

  const result: Record<
    string,
    Array<{ id: string; website?: string; contributions: number }>
  > = {}
  for (const [project, map] of perProject) {
    const arr = Array.from(map.values()).sort(
      (a, b) => b.contributions - a.contributions,
    )
    result[project] = arr
  }
  return result
}

// CLI entrypoint: when executed directly, write contributors to data.json next to this file
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  // Show help
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`
Usage: tsx index.ts [options]

Options:
  --ignore-timestamp      Skip the 24-hour rate limit check
  --fetch-full-history    Fetch full history instead of incremental updates
  --help, -h              Show this help message

Examples:
  tsx index.ts                           # Normal sync (respects 24h limit)
  tsx index.ts --ignore-timestamp        # Force sync even if run recently
  tsx index.ts --fetch-full-history      # Fetch complete history from scratch
`)
    process.exit(0)
  }

  // Only sync once every 24 hours (unless --ignore-timestamp is used)
  const options = {
    forceRefresh: process.argv.includes("--fetch-full-history"),
  }

  if (!process.argv.includes("--ignore-timestamp")) {
    const ONE_DAY = 24 * 60 * 60 * 1000
    const lastRun = await readFile(LAST_RUN_PATH, "utf8").catch(() => "")
    const oneDayAgo = new Date(Date.now() - ONE_DAY)

    if (lastRun && new Date(lastRun).getTime() > oneDayAgo.getTime()) {
      logger.log(
        "Skipping sync of contributors, last run was within 24 hours. Use --ignore-timestamp to override.",
      )
      process.exit(0)
    }
  }

  const onProgress = (data: { page: number; repoSlug: string }) => {
    logger.log(`fetching page ${data.page}`, data.repoSlug)
  }

  const onContributorFound = (
    contributor: Contributor & { project: string },
  ) => {
    console.log(JSON.stringify(contributor))
  }

  getContributors(REPO_TO_PROJECT, {
    ...options,
    onProgress,
    onContributorFound,
  })
    .then(async data => {
      process.stderr.write("\n")

      if (Object.keys(data).length === 0) {
        logger.log("No contributors data fetched, keeping existing data.")
        return
      }

      await writeFile(outPath, JSON.stringify(data, null, 2) + "\n", "utf8")
      await writeFile(LAST_RUN_PATH, new Date().toISOString())

      logger.log(
        `Wrote ${Object.values(data).reduce(
          (n, arr) => n + arr.length,
          0,
        )} contributors across ${
          Object.keys(data).length
        } projects to ${outPath}`,
      )
    })
    .catch(err => {
      process.stderr.write("\n")
      logger.error("Failed to write contributors data.json:", err)

      if (process.env.VERCEL) {
        logger.error(
          "We don't want to fail the deployment, so we'll use the existing contributor data.",
        )
        return
      } else {
        process.exitCode = 1
      }
    })
}

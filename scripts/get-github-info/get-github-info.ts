import fg from "fast-glob"
import fs from "fs/promises"
import grayMatter from "gray-matter"
import {
  getGitHubStats,
  type GitHubInfo,
} from "../sort-libraries/get-github-stats"

const DATA_PATH = new URL("./github-stats.json", import.meta.url).pathname
const LAST_RUN_PATH = new URL("./last-success.isodate", import.meta.url)
  .pathname
const CODE_DIR = new URL("../../src/code", import.meta.url).pathname

async function main() {
  const filePaths = await fg("./**/*.md", { cwd: CODE_DIR, absolute: true })

  const errors: Error[] = []

  {
    // we only sync once every two hours
    const TWO_HOURS = 2 * 60 * 60 * 1000
    const lastRun = await fs.readFile(LAST_RUN_PATH, "utf8").catch(() => "")
    const twoHoursAgo = new Date(Date.now() - TWO_HOURS)
    if (lastRun && new Date(lastRun).getTime() > twoHoursAgo.getTime()) {
      console.info(
        "Skipping sync of GitHub stars, last run was within two hours.",
      )
      return
    }
  }

  const newState = new Map<string /* repo name */, GitHubInfo>()
  const filePathToRepoName = new Map<
    string /* file path */,
    string /* repo name */
  >()

  for (const [index, filePath] of filePaths.entries()) {
    try {
      const content = await fs.readFile(filePath, "utf8")
      const { data } = grayMatter(content)
      if (data.github) {
        // TODO: This needs to be pooled to make the builds faster.
        const stats = await getGitHubStats(data.github)
        if (stats) {
          newState.set(data.github, stats)
        }
      }
      console.info("✅ Done for", filePath, index + 1, "of", filePaths.length)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      errors.push(error)
      console.error(
        "❌ Error for",
        filePath,
        index + 1,
        "of",
        filePaths.length,
        err,
      )
    }
  }

  if (errors.length > 0) {
    if (process.env.VERCEL) {
      console.error(
        "We don't want to fail the deployment, so we'll use the old github-stats.json file.",
      )
      return
    } else {
      throw new Error("Errors occurred while fetching GitHub stats.")
    }
  }

  // If a .mdx file was removed, we also remove the package from the JSON.
  // If it errored for some reason, we don't do anything.
  // If we got it, we overwrite.
  {
    const data = await fs.readFile(DATA_PATH, "utf8")
    const existingStats = JSON.parse(data) as Record<string, object>

    const result: Record<string, object> = {}
    const brandNewKeys = new Set(newState.keys())

    for (const [repoName, stats] of Object.entries(existingStats)) {
      const mdxFileExists = filePathToRepoName.has(repoName)
      if (mdxFileExists) {
        brandNewKeys.delete(repoName)
        result[repoName] = {
          ...stats,
          ...newState.get(repoName),
        }
      }
    }

    for (const repoName of brandNewKeys) {
      result[repoName] = newState.get(repoName)!
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(result, null, 2))
    await fs.writeFile(LAST_RUN_PATH, new Date().toISOString())
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

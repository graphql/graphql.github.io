import fg from "fast-glob"
import fs from "fs/promises"
import grayMatter from "gray-matter"
import { getGitHubStats } from "../scripts/sort-libraries/get-github-stats"

async function main() {
  const filePaths = await fg("./src/code/**/*.md")

  const githubStats: Record<string, unknown> = {}

  // @ts-expect-error
  for (const [index, filePath] of filePaths.entries()) {
    const content = await fs.readFile(filePath, "utf8")
    const { data } = grayMatter(content)
    if (data.github) {
      githubStats[data.github] = await getGitHubStats(data.github)
    }
    console.info("✅ Done for", filePath, index + 1, "of", filePaths.length)
  }
  await fs.writeFile(
    "./src/github-stats.json",
    JSON.stringify(githubStats, null, 2),
  )
}

main()

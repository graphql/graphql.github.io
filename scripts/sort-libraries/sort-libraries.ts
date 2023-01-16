import { getGemStats } from "./get-gem-stats"
import { getGitHubStats } from "./get-github-stats"
import { getHttpScore } from "./get-http-score"
import { getNpmStats } from "./get-npm-stats"

interface Library {
  name: string
  description: string
  howto: string
  url: string
  github: string
  npm: string | undefined
  gem: string | undefined
  sourcePath: string
}

export async function sortLibs(
  libraries: Library[]
): Promise<{ sortedLibs: Library[]; totalStars: number }> {
  console.log("sortLibs length", libraries.length)

  let totalStars = 0
  const libsWithScores = await Promise.all(
    libraries.map(async lib => {
      const [npmStats, gemStars, githubStats, httpScore] = await Promise.all([
        lib.npm ? getNpmStats(lib.npm) : undefined,
        lib.gem ? getGemStats(lib.gem) : undefined,
        lib.github ? getGitHubStats(lib.github) : undefined,
        lib.name ? getHttpScore(lib.name) : undefined,
      ])

      const result = {
        ...lib,
        downloadCount: npmStats ?? gemStars ?? 0,
        stars: githubStats?.stars ?? 0,
        githubStats,
      }
      totalStars += result.stars
      console.log("result", result)
      return result
    })
  )
  console.log("libsWithScores", libsWithScores)
  const sortedLibs = libsWithScores.sort((a, b) => {
    let aScore = 0,
      bScore = 0
    if (a.downloadCount > b.downloadCount) {
      aScore += 40
    } else if (b.downloadCount > a.downloadCount) {
      bScore += 40
    }

    if (a.githubStats?.hasCommitsInLast3Months) {
      aScore += 30
    }
    if (b.githubStats?.hasCommitsInLast3Months) {
      bScore += 30
    }
    if (a.stars > b.stars) {
      aScore += 40
    } else if (a.stars < b.stars) {
      bScore += 40
    }
    if (bScore > aScore) {
      return 1
    }
    if (bScore < aScore) {
      return -1
    }
    return 0
  })

  return { sortedLibs, totalStars }
}

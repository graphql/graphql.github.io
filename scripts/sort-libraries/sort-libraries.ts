import { getGemStats } from "./get-gem-stats"
import { getGitHubStats } from "./get-github-stats"
import { getHttpScore } from "./get-http-score"
import { getNpmStats } from "./get-npm-stats"

export interface Library {
  name: string
  description: string
  howto: string
  url: string
  github: string | undefined
  npm: string | undefined
  gem: string | undefined
  sourcePath: string
}

export async function sortLibs(
  libraries: Library[],
): Promise<{ sortedLibs: Library[]; totalStars: number }> {
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
        httpScore: httpScore ?? 0,
        ...githubStats,
      }
      totalStars += result.stars
      return result
    }),
  )
  const sortedLibs = libsWithScores.sort((a, b) => {
    let aScore = 0,
      bScore = 0
    if (a.downloadCount > b.downloadCount) {
      aScore += 36
    } else if (b.downloadCount > a.downloadCount) {
      bScore += 36
    }

    if (a.httpScore > b.httpScore) {
      aScore += 10
    } else if (b.httpScore > a.httpScore) {
      bScore += 10
    }

    if ("hasCommitsInLast3Months" in a && a.hasCommitsInLast3Months) {
      aScore += 28
    }
    if ("hasCommitsInLast3Months" in b && b.hasCommitsInLast3Months) {
      bScore += 28
    }
    if (a.stars > b.stars) {
      aScore += 36
    } else if (a.stars < b.stars) {
      bScore += 36
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

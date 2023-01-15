import { getGemStats } from "./get-gem-stats"
import { getGitHubStats } from "./get-github-stats"
import { getHttpScore } from "./get-http-score"
import { getNpmStats } from "./get-npm-stats"

export async function sortLibs(libs: any) {
  console.log("libs", libs)
  console.log("libs.length", libs.length)
  {
    let totalStars = 0
    const libsWithScores = await Promise.all(
      libs.map(async lib => {
        const npmStats = lib.npm && (await getNpmStats(lib.npm))
        const githubStats = lib.github && (await getGitHubStats(lib.github))
        const gemStars = lib.gem && (await getGemStats(lib.gem))
        const result = {
          ...lib,
          npmStats,
          gemStars,
          ...githubStats,
        }
        totalStars += result.stars || 0
        console.log("result", result)
        return result
      })
    )
    console.log("libsWithScores", libsWithScores)
    console.log("libsWithScores length", libsWithScores.length)
    const sortedLibs = libsWithScores.sort((a, b) => {
      let aScore = 0,
        bScore = 0
      if ("npmStats" in a && "npmStats" in b) {
        if (a.npmStats > b.npmStats) {
          aScore += 40
        } else if (b.npmStats > a.npmStats) {
          bScore += 40
        }
      }
      if ("hasCommitsInLast3Months" in a && a.hasCommitsInLast3Months) {
        aScore += 30
      }
      if ("hasCommitsInLast3Months" in b && b.hasCommitsInLast3Months) {
        bScore += 30
      }
      if ("stars" in a && "stars" in b) {
        if (a.stars > b.stars) {
          aScore += 40
        } else if (a.stars < b.stars) {
          bScore += 40
        }
      }
      if (bScore > aScore) {
        return 1
      }
      if (bScore < aScore) {
        return -1
      }
      return 0
    })
    console.log("sortedLibs", sortedLibs)

    return { sortedLibs, totalStars }
  }
}

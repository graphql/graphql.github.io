import { getGemStats } from "./get-gem-stats"
import { getGitHubStats } from "./get-github-stats"
import { getNpmStats } from "./get-npm-stats"

export const sortLibs = async libs => {
  let totalStars = 0
  const libsWithScores = await Promise.all(
    libs.map(async lib => {
      const [npmStats = {}, gemStars = {}, githubStats = {}] =
        await Promise.all([
          lib.npm && getNpmStats(lib.npm),
          lib.gem && getGemStats(lib.gem),
          lib.github && getGitHubStats(lib.github),
        ])
      const result = {
        ...lib,
        ...npmStats,
        ...gemStars,
        ...githubStats,
      }
      console.log("result", result)
      totalStars += result.stars || 0
      return result
    })
  )
  const sortedLibs = libsWithScores.sort((a, b) => {
    let aScore = 0,
      bScore = 0
    if ("downloadCount" in a && "downloadCount" in b) {
      if (a.downloadCount > b.downloadCount) {
        aScore += 40
      } else if (b.downloadCount > a.downloadCount) {
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
    } else if (bScore < aScore) {
      return -1
    }
    return 0
  })
  return { sortedLibs, totalStars }
}
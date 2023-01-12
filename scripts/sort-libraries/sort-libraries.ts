import { getGemStats } from "./get-gem-stats"

async function getNpmStats(packageName: string): Promise<number> {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  const responseJson = await response.json()
  const downloadCount = responseJson.downloads
  if (!downloadCount) {
    console.debug(
      `getNpmStats: No download count for ${packageName}, so value is 0!`
    )
    return 0
  }
  return downloadCount
}


export async function sortLibs(libs: any) {
  {
    let totalStars = 0
    const libsWithScores = await Promise.all(
      libs.map(async lib => {
        console.log(`Fetching stats for ${lib.name}`)
        console.log(`Fetching gem for ${lib.gem}`)
        console.log(`Fetching github for ${lib.github}`)
        const [npmStats = {}, gemStars = {}, githubStats = {}] =
          await Promise.all([
            lib.npm && (await getNpmStats(lib.npm)),
            lib.gem && (await getGemStats(lib.gem)),
            lib.github && (await getGitHubStats(lib.github)),
          ])
        const result = {
          ...lib,
          ...npmStats,
          ...gemStars,
          ...githubStats,
        }
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
      }
      if (bScore < aScore) {
        return -1
      }
      return 0
    })
    return { sortedLibs, totalStars }
  }
}

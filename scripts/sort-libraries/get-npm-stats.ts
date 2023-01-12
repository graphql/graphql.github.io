type NpmStatsResponse = {
  downloads?: number
  start?: string
  end?: string
  package?: string
}

export async function getNpmStats(
  packageName: string
): Promise<NpmStatsResponse> {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  if (!response.ok) {
    console.warn(
      `getGemStats: No download count for ${packageName}, so value is 0!`
    )
    return { downloads: 0 }
  }
  const responseJson: NpmStatsResponse = await response.json()
  if (!responseJson) {
    console.warn(
      `getGemStats: No download count for ${packageName}, so value is 0!`
    )
    return { downloads: 0 }
  }
  return responseJson
}
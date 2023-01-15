type NpmStatsType = {
  downloads: number
  start?: string
  end?: string
  package?: string
}

export async function getNpmStats(packageName: string): Promise<number> {
  if (!packageName) {
    return 0
  }
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  if (!response.ok) {
    return 0
  }
  const responseJson: NpmStatsType = await response.json()
  if (!responseJson) {
    return 0
  }
  return responseJson.downloads
}

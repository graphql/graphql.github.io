type GemStatsRespone = {
  name?: string
  downloads?: number
  version?: string
  version_created_at?: string
  version_downloads?: number
  platform?: string
  authors?: string
  info?: string
  licenses?: Array<string>
}

export async function getGemStats(
  packageName: string
): Promise<GemStatsRespone> {
  const response = await fetch(
    `https://rubygems.org/api/v1/gems/${encodeURIComponent(packageName)}.json`
  )
  if (!response.ok) {
    console.warn(
      `getGemStats: No download count for ${packageName}, so value is 0!`
    )
    return { downloads: 0 }
  }
  const responseJson: GemStatsRespone = await response.json()
  if (!responseJson) {
    console.warn(
      `getGemStats: No download count for ${packageName}, so value is 0!`
    )
    return { downloads: 0 }
  }
  return responseJson
}
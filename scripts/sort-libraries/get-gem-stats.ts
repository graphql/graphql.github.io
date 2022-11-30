type GetGemStatsResponse = {
  downloads: number
}
export async function getGemStats(
  packageName: string
): Promise<GetGemStatsResponse> {
  const response = await fetch(
    `https://rubygems.org/api/v1/gems/${encodeURIComponent(packageName)}.json`
  )
  console.info(`GET https://rubygems.org/api/v1/gems/${packageName}.json`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch gem stats for ${packageName}: ${response.status} ${response.statusText}`
    )
  }
  const body = await response.json()
  return body.downloads
}
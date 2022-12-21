type GetNpmStatsResponse = {
  downloads: number
}
export async function getNpmStats(
  packageName: string
): Promise<GetNpmStatsResponse> {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  console.info(
    `GET https://api.npmjs.org/downloads/point/last-week/${packageName}`
  )
  // if (!response.ok) {
  //   throw new console.error(
  //     `Failed to fetch NPM stats for ${packageName}: ${response.status} ${response.statusText}`
  //   )
  // }
  // TODO: handle errors
  const body = await response.json()
  return body.downloads
}

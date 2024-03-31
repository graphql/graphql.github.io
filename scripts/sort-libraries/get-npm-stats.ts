type NpmStatsFetchResponse =
  | {
      downloads?: number
      start: string
      end: string
      package: string
    }
  | { error: string }

export async function getNpmStats(packageName: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
        packageName,
      )}`,
    )

    if (!response.ok) {
      console.warn(
        `Error fetching NPM stats for ${packageName}. Status: ${response.status}`,
      )
      return 0
    }

    const responseJson: NpmStatsFetchResponse = await response.json()
    if ("error" in responseJson) {
      console.warn(`NPM Stats error for ${packageName}: ${responseJson.error}`)
      return 0
    }

    return responseJson.downloads ?? 0
  } catch (error) {
    console.error(`Exception fetching NPM stats for ${packageName}:`, error)
    return 0
  }
}

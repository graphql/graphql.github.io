type NpmStatsFetchResponse =
  | {
      downloads?: number
      start: string
      end: string
      package: string
    }
  | { error: string }

export async function getNpmStats(packageName: string): Promise<number> {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  if (response.ok) {
    const responseJson: NpmStatsFetchResponse = await response.json()
    if (responseJson && "downloads" in responseJson) {
      return responseJson.downloads ?? 0
    } else {
      console.warn(`Get invalid response from npm for ${packageName}`)
    }
  }
  return 0
}

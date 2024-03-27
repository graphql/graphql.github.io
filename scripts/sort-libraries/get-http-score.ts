type HttpScoreFetchResponse = {
  total: number
  pass: number
  errors: number
  warnings: number
}

export async function getHttpScore(packageName: string): Promise<number> {
  try {
    const url = `https://raw.githubusercontent.com/graphql/graphql-http/main/implementations/${encodeURIComponent(
      packageName,
    )}/report.json`
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(
          `Resource not found for package ${packageName} at URL: ${url}`,
        )
      } else {
        console.warn(
          `invalid response from HTTP score for ${packageName}. Status: ${response.status}`,
        )
      }
      return 0
    }

    const responseJson: HttpScoreFetchResponse = await response.json()
    return responseJson.total ?? 0
  } catch (error) {
    console.error(`Error fetching HTTP score for ${packageName}:`, error)
    return 0
  }
}

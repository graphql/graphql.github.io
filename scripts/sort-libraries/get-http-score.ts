type HttpScoreFetchResponse = {
  total: number
  pass: number
  errors: number
  warnings: number
}

export async function getHttpScore(packageName: string): Promise<number> {
  const response = await fetch(
    `https://raw.githubusercontent.com/graphql/graphql-http/main/implementations/${encodeURIComponent(
      packageName
    )}/report.json`
  )
  if (!response.ok) {
    console.warn(
      `Get invalid response from HTTP score for ${packageName}. Status: ${response.status}`
    )
    return 0
  }
  const responseJson: HttpScoreFetchResponse = await response.json()
  if (!responseJson) {
    console.warn(`Get invalid response from HTTP score for ${packageName}`)
    return 0
  }
  return responseJson.total ?? 0
}

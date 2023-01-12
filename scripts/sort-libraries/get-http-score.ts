type HttpScoreRespone = {
  total?: number
  ok?: number
  warn?: number
  error?: number
}

export async function getHttpScore(
  packageName: string
): Promise<HttpScoreRespone> {
  const response = await fetch(
    `https://raw.githubusercontent.com/graphql/graphql-http/main/implementations/${encodeURIComponent(
      packageName
    )}/report.json`
  )
  if (!response.ok) {
    console.warn(
      `getHttpScore: No download count for ${packageName}, so value is 0!`
    )
    return { total: 0 }
  }
  const responseJson: HttpScoreRespone = await response.json()
  if (!responseJson) {
    console.warn(
      `getHttpScore: No download count for ${packageName}, so value is 0!`
    )
    return { total: 0 }
  }
  return responseJson
}
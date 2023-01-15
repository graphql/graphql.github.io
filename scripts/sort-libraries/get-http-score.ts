type HttpScoreRespone = {
  total?: number
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
    return { total: 0 }
  }
  const responseJson: HttpScoreRespone = await response.json()
  if (!responseJson) {
    return { total: 0 }
  }
  return responseJson
}

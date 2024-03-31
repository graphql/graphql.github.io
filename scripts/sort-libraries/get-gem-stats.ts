type GemStatsFetchRespone = {
  name: string
  downloads: number
  version: string
  version_created_at: string
  version_downloads: number
  platform: string
  authors: string
  info: string
  licenses: Array<string>
  metadata: {
    homepage_uri: string
    changelog_uri: string
    bug_tracker_uri: string
    source_code_uri: string
    mailing_list_uri: string
  }
  yanked: boolean
  sha: string
  gem_uri: string
  homepage_uri: string
  wiki_uri: string
  documentation_uri: string
  mailing_list_uri: string
  source_code_uri: string
  bug_tracker_uri: string
  changelog_uri: string
  funding_uri: string
  dependencies: {
    development: Array<string>
    runtime: Array<string>
  }
}

export async function getGemStats(packageName: string): Promise<number> {
  try {
    const response = await fetch(
      `https://rubygems.org/api/v1/gems/${encodeURIComponent(packageName)}.json`,
    )

    if (!response.ok) {
      console.warn(
        `Error fetching GEM stats for ${packageName}. Status: ${response.status}`,
      )
      return 0
    }

    const responseJson: GemStatsFetchRespone = await response.json()
    return responseJson.downloads ?? 0
  } catch (error) {
    console.error(`Exception fetching GEM stats for ${packageName}:`, error)
    return 0
  }
}

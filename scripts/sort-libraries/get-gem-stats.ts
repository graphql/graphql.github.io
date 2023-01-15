type GemStatsRespone = {
  name?: string
  downloads: number
  version?: string
  version_created_at?: string
  version_downloads?: number
  platform?: string
  authors?: string
  info?: string
  licenses?: Array<string>
  metadata?: {
    homepage_uri?: string
    changelog_uri?: string
    bug_tracker_uri?: string
    source_code_uri?: string
    mailing_list_uri?: string
  }
  yanked?: boolean
  sha?: string
  gem_uri?: string
  homepage_uri?: string
  wiki_uri?: string
  documentation_uri?: string
  mailing_list_uri?: string
  source_code_uri?: string
  bug_tracker_uri?: string
  changelog_uri?: string
  funding_uri?: string
  dependencies?: {
    development?: Array<string>
    runtime?: Array<string>
  }
}

export async function getGemStats(packageName: string): Promise<number> {
  if (!packageName) {
    return 0
  }
  const response = await fetch(
    `https://rubygems.org/api/v1/gems/${encodeURIComponent(packageName)}.json`
  )
  if (!response.ok) {
    return 0
  }
  const responseJson: GemStatsRespone = await response.json()
  if (!responseJson) {
    return 0
  }
  return responseJson.downloads
}

const numbro = require("numbro")
const timeago = require("timeago.js")

const getGitHubStats = async githubRepo => {
  const [owner, repoName] = githubRepo.split("/")
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  if (!accessToken) {
    return {
      accessToken: false,
    }
  }
  const query = /* GraphQL */ `
    fragment defaultBranchRefFragment on Ref {
      target {
        ... on Commit {
          history(since: $since) {
            edges {
              node {
                author {
                  name
                }
                pushedDate
              }
            }
          }
        }
      }
    }
    query ($owner: String!, $repoName: String!, $since: GitTimestamp!) {
      repositoryOwner(login: $owner) {
        repository(name: $repoName) {
          defaultBranchRef {
            ...defaultBranchRefFragment
          }
          stargazers {
            totalCount
          }
          updatedAt
          forkCount
          pullRequests {
            totalCount
          }
          description
          licenseInfo {
            name
          }
          releases(first: 1) {
            nodes {
              publishedAt
            }
          }
          tags: refs(
            refPrefix: "refs/tags/"
            first: 1
            orderBy: { field: TAG_COMMIT_DATE, direction: DESC }
          ) {
            nodes {
              name
              target {
                ... on Tag {
                  target {
                    ... on Commit {
                      pushedDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 3)
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
      variables: { owner, repoName, since: lastMonth },
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
  const responseJson = await response.json()
  if (responseJson && responseJson.errors) {
    throw JSON.stringify(responseJson.errors)
  }
  if (!responseJson || !responseJson.data) {
    throw `GitHub returned empty response for ${owner}/${repoName}`
  }
  const { repositoryOwner } = responseJson.data
  if (!repositoryOwner) {
    throw `No GitHub user found for ${owner}/${repoName}`
  }
  const { repository: repo } = repositoryOwner
  if (!repo) {
    throw `No GitHub repo found ${owner}/${repoName}`
  }
  const stars = repo.stargazers.totalCount
  const commitHistory = repo.defaultBranchRef.target.history.edges

  let hasCommitsInLast3Months = false
  commitHistory.forEach(commit => {
    if (!commit.node.author.name.match(/bot/i)) {
      hasCommitsInLast3Months = true
    }
  })
  const formattedStars = numbro(stars).format({
    average: true,
  })

  const releases: any = []
  if (
    repo.tags &&
    repo.tags.nodes &&
    repo.tags.nodes.length &&
    repo.tags.nodes[0].target.target &&
    repo.tags.nodes[0].target.target.pushedDate
  ) {
    releases.push(repo.tags.nodes[0].target.target.pushedDate)
  }
  if (repo.releases && repo.releases.nodes && repo.releases.nodes.length) {
    releases.push(repo.releases.nodes[0].publishedAt)
  }
  if (owner.includes("graphql")) {
    console.log({ releases, repoName })
  }

  const lastRelease = releases.filter(Boolean).sort().reverse()[0]

  return {
    hasCommitsInLast3Months,
    stars,
    formattedStars,
    license: repo.licenseInfo && repo.licenseInfo.name,
    lastRelease,
    formattedLastRelease: lastRelease && timeago.format(lastRelease),
  }
}

async function getNpmStats(packageName: string): Promise<number> {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  const responseJson = await response.json()
  const downloadCount = responseJson.downloads
  if (!downloadCount) {
    console.debug(
      `getNpmStats: No download count for ${packageName}, so value is 0!`
    )
    return 0
  }
  return downloadCount
}

async function getGemStats(packageName: string): Promise<number> {
  const response = await fetch(
    `https://rubygems.org/api/v1/gems/${encodeURIComponent(packageName)}.json`
  )
  const responseJson = await response.json()
  const downloadCount = responseJson.downloads
  console.debug(`getGemStats: ${downloadCount} for ${packageName}`)
  if (!downloadCount) {
    console.debug(
      `getGemStats: No download count for ${packageName}, so value is 0!`
    )
    return 0
  }
  return downloadCount
}

export async function sortLibs(libs: any) {
  {
    let totalStars = 0
    const libsWithScores = await Promise.all(
      libs.map(async lib => {
        const [npmStats = {}, gemStars = {}, githubStats = {}] =
          await Promise.all([
            lib.npm && (await getNpmStats(lib.npm)),
            lib.gem && (await getGemStats(lib.gem)),
            lib.github && (await getGitHubStats(lib.github)),
          ])
        const result = {
          ...lib,
          ...npmStats,
          ...gemStars,
          ...githubStats,
        }
        totalStars += result.stars || 0
        return result
      })
    )
    const sortedLibs = libsWithScores.sort((a, b) => {
      let aScore = 0,
        bScore = 0
      if ("downloadCount" in a && "downloadCount" in b) {
        if (a.downloadCount > b.downloadCount) {
          aScore += 40
        } else if (b.downloadCount > a.downloadCount) {
          bScore += 40
        }
      }
      if ("hasCommitsInLast3Months" in a && a.hasCommitsInLast3Months) {
        aScore += 30
      }
      if ("hasCommitsInLast3Months" in b && b.hasCommitsInLast3Months) {
        bScore += 30
      }
      if ("stars" in a && "stars" in b) {
        if (a.stars > b.stars) {
          aScore += 40
        } else if (a.stars < b.stars) {
          bScore += 40
        }
      }
      if (bScore > aScore) {
        return 1
      }
      if (bScore < aScore) {
        return -1
      }
      return 0
    })
    return { sortedLibs, totalStars }
  }
}

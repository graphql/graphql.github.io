import numbro from "numbro"
import { format as timeago } from "timeago.js"

type GitHubStatsFetchResponse =
  | {
      errors: [
        {
          extensions: {
            value: string
            problems: [
              {
                path: string
                explanation: string
              }
            ]
          }
          locations: [
            {
              line: number
              column: number
            }
          ]
          message: string
        }
      ]
    }
  | {
      data: {
        repositoryOwner: {
          repository: {
            defaultBranchRef: {
              target: {
                history: {
                  edges: [
                    {
                      node: {
                        author: {
                          name: string
                        }
                        pushedDate: string
                      }
                    }
                  ]
                }
              }
            }
            stargazers: {
              totalCount: number
            }
            updatedAt: string
            forkCount: number
            pullRequests: {
              totalCount: number
            }
            description: string
            licenseInfo: {
              name: string
            }
            releases: {
              nodes: [
                {
                  publishedAt: string
                }
              ]
            }
            tags: {
              nodes: [
                {
                  name: string
                  target: {
                    target: {
                      pushedDate: string
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }

type GitHubInfo = {
  hasCommitsInLast3Months: boolean
  stars: number
  formattedStars: string
  license: string
  lastRelease: string
  formattedLastRelease: string
}

type Release = { date: string; formattedDate: string }

export async function getGitHubStats(
  githubRepo: string
): Promise<GitHubInfo | undefined> {
  const [owner, repoName] = githubRepo.split("/")
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  if (!accessToken) {
    console.warn(
      `No GITHUB_ACCESS_TOKEN environment variable found. Skipping GitHub stats for ${githubRepo}`
    )
    return
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
    query GitHubInfo(
      $owner: String!
      $repoName: String!
      $since: GitTimestamp!
    ) {
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
  if (!response.ok) {
    console.warn(
      `Get invalid response from GitHub for ${owner}/${repoName}. Status: ${response.status}`
    )
  }
  const responseJson: GitHubStatsFetchResponse = await response.json()

  if (responseJson && "data" in responseJson) {
    const repositoryOwner = responseJson.data.repositoryOwner
    if (!repositoryOwner) {
      throw `No GitHub user found for ${owner}/${repoName}`
    }
    const { repository: repo } = repositoryOwner
    console.log("repo:", repo.tags)
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
    const releases: Release[] = []
    if (
      repo.tags &&
      repo.tags.nodes &&
      repo.tags.nodes.length &&
      repo.tags.nodes[0].target.target &&
      repo.tags.nodes[0].target.target.pushedDate
    ) {
      releases.push({
        date: repo.tags.nodes[0].target.target.pushedDate,
        formattedDate: timeago(repo.tags.nodes[0].target.target.pushedDate),
      })
    }
    if (repo.releases && repo.releases.nodes && repo.releases.nodes.length) {
      releases.push({
        date: repo.releases.nodes[0].publishedAt,
        formattedDate: timeago(repo.releases.nodes[0].publishedAt),
      })
    }
    if (owner.includes("graphql")) {
      console.log({ releases, repoName })
    }
    console.log("releases", releases)

    const lastRelease = releases.filter(Boolean).sort().reverse()[0]
    console.log("lastRelease", lastRelease)
    return {
      hasCommitsInLast3Months,
      stars,
      formattedStars,
      license: repo.licenseInfo && repo.licenseInfo.name,
      lastRelease: lastRelease ? lastRelease.date : "",
      formattedLastRelease: lastRelease ? lastRelease.formattedDate : "",
    }
  } else {
    console.warn(
      `Get invalid response from GitHub for ${owner}/${repoName}. Response: ${JSON.stringify(
        responseJson
      )}`
    )
  }
}

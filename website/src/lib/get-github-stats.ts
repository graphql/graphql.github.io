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
              },
            ]
          }
          locations: [
            {
              line: number
              column: number
            },
          ]
          message: string
        },
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
                    },
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
                },
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
                },
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
  githubRepo: string,
): Promise<GitHubInfo | void> {
  const [owner, repoName] = githubRepo.split("/")
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  if (!accessToken) {
    console.warn(
      `No GITHUB_ACCESS_TOKEN environment variable found. Skipping GitHub stats for ${githubRepo}`,
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
  const lastThreeMonths = new Date()
  lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3)

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({
        query,
        variables: { owner, repoName, since: lastThreeMonths.toISOString() },
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn(
        `Error fetching GitHub stats for ${owner}/${repoName}. Status: ${response.status}`,
      )
      return undefined
    }

    const responseJson: GitHubStatsFetchResponse = await response.json()

    if ("errors" in responseJson) {
      console.warn(
        `GitHub GraphQL errors for ${owner}/${repoName}:`,
        responseJson.errors,
      )
      return undefined
    }

    const repo = responseJson.data.repositoryOwner?.repository
    if (!repo) {
      console.warn(`No GitHub repository found for ${owner}/${repoName}`)
      return undefined
    }

    const hasCommitsInLast3Months =
      repo.defaultBranchRef.target.history.edges.some(
        edge => new Date(edge.node.pushedDate) > lastThreeMonths,
      )
    const formattedStars = numbro(repo.stargazers.totalCount).format({
      average: true,
    })

    const lastRelease = getLastRelease(repo)

    return {
      hasCommitsInLast3Months,
      stars: repo.stargazers.totalCount,
      formattedStars,
      license: repo.licenseInfo?.name ?? "Unknown",
      lastRelease: lastRelease?.date ?? "",
      formattedLastRelease: lastRelease?.formattedDate ?? "",
    }
  } catch (error) {
    console.error(`Exception fetching GitHub stats for ${githubRepo}:`, error)
    return undefined
  }
}

function getLastRelease(repo: any): Release | undefined {
  const releases: Release[] = []

  repo.tags.nodes.forEach((node: any) => {
    if (node.target.target?.pushedDate) {
      releases.push({
        date: node.target.target.pushedDate,
        formattedDate: timeago(node.target.target.pushedDate),
      })
    }
  })

  repo.releases.nodes.forEach((node: any) => {
    if (node.publishedAt) {
      releases.push({
        date: node.publishedAt,
        formattedDate: timeago(node.publishedAt),
      })
    }
  })

  return releases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0]
}

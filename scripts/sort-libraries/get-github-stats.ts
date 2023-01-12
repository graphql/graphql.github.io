const numbro = require("numbro")
const timeago = require("timeago.js")

export async function getGitHubStats(githubRepo: any) {
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
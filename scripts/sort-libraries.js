const fetch = require(`node-fetch`)

const getGitHubStats = async githubRepo => {
  const [owner, repoName] = githubRepo.split("/")
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error(`You must have GITHUB_ACCESS_TOKEN env variable defined!`)
  }
  const query = /* GraphQL */ `
    fragment defaultBranchRef on Ref {
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
    query($owner: String!, $repoName: String!, $since: GitTimestamp!) {
      repositoryOwner(login: $owner) {
        repository(name: $repoName) {
          mainRef: ref(qualifiedName: "main") {
            ...defaultBranchRef
          }
          sourceRef: ref(qualifiedName: "source") {
            ...defaultBranchRef
          }
          masterRef: ref(qualifiedName: "master") {
            ...defaultBranchRef
          }
          developRef: ref(qualifiedName: "develop") {
            ...defaultBranchRef
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
        }
      }
    }
  `
  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)
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
  const actualDefaultBranch =
    repo.mainRef || repo.sourceRef || repo.developRef || repo.masterRef
  if (!actualDefaultBranch) {
    throw `No default branch found for ${owner}/${repoName}`
  }
  const commitHistory = actualDefaultBranch.target.history.edges
  let commitCount = 0,
    daysWithCommitSet = new Set()
  commitHistory.forEach(commit => {
    if (!commit.node.author.name.match(/bot/i)) {
      commitCount++
      daysWithCommitSet.add(new Date(commit.node.pushedDate).getDate())
    }
  })
  return {
    commitCount,
    daysWithCommit: daysWithCommitSet.size,
    stars,
  }
}

const getNpmStats = async packageName => {
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(
      packageName
    )}`
  )
  const responseJson = await response.json()
  const downloadCount = responseJson.downloads
  return { downloadCount }
}

const getGemStats = async packageName => {
  const response = await fetch(
    `https://rubygems.org/api/v1/gems/${encodeURIComponent(packageName)}.json`
  )
  const responseJson = await response.json()
  const downloadCount = responseJson.downloads
  return { downloadCount }
}

const sortLibs = async libs => {
  if (libs.length === 1) {
    return libs;
  }
  const libsWithScores = await Promise.all(
    libs.map(async lib => {
      const [npmStats = {}, gemStars = {}, githubStats = {}] = await Promise.all([
        lib.npm && getNpmStats(lib.npm),
        lib.gem && getGemStats(lib.gem),
        lib.github && getGitHubStats(lib.github),
      ])
      return {
        ...lib,
        ...npmStats,
        ...githubStats,
      }
    })
  )
  return libsWithScores.sort((a, b) => {
    let aScore = 0,
      bScore = 0
    if (a.npm && b.npm) {
      if (a.downloadCount > b.downloadCount) {
        aScore += 40
      } else if (b.downloadCount > a.downloadCount) {
        bScore += 40
      }
    }
    if (a.github && b.github) {
      if (a.daysWithCommit > b.daysWithCommit) {
        aScore += 20
      } else if (a.daysWithCommit < b.daysWithCommit) {
        bScore += 20
      }
      if (a.commitCount > b.commitCount) {
        aScore += 20
      } else if (a.commitCount < b.commitCount) {
        bScore += 20
      }
      if (a.stars > b.stars) {
        aScore += 30
      } else if (a.stars < b.stars) {
        bScore += 30
      }
    }
    if (bScore > aScore) {
      return 1
    } else if (bScore < aScore) {
      return -1
    }
    return 0
  })
}

module.exports = sortLibs

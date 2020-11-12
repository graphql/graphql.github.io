const fetch = require(`node-fetch`);
const numbro = require("numbro");
const timeago = require('timeago.js');

const getGitHubStats = async githubRepo => {
  const [owner, repoName] = githubRepo.split("/")
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  if (!accessToken) {
    return {};
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
    query($owner: String!, $repoName: String!, $since: GitTimestamp!) {
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
          releases(last: 1) {
            nodes {
              publishedAt 
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
    throw JSON.stringify(responseJson.errors);
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
  let hasCommitsInLast3Months = false;
  commitHistory.forEach(commit => {
    if (!commit.node.author.name.match(/bot/i)) {
      hasCommitsInLast3Months = true;
    }
  })
  const formattedStars = numbro(stars).format({
    average: true,
  });
  let lastRelease;
  if (repo.releases?.nodes?.length) {
    lastRelease = repo.releases.nodes[0].publishedAt;
  }
  return {
    hasCommitsInLast3Months,
    stars,
    formattedStars,
    license: repo.licenseInfo?.name,
    lastRelease,
    formattedLastRelease: lastRelease && timeago.format(lastRelease),
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
  let totalStars = 0;
  const libsWithScores = await Promise.all(
    libs.map(async lib => {
      const [
        npmStats = {},
        gemStars = {},
        githubStats = {},
      ] = await Promise.all([
        lib.npm && getNpmStats(lib.npm),
        lib.gem && getGemStats(lib.gem),
        lib.github && getGitHubStats(lib.github),
      ])
      const result = {
        ...lib,
        ...npmStats,
        ...gemStars,
        ...githubStats,
      }
      totalStars += result.stars || 0;
      return result;
    })
  )
  const sortedLibs = libsWithScores.sort((a, b) => {
    let aScore = 0,
      bScore = 0
    if ("downloadCount" in a && 'downloadCount' in b) {
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
    if ('stars' in a && 'stars' in b) {
      if (a.stars > b.stars) {
        aScore += 40
      } else if (a.stars < b.stars) {
        bScore += 40
      }
    }
    if (bScore > aScore) {
      return 1
    } else if (bScore < aScore) {
      return -1
    }
    return 0
  })
  return { sortedLibs, totalStars }
}

module.exports = sortLibs

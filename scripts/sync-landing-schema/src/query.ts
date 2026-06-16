import { graphql } from "../generated/index.ts"

export const QUERY = graphql(`
  query RepoContributors($owner: String!, $name: String!, $after: String) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100, after: $after) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                author {
                  user {
                    login
                    websiteUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)

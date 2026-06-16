/* eslint-disable */
import * as types from "./graphql.ts"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  query RepoContributors($owner: String!, $name: String!, $after: String) {\n    repository(owner: $owner, name: $name) {\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 100, after: $after) {\n              pageInfo {\n                hasNextPage\n                endCursor\n              }\n              nodes {\n                author {\n                  user {\n                    login\n                    websiteUrl\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.RepoContributorsDocument
}
const documents: Documents = {
  "\n  query RepoContributors($owner: String!, $name: String!, $after: String) {\n    repository(owner: $owner, name: $name) {\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 100, after: $after) {\n              pageInfo {\n                hasNextPage\n                endCursor\n              }\n              nodes {\n                author {\n                  user {\n                    login\n                    websiteUrl\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.RepoContributorsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query RepoContributors($owner: String!, $name: String!, $after: String) {\n    repository(owner: $owner, name: $name) {\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 100, after: $after) {\n              pageInfo {\n                hasNextPage\n                endCursor\n              }\n              nodes {\n                author {\n                  user {\n                    login\n                    websiteUrl\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n",
): typeof import("./graphql.ts").RepoContributorsDocument

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

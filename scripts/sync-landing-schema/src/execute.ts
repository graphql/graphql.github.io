import type { ExecutionResult } from "graphql"

import type { TypedDocumentString } from "../generated/graphql.ts"

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables?: TVariables,
  headers?: Record<string, string>,
): Promise<ExecutionResult<TResult>> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    console.error("Network response was not ok:", response)
    throw new Error("Network response was not ok")
  }

  return (await response.json()) as ExecutionResult<TResult>
}

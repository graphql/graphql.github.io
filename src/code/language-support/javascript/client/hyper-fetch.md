---
name: HyperFetch
description: A type-safe data fetching framework for TypeScript whose GraphQL adapter sends queries and mutations as typed requests, with a cache entry per set of variables, retries, offline replay, React hooks and subscriptions over WebSocket.
url: https://hyperfetch.bettertyped.com/docs/integrations/adapter-graphql/overview/
github: BetterTyped/hyper-fetch
npm: "@hyper-fetch/graphql"
tags:
  - tools-and-libraries
  - frontend
---

HyperFetch is a data fetching framework for TypeScript that uses one request API for REST, GraphQL, WebSockets and Server-Sent Events. Its GraphQL adapter, `@hyper-fetch/graphql`, turns a GraphQL document into the request's endpoint and its variables into the payload, so queries and mutations get the same caching, retries, deduplication, offline replay and React hooks (`useFetch`, `useSubmit`) as any other HyperFetch request.

- Every set of variables gets its own cache entry, so data you already fetched renders instantly.
- Typed documents from GraphQL Code Generator or gql.tada type the variables and data without generics.
- The GraphQL `errors` array arrives in `response.error`, and `send()` resolves instead of throwing.
- Queries can be sent with `GET` so browsers and CDNs can cache them.
- Subscriptions run over WebSocket with `GraphqlWsAdapter`, which speaks the `graphql-transport-ws` protocol.
- Works with any spec-compliant server, such as Apollo Server, GraphQL Yoga or Hasura.

Install it:

```bash
npm install @hyper-fetch/core @hyper-fetch/sockets @hyper-fetch/graphql graphql graphql-tag
```

Create a client with the GraphQL adapter and send a query:

```ts
import { createClient } from "@hyper-fetch/core"
import { GraphqlAdapter } from "@hyper-fetch/graphql"
import gql from "graphql-tag"

const client = createClient({
  url: "https://api.example.com/graphql",
}).setAdapter(GraphqlAdapter())

const getUser = client.createRequest<{
  response: { user: { id: string; name: string } | null }
  payload: { id: string }
}>()({
  endpoint: gql`
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
      }
    }
  `,
})

// The payload is sent as the GraphQL variables
const { data, error } = await getUser.send({ payload: { id: "1" } })
```

In React, the same request works with the hooks from `@hyper-fetch/react`:

```tsx
import { useFetch } from "@hyper-fetch/react"

function UserName({ id }: { id: string }) {
  const { data, loading } = useFetch(getUser.setPayload({ id }))

  if (loading) return "Loading..."
  return <p>{data?.user?.name}</p>
}
```

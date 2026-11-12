---
name: Apollo Shared Ws
description: Share a single WebSocket connection across multiple browser tabs and windows for Apollo Client. Features built-in subscription deduplication via payload indexing to optimize network performance.
github: sdev-buildz/apollo-state-sync/tree/main/packages/apollo-shared-ws
npm: apollo-shared-ws
tags:
  - tools-and-libraries
  - frontend
---

### 🗂️ Subscription Deduplication & Indexing

- GraphQL Subscriptions are uniquely indexed by their payloads across all active browsing contexts—including browser tabs, windows, and iframes.
- When a user opens multiple tabs, network load remains identical to having just a single tab open.
- Making duplicate subscriptions across different UI components will not trigger extra network requests.

<br/>

### 📦 Installation

```sh
npm install apollo-shared-ws graphql-shared-ws
```

### 💻 Quick start

```ts
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client"
import { setupRestartSubscription } from "apollo-shared-ws"
import { createSharedClient } from "graphql-shared-ws"
import { authLink } from "./util/authLink"

const wsLink = new GraphQLWsLink(
  // use 'createSharedClient'.
  createSharedClient({
    url: "wss://localhost:443/api/graphql",
    connectionParams: {
      headers: {
        authorization: "auth-token-1234",
      },
    },
  }),
)

const apolloClient =
  //  use setupRestartSubscription to enable subscription restarts.
  //    wrap ApolloClient with setupRestartSubscription(...)
  setupRestartSubscription(
    new ApolloClient({
      link: ApolloLink.from([authLink, wsLink]),
      cache: new InMemoryCache(),
    }),
  )
```

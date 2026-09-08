---
name: GraphQL-Shared-WS
description: GraphQL clients sharing a single WebSocket connection across browsing contexts such as browser tabs, windows, iframes, etc... GraphQL subscriptions are indexed by their payloads, preventing duplicate subscription channels.
github: sdev-buildz/graphql-shared-ws
npm: graphql-shared-ws
tags:
  - tools-and-libraries
  - frontend
---

## ⚡ Optimizations 
<br/>
<br/>

### 📦 SharedWorker size

- The SharedWorker script is 📦 bundled, 🌳 tree-shaken, 📉 minified, 🗜️ gzipped, 🔠 base64 encoded and 📥 inlined within this library.
- All the SharedWorker registration logic (including decoding and decompression) are automatically handled by and within this library itself.
- The base64-encoded SharedWorker script is only 6 KB. ([generated source](https://github.com/sdev-buildz/graphql-shared-ws/blob/782d08e34387684846988a6eee132917f5357cef/src/util/worker-registration/tracked-generated/shared-worker-inline.ts)).

<br/>

### 🗂️ Subscription indexing

- GraphQL subscriptions are indexed by their payloads across browsing contexts (across browser tabs, windows, iframes, etc...).
- When a user opens multiple tabs, network load remains identical to having just a single tab open.
- Making duplicate subscriptions across different UI components will not trigger extra network requests.

<br/>

## 🚀 Initialize and subscribe

```ts
import { createSharedClient } from 'graphql-shared-ws'

// create a client.
const sharedClient = createSharedClient({
  url: 'wss://example.com/api/graphql',
})

// make a graphql subscription
sharedClient.subscribe(
  {
    query: `
     subscription listenToMessages {
       messageBroadcasted
     }
   `,
  },
  {
    next: (n) => {
      console.log(`Last broadcasted message =`, n.data.messageBroadcasted)
    },
    complete: () => {
      console.log('subscription closed.')
    },
    error: console.error,
  }
)
```

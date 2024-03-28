---
name: GraphQLBox client
description: An extensible GraphQL client with modules for react, caching, request parsing, web workers, websockets and more...
github: badbatch/graphql-box
npm: "@graphql-box/client"
---

The example below installs and initializes the GraphQLBox client with a persisted cache and debugging enabled.

```bash
npm install @graphql-box/core @graphql-box/client @graphql-box/request-parser @graphql-box/cache-manager @graphql-box/debug-manager @graphql-box/fetch-manager @graphql-box/helpers @cachemap/core @cachemap/reaper @cachemap/indexed-db @cachemap/constants @cachemap/types
```

```javascript
import Cachemap from "@cachemap/core"
import indexedDB from "@cachemap/indexed-db"
import reaper from "@cachemap/reaper"
import CacheManager from "@graphql-box/cache-manager"
import Client from "@graphql-box/client"
import DebugManager from "@graphql-box/debug-manager"
import FetchManager from "@graphql-box/fetch-manager"
import RequestParser from "@graphql-box/request-parser"
import introspection from "./introspection-query"

const requestManager = new FetchManager({
  apiUrl: "/api/graphql",
  batchRequests: true,
  logUrl: "/log/graphql",
})

const client = new Client({
  cacheManager: new CacheManager({
    cache: new Cachemap({
      name: "client-cache",
      reaper: reaper({ interval: 300000 }),
      store: indexedDB(/* configure */),
    }),
    cascadeCacheControl: true,
    typeCacheDirectives: {
      // Add any type specific cache control directives in the format:
      // TypeName: "public, max-age=3",
    },
  }),
  debugManager: new DebugManager({
    environment: "client",
    log: (message, data, logLevel) => {
      requestManager.log(message, data, logLevel)
    },
    name: "CLIENT",
    performance: self.performance,
  }),
  requestManager,
  requestParser: new RequestParser({ introspection }),
})

// Meanwhile... somewhere else in your code

const { data, errors } = await client.request(queryOrMutation)
```

---
name: GraphQLBox server
description: An extensible GraphQL server with modules for caching, request parsing, debugging, subscriptions and more...
github: badbatch/graphql-box
npm: "@graphql-box/server"
---

The example below installs and initializes the GraphQLBox server with a persisted cache and debugging enabled.

```bash
npm install @graphql-box/core @graphql-box/server @graphql-box/client @graphql-box/request-parser @graphql-box/cache-manager @graphql-box/debug-manager @graphql-box/execute @graphql-box/helpers @cachemap/core @cachemap/reaper @cachemap/redis @cachemap/constants @cachemap/types
```

```javascript
import Cachemap from "@cachemap/core"
import redis from "@cachemap/redis"
import reaper from "@cachemap/reaper"
import CacheManager from "@graphql-box/cache-manager"
import Client from "@graphql-box/client"
import DebugManager from "@graphql-box/debug-manager"
import Execute from "@graphql-box/execute"
import RequestParser from "@graphql-box/request-parser"
import Server from "@graphql-box/server"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { performance } from "perf_hooks"
import { schemaResolvers, schemaTypeDefs } from "./schema"
import logger from "./logger"

const schema = makeExecutableSchema({
  typeDefs: schemaTypeDefs,
  resolvers: schemaResolvers,
})

const server = new Server({
  client: new Client({
    cacheManager: new CacheManager({
      cache: new Cachemap({
        name: "server-cache",
        reaper: reaper({ interval: 300000 }),
        store: redis(/* configure */),
      }),
      cascadeCacheControl: true,
      typeCacheDirectives: {
        // Add any type specific cache control directives in the format:
        // TypeName: "public, max-age=3",
      },
    }),
    debugManager: new DebugManager({
      environment: "server",
      log: (...args) => {
        logger.log(...args)
      },
      name: "SERVER",
      performance,
    }),
    requestManager: new Execute({ schema }),
    requestParser: new RequestParser({ schema }),
  }),
})

// Meanwhile... somewhere else in your code

app.use("api/graphql", graphqlServer.request())
```

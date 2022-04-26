---
name: graphql-yoga
description: GraphQL Yoga is a batteries-included cross-platform GraphQL over HTTP spec-compliant GraphQL Server using Envelop and GraphQL Tools.
url: https://github.com/dotansimha/graphql-yoga
github: dotansimha/graphql-yoga
npm: "@graphql-yoga/node"
---

- Built around the Fetch API `Request` & `Response` objects
- GraphQL over HTTP compliant
- Extensible GraphQL Engine powered by Envelop
- GraphQL Subscriptions over HTTP
- Handle file uploads with GraphQL
- Integrates with AWS Lambda, Cloudflare Workers, Deno, Express, Next.js, SvelteKit, and more.

To run a hello world server with graphql-yoga:

```bash
npm install @graphql-yoga/node graphql
```

Then create a server using the `createServer` import:

```js
import { createServer } from '@graphql-yoga/node'

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello Hello Hello',
      },
    },
  },
})

server.start()
```

Depending on your deployment target, you may need to use an additional library. See the [documentation](https://www.graphql-yoga.com/docs) for further details.

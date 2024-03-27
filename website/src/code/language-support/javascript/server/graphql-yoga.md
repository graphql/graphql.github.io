---
name: graphql-yoga
description: GraphQL Yoga is a batteries-included cross-platform GraphQL over HTTP spec-compliant GraphQL Server using Envelop and GraphQL Tools.
github: dotansimha/graphql-yoga
npm: "graphql-yoga"
---

- Built around the Fetch API `Request` & `Response` objects
- GraphQL over HTTP compliant
- Extensible GraphQL Engine powered by Envelop
- GraphQL Subscriptions over HTTP
- Handle file uploads with GraphQL
- Integrates with AWS Lambda, Cloudflare Workers, Deno, Express, Next.js, SvelteKit, and more.

To run a hello world server with graphql-yoga:

```bash
npm install graphql-yoga graphql
```

Then create a server using the `createServer` import:

```js
import { createServer } from "http"
import { createSchema, createYoga } from "graphql-yoga"

createServer(
  createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => "Hello Hello Hello",
        },
      },
    }),
  }),
).listen(4000, () => {
  console.info("GraphQL Yoga is listening on http://localhost:4000/graphql")
})
```

Depending on your deployment target, you may need to use an additional library. See the [documentation](https://www.graphql-yoga.com/docs) for further details.

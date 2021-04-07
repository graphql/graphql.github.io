---
name: gql
description: Universal GraphQL HTTP middleware for Deno.
url: https://github.com/deno-libs/gql
github: deno-libs/gql
---

To run a hello world server with gql, create a `server.ts` file:

```js
import { serve } from 'https://deno.land/std@0.90.0/http/server.ts'
import { GraphQLHTTP } from 'https://deno.land/x/gql/mod.ts'
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools/mod.ts'
import { gql } from 'https://deno.land/x/graphql_tag/mod.ts'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello World!`
  }
}

const schema = makeExecutableSchema({ resolvers, typeDefs })

const s = serve({ port: 3000 })

for await (const req of s) {
  req.url.startsWith('/graphql')
    ? await GraphQLHTTP({
        schema,
        graphiql: true
      })(req)
    : req.respond({ status: 404 })
}
```

then run:

```sh
deno run --allow-net --allow-read server.ts
```

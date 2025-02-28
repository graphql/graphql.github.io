---
name: Apollo Server
description: A GraphQL server from Apollo that works with any Node.js HTTP framework
url: https://www.apollographql.com/docs/apollo-server/
github: apollographql/apollo-server
npm: "@apollo/server"
---

To run a hello world server with Apollo Server:

```bash
npm install @apollo/server graphql
```

Then run `node server.js` with this code in `server.js`:

```js
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server)
console.log(`🚀 Server ready at ${url}`)
```

Apollo Server has a built in standalone HTTP server and middleware for Express, and has an framework integration API that supports all [Node.js HTTP server frameworks and serverless environments](https://www.apollographql.com/docs/apollo-server/integrations/integration-index) via community integrations.

Apollo Server has a [plugin API](https://www.apollographql.com/docs/apollo-server/integrations/plugins), integration with Apollo Studio, and performance and security features such as [caching](https://www.apollographql.com/docs/apollo-server/performance/caching/), [automatic persisted queries](https://www.apollographql.com/docs/apollo-server/performance/apq/), and [CSRF prevention](https://www.apollographql.com/docs/apollo-server/security/cors#preventing-cross-site-request-forgery-csrf).

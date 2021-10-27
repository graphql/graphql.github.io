---
name: Apollo Server
description: A set of GraphQL server packages from Apollo that work with various Node.js HTTP frameworks (Express, Connect, Hapi, Koa etc).
url: https://www.apollographql.com/docs/apollo-server/
github: apollographql/apollo-server
npm: "apollo-server-express"
---

To run a hello world server with apollo-server-express:

```bash
npm install apollo-server-express apollo-server-core express graphql
```

Then run `node server.js` with this code in `server.js`:

```js
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
```

Apollo Server also supports all Node.js HTTP server frameworks: Express, Connect, HAPI, Koa and NestJs.

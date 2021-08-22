---
name: Apollo Server
description: A set of GraphQL server packages from Apollo that work with various Node.js HTTP frameworks (Express, Connect, Hapi, Koa etc).
url: https://www.apollographql.com/docs/apollo-server/
github: apollographql/apollo-server
npm: "apollo-server-express"
---

To run a hello world server with apollo-server-express:

```bash
npm install apollo-server-express express graphql
```

Then run `node server.js` with this code in `server.js`:

```js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const main = async () => {
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
};

main();
```

Apollo Server also supports all Node.js HTTP server frameworks: Express, Connect, HAPI, Koa and NestJs.

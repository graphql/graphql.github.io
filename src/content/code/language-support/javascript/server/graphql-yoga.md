---
name: graphql-yoga
description: Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience
url: https://github.com/dotansimha/graphql-yoga
github: dotansimha/graphql-yoga
npm: "graphql-yoga"
---

- Sensible defaults & includes everything you need with minimal setup.
- Built-in support for GraphQL subscriptions using WebSockets.
- Works with all GraphQL clients (Apollo, Relay...) and fits seamless in your GraphQL workflow.

To run a hello world server with graphql-yoga:

```bash
npm install graphql-yoga
```

Then run `node server.js` with this code in `server.js`:

```js
import { GraphQLServer } from 'graphql-yoga'
// ... or using "require()"
// const { GraphQLServer } = require('graphql-yoga')
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
```

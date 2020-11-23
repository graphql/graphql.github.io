---
name: GraphQL Helix
description: A collection of utility functions for building your own GraphQL HTTP server.  You can check out [Building a GraphQL server with GraphQL Helix](https://dev.to/danielrearden/building-a-graphql-server-with-graphql-helix-2k44) on DEV for a detailed tutorial on getting started.
url: https://github.com/contrawork/graphql-helix
github: contrawork/graphql-helix
npm: "graphql-helix"
---

To run a hello world server with GraphQL Helix:

```bash
npm install graphql graphql-helix express
```

Then run `node server.js` with this code in `server.js`:

```js
const express = require('express')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql');
const {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL
} = require('graphql-helix');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello world!',
      },
    },
  }),
});

const app = express();

app.use(express.json());

app.use('/graphql', async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL());
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    });

    if (result.type === 'RESPONSE') {
      result.headers.forEach(({ name, value }) => res.setHeader(name, value));
      res.status(result.status);
      res.json(result.payload);
    } else {
    // graphql-helix also supports subscriptions and incremental delivery (i.e. @defer and @stream directives)
    // out of the box. See the repo for more complete examples that also implement those features.
    }
  }
});

app.listen(4000, () =>
  console.log('Now browse to http://localhost:4000/graphql');
)
```

This example uses Express, but GraphQL Helix is framework- and runtime-agnostic -- it can run in Node, Deno and the browser. GraphQL Helix provides you with a handful of utility functions to build your own HTTP server but leaves the ultimate implementation details up to you.

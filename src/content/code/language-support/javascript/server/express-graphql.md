---
name: Express GraphQL
description: The reference implementation of a GraphQL API server over an Express webserver. You can use this to run GraphQL in conjunction with a regular Express webserver, or as a standalone GraphQL server.
url: /graphql-js/running-an-express-graphql-server/
github: graphql/express-graphql
npm: "express-graphql"
---

To run an `express-graphql` hello world server:

```bash
npm install express express-graphql graphql
```

Then run `node server.js` with this code in `server.js`:

```js
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

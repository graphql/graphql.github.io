---
name: GraphQL.js
description: The reference implementation of the GraphQL specification, designed for running GraphQL in a Node.js environment.
url: /graphql-js/
github: graphql/graphql-js
npm: "graphql"
---

To run a `GraphQL.js` hello world script from the command line:

```bash
npm install graphql
```

Then run `node hello.js` with this code in `hello.js`:

```js
var { graphql, buildSchema } = require("graphql")

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var rootValue = { hello: () => "Hello world!" }

var source = "{ hello }"

graphql({ schema, source, rootValue }).then(response => {
  console.log(response)
})
```

---
title: graphql-http
layout: docs
category: API Reference
permalink: /graphql-js/graphql-http/
sublinks: createHandler
next: /graphql-js/graphql/
---

The [official `graphql-http` package](https://github.com/graphql/graphql-http) provides a simple way to create an [Express](https://expressjs.com/) server that runs a GraphQL API.

```js
import { createHandler } from "graphql-http/lib/use/express" // ES6
const { createHandler } = require("graphql-http/lib/use/express") // CommonJS
```

### createHandler

```js
createHandler({
  schema: GraphQLSchema,
  rootValue?: ?any,
  context?: ?any,
  formatError?: ?Function,
  validationRules?: ?Array<any>,
}): Handler
```

Constructs an Express handler based on a GraphQL schema.

See the [tutorial](/graphql-js/running-an-express-graphql-server/) for sample usage.

See the [GitHub README](https://github.com/graphql/graphql-http) for more extensive documentation, including how to use `graphql-http` with other server frameworks.

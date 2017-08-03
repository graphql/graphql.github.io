---
title: express-graphql
layout: ../_core/GraphQLJSLayout
category: API Reference
permalink: /graphql-js/express-graphql/
sublinks: graphqlHTTP
next: /graphql-js/graphql/
---

`express-graphql` 模块提供了一个创建 [Express](https://expressjs.com/) 服务的简单方法来运行 GraphQL API。

```js
import graphqlHTTP from 'express-graphql'; // ES6
var graphqlHTTP = require('express-graphql'); // CommonJS
```

### graphqlHTTP

```js
graphqlHTTP({
  schema: GraphQLSchema,
  graphiql?: ?boolean,
  rootValue?: ?any,
  context?: ?any,
  pretty?: ?boolean,
  formatError?: ?Function,
  validationRules?: ?Array<any>,
}): Middleware
```

上面的代码是基于 GraphQL schema 构建了一个 Express 应用。

在 [express-graphql 指南](/graphql-js/running-an-express-graphql-server/) 上查看范例的使用。

在 [GitHub README](https://github.com/graphql/express-graphql) 上查看更多关于这个方法的详细文档。

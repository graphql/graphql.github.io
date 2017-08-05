---
title: 运行一个 Express GraphQL 服务器
sidebarTitle: Express + GraphQL
layout: ../_core/GraphQLJSLayout
category: GraphQL.js 教程
permalink: /graphql-js/running-an-express-graphql-server/
next: /graphql-js/graphql-clients/
---

运行 GraphQL 最简单的方法是使用 [Express](https://expressjs.com)（一个 Node.js 上流行的 web 应用框架）。你需要安装两个依赖库：

```bash
npm install express express-graphql graphql --save
```

现在我们来改进 “hello world” 示例，把它从一个只能使用一个查询的简单的脚本变成一个 API 服务器。使用 `express` 模块来运行一个服务器，然后不再直接调用 `graphql` 函数进行查询，而是使用 `express-graphql` 库来构建 GraphQL API 服务器，响应入口端点为 “/graphql” 的 HTTP 请求。

```javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
```

用以下命令启动该 GraphQL 服务器：

```bash
node server.js
```

由于我们对 `graphqlHTTP` 设置 `graphiql: true`，你可以使用 GraphiQL 工具来手动执行 GraphQL 查询。若使用浏览器浏览 `http://localhost:4000/graphql`，你会看到一个界面能让你输入查询语句。它看起来是这样的：

![hello world graphql example](/img/hello.png)

截图显示，向 GraphQL 查询 `{ hello }`，返回结果为 `{ data: { hello: 'Hello world!' } }`。GraphiQL 是一个调试和检测服务器的一个绝佳工具，我们推荐应用在开发阶段时一直使用它。

看到这里，你已学到了如何运行一个 GraphQL 服务器，以及使用 GraphiQL 界面执行查询。接下来学习 [从客户端代码中发起 GraphQL 查询](/graphql-js/graphql-clients/)。

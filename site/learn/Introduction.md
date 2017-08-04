---
title: GraphQL 入门
sidebarTitle: 入门
layout: ../_core/DocsLayout
category: 学习
permalink: /learn/
next: /learn/queries/
---

> 在接下来的一系列文章中，我们会了解 GraphQL 是什么，它是如何运作以及如何使用它。在找如何搭建 GraphQL 服务的文档？这有一些类库可以帮你用[多种不同语言](/code/)实现 GraphQL。

GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。GraphQL 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。例如，一个 GraphQL 服务告诉我们当前登录用户是 `me`，这个用户的名称可能像这样：

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

一并的还有每个类型上字段的解析函数：

```js
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

一旦一个 GraphQL 服务运行起来（通常在 web 服务的一个 URL 上），它就能接收 GraphQL 查询，并验证和执行。接收到的查询首先会被检查确保它只引用了已定义的类型和字段，然后运行指定的解析函数来生成结果。

例如这个查询：

```graphql
{
  me {
    name
  }
}
```

会产生这样的JSON结果：

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

在这系列文章中，我们会学习更多关于 GraphQL 的知识，包括查询语言、类型系统、GraphQL 服务的工作原理以及使用 GraphQL 解决常见问题的最佳实践。

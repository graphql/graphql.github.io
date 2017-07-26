/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');
var Marked = require('../_core/Marked');

export default ({ page, site }) =>
  <Site section="code" title="Code" page={page}>

    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>Code</h1>
          <Marked>{`

GraphQL 已有多种编程语言支持。下表包含一些流行的服务端框架、客户端库和其他有用的内容。

## 服务端库

除了 GraphQL [JavaScript 参考实现](#javascript)，还有其他服务端库：

- [C# / .NET](#c-net)
- [Clojure](#clojure)
- [Elixir](#elixir)
- [Erlang](#erlang)
- [Go](#go)
- [Java](#java)
- [JavaScript](#javascript)
- [PHP](#php)
- [Python](#python)
- [Scala](#scala)
- [Ruby](#ruby)

### C# / .NET

  - [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet)：.NET 的 GraphQL 实现
  - [graphql-net](https://github.com/ckimes89/graphql-net)：转换 GraphQL 到 IQueryable

### Clojure

#### [alumbra](https://github.com/alumbra/alumbra)

一套 Clojure 的 GraphQL 可复用组件，满足 [alumbra.spec](https://github.com/alumbra/alumbra.spec) 规范要求的数据结构。

\`\`\`clojure
(require '[alumbra.core :as alumbra]
         '[claro.data :as data])

(def schema
  "type Person { name: String!, friends: [Person!]! }
   type QueryRoot { person(id: ID!): Person, me: Person! }
   schema { query: QueryRoot }")

(defrecord Person [id]
  data/Resolvable
  (resolve! [_ _]
    {:name    (str "Person #" id)
     :friends (map ->Person  (range (inc id) (+ id 3)))}))

(def QueryRoot
  {:person (map->Person {})
   :me     (map->Person {:id 0})})

(def app
  (alumbra/handler
    {:schema schema
     :query  QueryRoot}))

(defonce my-graphql-server
  (aleph.http/start-server #'app {:port 3000}))
\`\`\`

\`\`\`bash
$ curl -XPOST "http://0:3000" -H'Content-Type: application/json' -d'{
  "query": "{ me { name, friends { name } } }"
}'
{"data":{"me":{"name":"Person #0","friends":[{"name":"Person #1"},{"name":"Person #2"}]}}}
\`\`\`

#### [graphql-clj](https://github.com/tendant/graphql-clj)

一个提供 GraphQL 实现的 Clojure 库。

可以执行一个 \`hello world\` GraphQL 查询的 \`graphql-clj\` 代码如下：

\`\`\`clojure

(def schema "type QueryRoot {
    hello: String
  }")

(defn resolver-fn [type-name field-name]
  (get-in {"QueryRoot" {"hello" (fn [context parent & rest]
                              "Hello world!")}}
          [type-name field-name]))

(require '[graphql-clj.executor :as executor])

(executor/execute nil schema resolver-fn "{ hello }")
\`\`\`

  - [lacinia](https://github.com/walmartlabs/lacinia)：一套 GraphQL 规范的完整实现，致力于维护对规范的外部兼容。

### Elixir

  - [absinthe](https://github.com/absinthe-graphql/absinthe)：Elixir 的 GraphQL 实现。
  - [graphql-elixir](https://github.com/graphql-elixir/graphql): 一个 Facebook GraphQL 的 Elixir 实现。

### Erlang

  - [graphql-erlang](https://github.com/shopgun/graphql-erlang)：Erlang 的 GraphQL 实现。

### Go

  - [graphql-go](https://github.com/graphql-go/graphql): 一个 Go/Golang 的 GraphQL 实现。
  - [graphql-relay-go](https://github.com/graphql-go/relay): 一个用于帮助构建 graphql-go 服务器的 Go/Golang 库，支持 react-relay 。
  - [neelance/graphql-go](https://github.com/neelance/graphql-go)：一个活跃的 Golang GraphQL 实现。

### Java

#### [graphql-java](https://github.com/graphql-java/graphql-java)

一个用于构建 GraphQL API 的 Java 库。

可以执行一个 \`hello world\` GraphQL 查询的 \`graphql-java\` 代码如下：

\`\`\`java
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.StaticDataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

public class HelloWorld {

    public static void main(String[] args) {
        String schema = "type Query{hello: String} schema{query: Query}";

        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeDefinitionRegistry = schemaParser.parse(schema);

        RuntimeWiring runtimeWiring = newRuntimeWiring()
                .type("Query", builder -> builder.dataFetcher("hello", new StaticDataFetcher("world")))
                .build();

        SchemaGenerator schemaGenerator = new SchemaGenerator();
        GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

        GraphQL build = GraphQL.newGraphQL(graphQLSchema).build();
        ExecutionResult executionResult = build.execute("{hello}");

        System.out.println(executionResult.getData().toString());
        // Prints: {hello=world}
    }
}
\`\`\`

查看 [graphql-java 文档](https://github.com/graphql-java/graphql-java) 以了解更多信息。

### JavaScript

#### [GraphQL.js](/graphql-js/) ([github](https://github.com/graphql/graphql-js/)) ([npm](https://www.npmjs.com/package/graphql))

GraphQL 规范的参考实现，设计用于在 Node.js 环境中运行。

如果要在命令行中运行一个 \`GraphQL.js\` 的 \`hello world\` 脚本：

\`\`\`bash
npm install graphql
\`\`\`

然后使用 \`node hello.js\` 以运行 \`hello.js\` 中的代码：

\`\`\`js
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(\`
  type Query {
    hello: String
  }
\`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
\`\`\`

#### [express-graphql](/graphql-js/running-an-express-graphql-server/) ([github](https://github.com/graphql/express-graphql)) ([npm](https://www.npmjs.com/package/express-graphql))

基于 Express webserver 服务器的一个 GraphQL API 服务端参考实现，你可以用它结合常规 Express webserver 来运行 GraphQL，也可以作为独立 GraphQL 服务器。

如果要运行 \`express-graphql\` 的 hello world 服务器：

\`\`\`bash
npm install express express-graphql graphql
\`\`\`

然后使用 \`node server.js\` 以运行 \`server.js\` 中的代码：

\`\`\`js
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(\`
  type Query {
    hello: String
  }
\`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
\`\`\`

#### [graphql-server](http://dev.apollodata.com/tools/graphql-server/index.html) ([github](https://github.com/apollostack/graphql-server)) ([npm](https://www.npmjs.com/package/graphql-server-express))

来自于 Apollo 的一套 GraphQL server 包，可用于多种 Node.js HTTP 框架（Express，Connect，Hapi，Koa 等）。

如果要运行 \`graphql-server-express\` 的 hello world 服务器：

\`\`\`bash
npm install graphql-server-express body-parser express graphql graphql-tools
\`\`\`

然后使用 \`node server.js\` 以运行 \`server.js\` 中的代码：

\`\`\`js
var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var typeDefs = [\`
type Query {
  hello: String
}

schema {
  query: Query
}\`];

var resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
\`\`\`

GraphQL Server 也支持所有的 Node.js HTTP 服务器框架：Express、Connect、HAPI 和 Koa。

### PHP

  - [graphql-php](https://github.com/webonyx/graphql-php)：GraphQL 参考实现的 PHP 移植版本。
  - [graphql-relay-php](https://github.com/ivome/graphql-relay-php)：一个用于辅助构建 graphql-php 服务器的库，支持 react-relay。

### Python

#### [Graphene](http://graphene-python.org/) ([github](https://github.com/graphql-python/graphene))

一个用于构建 GraphQL API 的 Python 库。

如果要运行一个 Graphene hello world 脚本：

\`\`\`bash
pip install graphene
\`\`\`

然后使用 \`python hello.py\` 以运行 \`hello.py\` 中的代码：

\`\`\`python
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String()

  def resolve_hello(self, args, context, info):
    return 'Hello world!'

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello'])
\`\`\`

其也有对 [Relay](https://facebook.github.io/relay/)、Django、SQLAlchemy 和 Google App Engine 的良好绑定。

### Ruby

#### [graphql-ruby](https://github.com/rmosolgo/graphql-ruby)

一个用于构建 GraphQL API 的 Ruby 库。

如果要使用 \`graphql-ruby\` 运行一个 hello world 脚本：

\`\`\`bash
gem install graphql
\`\`\`

然后使用 \`ruby hello.rb\` 运行 \`hello.rb\` 中的代码：

\`\`\`ruby
require 'graphql'

QueryType = GraphQL::ObjectType.define do
  name 'Query'
  field :hello do
    type types.String
    resolve -> (obj, args, ctx) { 'Hello world!' }
  end
end

Schema = GraphQL::Schema.define do
  query QueryType
end

puts Schema.execute('{ hello }')
\`\`\`

其也有对于 Relay 和 Rails 的良好绑定。

### Scala

#### [Sangria](http://sangria-graphql.org/) ([github](https://github.com/sangria-graphql/sangria))：支持 [Relay](https://facebook.github.io/relay/) 的一个 Scala GraphQL 库。

使用的 \`sangria\` 的一个 GraphQL schema 以及 hello world 查询：

\`\`\`scala
import sangria.schema._
import sangria.execution._
import sangria.macros._

val QueryType = ObjectType("Query", fields[Unit, Unit](
  Field("hello", StringType, resolve = _ ⇒ "Hello world!")
))

val schema = Schema(QueryType)

val query = graphql"{ hello }"

Executor.execute(schema, query) map println
\`\`\`

## GraphQL 客户端

- [C# / .NET](#c-net-1)
- [Go](#go-1)
- [Java / Android](#java-android)
- [JavaScript](#javascript-1)
- [Swift / Objective-C iOS](#swift-objective-c-ios)

### C# / .NET

  - [graphql-net-client](https://github.com/bkniffler/graphql-net-client)：基于 .Net 的 GraphQL 客户端基本样例。

### Go

  - [graphql](https://github.com/shurcooL/graphql#readme): 一个使用 Go 编写的 GraphQL 客户端实现。

### Java / Android

  - [Apollo Android](https://github.com/apollographql/apollo-android)：一个用于 Android 的 GraphQL 客户端，强类型、带缓存功能，使用 Java 编写。

### JavaScript

  - [Relay](https://facebook.github.io/relay/) ([github](https://github.com/facebook/relay)) ([npm](https://www.npmjs.com/package/react-relay))：Facebook 的框架，用于构建与 GraphQL 后端交流的 React 应用。
  - [Apollo Client](http://dev.apollodata.com/react/) ([github](https://github.com/apollostack/apollo-client))：一个强大的 JavaScript GraphQL 客户端，设计用于与 React、React Native、Angular 2 或者原生 JavaScript 一同工作。
  - [graphql-request](https://github.com/graphcool/graphql-request)：个简单的弹性的 JavaScript GraphQL 客户端，可以运行于所有的 JavaScript 环境（浏览器，Node.js 和 React Native）—— 基本上是 \`fetch\` 的轻度封装。
  - [Lokka](https://github.com/kadirahq/lokka)：一个简单的 JavaScript GraphQL 客户端，可以运行于所有的 JavaScript 环境 —— 浏览器，Node.js 和 React Native。

### Swift / Objective-C iOS

  - [Apollo iOS](http://dev.apollodata.com/ios/) ([github](https://github.com/apollostack/apollo-ios))：一个用于 iOS 的 GraphQL 客户端，返回查询特定的 Swift 类型，与 Xcode 集成后可以分屏显示你的 Swift 源代码和 GraphQL，并能在行内展示验证错误。
  - [GraphQL iOS](https://github.com/funcompany/graphql-ios): 一个用于 iOS 的  Objective-C GraphQL 客户端。

## 工具

  - [graphiql](https://github.com/graphql/graphiql) ([npm](https://www.npmjs.com/package/graphiql))：一个交互式的运行于浏览器中的 GraphQL IDE.
  - [libgraphqlparser](https://github.com/graphql/libgraphqlparser)：一个 C++ 版 GraphQL 查询语言分析器，提供 C 和 C++ API。
  - [Graphql Language Service](https://github.com/graphql/graphql-language-service)：一个用于构建 IDE 的 GraphQL 语言服务（诊断、自动完成等）的接口。

## 更多内容

  - [awesome-graphql](https://github.com/chentsulin/awesome-graphql)：一个神奇的社区，维护一系列库、资源等。

          `}</Marked>

        </div>
      </div>
    </section>

  </Site>

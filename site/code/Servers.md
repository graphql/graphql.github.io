---
title: Code
sidebarTitle: Servers
layout: ../_core/DocsLayout
category: Code
permalink: /code/
next: /code/clients/
sublinks: C# / .NET,Clojure,Elixir,Erlang,Go,Groovy,Java,JavaScript,PHP,Python,Ruby,Scala
---

> Many different programming languages support GraphQL. This list contains some of the more popular server-side frameworks, client libraries, services, and other useful stuff.

# Server Libraries

In addition to the GraphQL [reference implementations in JavaScript](#javascript), server libraries include:

## C# / .NET

- [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet): GraphQL for .NET
- [graphql-net](https://github.com/ckimes89/graphql-net): Convert GraphQL to IQueryable

## Clojure

### [alumbra](https://github.com/alumbra/alumbra)

A set of reusable GraphQL components for Clojure conforming to the data structures given in [alumbra.spec](https://github.com/alumbra/alumbra.spec).

```clojure
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
```

```bash
$ curl -XPOST "http://0:3000" -H'Content-Type: application/json' -d'{
  "query": "{ me { name, friends { name } } }"
}'
{"data":{"me":{"name":"Person #0","friends":[{"name":"Person #1"},{"name":"Person #2"}]}}}
```

### [graphql-clj](https://github.com/tendant/graphql-clj)

A Clojure library that provides a GraphQL implementation.

Code that executes a hello world GraphQL query with `graphql-clj`:

```clojure
(def schema "type QueryRoot {
    hello: String
  }")

(defn resolver-fn [type-name field-name]
  (get-in {"QueryRoot" {"hello" (fn [context parent & rest]
                              "Hello world!")}}
          [type-name field-name]))

(require '[graphql-clj.executor :as executor])

(executor/execute nil schema resolver-fn "{ hello }")
```

### [lacinia](https://github.com/walmartlabs/lacinia) 

A full implementation of the GraphQL specification that aims to maintain external compliance with the specification.

## Elixir

- [absinthe](https://github.com/absinthe-graphql/absinthe): GraphQL implementation for Elixir.
- [graphql-elixir](https://github.com/graphql-elixir/graphql): An Elixir implementation of Facebook's GraphQL.

## Erlang

- [graphql-erlang](https://github.com/shopgun/graphql-erlang): GraphQL implementation in Erlang.

## Go

- [graphql-go](https://github.com/graphql-go/graphql): An implementation of GraphQL for Go / Golang.
- [graphql-relay-go](https://github.com/graphql-go/relay): A Go / Golang library to help construct a graphql-go server supporting react-relay.
- [neelance/graphql-go](https://github.com/neelance/graphql-go): An active implementation of GraphQL in Golang.

## Groovy

### [gorm-graphql](https://github.com/grails/gorm-graphql/)

**Core Library** - The GORM GraphQL library provides functionality to generate a GraphQL schema based on your GORM entities. In addition to mapping domain classes to a GraphQL schema, the core library also provides default implementations of "data fetchers" to query, update, and delete data through executions of the schema.

**Grails Plugin** - In a addition to the Core Library, the GORM GraphQL Grails Plugin: 

- Provides a controller to receive and respond to GraphQL requests through HTTP, based on their guidelines.
- Generates the schema at startup with spring bean configuration to make it easy to extend.
- Includes a [GraphiQL](https://github.com/graphql/graphiql) browser enabled by default in development. The browser is accessible at /graphql/browser.
- Overrides the default data binder to use the data binding provided by Grails.
- Provides a [trait](https://grails.github.io/gorm-graphql/latest/api/org/grails/gorm/graphql/plugin/testing/GraphQLSpec.html) to make integration testing of your GraphQL endpoints easier.

See [the documentation](https://grails.github.io/gorm-graphql/latest/guide/index.html) for more information.

### [GQL](https://grooviter.github.io/gql/) 

GQL is a Groovy library for GraphQL

## Java

### [graphql-java](https://github.com/graphql-java/graphql-java)

A Java library for building GraphQL APIs.

Code that executes a hello world GraphQL query with `graphql-java`:

```java
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
```

See [the graphql-java docs](https://github.com/graphql-java/graphql-java) for more information on setup.

## JavaScript

### [GraphQL.js](/graphql-js/) ([github](https://github.com/graphql/graphql-js/)) ([npm](https://www.npmjs.com/package/graphql))

The reference implementation of the GraphQL specification, designed for running GraphQL in a Node.js environment.

To run a `GraphQL.js` hello world script from the command line:

```bash
npm install graphql
```

Then run `node hello.js` with this code in `hello.js`:

```js
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
```

### [express-graphql](/graphql-js/running-an-express-graphql-server/) ([github](https://github.com/graphql/express-graphql)) ([npm](https://www.npmjs.com/package/express-graphql))

The reference implementation of a GraphQL API server over an Express webserver. You can use this to run GraphQL in conjunction with a regular Express webserver, or as a standalone GraphQL server.

To run an `express-graphql` hello world server:

```bash
npm install express express-graphql graphql
```

Then run `node server.js` with this code in `server.js`:

```js
var express = require('express');
var graphqlHTTP = require('express-graphql');
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

### [graphql-server](http://dev.apollodata.com/tools/graphql-server/index.html) ([github](https://github.com/apollostack/graphql-server)) ([npm](https://www.npmjs.com/package/graphql-server-express))

A set of GraphQL server packages from Apollo. Also supports all Node.js HTTP server frameworks: Express, Connect, HAPI and Koa.

To run a hello world server with `graphql-server-express`:

```bash
npm install graphql-server-express body-parser express graphql graphql-tools
```

Then run `node server.js` with this code in `server.js`:

```js
var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`];

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
```

## PHP

- [graphql-php](https://github.com/webonyx/graphql-php): A PHP port of GraphQL reference implementation
- [graphql-relay-php](https://github.com/ivome/graphql-relay-php): A library to help construct a graphql-php server supporting react-relay.

## Python

### [Graphene](http://graphene-python.org/) ([github](https://github.com/graphql-python/graphene))

A Python library for building GraphQL APIs.

To run a Graphene hello world script:

```bash
pip install graphene
```

Then run `python hello.py` with this code in `hello.py`:

```python
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String()

  def resolve_hello(self, args, context, info):
    return 'Hello world!'

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello'])
```

There are also nice bindings for [Relay](https://facebook.github.io/relay/), Django, SQLAlchemy, and Google App Engine.

## Ruby

### [graphql-ruby](https://github.com/rmosolgo/graphql-ruby)

A Ruby library for building GraphQL APIs.

To run a hello world script with `graphql-ruby`:

```bash
gem install graphql
```

Then run `ruby hello.rb` with this code in `hello.rb`:

```ruby
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
```

There are also nice bindings for Relay and Rails.

## Scala

### [Sangria](http://sangria-graphql.org/) ([github](https://github.com/sangria-graphql/sangria))

A Scala GraphQL library that supports [Relay](https://facebook.github.io/relay/).

An example of a hello world GraphQL schema and query with `sangria`:

```scala
import sangria.schema._
import sangria.execution._
import sangria.macros._

val QueryType = ObjectType("Query", fields[Unit, Unit](
  Field("hello", StringType, resolve = _ ⇒ "Hello world!")
))

val schema = Schema(QueryType)

val query = graphql"{ hello }"

Executor.execute(schema, query) map println
```

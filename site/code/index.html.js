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

Many different programming languages support GraphQL. This list contains some of the more popular server-side frameworks, client libraries, services, and other useful stuff.

## Server Libraries

In addition to the GraphQL [reference implementations in JavaScript](#javascript), server libraries include:

- [C# / .NET](#c-net)
- [Clojure](#clojure)
- [Elixir](#elixir)
- [Erlang](#erlang)
- [Go](#go)
- [Groovy](#groovy)
- [Java](#java)
- [JavaScript](#javascript)
- [Kotlin](#kotlin)
- [PHP](#php)
- [Python](#python)
- [Ruby](#ruby)
- [Rust](#rust)
- [Scala](#scala)
- [Swift](#swift)

### C# / .NET

#### [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet): GraphQL for .NET

\`\`\`csharp
using System;
using GraphQL;
using GraphQL.Types;

public class Program
{
  public static void Main(string[] args)
  {
    var schema = Schema.For(@"
      type Query {
        hello: String
      }
    ");

    var json = schema.Execute(_ =>
    {
      _.Query = "{ hello }";
      _.Root = new { Hello = "Hello World!" };
    });

    Console.WriteLine(json);
  }
}                   
\`\`\`

  - [graphql-net](https://github.com/ckimes89/graphql-net): Convert GraphQL to IQueryable
  - [Entity GraphQL](https://github.com/lukemurray/EntityGraphQL): .NET Core GraphQL library. Compiles to IQueryable to easily expose a schema from an existing data model (E.g. from an Entity Framework data model)
  - [DotNetGraphQLQueryGen](https://github.com/lukemurray/DotNetGraphQLQueryGen): .NET Core library to generate classes from a GraphQL schema for type-safe querying in dotnet
  - [Hot Chocolate](https://github.com/ChilliCream/hotchocolate): GraphQL Server for .NET core and .NET classic

### Clojure

#### [alumbra](https://github.com/alumbra/alumbra)

A set of reusable GraphQL components for Clojure conforming to the data structures given in [alumbra.spec](https://github.com/alumbra/alumbra.spec).

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

A Clojure library that provides a GraphQL implementation.

Code that executes a hello world GraphQL query with \`graphql-clj\`:

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

#### [lacinia](https://github.com/walmartlabs/lacinia)

A full implementation of the GraphQL specification that aims to maintain external compliance with the specification.

### Elixir

  - [absinthe](https://github.com/absinthe-graphql/absinthe): GraphQL implementation for Elixir.
  - [graphql-elixir](https://github.com/graphql-elixir/graphql): An Elixir implementation of Facebook's GraphQL.

### Erlang

  - [graphql-erlang](https://github.com/shopgun/graphql-erlang): GraphQL implementation in Erlang.

### Go

  - [graphql-go](https://github.com/graphql-go/graphql): An implementation of GraphQL for Go / Golang.
  - [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go): An active implementation of GraphQL in Golang (was https://github.com/neelance/graphql-go).
  - [GQLGen](https://github.com/99designs/gqlgen) - Go generate based graphql server library.
  - [graphql-relay-go](https://github.com/graphql-go/relay): A Go/Golang library to help construct a graphql-go server supporting react-relay.
  - [machinebox/graphql](https://github.com/machinebox/graphql): An elegant low-level HTTP client for GraphQL.
  - [samsarahq/thunder](https://github.com/samsarahq/thunder): A GraphQL implementation with easy schema building, live queries, and batching.
  - [99designs/gqlgen](https://github.com/99designs/gqlgen): A schema first GraphQL server generation. 
  - [appointy/jaal](https://github.com/appointy/jaal): Develop spec compliant GraphQL servers in Go.

### Groovy

#### [gorm-graphql](https://github.com/grails/gorm-graphql/)

**Core Library** - The GORM GraphQL library provides functionality to generate a GraphQL schema based on your GORM entities. In addition to mapping domain classes to a GraphQL schema, the core library also provides default implementations of "data fetchers" to query, update, and delete data through executions of the schema.

**Grails Plugin** - In a addition to the Core Library, the GORM GraphQL Grails Plugin:

- Provides a controller to receive and respond to GraphQL requests through HTTP, based on their guidelines.
- Generates the schema at startup with spring bean configuration to make it easy to extend.
- Includes a [GraphiQL](https://github.com/graphql/graphiql) browser enabled by default in development. The browser is accessible at /graphql/browser.
- Overrides the default data binder to use the data binding provided by Grails
- Provides a [trait](https://grails.github.io/gorm-graphql/latest/api/org/grails/gorm/graphql/plugin/testing/GraphQLSpec.html) to make integration testing of your GraphQL endpoints easier

See [the documentation](https://grails.github.io/gorm-graphql/latest/guide/index.html) for more information.

#### [GQL](https://grooviter.github.io/gql/)

GQL is a Groovy library for GraphQL

### Java

#### [graphql-java](https://github.com/graphql-java/graphql-java)

A Java library for building GraphQL APIs.

Code that executes a hello world GraphQL query with \`graphql-java\`:

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

        RuntimeWiring runtimeWiring = new RuntimeWiring()
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

See [the graphql-java docs](https://github.com/graphql-java/graphql-java) for more information on setup.

### JavaScript

#### [GraphQL.js](/graphql-js/) ([github](https://github.com/graphql/graphql-js/)) ([npm](https://www.npmjs.com/package/graphql))

The reference implementation of the GraphQL specification, designed for running GraphQL in a Node.js environment.

To run a \`GraphQL.js\` hello world script from the command line:

\`\`\`bash
npm install graphql
\`\`\`

Then run \`node hello.js\` with this code in \`hello.js\`:

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

The reference implementation of a GraphQL API server over an Express webserver. You can use this to run GraphQL in conjunction with a regular Express webserver, or as a standalone GraphQL server.

To run an \`express-graphql\` hello world server:

\`\`\`bash
npm install express express-graphql graphql
\`\`\`

Then run \`node server.js\` with this code in \`server.js\`:

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

#### [apollo-server](https://www.apollographql.com/docs/apollo-server/) ([github](https://github.com/apollographql/apollo-server)) ([npm](https://www.npmjs.com/package/apollo-server-express))

A set of GraphQL server packages from Apollo that work with various Node.js HTTP frameworks (Express, Connect, Hapi, Koa etc).

To run a hello world server with apollo-server-express:

\`\`\`bash
npm install apollo-server-express express 
\`\`\`

Then run \`node server.js\` with this code in \`server.js\`:

\`\`\`js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
\`\`\`

Apollo Server also supports all Node.js HTTP server frameworks: Express, Connect, HAPI, Koa and NestJs.

### Kotlin

  - [graphql-kotlin](https://github.com/ExpediaGroup/graphql-kotlin/): A set of libraries for running GraphQL server in Kotlin.

### PHP

  - [graphql-php](https://github.com/webonyx/graphql-php): A PHP port of GraphQL reference implementation
  - [graphql-relay-php](https://github.com/ivome/graphql-relay-php): A library to help construct a graphql-php server supporting react-relay.
  - [Railt](https://github.com/railt/railt): A PHP GraphQL Framework.
  - [Lighthouse](https://github.com/nuwave/lighthouse): A GraphQL server for Laravel
  - [GraphQLBundle](https://github.com/overblog/GraphQLBundle): A GraphQL server for Symfony

#### [API Platform](https://api-platform.com) ([github](https://github.com/api-platform/api-platform))

API Platform is a fully-featured, flexible and extensible API framework built on top of Symfony.
The following class is enough to create both a Relay-compatible GraphQL server and a hypermedia API supporting modern REST formats (JSON-LD, JSONAPI...):

\`\`\`php
<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Greet someone!
 *
 * @ApiResource
 * @ORM\Entity
 */
class Greeting
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     */
    public $id;

    /**
     * @var string Your nice message
     *
     * @ORM\Column
     */
    public $hello;
}
\`\`\`

Other API Platform features include data validation, authentication, authorization, deprecations, cache and GraphiQL integration.

#### [GraphQLite](https://graphqlite.thecodingmachine.io) ([github](https://github.com/thecodingmachine/graphqlite))

GraphQLite is a library that offers an annotations-based syntax for GraphQL schema definition.
It is framework agnostic with bindings available for Symfony and Laravel.

This code declares a "product" query and a "Product" Type:

\`\`\`php
class ProductController
{
    /**
     * @Query()
     */
    public function product(string $id): Product
    {
        // Some code that looks for a product and returns it.
    }
}

/**
 * @Type()
 */
class Product
{
    /**
     * @Field()
     */
    public function getName(): string
    {
        return $this->name;
    }
    // ...
}
\`\`\`

Other GraphQLite features include validation, security, error handling, loading via data-loader pattern...

#### [Siler](https://siler.leocavalcante.com/graphql/) ([github](https://github.com/leocavalcante/siler))

Siler is a PHP library powered with high-level abstractions to work with GraphQL.

To run a Siler hello world script:

\`\`\`graphql
type Query {
  hello: String
}
\`\`\`

\`\`\`php
<?php
declare(strict_types=1);
require_once '/path/to/vendor/autoload.php';

use Siler\Diactoros;
use Siler\Graphql;
use Siler\Http;

$typeDefs = file_get_contents(__DIR__.'/schema.graphql');
$resolvers = [
    'Query' => [
        'hello' => 'world',
    ],
];
$schema = Graphql\schema($typeDefs, $resolvers);

echo "Server running at http://127.0.0.1:8080";

Http\server(Graphql\psr7($schema), function (\Throwable $err) {
    var_dump($err);
    return Diactoros\json([
        'error'   => true,
        'message' => $err->getMessage(),
    ]);
})()->run();
\`\`\`

It also provides functionality for the construction of a WebSocket Subscriptions Server based on how Apollo works.

### Swift

  - [Graphiti](https://github.com/GraphQLSwift/Graphiti): Swift library for building GraphQL schemas/types fast, safely and easily.

### Python

#### [Graphene](http://graphene-python.org/) ([github](https://github.com/graphql-python/graphene))

A Python library for building GraphQL APIs.

To run a Graphene hello world script:

\`\`\`bash
pip install graphene
\`\`\`

Then run \`python hello.py\` with this code in \`hello.py\`:

\`\`\`python
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String(name=graphene.String(default_value="World"))

  def resolve_hello(self, info, name):
    return 'Hello ' + name

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello']) # "Hello World"
\`\`\`

There are also nice bindings for [Relay](https://facebook.github.io/relay/), Django, SQLAlchemy, and Google App Engine.

### Ruby

#### [graphql-ruby](https://github.com/rmosolgo/graphql-ruby)

A Ruby library for building GraphQL APIs.

To run a hello world script with \`graphql-ruby\`:

\`\`\`bash
gem install graphql
\`\`\`

Then run \`ruby hello.rb\` with this code in \`hello.rb\`:

\`\`\`ruby
require 'graphql'

class QueryType < GraphQL::Schema::Object
  graphql_name 'Query'
  field :hello do
    type types.String
    resolve -> (obj, args, ctx) { 'Hello world!' }
  end
end

class Schema < GraphQL::Schema
  query QueryType
end

puts Schema.execute('{ hello }').to_json
\`\`\`

There are also nice bindings for Relay and Rails.

#### [Agoo](https://github.com/ohler55/agoo)

A high performance web server with support for GraphQL. Agoo strives for a simple, easy to use API for GraphQL.

\`\`\`ruby
require 'agoo'

class Query
  def hello
    'hello'
  end
end

class Schema
  attr_reader :query

  def initialize
    @query = Query.new()
  end
end

Agoo::Server.init(6464, 'root', thread_count: 1, graphql: '/graphql')
Agoo::Server.start()
Agoo::GraphQL.schema(Schema.new) {
  Agoo::GraphQL.load(%^type Query { hello: String }^)
}
sleep

# To run this GraphQL example type the following then go to a browser and enter
# a URL of localhost:6464/graphql?query={hello}
#
# ruby hello.rb
\`\`\`

### Rust

 - [graphql-rust/juniper](https://github.com/graphql-rust/juniper): GraphQL server library for Rust

### Scala

#### [Sangria](http://sangria-graphql.org/) ([github](https://github.com/sangria-graphql/sangria)): A Scala GraphQL library that supports [Relay](https://facebook.github.io/relay/).

An example of a hello world GraphQL schema and query with \`sangria\`:

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

## GraphQL Clients

- [C# / .NET](#c-net-1)
- [Clojurescript](#clojurescript-1)
- [Flutter](#flutter)
- [Go](#go-1)
- [Java / Android](#java-android)
- [JavaScript](#javascript-1)
- [Swift / Objective-C iOS](#swift-objective-c-ios)
- [Python](#python-1)

### C# / .NET

  - [GraphQL.Client](https://github.com/graphql-dotnet/graphql-client): A GraphQL Client for .NET.
  - [graphql-net-client](https://github.com/bkniffler/graphql-net-client): Basic example GraphQL client for .NET.
  - [SAHB.GraphQLClient](https://github.com/sahb1239/SAHB.GraphQLClient): GraphQL client which supports generating queries from C# classes

### Clojurescript

  - [re-graph](https://github.com/oliyh/re-graph/): A GraphQL client implemented in Clojurescript with support for websockets.

### Elm
  
  - [dillonkearns/elm-graphql](https://github.com/dillonkearns/elm-graphql): Library and command-line code generator to create type-safe Elm code for a GraphQL endpoint.

### Flutter

  - [graphql](https://github.com/zino-app/graphql-flutter#readme): A GraphQL client implementation in Flutter.

### Go

  - [graphql](https://github.com/shurcooL/graphql#readme): A GraphQL client implementation in Go.

### Java / Android

  - [Apollo Android](https://github.com/apollographql/apollo-android): A strongly-typed, caching GraphQL client for Android, written in Java.

  - [Nodes](https://github.com/americanexpress/nodes): A GraphQL JVM Client designed for constructing queries from standard model definitions. By American Express.

### JavaScript

  - [Relay](https://facebook.github.io/relay/) ([github](https://github.com/facebook/relay)) ([npm](https://www.npmjs.com/package/react-relay)): Facebook's framework for building React applications that talk to a GraphQL backend.
  - [Apollo Client](http://apollographql.com/client/) ([github](https://github.com/apollographql/apollo-client)): A powerful JavaScript GraphQL client, designed to work well with React, React Native, Angular 2, or just plain JavaScript.
  - [graphql-request](https://github.com/prisma/graphql-request): A simple and flexible JavaScript GraphQL client that works in all JavaScript environments (the browser, Node.js, and React Native) - basically a lightweight wrapper around \`fetch\`.
  - [Lokka](https://github.com/kadirahq/lokka): A simple JavaScript GraphQL client that works in all JavaScript environments (the browser, Node.js, and React Native).
  - [nanogql](https://github.com/yoshuawuyts/nanogql): Tiny GraphQL client library using template strings.
  - [gq-loader](https://github.com/Houfeng/gq-loader): A simple JavaScript GraphQL client，Let the *.gql file be used as a module through webpack loader.
  - [AWS Amplify](https://aws.github.io/aws-amplify): A JavaScript library for application development using cloud services, which supports GraphQL backend and React components for working with GraphQL data.
  - [Grafoo](https://github.com/grafoojs/grafoo): An all purpose GraphQL client with view layer integrations for multiple frameworks in just 1.6kb.
  - [urql](https://formidable.com/open-source/urql/) ([github](https://github.com/FormidableLabs/urql)): A highly customizable and versatile GraphQL client for React.
  - [graphqurl](https://github.com/hasura/graphqurl) ([npm](https://www.npmjs.com/package/graphqurl)): curl for GraphQL with autocomplete, subscriptions and GraphiQL. Also a dead-simple universal javascript GraphQL client.

### Swift / Objective-C iOS

  - [Apollo iOS](https://www.apollographql.com/docs/ios/) ([github](https://github.com/apollographql/apollo-ios)): A GraphQL client for iOS that returns results as query-specific Swift types, and integrates with Xcode to show your Swift source and GraphQL side by side, with inline validation errors.
  - [GraphQL iOS](https://github.com/funcompany/graphql-ios): An Objective-C GraphQL client for iOS.

### Python

  - [GQL](https://github.com/graphql-python/gql): A GraphQL client in Python.
  - [python-graphql-client](https://github.com/prisma/python-graphql-client): Simple GraphQL client for Python 2.7+.
  - [sgqlc](https://github.com/profusion/sgqlc): A simple Python GraphQL client. Supports generating code generation for types defined in a GraphQL schema.

## Tools

  - [graphiql](https://github.com/graphql/graphiql) ([npm](https://www.npmjs.com/package/graphiql)): An interactive in-browser GraphQL IDE.
  - [libgraphqlparser](https://github.com/graphql/libgraphqlparser): A GraphQL query language parser in C++ with C and C++ APIs.
  - [Graphql Language Service](https://github.com/graphql/graphql-language-service): An interface for building GraphQL language services for IDEs (diagnostics, autocomplete etc).
  - [quicktype](https://quicktype.io) ([github](https://github.com/quicktype/quicktype)): Generate types for GraphQL queries in TypeScript, Swift, golang, C#, C++, and more.

## Services

  - [Apollo Graph Manager](https://engine.apollographql.com): A cloud service for monitoring the performance and usage of your GraphQL backend.
  - [GraphCMS](https://graphcms.com/): A BaaS (Backend as a Service) that sets you up with a GraphQL backend as well as tools for content editors to work with the stored data.
  - [Prisma](https://www.prisma.io) ([github](https://github.com/prisma)): A BaaS (Backend as a Service) providing a GraphQL backend for your applications with a powerful web ui for managing your database and stored data.
  - [Tipe](https://tipe.io) ([github](https://github.com/tipeio)): A SaaS (Software as a Service) content management system that allows you to create your content with powerful editing tools and access it from anywhere with a GraphQL or REST API.
  - [AWS AppSync](https://aws.amazon.com/appsync/): Fully managed GraphQL service with realtime subscriptions, offline programming & synchronization, and enterprise security features as well as fine grained authorization controls.
  - [Elide](https://elide.io): A Java library that can expose a JPA annotated data model as a GraphQL service over any relational database. 
  - [Hasura](https://hasura.io) ([github](https://github.com/hasura)): Hasura connects to your databases & microservices and instantly gives you a production-ready GraphQL API.
  - [FaunaDB](https://docs.fauna.com/fauna/current/graphql): Create an instant GraphQL backend by importing a gql schema. The database will create relations and indexes for you, so you'll be ready to query in seconds, without writing any database code. Serverless pricing, free to get started.

## More Stuff

  - [awesome-graphql](https://github.com/chentsulin/awesome-graphql): A fantastic community maintained collection of libraries, resources, and more.

          `}</Marked>

        </div>
      </div>
    </section>

  </Site>

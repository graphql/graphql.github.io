import React from "react"
import Layout from "../components/Layout"
import Marked from "../components/Marked"

export default ({ pageContext }) => {
  return (
    <Layout title="Code" className="code" pageContext={pageContext}>
      <div className="code-hero">
        <div className="code-hero-inner">
          <h1>Code</h1>
          <p>using GraphQL</p>
        </div>
      </div>
      <section>
        <div className="documentationContent">
          <div className="inner-content">
            <div className="intro-note">
              <strong>
                Because GraphQL is a communication pattern, there are many tools
                to help you get started working which support GraphQL in all
                sorts of languages.
              </strong>{" "}
              <div className="container-bl1">
                <div className="column">
                  <a href="#languages">
                    <h3>Languages</h3>
                  </a>
                </div>
                <div className="column">
                  <a href="#tools">
                    <h3>Tools</h3>
                  </a>
                </div>
                <div className="column">
                  <a href="#services">
                    <h3>Services</h3>
                  </a>
                </div>
                <div className="column">
                  <a href="#more-stuff">
                    <h3>More Stuff</h3>
                  </a>
                </div>
              </div>
              <Marked>{`
## Languages
`}</Marked>
              <p>
                This page will help you get started with GraphQL in languages
                you are already using.
              </p>
            </div>
            <div className="main-block-blog">
              <div className="container-bl">
                {/* C# */}
                <div className="column">
                  <div className="article">
                    <a href="#c-net">
                      <h3 className="article_category">
                        <img
                          src="../img/csharp.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">C# / .NET</h2>
                    </a>
                  </div>
                </div>
                {/* Clojure */}
                <div className="column">
                  <div className="article">
                    <a href="#clojure">
                      <h3 className="article_category">
                        <img
                          src="../img/clojure.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Clojure</h2>
                    </a>
                  </div>
                </div>
                {/* Elixir */}
                <div className="column">
                  <div className="article">
                    <a href="#elixir">
                      <h3 className="article_category">
                        <img
                          src="../img/elixir.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Elixir</h2>
                    </a>
                  </div>
                </div>
                {/* Elm */}
                <div className="column">
                  <div className="article">
                    <a href="#erlang">
                      <h3 className="article_category">
                        <img
                          src="../img/elm.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Elm</h2>
                    </a>
                  </div>
                </div>
              </div>

              <br />

              <div className="container-bl">
                {/* Erlang */}
                <div className="column">
                  <div className="article">
                    <a href="#erlang">
                      <h3 className="article_category">
                        <img
                          src="../img/erlang.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Erlang</h2>
                    </a>
                  </div>
                </div>
                {/* Go */}
                <div className="column">
                  <div className="article">
                    <a href="#go">
                      <h3 className="article_category">
                        <img
                          src="../img/golang.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Go</h2>
                    </a>
                  </div>
                </div>
                {/* Groovy */}
                <div className="column">
                  <div className="article">
                    <a href="#groovy">
                      <h3 className="article_category">
                        <img
                          src="../img/groovy.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Groovy</h2>
                    </a>
                  </div>
                </div>
                {/* Java */}
                <div className="column">
                  <div className="article">
                    <a href="#java-android">
                      <h3 className="article_category">
                        <img
                          src="../img/java.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Java</h2>
                    </a>
                  </div>
                </div>
              </div>

              <br />

              <div className="container-bl">
                {/* JavaScript */}
                <div className="column">
                  <div className="article">
                    <a href="#javascript">
                      <h3 className="article_category">
                        <img
                          src="../img/node.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">JavaScript</h2>
                    </a>
                  </div>
                </div>
                {/* Julia */}
                <div className="column">
                  <div className="article">
                    <a href="#julia">
                      <h3 className="article_category">
                        <img
                          src="../img/julia.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Julia</h2>
                    </a>
                  </div>
                </div>
                {/* Kotlin */}
                <div className="column">
                  <div className="article">
                    <a href="#kotlin">
                      <h3 className="article_category">
                        <img
                          src="../img/kotlin.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Kotlin</h2>
                    </a>
                  </div>
                </div>
                {/* OCaml */}
                <div className="column">
                  <div className="article">
                    <a href="#ocaml-reason">
                      <h3 className="article_category">
                        <img
                          src="../img/ocaml.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">OCaml</h2>
                    </a>
                  </div>
                </div>
              </div>

              <br />

              <div className="container-bl">
                {/* Perl */}
                <div className="column">
                  <div className="article">
                    <a href="#perl">
                      <h3 className="article_category">
                        <img
                          src="../img/perl.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Perl</h2>
                    </a>
                  </div>
                </div>
                {/* PHP */}
                <div className="column">
                  <div className="article">
                    <a href="#php">
                      <h3 className="article_category">
                        <img
                          src="../img/php.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">PHP</h2>
                    </a>
                  </div>
                </div>
                {/* Python */}
                <div className="column">
                  <div className="article">
                    <a href="#python">
                      <h3 className="article_category">
                        <img
                          src="../img/python.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Python</h2>
                    </a>
                  </div>
                </div>
                {/* R */}
                <div className="column">
                  <div className="article">
                    <a href="#r">
                      <h3 className="article_category">
                        <img
                          src="../img/r.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">R</h2>
                    </a>
                  </div>
                </div>
              </div>

              <br />

              <div className="container-bl">
                {/* Ruby */}
                <div className="column">
                  <div className="article">
                    <a href="#ruby">
                      <h3 className="article_category">
                        <img
                          src="../img/ruby.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Ruby</h2>
                    </a>
                  </div>
                </div>
                {/* Rust */}
                <div className="column">
                  <div className="article">
                    <a href="#rust">
                      <h3 className="article_category">
                        <img
                          src="../img/rust.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Rust</h2>
                    </a>
                  </div>
                </div>
                {/* Scala */}
                <div className="column">
                  <div className="article">
                    <a href="#scala">
                      <h3 className="article_category">
                        <img
                          src="../img/scala.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Scala</h2>
                    </a>
                  </div>
                </div>
                {/* Swift */}
                <div className="column">
                  <div className="article">
                    <a href="#swift-objective-c-ios">
                      <h3 className="article_category">
                        <img
                          src="../img/swift.svg"
                          style={{ width: 92, height: 92 }}
                        />
                      </h3>
                      <h2 className="article_title">Swift</h2>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Marked>{`
## C# / .NET
### Server Libraries
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
  - [NGraphQL](https://github.com/rivantsov/starwars): GraphQL Server for .NET Core and full framework

### GraphQL Clients
  - [GraphQL.Client](https://github.com/graphql-dotnet/graphql-client): A GraphQL Client for .NET.
  - [graphql-net-client](https://github.com/bkniffler/graphql-net-client): Basic example GraphQL client for .NET.
  - [SAHB.GraphQLClient](https://github.com/sahb1239/SAHB.GraphQLClient): GraphQL client which supports generating queries from C# classes

## Clojure
### Server Libraries
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

### GraphQL Clients
  - [re-graph](https://github.com/oliyh/re-graph/): A GraphQL client implemented in Clojurescript with support for websockets.

### D

  - [graphqld](https://github.com/burner/graphqld): A GraphQL implementaiton for the D Programming Language. 

### Elixir
### Server Libraries
  - [absinthe](https://github.com/absinthe-graphql/absinthe): GraphQL implementation for Elixir.
  - [graphql-elixir](https://github.com/graphql-elixir/graphql): An Elixir implementation of Facebook's GraphQL.

## Elm
### GraphQL Clients
  - [dillonkearns/elm-graphql](https://github.com/dillonkearns/elm-graphql): Library and command-line code generator to create type-safe Elm code for a GraphQL endpoint.

## Erlang
### Server Libraries
  - [graphql-erlang](https://github.com/shopgun/graphql-erlang): GraphQL implementation in Erlang.

## Flutter
### GraphQL Clients
  - [graphql](https://github.com/zino-app/graphql-flutter#readme): A GraphQL client implementation in Flutter.

## Go
### Server Libraries
  - [graphql-go](https://github.com/graphql-go/graphql): An implementation of GraphQL for Go / Golang.
  - [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go): An active implementation of GraphQL in Golang (was https://github.com/neelance/graphql-go).
  - [99designs/gqlgen](https://github.com/99designs/gqlgen) - Go generate based graphql server library.
  - [graphql-relay-go](https://github.com/graphql-go/relay): A Go/Golang library to help construct a graphql-go server supporting react-relay.
  - [machinebox/graphql](https://github.com/machinebox/graphql): An elegant low-level HTTP client for GraphQL.
  - [samsarahq/thunder](https://github.com/samsarahq/thunder): A GraphQL implementation with easy schema building, live queries, and batching.
  - [appointy/jaal](https://github.com/appointy/jaal): Develop spec compliant GraphQL servers in Go.

### GraphQL Clients
  - [graphql](https://github.com/shurcooL/graphql#readme): A GraphQL client implementation in Go.

## Groovy
### Server Libraries
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

### Haskell

#### [Morpheus GraphQL](https://github.com/morpheusgraphql/morpheus-graphql)

A Haskell library for building GraphQL APIs.

Hello world example with `morpheus-graphql`:

```graphql
# schema.gql
"""
A supernatural being considered divine and sacred
"""
type Deity {
  name: String!
  power: String @deprecated(reason: "no more supported")
}

type Query {
  deity(name: String! = "Morpheus"): Deity!
}
```


```haskell
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module API (api) where

import Data.ByteString.Lazy.Char8 (ByteString)
import Data.Morpheus (interpreter)
import Data.Morpheus.Document (importGQLDocument)
import Data.Morpheus.Types (RootResolver (..), Undefined (..))
import Data.Text (Text)

importGQLDocument "schema.gql"

rootResolver :: RootResolver IO () Query Undefined Undefined
rootResolver =
  RootResolver
    { queryResolver = Query {deity},
      mutationResolver = Undefined,
      subscriptionResolver = Undefined
    }
  where
    deity DeityArgs {name} =
      pure
        Deity
          { name = pure name,
            power = pure (Just "Shapeshifting")
          }

api :: ByteString -> IO ByteString
api = interpreter rootResolver
```

See [morpheus-graphql-examples](https://github.com/morpheusgraphql/morpheus-graphql) for more sophisticated APIs.

## Java / Android
### Server Libraries
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

### GraphQL Clients
  - [Apollo Android](https://github.com/apollographql/apollo-android): A strongly-typed, caching GraphQL client for Android, written in Java.
  - [Nodes](https://github.com/americanexpress/nodes): A GraphQL JVM Client designed for constructing queries from standard model definitions. By American Express.

## JavaScript
### Server Libraries
${pageContext.jsServerLibraries
  .map(
    (
      library: any
    ) => `#### [${library.name}](${library.url}) ([github](https://github.com/${library.github})) ([npm](https://www.npmjs.com/package/${library.npm}))
${library.description}
${library.howto}`
  )
  .join("\n")}

### GraphQL Clients
${pageContext.jsGraphQLClients
  .map(
    (library: any) =>
      `- [${library.name}](${library.url}) ([github](https://github.com/${library.github})) ([npm](https://www.npmjs.com/package/${library.npm})): ${library.description}`
  )
  .join("\n")}

## Julia
### GraphQL Clients
  - [Diana.jl](https://github.com/codeneomatrix/Diana.jl): A Julia GraphQL server implementation.

## Kotlin
### Server Libraries
  - [graphql-kotlin](https://github.com/ExpediaGroup/graphql-kotlin/): A set of libraries for running GraphQL server in Kotlin.
  - [KGraphQL](https://github.com/aPureBase/KGraphQL): Pure Kotlin implementation to setup a GraphQL server.

## Perl
### Server Libraries
  - [graphql-perl](https://github.com/graphql-perl/graphql-perl): A Perl port of GraphQL reference implementation
    - [MetaCPAN documentation](https://metacpan.org/pod/GraphQL)
    - [Mojolicious-Plugin-GraphQL](https://github.com/graphql-perl/Mojolicious-Plugin-GraphQL) - connect your GraphQL service to a Mojolicious app
    - [GraphQL-Plugin-Convert-DBIC](https://github.com/graphql-perl/GraphQL-Plugin-Convert-DBIC) - automatically connect your DBIx::Class schema to GraphQL
    - [GraphQL-Plugin-Convert-OpenAPI](https://github.com/graphql-perl/GraphQL-Plugin-Convert-OpenAPI) - automatically connect any OpenAPI service (either local Mojolicious one, or remote) to GraphQL

## PHP
### Server Libraries
  - [graphql-php](https://github.com/webonyx/graphql-php): A PHP port of GraphQL reference implementation
  - [graphql-relay-php](https://github.com/ivome/graphql-relay-php): A library to help construct a graphql-php server supporting react-relay.
  - [Railt](https://github.com/railt/railt): A PHP GraphQL Framework.
  - [Lighthouse](https://github.com/nuwave/lighthouse): A GraphQL server for Laravel
  - [GraphQLBundle](https://github.com/overblog/GraphQLBundle): A GraphQL server for Symfony
  - [WPGraphQL](https://github.com/wp-graphql/wp-graphql): A free, open-source WordPress plugin that provides an extendable GraphQL schema and API for any WordPress site 
  - [GraphQL API for WordPress](https://github.com/GraphQLAPI/graphql-api-for-wp): A GraphQL server for WordPress
  - [GraPHPinator](https://github.com/infinityloop-dev/graphpinator): A GraphQL implementation for modern PHP

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

## Python
### Server Libraries
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
### GraphQL Clients
  - [GQL](https://github.com/graphql-python/gql): A GraphQL client in Python.
  - [python-graphql-client](https://github.com/prisma/python-graphql-client): Simple GraphQL client for Python 2.7+.
  - [sgqlc](https://github.com/profusion/sgqlc): A simple Python GraphQL client. Supports generating code generation for types defined in a GraphQL schema.


## R
### GraphQL Clients
  - [ghql](https://github.com/ropensci/ghql): General purpose GraphQL R client.

## Ruby
### Server Libraries
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

## Rust
### Server Libraries
 - [graphql-rust/juniper](https://github.com/graphql-rust/juniper): GraphQL server library for Rust

## Scala
### Server Libraries
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

## OCaml / Reason
### Server Libraries
#### [ocaml-graphql-server](https://github.com/andreas/ocaml-graphql-server): GraphQL server library for OCaml and Reason

## Swift / Objective-C iOS
### Server Libraries
  - [Graphiti](https://github.com/GraphQLSwift/Graphiti): Swift library for building GraphQL schemas/types fast, safely and easily.
  
### GraphQL Clients
  - [Apollo iOS](https://www.apollographql.com/docs/ios/) ([github](https://github.com/apollographql/apollo-ios)): A GraphQL client for iOS that returns results as query-specific Swift types, and integrates with Xcode to show your Swift source and GraphQL side by side, with inline validation errors.
  - [GraphQL iOS](https://github.com/funcompany/graphql-ios): An Objective-C GraphQL client for iOS.
  - [Graphaello](https://github.com/nerdsupremacist/Graphaello): A Tool for Writing Declarative, Type-Safe and Data-Driven Applications in SwiftUI using GraphQL and Apollo

## Tools
${pageContext.tools
  .map(
    (library: any) =>
      `- [${library.name}](${library.url}) ([github](https://github.com/${library.github})) ([npm](https://www.npmjs.com/package/${library.npm})): ${library.description}`
  )
  .join("\n")}

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
    </Layout>
  )
}

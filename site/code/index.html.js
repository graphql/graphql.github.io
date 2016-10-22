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

var Code = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;
    return (
      <Site section="code" title="Code" page={page}>

        <section>
          <div className="documentationContent">
            <div className="inner-content">
              <h1>Code</h1>
              <Marked>{`

Many different programming languages support GraphQL. This list contains some of the more popular server-side frameworks, client libraries, and other useful stuff.

## Server Libraries

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

#### [Apollo Server](http://dev.apollodata.com/tools/apollo-server/index.html) ([github](https://github.com/apollostack/apollo-server)) ([npm](https://www.npmjs.com/package/apollo-server))

A GraphQL server that works with Node.js.

To run a hello world server with Apollo Server:

\`\`\`bash
npm install apollo-server body-parser express graphql graphql-tools
\`\`\`

Then run \`node server.js\` with this code in \`server.js\`:

\`\`\`js
var express = require('express');
var bodyParser = require('body-parser');
var { apolloExpress, graphiqlExpress } = require('apollo-server');
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
app.use('/graphql', bodyParser.json(), apolloExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
\`\`\`

Apollo Server also supports all Node.js HTTP server frameworks: Express, Connect, HAPI and Koa.

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

There are also nice bindings for Relay and Rails.

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
  hello = graphene.String()

  def resolve_hello(self, args, info):
    return 'Hello world!'

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello'])
\`\`\`

There are also nice bindings for [Relay](https://facebook.github.io/relay/), Django, SQLAlchemy, and Google App Engine.

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

### Java

#### [graphql-java](https://github.com/graphql-java/graphql-java)

A Java library for building GraphQL APIs.

Code that executes a hello world GraphQL query with \`graphql-java\`:

\`\`\`java
import graphql.schema.GraphQLObjectType;
import graphql.schema.GraphQLSchema;

import static graphql.Scalars.GraphQLString;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLObjectType.newObject;

public class HelloWorld {

    public static void main(String[] args) {

        GraphQLObjectType queryType = newObject()
                        .name("helloWorldQuery")
                        .field(newFieldDefinition()
                                .type(GraphQLString)
                                .name("hello")
                                .staticValue("Hello world!"))
                        .build();

        GraphQLSchema schema = GraphQLSchema.newSchema()
                        .query(queryType)
                        .build();
        Map<String, Object> result = new GraphQL(schema).execute("{hello}").getData();

        System.out.println(result);
        // Prints: {hello=world}
    }
}
\`\`\`

See [the graphql-java docs](https://github.com/graphql-java/graphql-java) for more information on setup.

### Clojure

#### [graphql-clj](https://github.com/tendant/graphql-clj)

A Clojure library that provides a GraphQL implementation.

Code that executes a hello world GraphQL query with \`graphql-clj\`:

\`\`\`clojure
(require '[graphql-clj.parser :as parser])
(require '[graphql-clj.type :as type])

(def parsed-schema (parser/parse "type Query {
    hello: String
  }"))

(def type-schema (type/create-schema parsed-schema))

(defn resolver-fn [type-name field-name]
  (cond
    (and (= "Query" type-name) (= "hello" field-name)) (fn [context parent & rest]
                                                         "Hello world!")))

(require '[graphql-clj.executor :as executor])

(executor/execute nil type-schema resolver-fn "{ hello }")
\`\`\`

### Go

  - [graphql-go](https://github.com/graphql-go/graphql): An implementation of GraphQL for Go / Golang.
  - [graphql-relay-go](https://github.com/graphql-go/relay): A Go/Golang library to help construct a graphql-go server supporting react-relay.

### PHP

  - [graphql-php](https://github.com/webonyx/graphql-php): A PHP port of GraphQL reference implementation
  - [graphql-relay-php](https://github.com/ivome/graphql-relay-php): A library to help construct a graphql-php server supporting react-relay.

### C# / .NET

  - [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet): GraphQL for .NET
  - [graphql-net](https://github.com/ckimes89/graphql-net): Convert GraphQL to IQuerable

### Elixir

  - [absinthe](https://github.com/absinthe-graphql/absinthe): GraphQL implementation for Elixir.
  - [graphql-elixir](https://github.com/graphql-elixir/graphql): An Elixir implementation of Facebook's GraphQL.


## GraphQL Clients

### JavaScript

  - [Relay](https://facebook.github.io/relay/) ([github](https://github.com/facebook/relay)) ([npm](https://www.npmjs.com/package/react-relay)): Facebook's framework for building React applications that talk to a GraphQL backend.
  - [Apollo Client](http://dev.apollodata.com/react/) ([github](https://github.com/apollostack/apollo-client)): A powerful JavaScript GraphQL client, designed to work well with React, React Native, Angular 2, or just plain JavaScript.
  - [Lokka](https://github.com/kadirahq/lokka): A simple JavaScript GraphQL client that works in all JavaScript environments - the browser, Node.js, and React Native.

### Swift / iOS

- [Apollo iOS](http://dev.apollodata.com/ios/) ([github](https://github.com/apollostack/apollo-ios)): A GraphQL client for iOS that returns results as query-specific Swift types, and integrates with Xcode to show your Swift source and GraphQL side by side, with inline validation errors.

## Tools

  - [graphiql](https://github.com/graphql/graphiql) ([npm](https://www.npmjs.com/package/graphiql)): An interactive in-browser GraphQL IDE.
  - [libgraphqlparser](https://github.com/graphql/libgraphqlparser): A GraphQL query language parser in C++ with C and C++ APIs.


## More Stuff

  - [awesome-graphql](https://github.com/chentsulin/awesome-graphql): A fantastic community maintained collection of libraries, resources, and more.

              `}</Marked>

            </div>
          </div>
        </section>

      </Site>
    );
  }
});

module.exports = Code;

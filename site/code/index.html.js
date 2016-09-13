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
      <Site section="code" title="Code">

        <section className="content documentationContent nosidebar">
          <div className="inner-content">
            <h1>Code</h1>
            <Marked>{`

Many different programming languages support GraphQL. This list contains some of the more popular server-side frameworks, client libraries, and other useful stuff.

## GraphQL Server Libraries

  - [GraphQL.js](/graphql-js/) ([github](https://github.com/graphql/graphql-js/)) ([npm](https://www.npmjs.com/package/graphql)): The reference implementation of the GraphQL specification, designed for running a GraphQL server in a Node.js environment.
  - [express-graphql](/graphql-js/running-an-express-graphql-server/) ([github](https://github.com/graphql/express-graphql)) ([npm](https://www.npmjs.com/package/express-graphql)): The reference implementation of a GraphQL API server over an Express webserver. You can use this to run GraphQL in conjunction with a regular Express webserver, or as a standalone GraphQL server.
  - [Graphene](http://graphene-python.org/) ([github](https://github.com/graphql-python/graphene)): A Python library for building GraphQL APIs. Built-in support for [Relay](https://facebook.github.io/relay/), Django, SQLAlchemy, and Google App Engine.
  - [graphql-ruby](https://github.com/rmosolgo/graphql-ruby): A Ruby library for building GraphQL APIs. Built-in support for Relay and Rails.
  - [graphql-java](https://github.com/graphql-java/graphql-java): A Java library for building GraphQL APIs.
  - [graphql-relay](https://github.com/graphql/graphql-relay-js) ([npm](https://www.npmjs.com/package/graphql-relay)): A server library to help construct a Node.js GraphQL API that supports [Relay](https://facebook.github.io/relay/).
  - [Sangria](http://sangria-graphql.org/) ([github](https://github.com/sangria-graphql/sangria)) A Scala GraphQL library that supports [Relay](https://facebook.github.io/relay/).
  - [Apollo Server](http://dev.apollodata.com/tools/apollo-server/index.html) ([github](https://github.com/apollostack/apollo-server)) ([npm](https://www.npmjs.com/package/apollo-server)): A GraphQL server that works with all Node.js HTTP server frameworks: Express, Connect, HAPI and Koa.

## GraphQL Clients

  - [Relay](https://facebook.github.io/relay/) ([github](https://github.com/facebook/relay)) ([npm](https://www.npmjs.com/package/react-relay)): Facebook's framework for building React applications that talk to a GraphQL backend.
  - [Apollo Client](http://dev.apollodata.com/react/) ([github](https://github.com/apollostack/apollo-client)): A powerful JavaScript GraphQL client, designed to work well with React, React Native, Angular 2, or just plain JavaScript.
  - [Lokka](https://github.com/kadirahq/lokka): A simple JavaScript GraphQL client that works in all JavaScript environments - the browser, Node.js, and React Native.

## Tools

  - [graphiql](https://github.com/graphql/graphiql) ([npm](https://www.npmjs.com/package/graphiql)): An interactive in-browser GraphQL IDE.
  - [libgraphqlparser](https://github.com/graphql/libgraphqlparser): A GraphQL query language parser in C++ with C and C++ APIs.

## More Stuff

  - [awesome-graphql](https://github.com/chentsulin/awesome-graphql): A fantastic community maintained collection of libraries, resources, and more.

            `}</Marked>

          </div>
        </section>

      </Site>
    );
  }
});

module.exports = Code;

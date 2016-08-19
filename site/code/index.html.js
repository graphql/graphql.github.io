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
    return (
      <Site section="code" title="Code">

        <section className="content documentationContent nosidebar">
          <div className="inner-content">
            <h1>Releases</h1>
            <Marked>{`

GraphQL consists of the following open-source repos on [Github](https://github.com/graphql/).

## Official

### Spec

  - **[graphql](https://github.com/facebook/graphql)** ([html](http://facebook.github.io/graphql/)): A working draft of the specification for GraphQL.

### Server (JavaScript)

  - **[graphql-js](https://github.com/graphql/graphql-js)** ([npm](https://www.npmjs.com/package/graphql)): A JS Reference implementation of the GraphQL Specification.
  - **[express-graphql](https://github.com/graphql/express-graphql)** ([npm](https://www.npmjs.com/package/express-graphql)): Create a GraphQL HTTP server with Express.
  - **[graphql-relay](https://github.com/graphql/graphql-relay-js)** ([npm](https://www.npmjs.com/package/graphql-relay)): A library to help construct a graphql-js server supporting react-relay.

### Tools

  - **[graphiql](https://github.com/graphql/graphiql)** ([npm](https://www.npmjs.com/package/graphiql)): An interactive in-browser GraphQL IDE.
  - **[libgraphqlparser](https://github.com/graphql/libgraphqlparser)**: A GraphQL query language parser in C++ with C and C++ APIs.

### Examples

  - **[swapi-graphql](https://github.com/graphql/swapi-graphql)** ([deployed example](http://graphql-swapi.parseapp.com/graphiql)): A GraphQL schema and server wrapping http://swapi.co/.

### Client

  - **[relay](https://github.com/facebook/relay)** ([npm](https://www.npmjs.com/package/react-relay)): A framework for building data-driven React applications.

## More

  - **[awesome-graphql](https://github.com/chentsulin/awesome-graphql)**: A fantastic community maintained collection of libraries, resources, and more.



            `}</Marked>

          </div>
        </section>

      </Site>
    );
  }
});

module.exports = Code;

---
title: Getting Started
layout: ../_core/DocsLayout
category: Quick Start
permalink: /docs/getting-started/
next: /docs/videos/
---

Let's build a basic GraphQL server from scratch. We'll be using the **[graphql-js](https://github.com/graphql/graphql-js)** reference implementation of GraphQL for this example.

Our server will be simple; it will have one type, a `User`, where a user has two fields; an `id` and a `name`. For an example of a more complex server and additional features,
check out the **[walkthrough](../intro)** section of the docs.

## Setup

We'll start by making a folder for our demo server.

```sh
mkdir graphql-demo
cd graphql-demo
```

Now, we'll install the three packages that we need:

1. **[graphql](https://github.com/graphql/graphql-js)**, the reference implementation of GraphQL in JS.
2. **[express](https://github.com/strongloop/express)**, a basic web framework.
3. **[express-graphql](https://github.com/graphql/express-graphql)**, middleware for express to make it easy to expose a GraphQL server.

We install these three packages by running:

```sh
npm init -f
npm install graphql --save
npm install express --save
npm install express-graphql --save
```

## Server

Now that we have our packages installed, let's quickly define our data set of users, in `data.json`:

```json
{
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Lee"
  },
  "3": {
    "id": "3",
    "name": "Nick"
  }
}
```

We'll create a very basic GraphQL schema to describe that data set in
`index.js`, then allow that GraphQL Schema to be queried over HTTP.

```js
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import our data set from above
var data = require('./data.json');

// Define our user type, with two string fields; `id` and `name`
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

console.log('Server online!');
express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);
```

<script data-inline>
var graphql = require('graphql');

// Import our data set from above
var data = {
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Lee"
  },
  "3": {
    "id": "3",
    "name": "Nick"
  }
};

// Define our user type, with two string fields; `id` and `name`
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

global.schema = schema;
</script>

That's it! Our basic GraphQL server is done!

## Testing

Let's test our GraphQL server. We start by running

```sh
node index.js
```

The server should announce that it is online. We can verify that by hitting
`http://localhost:3000/graphql?query={user(id:%221%22){name}}`, which will
execute this GraphQL query which asks to fetch the user with ID "1", and return
that user's name.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  renderHere(<MiniGraphiQL schema={global.schema} query={ `
{
  user(id: "1") {
    name
  }
}
`} />);
</script>

To fetch a different user, we can run `http://localhost:3000/graphql?query={user(id:%222%22){name}}`
to execute this GraphQL query with a changed the ID, so we'll get the name of
that user instead:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  renderHere(<MiniGraphiQL schema={global.schema} query={ `
{
  user(id: "2") {
    name
  }
}
`} />);
</script>

---
title: Getting Started
layout: ../_core/DocsLayout
category: Quick Start
permalink: /docs/getting-started/
next: /docs/videos/
---

Let's build a basic GraphQL server from scratch using **[graphql-js](https://github.com/graphql/graphql-js)**.

Our server's schema will be simple: it will have one type, a `User`, with two fields, `id` and `name`.
(For an example of a more complex server, check out the **[Walkthrough](../intro)**.)

## Setup

Start by making a folder for your demo server:

```sh
mkdir graphql-demo
cd graphql-demo
```

The example server requires **[Node.js](https://nodejs.org/en/)**
and three additional packages for our server:

1. **[graphql](https://github.com/graphql/graphql-js)**, the reference implementation of GraphQL in JavaScript.
2. **[express](https://github.com/strongloop/express)**, a basic web framework.
3. **[express-graphql](https://github.com/graphql/express-graphql)**, an express middleware that exposes a GraphQL server.

Install these three packages using **[npm](https://docs.npmjs.com/getting-started/installing-node)**:

```sh
npm init -f
npm install graphql express express-graphql --save
```

## Data

Our server will consist of two files, `data.json` and `index.js`.
To create these files, run

```sh
touch data.json
touch index.js
```

Now define the user data in `data.json`:

```json
{
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Marie"
  },
  "3": {
    "id": "3",
    "name": "Jessie"
  }
}
```

## Server

Next you'll create a very basic GraphQL schema to describe the data;
you can then allow this schema to be queried over HTTP.

Insert the following into `index.js` (and be sure to read the comments!):

```js
// Import the required libraries
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import the data you created above
var data = require('./data.json');

// Define the User type with two string fields: `id` and `name`.
// The type of User is GraphQLObjectType, which has child fields
// with their own types (in this case, GraphQLString).
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define the schema with one top-level field, `user`, that
// takes an `id` argument and returns the User with that ID.
// Note that the `query` is a GraphQLObjectType, just like User.
// The `user` field, however, is a userType, which we defined above.
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: graphql.GraphQLString }
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        // In this case we use the `id` argument from above as a key
        // to get the User from `data`
        resolve: function (_, args) {
          return data[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
```

<script data-inline>
var graphql = require('graphql');

var data = {
  "1": {
    "id": "1",
    "name": "Dan"
  },
  "2": {
    "id": "2",
    "name": "Marie"
  },
  "3": {
    "id": "3",
    "name": "Jessie"
  }
};

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

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

That's it - your basic GraphQL server is done! Start it by running

```sh
node index.js
```

The server should announce that it is running at
[localhost:3000/graphql](http://localhost:3000/graphql).
If you navigate to this address you will receive this notice:

```javascript
{
  "errors": [
    {
      "message": "Must provide query string."
    }
  ]
}
```

We know our server is running - now we just need to send it a query!

## Queries

Below is a very simple query you can make against your schema. To the right is
the result your server should deliver. Take a moment to read the query and the
result. Note that the result and query have the same basic "shape": whereas the
result is JSON key-value pairs, the query is just the keys.

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

You can edit the above query; the result will automatically update when you do.
If you make a syntax mistake it will be underlined in red. Try replacing
`id: "1"` with `id: "2"`; replace `name` with `id` or with `name id`.

Now that you know what a GraphQL query looks like you can query your own server.
Let's start with the simple query

```
{
  user(id: "1") {
    name
  }
}
```

Remove all the whitespace in the query: `{user(id:"1"){name}}` (whitespace is optional in GraphQL).
You can send this to your server via a GET request with a URL query string:
**http://localhost:3000/graphql?query={user(id:"1"){name}}**
- the server should respond with

```javascript
{
  "data": {
    "user": {
      "name": "Dan"
    }
  }
}
```

To be standards compliant, the query itself should be URL-encoded.
If you received a GraphQL Syntax Error from the above query, try replacing it with
the URL-encoded version: `%7Buser(id:%221%22)%7Bname%7D%7D`.
(You can URL-encode any string in JavaScript with the global `encodeURI` function.)

Congratulations! You've built your first GraphQL server. Try different queries,
or changing the data, or even adding new fields to the schema.

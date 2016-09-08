---
title: Mutations and Input Types
layout: ../_core/DocsLayout
category: Tutorial
permalink: /graphql-js/mutations-and-input-types/
next: /graphql-js/authentication-and-express-middleware/
---

If you have an API endpoint that alters data, like inserting data into a database or altering data already in a database, you should make this endpoint a `Mutation` rather than a `Query`. This is a simple as making the API endpoint part of the top-level `Mutation` type instead of the top-level `Query` type.

Let's say we have a “message of the day” server, where anyone can update the message of the day along with the author of the message, and anyone can read the current one. The GraphQL schema for this is simply:

```javascript
type Mutation {
  setMessage(message: String)
}

type Query {
  getMessage: String
}
```

Both mutations and queries can be handled by root resolvers, so the root that implements this schema can simply be:

```javascript
var fakeDatabase = {};
var root = {
  setMessage: function({message}) {
    fakeDatabase.message = message;
  }
  getMessage: function() {
    return fakeDatabase.message;
  }
};
```

You don't need anything more than this to implement mutations. But in many cases, you will find a number of different mutations that all accept the same input parameters. A common example is that creating an object in a database and updating an object in a database often take the same parameters. To make your schema simpler, you can use “input types” for this, by using the `input` keyword instead of the `type` keyword.

For example, instead of a single message of the day, let's say we have one message per author, where the author is just a unique username, and we want a mutation API both for creating a new message and for updating an old message. We could use the schema:

```javascript
input MessageInput {
  content: String!
  author: String!
}

type Query {
  getMessage(author: String)
}

type Mutation {
  createMessage(message: MessageInput)
  updateMessage(message: MessageInput)
}
```

Input types can't have fields that are other objects, only basic scalar types and list types.

Naming input types with `Input` on the end is a useful convention, because you will often want both an input type and an output type that are slightly different for a single conceptual object.

Here's some runnable code that implements this schema, keeping the data in memory:

```javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input MessageInput {
    content: String!
    author: String!
  }

  type Query {
    getMessage(author: String): String
  }

  type Mutation {
    createMessage(message: MessageInput)
    updateMessage(message: MessageInput)
  }
`);

// Maps username to content
var fakeDatabase = {};

// The root provides the top-level API endpoints
var root = {
  getMessage: function({author}) {
    return fakeDatabase[author];
  },
  createMessage: function({message}) {
    if (fakeDatabase[message.author]) {
      throw new Error('a message already exists with this author');
    }
    fakeDatabase[message.author] = message.content;
  },
  updateMessage: function({message}) {
    if (!fakeDatabase[message.author]) {
      throw new Error('no message exists with this author');
    }
    fakeDatabase[message.author] = message.content;
  },
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
```

To call a mutation, you must use the keyword `mutation` before your GraphQL query. To pass an input type, provide the data written as if it's a JSON object. For example, to call `createMessage` as defined above you could use this GraphQL operation:

```javascript
mutation {
  createMessage(message: {
    author: "andy",
    content: "hope is a good thing",
  })
}
```

One particular type of mutation is operations that change users, like signing up a new user. While you can implement this using GraphQL mutations, you can reuse many existing libraries if you learn about [GraphQL with authentication and Express middleware](/graphql-js/authentication-and-express-middleware/).

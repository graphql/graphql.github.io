---
title: Introduction to GraphQL
sidebarTitle: Introduction
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/
next: /learn/queries/
---

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (`me`) as well as that User's name might look something like this:

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

Along with functions for each field on each type:

```js
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

Once a GraphQL service is running (typically at a URL on a web service), it can be sent GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.

For example the query:

```graphql
{
  me {
    name
  }
}
```

Could produce the JSON result:

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

Learn more about GraphQL: the query language, type system, how the GraphQL service works, and best practices for using GraphQL:

## Core Concepts

Start here to get a solid understanding of GraphQL and how it works.

  - [Query Language](/learn/queries/)
  - [Type System](/learn/schema/)
  - [Validation](/learn/validation/)
  - [Execution](/learn/execution/)
  - [Introspection](/learn/introspection/)

## Best Practices

Ready to start using GraphQL? Follow these guidelines to get a better understanding of how to approach common topics.

  - [Thinking in Graphs](/learn/thinking-in-graphs/)
  - [Serving Over HTTP](/learn/serving-over-http/)
  - [Authorization](/learn/authorization/)
  - Domain Modeling
  - Pagination
  - Versioning
  - Performance
  - Security

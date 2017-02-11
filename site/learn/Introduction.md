---
title: Introduction to GraphQL
sidebarTitle: Introduction
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/
next: /learn/queries/
---

> Learn about GraphQL, how it works, and how to use it in this series of articles. Looking for documentation on how to build a GraphQL service? There are libraries to help you implement GraphQL in [many different languages](/code/).

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (`me`) as well as that user's name might look something like this:

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

Learn more about GraphQL&mdash;the query language, type system, how the GraphQL service works, as well as best practices for using GraphQL to solve common problems&mdash;in the articles written in this section.

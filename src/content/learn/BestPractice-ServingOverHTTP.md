---
title: Serving over HTTP
layout: docs
category: Best Practices
permalink: /learn/serving-over-http/
next: /learn/authorization/
---

HTTP is the most common choice for client-server protocol when using GraphQL because of its ubiquity. Here are some guidelines for setting up a GraphQL server to operate over HTTP.

## Web Request Pipeline

Most modern web frameworks use a pipeline model where requests are passed through a stack of middleware (AKA filters/plugins). As the request flows through the pipeline, it can be inspected, transformed, modified, or terminated with a response. GraphQL should be placed after all authentication middleware, so that you have access to the same session and user information you would in your HTTP endpoint handlers.

## URIs, Routes

HTTP is commonly associated with REST, which uses "resources" as its core concept. In contrast, GraphQL's conceptual model is an entity graph. As a result, entities in GraphQL are not identified by URLs. Instead, a GraphQL server operates on a single URL/endpoint, usually `/graphql`, and all GraphQL requests for a given service should be directed at this endpoint.

## HTTP Methods, Headers, and Body

Your GraphQL HTTP server should handle the HTTP GET and POST methods.

### GET request

When receiving an HTTP GET request, the GraphQL query should be specified in the "query" query string. For example, if we wanted to execute the following GraphQL query:

```graphql
{
  me {
    name
  }
}
```

This request could be sent via an HTTP GET like so:

```
http://myapi/graphql?query={me{name}}
```

Query variables can be sent as a JSON-encoded string in an additional query parameter called `variables`. If the query contains several named operations, an `operationName` query parameter can be used to control which one should be executed.

### POST request

A standard GraphQL POST request should use the `application/json` content type, and include a JSON-encoded body of the following form:

```js
{
  "query": "...",
  "operationName": "...",
  "variables": { "myVariable": "someValue", ... }
}
```

`operationName` and `variables` are optional fields. `operationName` is only required if multiple operations are present in the query.

## Response

Regardless of the method by which the query and variables were sent, the response should be returned in the body of the request in JSON format. As mentioned in the spec, a query might result in some data and some errors, and those should be returned in a JSON object of the form:

```js
{
  "data": { ... },
  "errors": [ ... ]
}
```

If there were no errors returned, the `"errors"` field should not be present on the response. If no data is returned, [according to the GraphQL spec](https://spec.graphql.org/October2021/#sec-Data), the `"data"` field should only be included if no errors occurred during execution.

## GraphiQL

GraphiQL is useful during testing and development but should be disabled in production by default. If you are using express-graphql, you can toggle it based on the NODE_ENV environment variable:

```
app.use('/graphql', graphqlHTTP({
  schema: MySessionAwareGraphQLSchema,
  graphiql: process.env.NODE_ENV === 'development',
}));
```

## Node

If you are using NodeJS, we recommend looking at the [list of server implementations](/code/#javascript-server).

## Draft Transport Specification

A detailed [HTTP transport specification](https://github.com/graphql/graphql-over-http) is in development. Though it is not yet finalized, these draft specifications act as a single source of truth for GraphQL client & library maintainers, detailing how to expose and consume a GraphQL API using an HTTP transport. Unlike the language specification, adherence is not mandatory, but most implementations are moving towards these standards to maximize interoperability.

---
title: Serving over HTTP
layout: ../_core/DocsLayout
category: Best Practices
permalink: /learn/serving-over-http/
next: /learn/authorization/
---

HTTP is the most common choice for client-server protocol when using GraphQL because of its ubiquity. Here are some guidelines for setting up a GraphQL server to operate over HTTP.

### Web Request Pipeline
Most modern web frameworks use a pipeline model where requests are passed through a stack of middleware (AKA filters/plugins). As the request flows through the pipeline, it can be inspected, transformed, modified, or terminated with a response. GraphQL should be placed after all authentication middleware, so that you have access to the same session and user information you would in your HTTP endpoint handlers.

### URIs, Routes
HTTP is commonly associated with REST, which uses "resources" as its core concept. In contrast, GraphQL's conceptual model is an entity graph. As a result, entities in GraphQL are not identified by URLs. Instead, a GraphQL server operates on a single URL/endpoint, usually `/graphql`, and all GraphQL requests for a given service should be directed at this endpoint.

### HTTP Methods, Headers, and Body
Your GraphQL HTTP server should handle the HTTP GET and POST methods.

#### GET request

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

Query variables can be sent as a JSON-encoded string in an additional query parameter called `variables`.  If the query contains several named operations, an `operationName` query parameter can be used to control which one should be executed.

#### POST request

A standard GraphQL POST request should use the `application/json` content type, and include a JSON-encoded body of the following form:

```js
{
  "query": "...",
  "operationName": "...",
  "variables": { variable1: value, ... }  
}
```

`operationName` and `variables` are optional fields. `operationName` is only required if multiple operations are present in the query. 

In addition to the above, we recommend supporting two additional cases:

* If the "query" query string parameter is present (as in the GET example above), it should be parsed and handled in the same way as the HTTP GET case.
* If the "application/graphql" Content-Type header is present, treat the HTTP POST body contents as the GraphQL query string.

If you're using express-graphql, you already get these behaviors for free.

### Response

Regardless of the method by which the query and variables were sent, the response should be returned in the body of the request in JSON format. As mentioned in the spec, a query might result in some data and some errors, and those should be returned in a JSON object of the form:

```js
{
  "data": { ... },
  "errors": [ ... ]
}
```

If there were no errors returned, the `"errors"` field should not be present on the response. If no data is returned, [according to the GraphQL spec](http://facebook.github.io/graphql/#sec-Data), the `"data"` field should only be included if the error occurred during execution.

### GraphiQL
GraphiQL is useful during testing and development but should be disabled in production by default. If you are using express-graphql, you can toggle it based on the NODE_ENV environment variable:

```
app.use('/graphql', graphqlHTTP({
  schema: MySessionAwareGraphQLSchema,
  graphiql: process.env.NODE_ENV === 'development',
}));
```

### Node
If you are using NodeJS, we recommend using either [express-graphql](https://github.com/graphql/express-graphql) or [apollo-server](https://github.com/apollostack/apollo-server).

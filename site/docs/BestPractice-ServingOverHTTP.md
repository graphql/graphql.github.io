---
title: Serving over HTTP
layout: ../_core/DocsLayout
category: Best Practices
permalink: /learn/serving-over-http/
next: /learn/authorization/
---

HTTP is a great choice for client-server communication when using GraphQL because of its ubiquity. Here are some guidelines for setting up a GraphQL server to operate over HTTP.

### Web Request Pipeline
Most modern web frameworks use a pipeline model where requests are passed through a stack of middleware (aka filters/plugins). As the request flows through the pipeline, it can be inspected, transformed, modified, or terminated with a response. GraphQL should be placed after all authentication middleware.

### URIs, Routes, and Controllers
HTTP is commonly associated with REST, which uses "resources" as its core concept. In contrast, GraphQL uses an entity graph as its conceptual model. As a result, entities in GraphQL are not identified by URIs. Instead, a GraphQL server operates on a single URI/endpoint. All GraphQL requests for a given graph/domain should be directed at this endpoint. If you are coming from an MVC framework, think of GraphQL as a unified controller that handles requests for all entities.

### HTTP Methods, Headers, and Body
Your GraphQL HTTP server should handle the HTTP GET and POST methods.

When receiving an HTTP GET request, the GraphQL query should be specified in the "query" query string. For example:

```
curl "http://myapi/graphql?query={me{name}}"
```
*Note: The '{' and '}' characters need to be URL encoded, but they are intact above for clarity*

When receiving an HTTP POST request, we recommend supporting these two cases:

* If the "query" query string parameter is present (as in the GET example above), it should be parsed and handled in the same way as the HTTP GET case.
* If the "application/graphql" Content-Type header is present, treat the HTTP POST body contents as the GraphQL query string.

If you're using express-graphql, you already get these behaviors for free.

### GraphiQL
GraphiQL is useful during testing and development but disabled in production. If you are using express-graphql, you can toggle it based on the NODE_ENV environment variable:

```
app.use('/graphql', graphqlHTTP({
  schema: MySessionAwareGraphQLSchema,
  graphiql: process.env.NODE_ENV === 'development',
}));
```

### Node
If you are using NodeJS, we recommend using either express-graphql or apollo-server.

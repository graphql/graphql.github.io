---
title: "Improving Latency with @defer and @stream Directives"
tags: ["announcements"]
layout: blog
date: 2020-12-08
byline: Rob Richard, Liliana Matos
permalink: /blog/2020-12-08-improving-latency-with-defer-and-stream-directives
---

> Rob Richard and Liliana Matos are front-end engineers at [1stDibs.com](https://www.1stdibs.com). They have been working with the GraphQL Working Group as champions of the the `@defer` and `@stream` directives.

The `@defer` and `@stream` directives have been a much anticipated set of features ever since Lee Byron first talked about it at [GraphQL Europe 2016](https://youtu.be/ViXL0YQnioU?t=769). For most of 2020, we have been working with the GraphQL Working Group to standardize this feature. It is now a Stage 2 proposal, but to advance further, we are looking to the GraphQL community to try using these directives and provide feedback. We have released experimental versions of `GraphQL.js` and `express-graphql`. They are published to npm under `graphql@experimental-stream-defer` and `express-graphql@experimental-stream-defer`. We encourage everyone interested in this feature to try out these releases and let us know how it goes in the [issue created for feedback](https://github.com/graphql/graphql-js/issues/2848). Read on to find out more about what this proposal offers.

One of the disadvantages of GraphQL’s request/response model is that the GraphQL response is not returned to clients until the entire request has finished processing. However, not all requested data may be of equal importance, and in some use cases it may be possible for applications to act on a subset of the requested data. An application can speed up its time-to-interactive if the GraphQL server can send the most important data as soon as it’s ready. The new `@defer` and `@stream` directives allow GraphQL servers to do exactly that by returning multiple payloads from a single GraphQL response.

The `@defer` directive can be applied to fragment spreads and inline fragments. It is a declarative way for developers to mark parts of a query as non-essential for immediate return.

Here’s an example of the `@defer` directive:

#### Request

```graphql
query {
  person(id: "cGVvcGxlOjE=") {
    name
    ...HomeworldFragment @defer(label: "homeworldDefer")
  }
}

fragment HomeworldFragment on Person {
  homeworld {
    name
  }
}
```

#### Response

**Payload 1**

```json
{
  "data": {
    "person": {
      "name": "Luke Skywalker"
    }
  },
  "hasNext": true
}
```

**Payload 2**

```json
{
  "label": "homeworldDefer",
  "path": ["person"],
  "data": {
    "homeworld": {
      "name": "Tatooine"
    }
  },
  "hasNext": false
}
```

When the GraphQL execution engine encounters the `@defer` directive, it will fork execution and begin to resolve those fields asynchronously. While the deferred payload is still being prepared, the client can receive and act on the initial payload. This is most useful when the deferred data is large, expensive to load, or not on the critical path for interactivity.

Similar to `@defer`, the `@stream` directive also allows the client to receive data before the entire result is ready. `@stream` can be used on list fields. Here’s an example of the `@stream` directive:

#### Request

```graphql
query {
  person(id: "cGVvcGxlOjE=") {
    name
    films @stream(initialCount: 2, label: "filmsStream") {
      title
    }
}
```

#### Response

**Payload 1**

```json
{
  "data": {
    "person": {
      "name": "Luke Skywalker",
      "films": [
        { "title": "A New Hope" },
        { "title": "The Empire Strikes Back" }
      ]
    }
  },
  "hasNext": true
}
```

**Payload 2**

```json
{
  "label": "filmsStream",
  "path": ["person", "films", 2],
  "data": {
    "title": "Return of the Jedi"
  },
  "hasNext": true
}
```

**Payload 3**

```json
{
  "label": "filmsStream",
  "path": ["person", "films", 3],
  "data": {
    "title": "Revenge of the Sith"
  },
  "hasNext": false
}
```

When the GraphQL execution engine encounters the `@stream` directive, it will resolve as many list items specified by the `initialCount` argument. The rest will be resolved asynchronously. This is especially useful for an interface where only a few elements can be rendered above the fold. The client can render these elements as soon as possible while the server is still resolving the rest of the data.

While the GraphQL specification doesn’t specify transport protocols, we expect the most common transport for queries with `@defer`/`@stream` to be HTTP with chunked transfer encoding. This allows a GraphQL server to keep a standard HTTP connection open, while streaming each payload to the client as soon as it’s ready. It has low overhead, has been supported by browsers for decades, and can work easily with most infrastructure.

You can learn more about these directives at:

- [The @defer/@stream RFC](https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md)
- [The proposed spec edits](https://github.com/graphql/graphql-spec/pull/742)
- [The GraphQL Incremental Delivery over HTTP RFC](https://github.com/graphql/graphql-over-http/blob/master/rfcs/IncrementalDelivery.md)
- [Our talk at GraphQL Summit 2020](https://www.youtube.com/watch?v=icv_Pq06aOY)

> – **Rob Richard**, **Liliana Matos**, Front-End Engineering, 1stDibs.com

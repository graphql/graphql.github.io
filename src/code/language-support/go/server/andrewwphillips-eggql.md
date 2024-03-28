---
name: EGGQL
description: Easy to use, complete Go implementation of GraphQL. Simple and schema-less.
github: andrewwphillips/eggql
---

The purpose of Eggql is to make it as simple as possible to create a GraphQL server. You don't need to create GraphQL schema (though you can view the schema that is created if interested). It is currently in beta release but is a complete implementation of a GraphQL server apart from subscriptions.

Just to be clear it supports all of these GraphQL features: arguments (including defaults), objects/lists/enums/input/interface/union types, aliases, fragments, variables, directives, mutations, inline fragments, descriptions, introspection and custom scalars.

Tests (jMeter) show that it is as fast or faster than other Go implementations for simple queries. We're working on enhancements for performance including caching, data-loader, complexity-limits, etc.

To run an `eggql` hello world server just build and run this Go program:

```Go
package main

import "github.com/andrewwphillips/eggql"

func main() {
	http.Handle("/graphql", eggql.New(struct{ Message string }{Message: "hello, world"}))
	http.ListenAndServe(":80", nil)
}
```

This creates a root Query object with a single `message` field. To test it send a query with curl:

```sh
$ curl -XPOST -d '{"query": "{ message }"}' localhost:80/graphql
```

and you will get this response:

```JSON
{
  "data": {
    "message": "hello, world"
  }
}
```

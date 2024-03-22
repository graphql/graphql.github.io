---
name: genqlient
description: A truly type-safe Go GraphQL client.
github: Khan/genqlient
---

genqlient is a Go library to easily generate type-safe code to query a GraphQL API. It takes advantage of the fact that both GraphQL and Go are typed languages to ensure at compile-time that your code is making a valid GraphQL query and using the result correctly, all with a minimum of boilerplate.

genqlient provides:

- Compile-time validation of GraphQL queries: never ship an invalid GraphQL query again!
- Type-safe response objects: genqlient generates the right type for each query, so you know the response will unmarshal correctly and never need to use `interface{}`.
- Production-readiness: genqlient is used in production at Khan Academy, where it supports millions of learners and teachers around the world.

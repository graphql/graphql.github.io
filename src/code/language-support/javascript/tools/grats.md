---
name: Grats
description: Implementation-first GraphQL for TypeScript. Annotate your existing TypeScript code with docblock tags and Grats statically extracts a GraphQL schema from it.
url: https://grats.capt.dev/
github: captbaritone/grats
npm: grats
tags:
  - tools-and-libraries
  - tools
  - backend
---

Grats takes an
[implementation-first](https://jordaneldredge.com/implementation-first/)
approach to building GraphQL servers in TypeScript. Instead of defining your
schema in SDL or with a schema builder API and then wiring resolvers up to it,
you write ordinary TypeScript functions, classes, and types, and mark the parts
you want to expose with docblock tags like `/** @gqlType */` and
`/** @gqlField */`. At build time Grats statically
analyzes your code — using the TypeScript compiler's own types, so no runtime
reflection or decorators are involved — and derives both a `schema.graphql` file
and an executable `GraphQLSchema`.

Because the schema is derived from your implementation, the two can't drift
apart: renaming a field, changing an argument, or making a return type nullable
updates the schema automatically, and anything Grats can't express as valid
GraphQL is reported as a compile-time error with a pointer to the offending
line. A companion TypeScript plugin surfaces those errors directly in your
editor.

Annotate your types and resolvers:

```ts
/** @gqlType */
type User = {
  /** @gqlField */
  name: string
}

/** @gqlField */
export function greeting(user: User, salutation: string): string {
  return `${salutation}, ${user.name}!`
}

/** @gqlQueryField */
export function me(): User {
  return { name: "Alice" }
}
```

Then run `npx grats` to extract the schema:

```graphql
type Query {
  me: User
}

type User {
  name: String
  greeting(salutation: String!): String
}
```

The generated module also exports the executable schema, which you can hand to
any `graphql-js`-based server:

```ts
import { createYoga } from "graphql-yoga"
import { createServer } from "node:http"
import { getSchema } from "./schema"

createServer(createYoga({ schema: getSchema() })).listen(4000)
```

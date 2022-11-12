---
name: GiraphQL
description: A plugin based schema builder for creating code-first GraphQL schemas in typescript
url: https://giraphql.com/
github: hayes/giraphql
npm: "@giraphql/core"
---

GiraphQL makes writing type-safe schemas simple, and works without a code generator,
build process, or extensive manual type definitions.

```ts
import { ApolloServer } from "apollo-server"
import SchemaBuilder from "@giraphql/core"

const builder = new SchemaBuilder({})

builder.queryType({
  fields: t => ({
    hello: t.string({
      args: {
        name: t.arg.string({}),
      },
      resolve: (parent, { name }) => `hello, ${name || "World"}`,
    }),
  }),
})

new ApolloServer({
  schema: builder.toSchema({}),
}).listen(3000)
```

---
name: zodql
description: Describe your GraphQL operations with Zod schemas and use a single schema as the source of truth for the query string, the inferred TypeScript response type, and runtime validation of the data you get back.
github: mattiasahlsen/zodql
npm: "@mattiasahlsen/zodql"
tags:
  - tools-and-libraries
  - frontend
---

zodql compiles a [Zod](https://zod.dev) schema into a GraphQL query, sends it through the HTTP client of your choice, and validates the response against that same schema. Because a query is just a schema, the GraphQL query, the TypeScript type of the response, and the runtime validation applied to it all come from one place — there's no separate query string to keep in sync with your types, and no codegen step to run.

Since a query is an ordinary runtime value, you can reshape it with Zod's own combinators (`.pick()`, `.omit()`, `.extend()`, …) to adapt a shared schema to the fields a given screen needs, and you can enforce validation rules that a GraphQL schema can't express — non-empty strings, emails, URLs, numeric ranges, and any other Zod refinement — rejecting non-conforming responses at parse time. It supports queries and mutations, named operations, typed variables, field arguments, aliases, nested selection sets, fragments (including inline fragments), and unions/interfaces, and has no hard dependency on a particular HTTP library.

Install it alongside Zod:

```bash
npm install @mattiasahlsen/zodql zod
```

Describe a query with a Zod schema, compile it to GraphQL, and execute it through a client built on any HTTP transport:

```typescript
import { zodql, zodqlField, buildZodqlClient } from "@mattiasahlsen/zodql"
import { z } from "zod"

// Describe the query with a Zod schema
const userSchema = z.object({
  user: zodqlField()
    .withArguments({ id: "$userId" })
    .toSchema(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    ),
})

// Compile it to a GraphQL query
const userQuery = zodql("query", userSchema)
  .defineVariables({ userId: { typeName: "ID!", schema: z.string() } })
  .compile()

// Create a client from any HTTP transport whose `post` resolves to `{ response, json }`
const client = buildZodqlClient({
  post: async (_url, data) => {
    const response = await fetch("https://api.example.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return { response, json: () => response.json() }
  },
})

// Execute the query; the response is validated against the schema
const { parseResponse } = await client.request(userQuery, { userId: "123" })
const { data } = await parseResponse()
// data.user is typed as { id: string; name: string; email: string }
```

The compiled GraphQL query:

```graphql
query ($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
  }
}
```

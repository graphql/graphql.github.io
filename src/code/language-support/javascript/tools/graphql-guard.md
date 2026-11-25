---
name: GraphQL Guard
description: A permission layer for GraphQL schemas, written as a tree of rules in code.
github: marklai1998/graphql-guard
npm: "graphql-guard"
tags:
  - tools-and-libraries
  - tools
  - security
---

GraphQL Guard lets you define permissions as rules and map them onto your schema's types and fields. Each rule reads the field's `parent`, `args`, `context` and `info`, and rules combine with `and`, `or`, `not`, `chain` and `race`. Rule results can be cached per request, so a rule that guards every field of a type runs once per object.

`guard(schema, rules)` returns a new schema with the rules applied, so it works with any server that takes a `GraphQLSchema`, without `graphql-middleware`. GraphQL Guard is a maintained fork of `graphql-shield` 7.x with the same rule API.

```bash
npm install graphql-guard
```

```ts
import { guard, rule, and, or, not } from "graphql-guard"

// Rules

const isAuthenticated = rule({ cache: "contextual" })(async (
  parent,
  args,
  ctx,
  info,
) => {
  return ctx.user !== null
})

const isAdmin = rule({ cache: "contextual" })(async (
  parent,
  args,
  ctx,
  info,
) => {
  return ctx.user.role === "admin"
})

const isEditor = rule({ cache: "contextual" })(async (
  parent,
  args,
  ctx,
  info,
) => {
  return ctx.user.role === "editor"
})

// Permissions

const guardedSchema = guard(schema, {
  Query: {
    frontPage: not(isAuthenticated),
    fruits: and(isAuthenticated, or(isAdmin, isEditor)),
    customers: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    addFruitToBasket: isAuthenticated,
  },
  Fruit: isAuthenticated,
  Customer: isAdmin,
})

// Server

const yoga = createYoga({
  schema: guardedSchema,
  context: ({ request }) => ({
    user: getUser(request),
  }),
})
```

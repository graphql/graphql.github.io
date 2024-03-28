---
name: GraphQLShield
description: A GraphQL tool to ease the creation of permission layer.
github: maticzav/graphql-shield
npm: "graphql-shield"
---

GraphQL Shield helps you create a permission layer for your application. Using an intuitive rule-API, you'll gain the power of the shield engine on every request and reduce the load time of every request with smart caching. This way you can make sure your application will remain quick, and no internal data will be exposed.

```ts
import { rule, shield, and, or, not } from "graphql-shield"

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

const permissions = shield({
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

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [permissions],
  context: req => ({
    ...req,
    user: getUser(req),
  }),
})
```

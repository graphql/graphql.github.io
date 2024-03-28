---
name: GraphQL Middleware
description: Split up your GraphQL resolvers in middleware functions.
github: maticzav/graphql-middleware
npm: graphql-middleware
---

GraphQL Middleware is a schema wrapper which allows you to manage additional functionality across multiple resolvers efficiently.

## Features

💡 Easy to use: An intuitive, yet familiar API that you will pick up in a second.
💪 Powerful: Allows complete control over your resolvers (Before, After).
🌈 Compatible: Works with any GraphQL Schema.

## Example

```ts
const { ApolloServer } = require("apollo-server")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const typeDefs = `
type Query {
  hello(name: String): String
  bye(name: String): String
}
`
const resolvers = {
  Query: {
    hello: (root, args, context, info) => {
      console.log(`3. resolver: hello`)
      return `Hello ${args.name ? args.name : "world"}!`
    },
    bye: (root, args, context, info) => {
      console.log(`3. resolver: bye`)
      return `Bye ${args.name ? args.name : "world"}!`
    },
  },
}

const logInput = async (resolve, root, args, context, info) => {
  console.log(`1. logInput: ${JSON.stringify(args)}`)
  const result = await resolve(root, args, context, info)
  console.log(`5. logInput`)
  return result
}

const logResult = async (resolve, root, args, context, info) => {
  console.log(`2. logResult`)
  const result = await resolve(root, args, context, info)
  console.log(`4. logResult: ${JSON.stringify(result)}`)
  return result
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithMiddleware = applyMiddleware(schema, logInput, logResult)

const server = new ApolloServer({
  schema: schemaWithMiddleware,
})

await server.listen({ port: 8008 })
```

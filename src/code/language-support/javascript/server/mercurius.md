---
name: Mercurius
description: Mercurius is a flexible and extendible GraphQL adapter for Fastify, a blazing-fast web framework with the least overhead and a powerful plugin architecture.
url: https://mercurius.dev/
github: mercurius-js/mercurius
npm: "mercurius"
---

To run an hello world script with `mercurius`:

```bash
npm install fastify mercurius
```

Then run `node app.js` with this code in `app.js`:

```js
const Fastify = require("fastify")
const mercurius = require("mercurius")

const schema = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: async (_, { name }) => `hello ${name || "world"}`,
  },
}

const app = Fastify()
app.register(mercurius, {
  schema,
  resolvers,
})

app.listen(3000)

// Call IT!
// curl 'http://localhost:3000/graphql' \
//  -H 'content-type: application/json' \
//  --data-raw '{"query":"{ hello(name:\"Marcurius\") }" }'
```

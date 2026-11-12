---
name: Simfinity.js
description: Generate GraphQL queries, CRUD mutations, relationships, and database storage from GraphQL object types, with MongoDB/Mongoose or PostgreSQL adapters.
url: https://simtlix.github.io/simfinity.js/
github: simtlix/simfinity.js
npm: "@simtlix/simfinity-js"
tags:
  - tools-and-libraries
  - backend
---

Simfinity.js starts with types defined using `GraphQLObjectType` from the `graphql` package. Register those types to generate a database-backed schema, then serve it with a GraphQL server such as Yoga. Relationship metadata connects nested API operations to database relationships.

The MongoDB adapter uses Mongoose. The PostgreSQL adapter uses native PostgreSQL tables, UUID identities, and foreign-key constraints. Both share a runtime for validation, controllers, query scopes, lifecycle hooks, and authorization rules. Authentication and trusted request context remain part of the application.

For example, register an entity with the PostgreSQL adapter:

```js
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql"
import pg from "pg"
import { createPostgres } from "@simtlix/simfinity-postgres"

const SerieType = new GraphQLObjectType({
  name: "Serie",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
})

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const simfinity = createPostgres({ pool, schema: "series_api" })

simfinity.connect(null, SerieType, "serie", "series")
const schema = simfinity.createSchema()
await simfinity.initializeDatabase({ mode: "create" })
```

The [PostgreSQL quick start](https://simtlix.github.io/simfinity.js/guide/postgresql.html) includes a complete runnable server and a series/season example with nested writes. Database initialization is explicit; schema evolution requires deliberate migrations.

The optional [MCP integration](https://simtlix.github.io/simfinity.js/guide/mcp.html) exposes selected GraphQL operations as tools and works with either database adapter. See the [compatibility guide](https://simtlix.github.io/simfinity.js/compatibility.html) for backend-specific behavior.

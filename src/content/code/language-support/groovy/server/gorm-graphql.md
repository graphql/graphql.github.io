---
name: gorm-graphql
description: An automatic GraphQL schema generator for GORM
url: https://grails.github.io/gorm-graphql/latest/guide/index.html
github: grails/gorm-graphql
---

**Core Library** - The GORM GraphQL library provides functionality to generate a GraphQL schema based on your GORM entities. In addition to mapping domain classes to a GraphQL schema, the core library also provides default implementations of "data fetchers" to query, update, and delete data through executions of the schema.

**Grails Plugin** - In a addition to the Core Library, the GORM GraphQL Grails Plugin:

- Provides a controller to receive and respond to GraphQL requests through HTTP, based on their guidelines.

- Generates the schema at startup with spring bean configuration to make it easy to extend.

- Includes a [GraphiQL](https://github.com/graphql/graphiql) browser enabled by default in development. The browser is accessible at /graphql/browser.

- Overrides the default data binder to use the data binding provided by Grails
- Provides a [trait](https://grails.github.io/gorm-graphql/latest/api/org/grails/gorm/graphql/plugin/testing/GraphQLSpec.html) to make integration testing of your GraphQL endpoints easier

See [the documentation](https://grails.github.io/gorm-graphql/latest/guide/index.html) for more information.

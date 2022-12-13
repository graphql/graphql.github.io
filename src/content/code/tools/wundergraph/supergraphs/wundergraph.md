---
name: WunderGraph
description: WunderGraph is an open-source GraphQL Gateway that is able to compose Apollo Federation, GraphQL, REST APIs, Databases, Kafka and more.
url: https://wundergraph.com
github: wundergraph/wundergraph
---

[WunderGraph](https://wundergraph.com) composes all your APIs into a single unified GraphQL API and
allows you to expose your Graph as a [secure and type-safe JSON-RPC API](https://docs.wundergraph.com/docs/features/graphql-to-json-rpc-compiler).

To get started with WunderGraph, you can use `create-wundergraph-app` to bootstrap a new project:

```bash
npx create-wundergraph-app my-project -E nextjs-swr
```

On the client side, WunderGraph's JSON-RPC API integrates very well with frameworks like [Next.js, SWR](https://github.com/wundergraph/wundergraph/tree/main/examples/nextjs-swr) and React Query,
while one the backend, we're able to leverage the power of "Server-Side-Only GraphQL".
Handle authentication, authorization, validation, joins and more right in the Query Layer.

```graphql
mutation (
  $name: String! @fromClaim(name: NAME)
  $email: String! @fromClaim(name: EMAIL)
  $message: String! @jsonSchema(pattern: "^[a-zA-Z 0-9]+$")
) {
  createOnepost(
    data: {
      message: $message
      user: {
        connectOrCreate: {
          where: { email: $email }
          create: { email: $email, name: $name }
        }
      }
    }
  ) {
    id
    message
    user {
      id
      name
    }
  }
}
```

The Query above requires the user to be authenticated,
injects the user's name and email from the JWT token and validates the message against a JSON Schema.

Here's another example showcasing how we can use Server-Side GraphQL with WunderGraph's unique [join capabilities](https://docs.wundergraph.com/docs/features/cross-api-joins-to-compose-apis),
composing data from two different APIs into a single GraphQL response.

```graphql
query (
  $continent: String!
  # the @internal directive removes the $capital variable from the public API
  # this means, the user can't set it manually
  # this variable is our JOIN key
  $capital: String! @internal
) {
  countries_countries(filter: { continent: { eq: $continent } }) {
    code
    name
    # using the @export directive, we can export the value of the field `capital` into the JOIN key ($capital)
    capital @export(as: "capital")
    # the _join field returns the type Query!
    # it exists on every object type so you can everywhere in your Query documents
    _join {
      # once we're inside the _join field, we can use the $capital variable to join the weather API
      weather_getCityByName(name: $capital) {
        weather {
          temperature {
            max
          }
          summary {
            title
            description
          }
        }
      }
    }
  }
}
```

The full [example can be found on GitHub](https://github.com/wundergraph/wundergraph/tree/main/examples/cross-api-joins).

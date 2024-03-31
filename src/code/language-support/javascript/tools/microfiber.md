---
name: Microfiber
description: A library to query and manipulate GraphQL Introspection Query results.
github: anvilco/graphql-introspection-tools
npm: "microfiber"
---

Microfiber is a JavaScript library that allows:

- Digging through your Introspection Query Results for a specific Query, Mutation, Type, Field, Argument or Subscription.
- Removing a specific Query, Mutation, Type, Field/InputField, Argument or Subscription from your Introspection Query Results.
- Removing Queries, Mutations, Fields/InputFields or Arguments that refer to Type that does not exist in - or has been removed from - your Introspection Query Results.

```sh
npm install microfiber
# OR
yarn add microfiber
```

Then in JS:

```js
import { Microfiber } from "microfiber"

const introspectionQueryResults = {
  // ...
}

const microfiber = new Microfiber(introspectionQueryResults)

// ...do some things to your schema with `microfiber`

const cleanedIntrospectonQueryResults = microfiber.getResponse()
```

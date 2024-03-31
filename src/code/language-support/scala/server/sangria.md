---
name: Sangria
description: A Scala GraphQL library that supports [Relay](https://facebook.github.io/relay/).
url: https://sangria-graphql.github.io/
github: sangria-graphql/sangria
---

An example of a hello world GraphQL schema and query with `sangria`:

```scala
import sangria.schema._
import sangria.execution._
import sangria.macros._

val QueryType = ObjectType("Query", fields[Unit, Unit](
  Field("hello", StringType, resolve = _ ⇒ "Hello world!")
))

val schema = Schema(QueryType)

val query = graphql"{ hello }"

Executor.execute(schema, query) map println
```

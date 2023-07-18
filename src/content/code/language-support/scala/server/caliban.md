---
name: Caliban
description: Caliban is a functional library for building GraphQL servers and clients in Scala. It offers minimal boilerplate and excellent interoperability.
url: https://ghostdogpr.github.io/caliban/
github: ghostdogpr/caliban
---

An example of a simple GraphQL schema and query with `caliban`:

```scala
import caliban._
import caliban.schema.Schema.auto._

// schema
case class Query(hello: String)

// resolver
val resolver = RootResolver(Query("Hello world!"))

val api = graphQL(resolver)

for {
  interpreter <- api.interpreter
  result      <- interpreter.execute("{ hello }")
} yield result
```

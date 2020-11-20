---
name: Caliban
description: Caliban is a purely functional library for building GraphQL servers and clients in Scala
url: https://ghostdogpr.github.io/caliban/
github: ghostdogpr/caliban
---

An example of a GraphQL schema and query with `caliban`:
```scala
import caliban.GraphQL.graphQL
import caliban.RootResolver

case class Character(name: String, age: Int)

def getCharacters(): List[Character] = ??? 

// schema
case class Queries(characters: List[Character])

// resolver
val queries = Queries(getCharacters)

val query = "{ characters { name } }"
for {
  api          = graphQL(RootResolver(queries))
  interpreter <- api.interpreter
  result      <- interpreter.execute(query)
} yield result
```

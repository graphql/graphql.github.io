---
name: Caliban
description: Caliban is a functional library for building GraphQL servers and clients in Scala. It offers with client code generation and type-safe queries.
url: https://ghostdogpr.github.io/caliban/
github: ghostdogpr/caliban
---

An example of defining a GraphQL query and running it with `caliban`:

```scala
// define your query using Scala
val query: SelectionBuilder[RootQuery, List[CharacterView]] =
  Query.characters {
    (Character.name ~ Character.nicknames ~ Character.origin)
      .mapN(CharacterView)
  }

import sttp.client3._
// run the query and get the result already parsed into a case class
val result = query.toRequest(uri"http://someUrl").send(HttpClientSyncBackend()).body
```

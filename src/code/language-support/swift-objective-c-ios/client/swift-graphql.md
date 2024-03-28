---
name: SwiftGraphQL
description: A GraphQL client that lets you forget about GraphQL.
github: maticzav/swift-graphql
---

SwiftGraphQL is a Swift code generator and a lightweight GraphQL client. It lets you create queries using Swift, and guarantees that every query you create is valid.

The library is centered around three core principles:

🚀 If your project compiles, your queries work.
🦉 Use Swift in favour of GraphQL wherever possible.
🌳 Your application model should be independent of your schema.

Here's a short preview of the SwiftGraphQL code

```swift
import SwiftGraphQL

// Define a Swift model.
struct Human: Identifiable {
    let id: String
    let name: String
    let homePlanet: String?
}

// Create a selection.
let human = Selection.Human {
    Human(
        id: try $0.id(),
        name: try $0.name(),
        homePlanet: try $0.homePlanet()
    )
}

// Construct a query.
let query = Selection.Query {
    try $0.humans(human.list)
}

// Perform the query.
send(query, to: "http://swift-graphql.heroku.com") { result in
    if let data = try? result.get() {
        print(data) // [Human]
    }
}
```

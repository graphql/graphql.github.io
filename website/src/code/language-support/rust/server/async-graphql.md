---
name: Async-graphql
description: Async-graphql is a high-performance server-side library that supports all GraphQL specifications.
github: async-graphql/async-graphql
---

```rust
 use async_graphql::*;
 struct Query;
 #[Object]
 impl Query {
    /// Returns the sum of a and b
    async fn add(&self, a: i32, b: i32) -> i32 {
        a + b
    }
 }
```

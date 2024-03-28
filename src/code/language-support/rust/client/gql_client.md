---
name: gql_client
description: Minimal GraphQL client for Rust
github: arthurkhlghatyan/gql-client-rs
---

Usage example

```rust
use gql_client::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
  let endpoint = "https://graphqlzero.almansi.me/api";
  let query = r#"
    query AllPostsQuery {
      posts {
        data {
          id
        }
      }
    }
  "#;

  let client = Client::new(endpoint);
  let data: AllPosts = client.query::<AllPosts>(query).await.unwrap();

  println!("{:?}" data);

  Ok(())
}
```

---
name: cynic
description: A bring your own types GraphQL client for Rust
url: https://cynic-rs.dev
github: obmarg/cynic
---

A client library for rust that generates queries from types you provide,
verifying that the types match the shape of your schema.

It provides [a generator](https://generator.cynic-rs.dev) to bootstrap types
from existing GraphQL queries.

Usage example:

```rust
#[derive(cynic::QueryFragment, Debug)]
#[cynic(
    schema_path = "../schemas/starwars.schema.graphql",
    query_module = "query_dsl",
    graphql_type = "Root",
    argument_struct = "FilmArguments"
)]
struct FilmDirectorQuery {
    #[arguments(id = &args.id)]
    film: Option<Film>,
}

#[derive(cynic::QueryFragment, Debug)]
#[cynic(
    schema_path = "../schemas/starwars.schema.graphql",
    query_module = "query_dsl",
    graphql_type = "Film"
)]
struct Film {
    title: Option<String>,
    director: Option<String>,
}

#[derive(cynic::FragmentArguments)]
struct FilmArguments {
    id: Option<cynic::Id>,
}

fn main() {
    use cynic::{QueryBuilder, http::ReqwestBlockingExt};

    let query = FilmDirectorQuery::build(&FilmArguments {
        id: Some("ZmlsbXM6MQ==".into()),
    })

    reqwest::blocking::Client::new()
        .post("https://swapi-graphql.netlify.com/.netlify/functions/index")
        .run_graphql(query)
        .unwrap()
}

mod query_dsl {
    cynic::query_dsl!("../schemas/starwars.schema.graphql");
}
```

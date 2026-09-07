---
name: graphql-http-rust
description: A reference implementation of the HTTP-layer behavior defined by the GraphQL-over-HTTP specification for Rust — content negotiation, request parsing, response encoding, and status-code decision logic.
github: miqui/graphql-http-rust
tags:
  - tools-and-libraries
  - backend
---

`graphql-http-rust` implements only the **HTTP transport layer** described by
the [GraphQL-over-HTTP specification](https://github.com/graphql/graphql-over-http):
content negotiation between `application/graphql-response+json` and legacy
`application/json`, GET/POST request parsing, response encoding, and the
status-code decisions (200, 294 partial success, 400, 405, 406, 415, 422)
the spec recommends. It deliberately does not parse, validate, or execute
GraphQL documents, so pair it with a GraphQL engine (e.g. `async-graphql` or
`juniper`) and the web framework of your choice.

Add it to your `Cargo.toml`

```toml
[dependencies]
graphql-http-rust = "0.1"
```

Negotiate the response media type from the client's `Accept` header, then
encode a GraphQL execution result as an HTTP response

```rust
use graphql_http_rust::{encode_response, negotiate, GraphQLResult};

let negotiated = negotiate(Some("application/graphql-response+json"));

let result = GraphQLResult::data_only(serde_json::json!({ "hello": "world" }));
let response = encode_response(&result, negotiated);
// -> 200, Content-Type: application/graphql-response+json; charset=utf-8
```

The crate tracks the GraphQL-over-HTTP spec at Stage 2 (Draft), which may
still change. It's suitable for experimentation, conformance testing, and
review, but not yet for production use.

Find more in the [repository](https://github.com/miqui/graphql-http-rust),
including a toy Axum server and a k6 conformance suite that exercise the
crate end to end.

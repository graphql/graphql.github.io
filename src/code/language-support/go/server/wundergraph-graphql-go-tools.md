---
name: graphql-go-tools
description: A collection of tools for building GraphQL Servers, Gateways, Proxy Servers and Middleware in Go.
github: wundergraph/graphql-go-tools
---

graphql-go-tools implements all basic blocks for building GraphQL Servers, Gateways and Proxy Servers.
From lexing, parsing, validation, normalization, all the way up to query planning and execution.

It can also be understood as a GraphQL Compiler, with the ability to add your own backends.
Just by implementing a few interfaces, you're able to teach the compiler how to talk GraphQL to any backend.

The following backends are already implemented:
[GraphQL](https://github.com/wundergraph/graphql-go-tools/tree/master/pkg/engine/datasource/graphql_datasource), with support for Apollo Federation / Supergraph.
[Databases](https://github.com/wundergraph/wundergraph/tree/main/pkg/datasources/database): PostgreSQL, MySQL, SQLite, CockroachDB, MongoDB, SQLServer,
[OpenAPI / REST](https://github.com/wundergraph/wundergraph/tree/main/pkg/datasources/oas) and
[Kafka](https://github.com/wundergraph/graphql-go-tools/tree/master/pkg/engine/datasource/kafka_datasource).

To get a sense on how to implement a new backend, check out the [Static Data Source](https://github.com/wundergraph/graphql-go-tools/tree/master/pkg/engine/datasource/staticdatasource),
as it's the simplest one.

It's used in production by many enterprises for multiple years now, battle tested and actively maintained.

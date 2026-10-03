---
name: gRPC–GraphQL Gateway
description: A Rust gateway that exposes gRPC services as a GraphQL API using annotated Protocol Buffers.
url: https://protocol-lattice.github.io/grpc_graphql_gateway/
github: Protocol-Lattice/grpc_graphql_gateway
tags:
  - tools-and-libraries
  - tools
  - federation
---

gRPC–GraphQL Gateway generates a GraphQL schema from annotated Protocol
Buffers descriptors and routes GraphQL operations to existing gRPC
services. It supports queries, mutations, and subscriptions backed by
server-streaming RPCs.

The gateway is written in Rust and supports Apollo Federation v2,
including entity resolution with DataLoader batching. GraphQL
subscriptions deliver streaming updates over WebSocket using the
graphql-transport-ws protocol.

To get started, annotate your .proto service definitions, generate a
descriptor set, and configure the gateway with your gRPC backend
endpoints. See the [documentation](https://protocol-lattice.github.io/grpc_graphql_gateway/)
for setup instructions and examples.

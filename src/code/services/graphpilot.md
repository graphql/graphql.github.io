---
name: GraphPilot
description: A managed edge cache for GraphQL APIs that builds caching and invalidation from your schema.
url: https://graphpilot.io
tags:
  - tools-and-libraries
  - tools
  - federation
---

GraphPilot runs in front of the GraphQL server you already have and caches responses at the edge, including POST requests and persisted queries. Clients keep calling the same endpoint; nothing changes in their code.

Invalidation follows the schema. If a query does not select the key fields of an object, GraphPilot adds them to the request it sends to your origin (the `id`, or your own keys marked with `@surrogateKey`), tags the cached response with them, and strips them again before the client sees the response. When a mutation passes through and returns an object, the cached responses that contain that object are purged at every edge location, usually within seconds. Data that changes outside GraphPilot can be purged by key through an API, a CLI or a `Surrogate-Key` response header from the origin.

Responses can be split per user, role or tenant with policy expressions based on verified JWT claims, headers or cookies. The Cockpit shows hit rate, latency, every purge with the keys it cleared, and for every miss the reason it was not cached. It works with federated supergraphs and any GraphQL server. There is a free plan for evaluation; see the [documentation](https://docs.graphpilot.io) to get started.

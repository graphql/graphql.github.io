---
name: Viaduct
description: Viaduct is a GraphQL-based system that provides a unified interface for accessing and interacting with any data source.
url: https://viaduct.dev
github: airbnb/viaduct
tags:
  - tools-and-libraries
  - backend
---

Viaduct is Airbnb's open-source, data-oriented service mesh built around a single, highly connected central GraphQL schema. It provides a unified interface for accessing and interacting with any data source, and its engine runs in production at scale at Airbnb.

At the heart of Viaduct's developer experience is re-entrancy: logic hosted on Viaduct composes with other logic hosted on Viaduct by issuing GraphQL fragments and queries. Re-entrancy is crucial for maintaining modularity in a large codebase and avoiding classic monolith hazards.

See the [Viaduct documentation](https://viaduct.dev) to get started.

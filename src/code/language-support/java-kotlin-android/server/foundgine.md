---
name: Foundgine
description: A semantic execution layer for the JVM that executes authorized, provider-independent requests, including those originating from GraphQL.
url: https://cristianbarragan.github.io/Foundgine/docs-site/index.html
github: CristianBarragan/Foundgine
tags:
  - tools-and-libraries
  - backend
  - ai
---

Foundgine is a semantic execution layer for Java. Applications define entities, fields, relationships, and capabilities once, and callers request what they need without knowing the storage shape. Foundgine resolves, authorizes, plans, and executes each request behind a single boundary, so that logic is not rewritten for every API surface.

Foundgine complements GraphQL rather than replacing it. GraphQL provides the client-facing API, and Foundgine provides the execution layer behind it.

## Install

The Java version is published on Maven Central. See the [documentation](https://cristianbarragan.github.io/Foundgine/docs-site/index.html) for the full artifact list.

```xml
<dependency>
  <groupId>io.github.cristianbarragan</groupId>
  <artifactId>foundgine-core</artifactId>
  <version>2.2.1</version>
</dependency>
```

## How GraphQL fits in

Foundgine is GraphQL-agnostic. A GraphQL layer, such as one built on graphql-java or Spring for GraphQL, parses the query and hands Foundgine a provider-neutral semantic request. GraphQL syntax never leaks past that boundary:

```text
GraphQL → AST → Semantic Request → Foundgine runtime
```

## Example

A `product` is composed from four related entities:

```text
Product
├── Catalog
├── Inventory
├── Pricing
└── Reviews
```

A GraphQL layer would receive a query like this and pass it to Foundgine as a semantic request:

```graphql
query {
  product(sku: "SKU-1") {
    name
    catalog { category }
    inventory(available: true) { quantity }
    pricing { amount currency }
  }
}
```

## What happens to a request

Every request, whatever its entry point, goes through the same pipeline:

1. Resolution against the semantic model
2. Authorization, using the identity and authority supplied by the host application
3. Plan binding into a provider-independent execution plan
4. Execution through a provider
5. Evidence capture

Retrieval can discover candidates, but it is never an authorization path.

## Dynamic capabilities

Callers compose operations from the semantic capabilities an application exposes, instead of the application hard-coding a separate endpoint for every combination of entities and fields.

## One set of rules for every caller

GraphQL, JSON, MCP, REST, automation, and AI agent callers all enter the same execution path. The same rules and capabilities apply to each, without duplicating validation or authorization logic per caller.

## More

See the [documentation](https://cristianbarragan.github.io/Foundgine/docs-site/index.html) and the [GitHub repository](https://github.com/CristianBarragan/Foundgine).
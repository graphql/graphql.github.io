---
name: Foundgine
description: A semantic execution layer for .NET with a Hot Chocolate adapter that translates GraphQL queries into authorized, provider-independent execution plans.
url: https://cristianbarragan.github.io/Foundgine/docs-site/index.html
github: CristianBarragan/Foundgine
tags:
  - tools-and-libraries
  - backend
  - ai
---

Foundgine is a semantic execution layer for .NET. Applications define entities, fields, relationships, and capabilities once, and callers request what they need without knowing the storage shape. Foundgine resolves, authorizes, plans, and executes each request behind a single boundary, so that logic is not rewritten for every API surface.

Foundgine complements GraphQL rather than replacing it. GraphQL provides the client-facing API, and Foundgine provides the execution layer behind it.

## Install

Foundgine is published on NuGet. See the [documentation](https://cristianbarragan.github.io/Foundgine/docs-site/index.html) for the full package list.

## How GraphQL fits in

`Foundgine.GraphQL.HotChocolate` is a [Hot Chocolate](https://chillicream.com/docs/hotchocolate/) adapter that translates incoming GraphQL query syntax into Foundgine's provider-neutral semantic requests:

```text
GraphQL → AST → Semantic Request → Foundgine runtime
```

The adapter parses the GraphQL document (fields, aliases, fragments, directives, variables), resolves the root field against Foundgine's semantic model, and hands off a structured request. GraphQL syntax never leaks past this boundary.

## Example

A `product` is composed from four related entities:

```text
Product
├── Catalog
├── Inventory
├── Pricing
└── Reviews
```

```csharp
var adapter = new HotChocolateSemanticAdapter(semanticModel);

var request = adapter.Adapt(
    graphql: """
        query {
          product(sku: "SKU-1") {
            name
            catalog { category }
            inventory(available: true) { quantity }
            pricing { amount currency }
          }
        }
        """);

var result = await foundgineRuntime.ExecuteAsync(request);
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
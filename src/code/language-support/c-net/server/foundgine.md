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

Foundgine.GraphQL.HotChocolate is a Hot Chocolate adapter that translates incoming GraphQL query syntax into Foundgine's provider-neutral semantic requests:

```text
GraphQL → AST → Semantic Request → Foundgine runtime
```

The adapter parses the GraphQL document (fields, aliases, fragments, directives, variables), resolves the root field against Foundgine's semantic model, and hands off a structured request — GraphQL syntax never leaks past this boundary.

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

Foundgine resolves the request against the application's semantic model, applies authorization, builds a provider-independent execution plan, and executes it — the same rules and capabilities used by GraphQL are also available to REST, automation, and AI agent callers, without duplicating validation or authorization logic per caller.

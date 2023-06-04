---
name: ZeroQL
description: ZeroQL is a open-source GraphQL client for C#
url: https://github.com/byme8/ZeroQL
github: byme8/ZeroQL
---

The ZeroQL is a high-performance C#-friendly GraphQL client. It supports Linq-like syntax, and doesn't require Reflection.Emit or expressions.
As a result, at runtime provides performance very close to a raw HTTP call.

You can use ZeroQL to:

- Generate a C# client from GraphQL schema.
- Generate and execute graphql queries from your C# code.
- Don't require writing GraphQL manually.
- Supports .Net Core, .Net Framework, Xamarin, Unity apps.

```csharp
var response = await qlClient.Query(q => q
    .Me(o => new
    {
        o.Id,
        o.FirstName,
        o.LastName
    }));
```

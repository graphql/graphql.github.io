---
name: Strawberry Shake
description: Strawberry Shake is a open-source reactive GraphQL client for .NET
url: https://chillicream.com/docs/strawberryshake/
github: ChilliCream/hotchocolate
---

Strawberry Shake removes the complexity of state management and lets you interact with local and remote data through GraphQL.

You can use Strawberry Shake to:

- Generate a C# client from your GraphQL queries.
- Interact with local and remote data through GraphQL.
- Use reactive APIs to interact with your state.

```csharp
client.GetHero
    .Watch(ExecutionStrategy.CacheFirst)
    .Subscribe(result =>
    {
        Console.WriteLine(result.Data.Name);
    })
```

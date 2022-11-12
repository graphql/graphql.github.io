---
name: Hot Chocolate
description: Hot Chocolate is an open-source GraphQL Server for .NET
url: https://chillicream.com/docs/hotchocolate/
github: ChilliCream/hotchocolate
---

Hot Chocolate takes the complexity away from building a fully-fledged GraphQL server and lets you focus on delivering the next big thing.

```csharp
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

WebHost
    .CreateDefaultBuilder(args)
    .ConfigureServices(services =>
        services
            .AddGraphQLServer()
            .AddQueryType<Query>())
    .Configure(builder =>
        builder
            .UseRouting()
            .UseEndpoints(e => e.MapGraphQL()))
    .Build()
    .Run();

public class Query
{
    public Hero GetHero() => new Hero();
}

public class Hero
{
    public string Name => "Luke Skywalker";
}
```

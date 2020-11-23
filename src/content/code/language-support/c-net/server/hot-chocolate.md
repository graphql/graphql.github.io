---
name: Hot Chocolate
description: GraphQL Server for .NET core and .NET classic
url: https://github.com/ChilliCream/hotchocolate
github: ChilliCream/hotchocolate
---

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

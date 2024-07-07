---
name: Entity GraphQL
description: A GraphQL library for .NET Core. Easily expose you data model as a GraphQL API or bring together multiple data sources into a single GraphQL schema.
url: https://entitygraphql.github.io
github: EntityGraphQL/EntityGraphQL
---

```csharp
// expose an existing data model with ASP.NET & EF Core
public class Startup {
  public void ConfigureServices(IServiceCollection services)
  {
      services.AddDbContext<DemoContext>();
      // Auto build a schema from DemoContext. Alternatively you can build one from scratch
      services.AddGraphQLSchema<DemoContext>(options =>
      {
          // modify the schema (add/remove fields or types), add other services
      });
  }

  public void Configure(IApplicationBuilder app, DemoContext db)
  {
      app.UseRouting();
      app.UseEndpoints(endpoints =>
      {
          // defaults to /graphql endpoint
          endpoints.MapGraphQL<DemoContext>();
      });
  }
}
```

---
name: Entity GraphQL
description: A GraphQL library for .NET Core. Easily expose you data model as a GraphQL API or bring together multiple data sources into a single GraphQL schema.
url: https://github.com/lukemurray/EntityGraphQL
github: lukemurray/EntityGraphQL
---

```csharp
// expose an exisiting data model with ASP.NET & EF Core
public class Startup {
  public void ConfigureServices(IServiceCollection services)
  {
      services.AddControllers().AddNewtonsoftJson();
      services.AddDbContext<MyDbContext>();
      // Build a schema from your data model (See docs on how to extend, modify or build manually as well as merge other data sources).
      services.AddSingleton(SchemaBuilder.FromObject<MyDbContext>());
  }
}

// expose an endpoint with ASP.NET
[Route("api/[controller]")]
public class QueryController : Controller
{
    private readonly MyDbContext _dbContext;
    private readonly SchemaProvider<MyDbContext> _schemaProvider;

    public QueryController(MyDbContext dbContext, SchemaProvider<MyDbContext> schemaProvider)
    {
        this._dbContext = dbContext;
        this._schemaProvider = schemaProvider;
    }

    [HttpPost]
    public object Post([FromBody]QueryRequest query)
    {
        try
        {
            var results = _schemaProvider.ExecuteQuery(query, _dbContext, null, null);
            if (results.Errors?.Count > 0)
            {
                // log error
                return StatusCode(StatusCodes.Status500InternalServerError, results);
            }
            return results;
        }
        catch (Exception)
        {
            return HttpStatusCode.InternalServerError;
        }
    }
}
```

---
name: GraphQLClient.jl
description: A Julia GraphQL client for seamless integration with a GraphQL server
github: DeloitteDigitalAPAC/GraphQLClient.jl
---

- **Querying**, **mutating** and **subscribing** without manual writing of query strings (unless you want to!)
- Deserializing responses directly into Julia types
- **Construction of Julia types** from GraphQL objects
- Using **introspection** to help with querying

### Quickstart

Install with Julia's package manager

```
using Pkg; Pkg.add("GraphQLClient")
using GraphQLClient
```

Connect to a server

```julia
client = Client("https://countries.trevorblades.com")
```

Build a Julia type from a GraphQL object

```julia
Country = GraphQLClient.introspect_object(client, "Country")
```

And query the server, deserializing the response into this new type

```julia
response = query(client, "countries", Vector{Country}, output_fields="name")
```

Alternatively write the query string manually

```julia
query_string = """
    {
    countries{
        name
    }
}"""

response = GraphQLClient.execute(client, query_string)
```

---
name: Linq2GraphQL
description: A straightforward Linq to GraphQL Client
url: https://linq2graphql.com
github: linq2graphql/linq2graphql.client
---

Linq2GraphQL generates C# classes from the GraphQL schema and and togheter with the nuget package Linq2GraphQL.Client it makes it possible to query the server using Linq expressions.

A simple query that will get the first 10 orders with the primitive properties of orders and the connected customer

```csharp
var orders = await sampleClient
    .Query
        .Orders(first: 10)
        .Include(e => e.Orders.Select(e => e.Customer))
        .Select(e => e.Orders)
        .ExecuteAsync();
```

An example mutation where we add a new customer and return the Customer Id.

```csharp
 var customerId = await sampleClient
     .Mutation
     .AddCustomer(new CustomerInput
     {
         CustomerId = Guid.NewGuid(),
         CustomerName = "New Customer",
         Status = CustomerStatus.Active
     })
     .Select(e=> e.CustomerId)
     .ExecuteAsync();
```

---
name: graphql-provider
description: GraphQL server-side rapid development framework, if users use RDBMS to manage persistent data, it can help users to quickly build GraphQL services in the shortest time (based on kotlin and R2DBC)
url: https://github.com/babyfish-ct/graphql-provider
github: babyfish-ct/graphql-provider
---

1. It is a GRM (GraphQL-Relation mapping), and its usage is similar to ORM. When kotlin dsl is used to complete the mapping configuration between entities and tables, GraphQL objects and associations are automatically completed, including the runtime association-level DataLoader and related batch loading optimization.

2. It is easy to add user implemention fields to entity, where you can implement business-related calculations. User implementation fields can also enjoy the automatic generated DataLoader and related batch query optimization at runtime.

3. Whether it is to implement query-level arguments or association-level arguments, you only need to use  strongly typed SQL DSL to specify some dynamic filtering and sorting, and the rest is done automatically.

4. If you need pagination query, there is no development cost except changing the return type of ordinary query from List&lt;T&gt; to Connection&lt;T&gt;.

5. For mutation operations, the Input type can be automatically generated according to a simple configuration, only need to focus on entity object, not input object. At runtime, the framework can automatically convert the input object to a dynamic entity object tree and you only need one sentence to save any complex entity object tree to the database.



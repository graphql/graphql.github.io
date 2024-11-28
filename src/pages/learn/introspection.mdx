# Introspection

<p className="learn-subtitle">Learn how to query information about a GraphQL schema</p>

It's often useful to ask a GraphQL schema for information about what features it supports. GraphQL allows us to do so using the [introspection system](https://spec.graphql.org/draft/#sec-Introspection).

Introspection queries are special kinds of queries that allow you to learn about a GraphQL API's schema, and they also help power GraphQL development tools. On this page, we'll learn how to run different queries to learn more about an underlying schema's types, fields, and descriptions.

## Type name introspection

We have already seen an example of introspection on the [Schemas and Types page](/learn/schema/). When querying a field that returned Union type, we included the `__typename` meta-field directly in a selection set to get the string value of the names of the different types returned by a search query. Let's look at this example again:

```graphql
# { "graphiql": true }
query {
  search(text: "an") {
    __typename
    ... on Character {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

We didn't add the `__typename` field to our GraphQL API explicitly—the GraphQL specification says that it must be provided to clients by a GraphQL implementation. This field can be queried for any field with an Object, Interface, or Union type as the underlying output type.

## Schema introspection

Introspection can do more than provide type names in a query. If you designed the type system for a GraphQL API, then you'll likely already know what types are available. But if you didn't design it, you can ask GraphQL by querying the `__schema` field, which is always available on the `query` root operation type.

Let's do so now and ask what types are available in the Star Wars schema:

```graphql
# { "graphiql": true }
query {
  __schema {
    types {
      name
    }
  }
}
```

Wow, that's a lot of types! What are they? Let's group them:

- Types that we defined in our type system: `Query`, `Mutation`, `Character`, `Human`, `Episode`, `Droid`, `LengthUnit`, `FriendsConnection`, `FriendsEdge`, `PageInfo`, `Review`, `ReviewInput`, `Starship`, and `SearchResult`
- Built-in scalars that the type system provided: `Boolean`, `Float`, `ID`, `Int`, and `String`
- Types preceded with a double underscore that are part of the introspection system: `__Schema`, `__Type`, `__TypeKind`, `__Field`, `__InputValue`, `__EnumValue`, `__Directive`, and `__DirectiveLocation`

Now, let's try to figure out a good place to start exploring what queries are available. When we designed our type system, we specified what type all queries would start at; let's ask the introspection system about that:

```graphql
# { "graphiql": true }
query {
  __schema {
    queryType {
      name
    }
  }
}
```

The result matches what we said in the [type system section](/learn/schema/#type-system)—that the `Query` type is where we will start. Note that the naming here was just by convention; we could have named our `Query` type anything else, and it still would have been returned here had we specified it was the starting type for queries. Naming it `Query`, though, is a useful convention.

It is often useful to examine one specific type. Let's take a look at the `Droid` type:

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
  }
}
```

But what if we want to know more about Droid? For example, is it an Interface or Object type?

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    kind
  }
}
```

`kind` returns a `__TypeKind` Enum type, one of whose values is `OBJECT`. If we asked about `Character` instead we'd find that it is an Interface type:

```graphql
# { "graphiql": true }
query {
  __type(name: "Character") {
    name
    kind
  }
}
```

It's useful for an Object type to know what fields are available, so let's ask the introspection system about `Droid`:

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
```

Those are the fields that we defined on `Droid`!

`id` looks a bit weird there, it has no name for the type. That's because it's a _wrapper type_ of kind `NON_NULL`. If we queried for `ofType` on that field's type, we would find the `ID` type there, telling us this is a non-null ID.

Similarly, both `friends` and `appearsIn` have no name, since they are the `LIST` wrapper type. We can query for `ofType` on those types, which will tell us what types are inside the list:

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
```

Let's end with a feature of the introspection system particularly useful for tooling; let's ask the system for documentation:

```graphql
# { "graphiql": true }
query {
  __type(name: "Droid") {
    name
    description
  }
}
```

As demonstrated above, we can access the documentation about the type system using introspection and create documentation browsers or rich IDE experiences.

This has just scratched the surface of the introspection system; we can query for Enum type values, what Interface types another type implements, and more. We can even introspect on the introspection system itself.

To see an example of a specification-compliant GraphQL query introspection system implemented in code, you can view [src/type/introspection.ts](https://github.com/graphql/graphql-js/blob/e9b6b626f6f6aa379bb8f8c48df40d0c02a26082/src/type/introspection.ts) in the reference implementation.

## Introspection in production

Introspection is a useful feature of GraphQL, especially for client developers and tooling. However, for APIs intended only for your own applications, it’s typically not needed in production—required operations are usually baked into these applications at build time, making runtime introspection unnecessary.

Disabling introspection in production is common in order to reduce the API’s attack surface. This is often part of a broader API security strategy, which may also include authentication and authorization, operation safe-listing (or a range of alternative protections, such as depth-limiting, breadth-limiting, alias limits, cycle rejection, cost analysis, etc.), execution timeouts, and more.

## Next steps

To recap what we've learned about introspection:

- Type names can be queried in a field selection set for an Object, Interface, or Union type using the `__typename` meta-field
- Information about the elements of a GraphQL schema can be queried using the `__schema` field on the `query` root operation type
- Introspection is often disabled in production environments

Now that you've explored the GraphQL type system, how to query data from an API, and what the lifecycle of a request looks like, head over to the [Best Practices](/learn/best-practices/) section to learn more about running GraphQL in production.
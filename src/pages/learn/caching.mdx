# Caching

<p className="learn-subtitle">Provide Object Identifiers so clients can build rich caches</p>

In an endpoint-based API, clients can use [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) to avoid refetching resources and to identify when two resources are the same. The URL in these APIs is a _globally unique identifier_ that the client can leverage to build a cache.

In GraphQL, there's no URL-like primitive that provides this globally unique identifier for a given object. Hence, it's a best practice for the API to expose such an identifier for clients to use as a prerequisite for certain types of caching. 

## Globally unique IDs

### Standardize how objects are identified in a schema

One possible pattern for this is reserving a field, like `id`, to be a globally unique identifier. The example schema used throughout these docs uses this approach:

```graphql
# { "graphiql": true }
query {
  starship(id: "3003") {
    id
    name
  }
  droid(id: "2001") {
    id
    name
    friends {
      id
      name
    }
  }
}
```

This is a powerful tool for client developers. In the same way that the URLs of a resource-based API provide a globally unique key, the `id` field in this system provides a globally unique key.

If the backend uses something like UUIDs for identifiers, then exposing this globally unique ID may be very straightforward! If the backend doesn't have a globally unique ID for every object already, the GraphQL layer might have to construct one. Oftentimes, that's as simple as appending the name of the type to the ID and using that as the identifier. The server might then make that ID opaque by base64-encoding it.

Optionally, this ID can then be used to work with the `node` pattern when using [global object identification](/learn/global-object-identification).

### Compatibility with existing APIs

One concern with using the `id` field for this purpose is how a client using the GraphQL API would work with existing APIs. For example, if our existing API accepted a type-specific ID, but our GraphQL API uses globally unique IDs, then using both at once can be tricky.

In these cases, the GraphQL API can expose the previous API's IDs in a separate field. This gives us the best of both worlds:

- GraphQL clients can continue to rely on a consistent mechanism to get a globally unique ID.
- Clients that need to work with our previous API can also fetch `previousApiId` from the object, and use that.

### Alternatives

While globally unique IDs have proven to be a powerful pattern in the past, they are not the only pattern that can be used, nor are they right for every situation. The critical functionality that the client needs is the ability to derive a globally unique identifier for their caching. While having the server derive that ID simplifies the client, the client can also derive the identifier. This could be as simple as combining the type of the object (queried with `__typename`) with some type-unique identifier.

Additionally, if replacing an existing API with a GraphQL API, then it may be confusing if all of the fields in GraphQL are the same **except** `id`, which changed to be globally unique. This would be another reason why one might choose not to use `id` as the globally unique field.

## Recap

To recap these recommendations for using caching with GraphQL APIs:

- Defining a globally unique ID field for an Object type can facilitate various types of caching
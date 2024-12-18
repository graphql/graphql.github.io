# Pagination

<p className="learn-subtitle">Traverse lists of objects with a consistent field pagination model</p>

A common use case in GraphQL is traversing the relationship between sets of objects. There are different ways that these relationships can be exposed in GraphQL, giving a varying set of capabilities to the client developer. On this page, we'll explore how fields may be paginated using a cursor-based connection model.

## Plurals

The simplest way to expose a connection between objects is with a field that returns a plural [List type](/learn/schema/#list). For example, if we wanted to get a list of R2-D2's friends, we could just ask for all of them:

```graphql
# { "graphiql": true }
query {
  hero {
    name
    friends {
      name
    }
  }
}
```

## Slicing

Quickly, though, we realize that there are additional behaviors a client might want. A client might want to be able to specify how many friends they want to fetch—maybe they only want the first two. So we'd want to expose something like this:

```graphql
query {
  hero {
    name
    friends(first: 2) {
      name
    }
  }
}
```

But if we just fetched the first two, we might want to paginate through the list as well; once the client fetches the first two friends, they might want to send a second request to ask for the next two friends. How can we enable that behavior?

## Pagination and edges

There are several ways we could do pagination:

- We could do something like `friends(first:2 offset:2)` to ask for the next two in the list.
- We could do something like `friends(first:2 after:$friendId)`, to ask for the next two after the last friend we fetched.
- We could do something like `friends(first:2 after:$friendCursor)`, where we get a cursor from the last item and use that to paginate.

The approach described in the first bullet is classic _offset-based pagination_. However, this style of pagination can have performance and security downsides, especially for larger data sets. Additionally, if new records are added to the database after the user has made a request for a page of results, then offset calculations for subsequent pages may become ambiguous.

In general, we've found that _cursor-based pagination_ is the most powerful of those designed. Especially if the cursors are opaque, either offset or ID-based pagination can be implemented using cursor-based pagination (by making the cursor the offset or the ID), and using cursors gives additional flexibility if the pagination model changes in the future. As a reminder that the cursors are opaque and their format should not be relied upon, we suggest base64 encoding them.

But that leads us to a problem—how do we get the cursor from the object? We wouldn't want the cursor to live on the `User` type; it's a property of the connection, not of the object. So we might want to introduce a new layer of indirection; our `friends` field should give us a list of edges, and an edge has both a cursor and the underlying node:

```graphql
query {
  hero {
    name
    friends(first: 2) {
      edges {
        node {
          name
        }
        cursor
      }
    }
  }
}
```

The concept of an edge also proves useful if there is information that is specific to the edge, rather than to one of the objects. For example, if we wanted to expose "friendship time" in the API, having it live on the edge is a natural place to put it.

## End-of-list, counts, and connections

Now we can paginate through the connection using cursors, but how do we know when we reach the end of the connection? We have to keep querying until we get an empty list back, but we'd like for the connection to tell us when we've reached the end so we don't need that additional request. Similarly, what if we want additional information about the connection itself, for example, how many friends does R2-D2 have in total?

To solve both of these problems, our `friends` field can return a connection object. The connection object will be an Object type that has a field for the edges, as well as other information (like total count and information about whether a next page exists). So our final query might look more like this:

```graphql
query {
  hero {
    name
    friends(first: 2) {
      totalCount
      edges {
        node {
          name
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
```

Note that we also might include `endCursor` and `startCursor` in this `PageInfo` object. This way, if we don't need any of the additional information that the edge contains, we don't need to query for the edges at all, since we got the cursors needed for pagination from `pageInfo`. This leads to a potential usability improvement for connections; instead of just exposing the `edges` list, we could also expose a dedicated list of just the nodes, to avoid a layer of indirection.

## Complete connection model

Clearly, this is more complex than our original design of just having a plural! But by adopting this design, we've unlocked several capabilities for the client:

- The ability to paginate through the list.
- The ability to ask for information about the connection itself, like `totalCount` or `pageInfo`.
- The ability to ask for information about the edge itself, like `cursor` or `friendshipTime`.
- The ability to change how our backend does pagination, since the user just uses opaque cursors.

To see this in action, there's an additional field in the example schema, called `friendsConnection`, that exposes all of these concepts:

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  friendsConnection(first: Int, after: ID): FriendsConnection!
  appearsIn: [Episode]!
}

type FriendsConnection {
  totalCount: Int
  edges: [FriendsEdge]
  friends: [Character]
  pageInfo: PageInfo!
}

type FriendsEdge {
  cursor: ID!
  node: Character
}

type PageInfo {
  startCursor: ID
  endCursor: ID
  hasNextPage: Boolean!
}
```

You can try it out in the example query. Try removing the `after` argument for the `friendsConnection` field to see how the pagination will be affected. Also, try replacing the `edges` field with the helper `friends` field on the connection, which lets you get directly to the list of friends without the additional edge layer of indirection, when appropriate for clients:

```graphql
# { "graphiql": true }
query {
  hero {
    name
    friendsConnection(first: 2, after: "Y3Vyc29yMQ==") {
      totalCount
      edges {
        node {
          name
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
```

## Connection specification

To ensure a consistent implementation of this pattern, the Relay project has a formal [specification](https://relay.dev/graphql/connections.htm) you can follow for building GraphQL APIs that use a cursor-based connection pattern - whether or not use you Relay.

## Recap

To recap these recommendations for paginating fields in a GraphQL schema:

- List fields that may return a lot of data should be paginated
- Cursor-based pagination provides a stable pagination model for fields in a GraphQL schema
- The cursor connection specification from the Relay project provides a consistent pattern for paginating the fields in a GraphQL schema

# Subscriptions

import { Callout } from "nextra/components"

<p className="learn-subtitle">Learn how to get real-time updates from a GraphQL server</p>

In addition to reading and writing data using stateless query and mutation operations, the GraphQL specification also describes how to receive real-time updates via long-lived requests. On this page, we'll explore how clients can subscribe to details of events on a GraphQL server using subscription operations.

<Callout type="info">
Many of the features of GraphQL operations that apply to queries also apply to subscriptions, so review the [Queries](/learn/queries/) page first before proceeding.
</Callout>

## Subscribing to updates

Subscription fields are defined exactly as `Query` and `Mutation` fields are, but using the `subscription` root operation type instead:

```graphql
type Subscription {
  reviewCreated: Review
}
```

Similarly, a subscription is initiated using the `subscription` keyword as the operation type:

```graphql
subscription NewReviewCreated {
  reviewCreated {
    rating
    commentary
  }
}
```

GraphQL subscriptions are typically backed by a separate pub/sub system so that messages about updated data can be published as needed during runtime and then consumed by the resolver functions for the subscription fields in the API.

For the previous example, we could imagine publishing a `REVIEW_CREATED` message to a pub/sub system when a client submits a new review with the `createReview` mutation, and then listening for this event in the resolver function for the `reviewCreated` subscription field so that the server may send this data to subscribed clients.

<Callout type="info">
Note that subscriptions are different from the concept of _live queries_, a loosely defined feature that some GraphQL implementations may offer. [Read more about the ongoing discussion on a formal specification for live queries here.](https://github.com/graphql/graphql-spec/issues/386)
</Callout>

As with query and mutation operations, GraphQL doesn't specify what transport protocol to use, so it's up to the server to decide. In practice, you will often see them implemented with WebSockets or server-sent events. Clients that want to send subscription operations will also need to support the chosen protocol. There are community-maintained specifications for implementing GraphQL subscriptions with [WebSockets](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) and [server-sent events](https://github.com/enisdenjo/graphql-sse/blob/master/PROTOCOL.md).

One important distinction to make with subscription operations is that a document may contain a number of different subscription operations with different root fields, but each operation must have exactly one root field. 

For example, this operation would be invalid:

```graphql
subscription {
  reviewCreated {
    rating
    commentary
  }
  humanFriendsUpdated {
    name
    friends {
      name
    }
  }
}
```

But this document is valid:

```graphql
subscription NewReviewCreated {
  reviewCreated {
    rating
    commentary
  }
}
subscription FriendListUpdated($id: ID!) {
  humanFriendsUpdated(id: $id) {
    name
    friends {
      name
    }
  }
}
```

As with query and mutation operations, the document above contains multiple operations so each operation must be named, and the name of the operation to execute must be specified in the request.

## Using subscriptions at scale

Subscription operations are a powerful feature of GraphQL, but they are more complicated to implement than queries or mutations because you must maintain the GraphQL document, variables, and other context over the lifetime of the subscription. These requirements can be challenging when scaling GraphQL servers horizontally because each subscribed client must be bound to a specific instance of the server. 

Similarly, client libraries will typically need more advanced features to handle these kinds of operations, such as logic to resubscribe to operations if the connection is disrupted or mechanisms to handle potential race conditions between initial queries and updated subscription data.

In practice, a GraphQL API that supports subscriptions will call for a more complicated architecture than one that only exposes query and mutation fields. How this architecture is designed will depend on the specific GraphQL implementation, what pub/sub system supports the subscriptions, and the chosen transport protocol, as well as other requirements related to availability, scalability, and security of the real-time data.

Subscription operations are well suited for data that changes often and incrementally, and for clients that need to receive those incremental updates as close to real-time as possible to deliver the expected user experience. For data with less frequent updates, periodic polling, mobile push notifications, or re-fetching queries based on user interaction may be the better solutions for keeping a client UI up to date.

## Next steps

To recap what we've learned about subscriptions:

- GraphQL subscription operations can be used for incremental data updates via long-lived requests
- Subscription operations are typically supported by a stateful transport protocol, so they will require more effort to implement and support than queries and mutations
- Data-fetching use cases that require frequent and incremental updates to be streamed to a client are best suited for subscriptions

Now that we've covered all three operation types in GraphQL, let's explore how client requests are [validated](/learn/validation/) by a GraphQL server.

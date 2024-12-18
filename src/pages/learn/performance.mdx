# Performance

<p className="learn-subtitle">Optimize the execution and delivery of GraphQL responses</p>

At first glance, GraphQL requests may seem challenging to cache given that the API is served through a single endpoint and you may not know in advance what fields a client will include in an operation.

In practice, however, GraphQL is as cacheable as any API that enables parameterized requests, such as a REST API that allows clients to specify different query parameters for a particular endpoint. There are many ways to optimize GraphQL requests on the client and server sides, as well as in the transport layer, and different GraphQL server and client libraries will often have common caching features built directly into them.

On this page, we'll explore several different tactics that can be leveraged in GraphQL clients and servers to optimize how data is fetched from the API.

## Client-side caching

There is a range of client-side caching strategies that GraphQL clients may implement to help not only with performance but also to ensure that you render a consistent and responsive interface to your users. [Read more about client-side caching](/learn/caching).

## `GET` requests for queries

GraphQL implementations that adhere to the [GraphQL over HTTP specification](https://graphql.github.io/graphql-over-http/draft/) will support the `POST` HTTP method by default, but may also support `GET` requests for query operations.

Using `GET` can improve query performance because requests made with this HTTP method are typically considered cacheable by default and can help facilitate HTTP caching or the use of a content delivery network (CDN) when caching-related headers are provided in the server response. 

However, because browsers and CDNs impose size limits on URLs, it may not be possible to send a large document for complex operations in the query string of the URL. Using _persisted queries_, either in the form of _trusted documents_ or _automatic persisted queries_, will allow the client to send a hash of the query instead, and the server can look up the full version of the document by looking up the hash in a server-side store before validating and executing the operation.

Sending hashed queries instead of their plaintext versions has the additional benefit of reducing the amount of data sent by the client in the network request.

## The N+1 Problem

GraphQL is designed in a way that allows you to write clean code on the server, where every field on every type has a focused single-purpose function for resolving that value. However, without additional consideration, a naive GraphQL service could be very "chatty" or repeatedly load data from your databases.

Consider the following query—to fetch a hero along with a list of their friends, we can imagine that as the field resolvers execute there will be one request to the underlying data source to get the character object, another to fetch their friends, and then three subsequent requests to load the lists of starships for each human friend:

```graphql
# { "graphiql": true }
query HeroWithFriends {
  # 1 request for the hero
  hero {
    name
    # 1 request for the hero's N friends
    friends {
      name
      # N starship requests - one for each of the hero's N human friends
      ... on Human {
        starships {
          name
        }
      }
    }
  }
}
```

This is known as the N+1 problem, where an initial request to an underlying data source (for a hero's friends) leads to N subsequent requests to resolve the data for all of the requested fields (for the friends' starship data).

This is commonly solved by a batching technique, where multiple requests for data from a backend are collected over a short period and then dispatched in a single request to an underlying database or microservice by using a tool like Facebook's [DataLoader](https://github.com/facebook/dataloader). Additionally, certain GraphQL implementations may have built-in capabilities that allow you to translate operation selection sets into optimized queries to underlying data sources.

## Demand control

Depending on how a GraphQL schema has been designed, it may be possible for clients to request highly complex operations that place excessive load on the underlying data sources during execution. These kinds of operations may be sent inadvertently by an known client, but they may also be sent by malicious actors.

Certain demand control mechanisms can help guard a GraphQL API against these operations, such as paginating list fields, limiting operation depth and breadth, and query complexity analysis. [You can read more about demand control on the Security page](/learn/security/#demand-control).

## JSON (with GZIP)

GraphQL services typically respond using JSON even though the GraphQL spec [does not require it](http://spec.graphql.org/draft/#sec-Serialization-Format). JSON may seem like an odd choice for an API layer promising better network performance, however, because it is mostly text it compresses exceptionally well with algorithms such as GZIP, deflate and brotli.

It's encouraged that any production GraphQL services enable GZIP and encourage their clients to send the header:

```text
Accept-Encoding: gzip
```

JSON is also very familiar to client and API developers, and is easy to read and debug. In fact, the GraphQL syntax is partly inspired by JSON syntax.

## Performance monitoring

Monitoring a GraphQL API over time can provide insight into how certain operations impact API performance and help you determine what adjustments to make to maintain its health. For example, you may find that certain fields take a long time to resolve due to under-optimized requests to a backing data source, or you may find that other fields routinely raise errors during execution.

Observability tooling can provide insight into where bottlenecks exist in the execution of certain GraphQL operations by allowing you to instrument the API service to collect metrics, traces, and logs during requests. For example, [OpenTelemetry](https://opentelemetry.io/) provides a suite of vendor-agnostic tools that can be used in many different languages to support instrumentation of GraphQL APIs.

## Recap

To recap these recommendations for improving GraphQL API performance:

- Using `GET` for GraphQL query operations can support HTTP caching and CDN usage, particularly when used in conjunction with hashed query documents
- Because an operation's selection set can express relationships between different kinds of objects, the N+1 problem can be mitigated during field execution by batching and caching requests to underlying data sources
- Field pagination, limiting operation depth and breadth, and rate-limiting API requests can help prevent individual GraphQL operations from placing excessive load on server resources
- GZIP can be used to compress the size of GraphQL JSON-formatted responses when servers and clients support it
- The overall health of a GraphQL API can be maintained over time by using performance monitoring tools like OpenTelemetry to collect metrics, logs, and traces related to request execution
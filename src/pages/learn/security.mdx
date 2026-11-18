# Security

<p className="learn-subtitle">Protect GraphQL APIs from malicious operations</p>

As with any type of API, you will need to consider what security measures should be used to protect a GraphQL implementation's server resources and underlying data sources during request execution.

Many generalizable API security best practices apply to GraphQL, especially in relation to a given implementation's selected transport protocol. However, there are GraphQL-specific security considerations that will make the API layer more resilient to potential attacks too.

On this page, we'll survey potential attack vectors for GraphQL—many of which are denial of service attacks—along with how a layered security posture can help protect a GraphQL API from malicious operations.

## Transport layer security

The GraphQL specification does not require a specific transport protocol for requests, but [HTTP is a popular choice](/learn/serving-over-http/) for stateless query and mutation operations. For longer-lived subscription operations, WebSockets or server-sent events are often used. Whatever the chosen protocol, security considerations in the transport layer can provide an important first line of defense for a GraphQL API.

The same security measures that would be used for any type of API served with a given transport protocol should typically be used for GraphQL as well. For example, when using HTTP for queries and mutations, you should use HTTPS to encrypt data, set appropriate timeout durations for requests, and, if using HTTP caching, ensure sensitive data is cached privately (or not at all).

## Demand control

### Trusted documents

For GraphQL APIs that only serve first-party clients, you can write operations as needed in development environments and then lock those operations so that only they may be sent by front-end apps in production. Specifically, using _trusted documents_ will allow you to create an allowlist of operations that can be executed against a schema.

As a build step during development clients may submit their GraphQL documents to the server's allowlist, where each document is stored with a unique ID—usually its hash. At runtime, the client can send a document ID instead of the full GraphQL document, and the server will only execute requests for known document IDs.

Trusted documents are simply _persisted documents_ that are deemed to not be malicious, usually because they were authored by your developers and approved through code review. Efforts are underway to [standardize _persisted documents_ as part of the GraphQL-over-HTTP specification](https://github.com/graphql/graphql-over-http/pull/264)—an increasing number of GraphQL clients and servers already support them (sometimes under their legacy misnomer: _persisted queries_).

Keep in mind that trusted documents can't be used for public APIs because the operations sent by third-party clients won't known in advance. However, the other recommendations that follow can help defend a public GraphQL API from malicious operations.

### Paginated fields

A first step toward implementing demand control for a GraphQL API is limiting the amount of data that can be queried from a single field. When a field outputs a List type and the resulting list could potentially return a lot of data, it should be paginated to limit the maximum number of items that may be returned in a single request.

For example, compare the unbounded output of the `friends` field to the limited data returned by the `friendsConnection` field in this operation:

```graphql
# { "graphiql": true }
query {
  hero {
    name
    friends {
      name
    }
    friendsConnection(first: 1) {
      edges {
        node {
          name
        }
      }
    }
  }
}
```

Read more about the connection-based model for paginating fields on the [Pagination page](/learn/pagination/).

### Depth limiting

One of GraphQL's strengths is that clients can write expressive operations that reflect the relationships between the data exposed in the API. However, some queries may become cyclical when the fields in the selection set are deeply nested: 

```graphql
query {
  hero {
    name
    friends {
      name
      friends {
        name
        friends {
          name
          friends {
            name
          }
        }
      }
    }
  }
}
```

Even when the N+1 problem has been remediated through batched requests to underlying data sources, overly nested fields may still place excessive load on server resources and impact API performance. 

For this reason, it's a good idea to limit the maximum depth of fields that a single operation can have. Many GraphQL implementations expose configuration options that allow you to specify a maximum depth for a GraphQL document and return an error to the client if a request exceeds this limit before execution begins.

Since nesting list fields can result in exponential increases to the amount of data returned, it's recommended to apply a separate smaller limit to how deeply lists can be nested.

For cases where a client may have a legitimate use case for a deeply nested query and it's impractical to set a low blanket limit on all queries, you may need to rely on techniques such as [rate limiting](/#rate-limiting) or [query complexity analysis](#query-complexity-analysis).

### Breadth and batch limiting

In addition to limiting operation depth, there should also be guardrails in place to limit the number of top-level fields and field aliases included in a single operation.

Consider what would happen during the execution of the following query operation:

```graphql
query {
  viewer {
    friends1: friends(limit: 1) { name }
    friends2: friends(limit: 2) { name }
    friends3: friends(limit: 3) { name }
    # ...
    friends100: friends(limit: 100) { name }
  }
}
```

Even though the overall depth of this query is shallow, the underlying data source for the API will still have to handle a large number of requests to resolve data for the aliased `hero` field.

Similarly, a client may send a GraphQL document with many batched operations in a request:

```graphql
query NewHopeHero {
  hero(episode: NEWHOPE) {
    name
  }
}
query EmpireHero {
  hero(episode: EMPIRE) {
    name
  }
}
### ...
query JediHero {
  hero(episode: JEDI) {
    name
  }
}
```

Depending on the client implementation, query batching can be a useful strategy for limiting the number of round trips to a server to fetch all of the required data to render a user interface. However, there should be an upper limit on the total number of queries allowed in a single batch.

As with depth limiting, a GraphQL implementation may have configuration options to restrict operation breadth, field alias usage, and batching.

### Rate limiting

Depth, breadth, and batch limiting help prevent broad categories of malicious operations such as cyclic queries and batching attacks, but they don't provide a way to declare that a particular field is computationally expensive to resolve. So for more advanced demand control requirements, you may wish to implement rate limiting. 

Rate limiting may take place in different layers of an application, for example, in the network layer or the business logic layer. Because GraphQL allows clients to specify exactly what data they need in their queries, a server may not be able to know in advance if a request includes fields that will place a higher load on its resources during execution. As a result, applying useful rate limits for a GraphQL API typically requires a different approach than simply keeping track of the total number of incoming requests over a time period in the network layer; therefore applying rate limits within the business logic layer is generally recommended.

### Query complexity analysis

By applying weights to the types and fields in a schema, you can estimate the cost of incoming requests using the technique known as _query complexity analysis_. If the combination of fields included in a request exceeds a maximum allowable cost per request, you may choose to reject the request outright. The estimated cost can also be factored into rate limiting: if the request proceeds, the total cost of the request can be deducted from the overall query budget allocated to a client for a specific time period.

While the GraphQL specification doesn't provide any guidelines on implementing query complexity analysis or rate limits for an API, there is [a community-maintained draft specification](https://ibm.github.io/graphql-specs/cost-spec.html) for implementing custom type system directives that support these calculations.

## Schema considerations

### Validating and sanitizing argument values

GraphQL is strongly typed, and the [validation stage](/learn/validation/) of a request will check a parsed document against the type system to determine its validity. However, for certain cases you may find that the built-in Scalar types aren't enough to make sure that the argument value a client provides is appropriate to execute a field resolver safely.

Consider the following `ReviewInput` type that is used with the `createReview` mutation: 

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}

type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}
```

Depending on what kind of client application will submit and display the review data, it may be necessary to sanitize the string provided for the `commentary` field in case a user submits unsafe HTML in it.

The sanitization step should take place in the business logic layer that is called during execution of the `createReview` resolver function. To surface this to frontend developers, it could also be expressed as a part of the schema using a custom [Scalar type](/learn/schema/#scalar-types).

### Introspection

[Introspection](/learn/introspection/) is a powerful feature of GraphQL that allows you to query a GraphQL API for information about its schema. However, GraphQL APIs that only serve first-party clients may forbid introspection queries in non-development environments.

Note that disabling introspection can be used as a form of "security through obscurity," but will not be sufficient to entirely obscure a GraphQL API by itself. It may be used as a part of a broader security strategy to limit the discoverability of API information from potential attackers. For more comprehensive protection of sensitive schema details and user data, trusted documents and authorization should be used.

### Error messages

On the [Response page](/learn/response/), we saw that a GraphQL implementation may provide developers with useful information about validation errors in a request, along with suggestions for how these errors may be addressed. For example:

```graphql
# { "graphiql": true }
query {
  starship(id: 3000) {
    width
  }
}
```

These hints can be helpful when debugging client-side errors, but they may provide more information about a schema in a production environment than we would like to reveal. Hiding detailed error information in GraphQL responses outside of development environments is important because, even with introspection disabled, an attacker could ultimately infer the shape of an entire schema by running numerous operations with incorrect field names.

In addition to request errors, details about errors that are raised during field execution should be masked as they may reveal sensitive information about the server or underlying data sources.

## Authentication and authorization

Auth-related considerations for GraphQL APIs are discussed in-depth on the [Authorization page](/learn/authorization/).

## Recap

To recap these recommendations for securing a GraphQL API:

- General security considerations for a chosen transport protocol will usually apply to a GraphQL API as well
- Depending on your requirements, demand control can be implemented in many ways in GraphQL, including trusted documents, pagination of list fields, depth limiting, breadth/batch limiting, and rate limiting
- A GraphQL schema can help support validation and sanitization of client-provided values
- Disabling introspection and obscuring error information can make an API's schema less discoverable, but they will typically not be sufficient when used on their own (a document allowlist is likely to be a more effective solution)
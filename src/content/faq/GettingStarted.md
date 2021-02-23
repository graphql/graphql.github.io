---
title: Getting Started
layout: faq
permalink: /faq/getting-started
position: 1
---

### Why should I use GraphQL?

It depends on your use case, but in general, GraphQL has a few key features that stand out. For example, GraphQL enables you to:

* Aggregate data from [multiple UI components](/learn/queries/#fragments).
* Create a representation of your data that feels familiar and natural ([a graph](/learn/thinking-in-graphs/#it-s-graphs-all-the-way-down)).
* Ensure that all of your data is [statically typed](/learn/schema/) and these types inform [what queries the schema supports](/learn/introspection/).
* [Reduce the need for breaking changes](/learn/best-practices/#versioning), but utilize a [built-in mechanism for deprecations](https://spec.graphql.org/draft/#sec-Deprecation) when you need to.
* Access to a [powerful tooling ecosystem](/code/#generic-tools) with GUIs, editor integrations, code generation, linting, analytics, and more.

[Our homepage](/) outlines even more reasons to use GraphQL.

You can try out GraphQL without rewriting your entire application. For instance, starting with a single HTTP request that wraps an existing REST call. Your [GraphQL schema](/learn/thinking-in-graphs/#shared-language) and [business domain model](/learn/thinking-in-graphs/#business-logic-layer) can expand gradually. We recommend focusing on one use case at first and only building the part of the schema needed for that. 

### Does GraphQL replace REST?

No, not necessarily. They both handle APIs and can [serve similar purposes](/learn/thinking-in-graphs/#business-logic-layer) from a business perspective. GraphQL is often considered an alternative to REST, but it’s not a definitive replacement.

GraphQL and REST can actually co-exist in your stack. For example, you can abstract REST APIs behind a [GraphQL server](https://www.howtographql.com/advanced/1-server/). This can be done by masking your REST endpoint into a GraphQL endpoint using [root resolvers](/learn/execution/#root-fields-resolvers). 

For an opinionated perspective on how GraphQL compares to REST, check out [How To GraphQL](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/).

### Is GraphQL a database language like SQL?

No, but this is a common misconception.

GraphQL is a specification typically used for remote client-server communications. Unlike SQL, GraphQL is agnostic to the data source(s) used to retrieve data and persist changes. Accessing and manipulating data is performed with arbitrary functions called [resolvers](/learn/execution/). GraphQL coordinates and aggregates the data from these resolver functions, then returns the result to the client. Generally, these resolver functions should delegate to a [business logic layer](/learn/thinking-in-graphs/#business-logic-layer) responsible for communicating with the various underlying data sources. These data sources could be remote APIs, databases, [local cache](/learn/caching/), and nearly anything else your programming language can access.

For more information on how to get GraphQL to interact with your database, check out our [documentation on resolvers](/learn/execution/#root-fields-resolvers).

### How can I learn GraphQL?

There are many resources available to help you learn GraphQL, including this website. In [our documentation](/learn/), you’ll find a series of articles that explain essential GraphQL concepts and how they work. Our [Community page](/community) is full of resources to reference and groups to join.

For more practical guides, visit the [How to GraphQL](https://www.howtographql.com/) fullstack tutorial website. We also have a free online course with edX, [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis). 

Before you start your learning journey, make sure you know [what an API is](https://www.codenewbie.org/blogs/an-intro-to-apis) and how communication generally works between client and server.

### Is GraphQL only for React or JavaScript developers?

No, not at all. [GraphQL is a specification](https://spec.graphql.org/) that can be [implemented in any language](/learn/schema/#type-language). Our [Code page](/code/) contains a long list of libraries in many different programming languages to help with that.

It’s understandable why you’d think this, though. GraphQL was introduced at a [React conference](https://www.youtube.com/watch?v=9sc8Pyc51uU) and [GraphQL.js](/graphql-js/) is one of the most widely used implementations to date. We know this can be confusing, so we’re working to improve our documentation and add more code samples that aren’t written in JavaScript.

### Can I use GraphQL to make graphs or charts?

Yes, graphql2chartjs is an open source tool that reshapes your GraphQL data as per the ChartJS API. This makes building charts as easy as simply making a GraphQL query. The idea behind this tool was to leverage GraphQL's realtime subscriptions to build realtime charts by restructuring the GraphQL data to a form that ChartJS expects and generate ChartJS compliant data object from your GraphQL response by simply adding a few aliases in your GraphQL query.

For more information on graphql2chartjs, check out their [documentation](https://github.com/hasura/graphql2chartjs).

### What are the downsides of GraphQL?

Although GraphQL has negligible downsides over its upsides, here are some downsides of GraphQL.

**GraphQL Caching** : It is complicated to implement a simplified cache with GraphQL than implementing it in REST. In REST API, we access resources with URLs, so we can cache on a resource level. On the other hand, In GraphQL, it is very complex because each query can be different, even though it operates on the same entity. But most of the libraries built on top of GraphQL offer an efficient caching mechanism.

For more information on caching using GraphQL, check out our [documentation](/learn/caching/).

**File uploading** : Since GraphQL doesn’t understand files, a file uploading feature is not included in its specification. You won’t have to deal with this limitation in case of REST, as there you can POST or PUT whatever content you want to. To allow file uploads in your GraphQL web app, there are several options, using Base64 encoding, making a separate API endpoint just for this purpose, using a library like Apollo for implementing the GraphQL multipart request specification.

**Overkill for small applications** : While GraphQL is the right solution for multiple microservices, you’d better go for REST architecture in case of a simple app. REST can be also a valuable approach for connecting resource-driven apps that don’t need the flexible queries offered by GraphQL.

**GraphQL Query Complexity** : Don't mistake GraphQL as a replacement for server-side databases. It is just a simple query language. When we have to access multiple fields in one query whether it is in a RESTful architecture or GraphQL, the varied resources and fields still have to be retrieved from a data source. So, it also shows the same problems when a client requests too many nested fields data at a single time. So there must be a mechanism like maximum query depths, query complexity weighting, avoiding recursion, or persistent queries to stop inefficient requests from the client-side.

For more information on querying in GraphQL, check out our [documentation](/learn/queries/).

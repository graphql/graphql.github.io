---
title: Frequently Asked Questions (FAQ)
layout: faq
category: General
permalink: /faq/
questions: Why should I use GraphQL?,Is GraphQL a database language like SQL?,Does GraphQL replace REST?,How can I learn GraphQL?,Is GraphQL frontend or backend?,Is GraphQL only for React or JavaScript developers?,What is a GraphQL client and why would I use one?,Is GraphQL owned by Facebook?,What is the GraphQL Foundation?,How can I contribute to the GraphQL specification?
---

## Why should I use GraphQL?

It depends on your use case, but in general, GraphQL has a few key features that stand out. For example, GraphQL enables you to:

* Improve performance by [sending queries](/learn/queries/) for the exact data you need. 
* Aggregate data from [multiple UI components](/learn/queries/#fragments) in [a single request](/learn/best-practices/#server-side-batching-caching ).
* Create a representation of your data that feels familiar and natural ([a graph](/learn/thinking-in-graphs/#it-s-graphs-all-the-way-down-https-en-wikipedia-org-wiki-turtles-all-the-way-down)).
* Ensure that all of your data is [statically typed](/learn/schema/) and these types inform [what queries the schema supports](/learn/introspection/).
* [Reduce the need for breaking changes](/learn/best-practices/#versioning), but utilize a [built-in mechanism for deprecations](https://spec.graphql.org/draft/#sec-Deprecation) when you need to.
* Examine queries and responses through community tools like [GraphiQL](https://github.com/graphql/graphiql).

[Our homepage](/) outlines even more reasons to use GraphQL.

You can try out GraphQL without rewriting your entire application. For example, starting with a single HTTP request that wraps an existing REST call. Your [GraphQL schema](/learn/thinking-in-graphs/#shared-language) and [business domain model](/learn/thinking-in-graphs/#business-logic-layer) can expand gradually. We recommend focusing on one use case at first and only building the part of the schema needed for that. 

## Is GraphQL a database language like SQL?

No, but this is a common misconception.

GraphQL is a specification typically used for remote client-server communications and is agnostic to the data source(s) used to retrieve data or persist changes. Data access and manipulation is performed via arbitrary functions called [`resolvers`](/learn/execution/). GraphQL coordinates and aggregates the data from these resolver functions, returning the result to the client.

Generally, these resolver functions should delegate to a [business logic layer](/learn/thinking-in-graphs/#business-logic-layer) responsible for communicating with the various underlying data sources. These data sources could be remote APIs, databases, [local cache](/learn/caching/), and nearly anything else your programming language can access.

<!-- TODO -->

GraphQL is frequently used for database interactions though. For example, it can be built into a wrapper around a database or a [GraphQL server](https://www.howtographql.com/advanced/1-server/) can query various databases. There are also [services](/code/#services) that implement the GraphQL specification and then allow clients to use GraphQL to query that data source. But it can also be used without a database at all.

For more information on how to get GraphQL to interact with your database, check out our [documentation on resolvers](/learn/execution/#root-fields-resolvers).

## Does GraphQL replace REST?

No, not necessarily. They both handle APIs and can [serve similar purposes](/learn/thinking-in-graphs/#business-logic-layer) from a business perspective. GraphQL is often considered an alternative to REST, but it’s not a definitive replacement.

GraphQL and REST can actually co-exist in your stack. For example, you can abstract REST APIs behind a [GraphQL server](https://www.howtographql.com/advanced/1-server/). This can be done by masking your REST endpoint into a GraphQL endpoint using [root resolvers](/learn/execution/#root-fields-resolvers). 

For an opinionated perspective on how GraphQL compares to REST, check out [How To GraphQL](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/).

## How can I learn GraphQL?

There are many resources available to help you learn GraphQL, including this website. In [our documentation](/learn/), you’ll find a series of articles that explain essential GraphQL concepts and how they work. Our [Community page](/community) is full of resources to reference and groups to join.

For more practical guides, visit the [How to GraphQL](https://www.howtographql.com/) fullstack tutorial website. We also have a free online course with edX, [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis). 

## Is GraphQL frontend or backend?

Neither. Instead, it’s [how you can exchange information between the two](https://www.howtographql.com/basics/3-big-picture/). Both the client and the server should understand and communicate through the GraphQL specification. 

That said, GraphQL describes a specific way to [execute a query](/learn/execution/), which typically happens on the backend.

## Is GraphQL only for React or JavaScript developers?

No, not at all. [GraphQL services can be written in any language](/learn/schema/#type-language). Our [Code page](/code/) contains a long list of libraries in many different programming languages to help with that.

It’s understandable why you’d think this, though. GraphQL was introduced at a [React conference](https://www.youtube.com/watch?v=9sc8Pyc51uU) and [GraphQL.js](/graphql-js/) is one of the most widely used implementations to date. We know this can be confusing, so we’re working to improve our documentation and add more code samples that aren’t written in JavaScript.

## What is a GraphQL client and why would I use one?

GraphQL clients can help you handle [queries, mutations,](/learn/queries/) and [subscriptions](https://spec.graphql.org/draft/#sec-Subscription) to a [GraphQL server](https://www.howtographql.com/advanced/1-server/). 

You don't need a specific client to work with GraphQL 

<!-- TODO -->

This could be done manually, but it would require a lot of work depending on the amount of data you have. By utilizing the underlying structure of a GraphQL API, clients can abstract away some of these tedious processes. Features that can be automated include batching, caching, UI updates, build-time schema validation, and many more. 

You can find a list of GraphQL clients in various languages on our [Code page](/code/#graphql-clients). There’s also an [in-depth explanation of their benefits](https://www.howtographql.com/advanced/0-clients/) on How To GraphQL.

You might want to start out by [issuing GraphQL results with a regular HTTP client](/learn/serving-over-http/) (here’s [an example in JavaScript](/graphql-js/graphql-clients/)), then later switch to a GraphQL-optimized client as your application grows in complexity.

## Is GraphQL owned by Facebook?

No, GraphQL is governed by the [GraphQL Foundation](#what-is-the-graphql-foundation).

That said, the specification was originally developed at Facebook and [Facebook is a member](https://foundation.graphql.org/members/) of the GraphQL Foundation. Some of our [repositories on GitHub](https://github.com/graphql/) still have the license listed under Facebook Inc, but we're updating those.

## What is the GraphQL Foundation?

The [GraphQL Foundation](https://foundation.graphql.org/faq/) is a neutral foundation that provides governance for GraphQL. This includes vendor-neutral oversight of open-source repositories, funding, events, and more. It's hosted under the [Linux Foundation](https://www.linuxfoundation.org/) and consists of [representatives from 20 different companies](https://foundation.graphql.org/members/). The idea is that it’s an impartial and open home for the GraphQL community.

You can find out more by visiting [foundation.graphql.org](https://foundation.graphql.org/).

## How can I contribute to the GraphQL specification?

GraphQL is still an evolving language and contributions are very welcome! The specification (including the [latest working draft](https://spec.graphql.org/)) is open source. [Contributor guidelines](https://github.com/graphql/graphql-spec/blob/master/CONTRIBUTING.md) are available on GitHub.

There are more ways to get involved with GraphQL beyond the specification though. Updating the content on [this website and the documentation](https://github.com/graphql/graphql.github.io), for example. Or contributing to [graphql-js](https://github.com/graphql/graphql-js), [express-graphql](https://github.com/graphql/express-graphql), [GraphiQL](https://github.com/graphql/graphiql), or [one of the many other projects](https://github.com/graphql/) maintained by the [GraphQL Foundation](#what-is-the-graphql-foundation). 

---
title: Specification
layout: faq
permalink: /faq/specification
position: 4
---

### What is the best way to follow specification releases?

The latest working draft release of the GraphQL specification can be found at [spec.graphql.org/draft](https://spec.graphql.org/draft/). Previous editions are also available at permalinks that match their [release tag](https://github.com/graphql/graphql-spec/releases).

The entire process behind each release is open source. You can monitor specification proposals by following [pull requests in the graphql-spec repository](https://github.com/graphql/graphql-spec/pulls). You can also watch past GraphQL Working Group discussions about various proposals on [YouTube](https://www.youtube.com/channel/UCERcwLeheOXp_u61jEXxHMA).

### How can I contribute to the GraphQL specification?

GraphQL is still evolving and contributions are very welcome! The specification (including the [latest working draft](https://spec.graphql.org/)) is open source. [Contributor guidelines](https://github.com/graphql/graphql-spec/blob/master/CONTRIBUTING.md) are available on GitHub.

There are more ways to get involved with GraphQL beyond the specification though. Updating the content on [this website and the documentation](https://github.com/graphql/graphql.github.io), for example. Or contributing to [graphql-js](https://github.com/graphql/graphql-js), [express-graphql](https://github.com/graphql/express-graphql), [GraphiQL](https://github.com/graphql/graphiql), or [one of the many other projects](https://github.com/graphql/) maintained by the [GraphQL Foundation](#what-is-the-graphql-foundation).

### Where is the documentation for subscriptions?

It's not on this website yet, but we're working on it. If you'd like to help write guides on subscriptions, please [let us know](https://github.com/graphql/graphql.github.io/issues/993).

For now, the specification includes details for [how to write and execute subscriptions](https://spec.graphql.org/draft/#sec-Subscription).

### What is the N+1 problem I keep hearing about?

The N + 1 problem occurs when an application gets data from the database, and then loops through the result of that data. That means we call to the database again and again and again. In total, the application will call the database once for every row returned by the first query (N) plus the original query ( + 1). The N+1 query problem is a common one to encounter with ORMs (Object Relational Mappers) and their capabilities around lazy loading.

Most GraphQL server frameworks support the idea of a [DataLoader](https://github.com/graphql/dataloader). Dataloader is a library that batches consecutive requests and makes a single data request under the hood. This request can be made to any data source, like a database or a web service. A Dataloader takes in an array as argument, processes data using that argument and returns an array of objects. The element at the nth index of the returned array will be considered by the dataloader as the data for the nth element in the input argument.

---
title: Frequently Asked Questions (FAQ)
sectionTitle: General
layout: faq
permalink: /faq/#general
questions: Is GraphQL frontend or backend?,Does GraphQL use HTTP?,What is a GraphQL client and why would I use one?,Where is the documentation for subscriptions?,Does GraphQL replace ORMs?,Is GraphQL owned by Facebook?,Who is behind GraphQL?,What is the GraphQL Foundation?
position: 2
---

## Is GraphQL frontend or backend?

Both. GraphQL specifies how you can [exchange information between client and server](https://www.howtographql.com/basics/3-big-picture/). This includes how the server can indicate [what data and operations are available](/learn/introspection/), how the client should [format requests](/learn/queries/), how the server should [execute these queries](/learn/execution/), and what the client will [receive in response](/learn/serving-over-http/#response).

## Does GraphQL use HTTP?

<!-- TODO -->

## What is a GraphQL client and why would I use one?

GraphQL clients can help you handle [queries, mutations,](/learn/queries/) and [subscriptions](https://spec.graphql.org/draft/#sec-Subscription) to a [GraphQL server](https://www.howtographql.com/advanced/1-server/). They use the underlying structure of a GraphQL API to automate certain processes. This includes batching, UI updates, build-time schema validation, and more.

A list of GraphQL clients in various languages is available on our [Code page](/code/). There’s also an [in-depth explanation of their benefits](https://www.howtographql.com/advanced/0-clients/) on How To GraphQL.

You don't need a specific client to work with GraphQL, though. You might want to start out by [issuing GraphQL results with a regular HTTP client](/learn/serving-over-http/). Then later switch to a GraphQL-optimized client as your application grows in complexity.

## Where is the documentation for subscriptions?

It's not on this website yet, but we're working on it. If you'd like to help create these guides, please [let us know](https://github.com/graphql/graphql.github.io/issues/new). 

For now, the specification includes details for [how to write and execute subscriptions](https://spec.graphql.org/draft/#sec-Subscription).

## Does GraphQL replace ORMs?

No, GraphQL is a specification typically used for remote client-server communications. It's [agnostic to the data source(s) used](#is-graphql-a-database-language-like-sql) and doesn’t implement an object-relational mapping technique. But there are ORMs built specifically for GraphQL. A few of those are listed under the [Services section of our Code page](/code/#services). 

## Is GraphQL owned by Facebook?

No, GraphQL is governed by the [GraphQL Foundation](#what-is-the-graphql-foundation).

That said, the specification was originally developed at Facebook and [Facebook is a member](https://foundation.graphql.org/members/) of the GraphQL Foundation. You might notice that some of our [GitHub repositories](https://github.com/graphql/) still have the license listed under Facebook Inc. We're updating those and have already converted major projects, like [GraphiQL](https://github.com/graphql/graphiql/blob/main/LICENSE) and [DataLoader](https://github.com/graphql/dataloader/blob/master/LICENSE), to the the new copyright: "Copyright (c) 2020 GraphQL Contributors."

## Who is behind GraphQL?

Many people! The [GraphQL specification and all related projects](http://github.com/graphql/) are open source, so anyone is welcome to [contribute](#how-can-i-contribute-to-the-specification). That said, there is a structure in place behind the repositories. This exists to resolve conflicts within the community and guiding technical decisions.

The [GraphQL Foundation](#what-is-the-graphql-foundation) provides most of the oversight for GraphQL. It's made up of [representatives from dozens of different companies](https://foundation.graphql.org/members/). 

There are also monthly virtual [GraphQL Working Group (WG)](https://github.com/graphql/graphql-wg) meetings managed by the GraphQL Foundation. These meetings are designed to bring together maintainers of commonly used GraphQL libraries and tools, as well as significant contributors to the GraphQL community. While it tends to be mostly foundation members in attendance, the WG meetings are completely open. Anyone is able to join and [propose items to the agenda](https://github.com/graphql/graphql-wg/blob/master/agendas/). 

In the [November 2020 WG meeting](https://www.youtube.com/watch?v=UybZp9O24Ow), it was announced that GraphQL will have a Technical Steering Committee (TSC) going forward. More on that coming soon.

If this is confusing, don’t worry - there’s a lot going on. To get a more visual, high-level overview, check out the [GraphQL Landscape](https://landscape.graphql.org/).

## What is the GraphQL Foundation?

The [GraphQL Foundation](https://foundation.graphql.org/faq/) is a neutral foundation that provides governance for GraphQL. This includes vendor-neutral oversight of open-source repositories, funding, events, and more. It's hosted under the [Linux Foundation](https://www.linuxfoundation.org/) and consists of [representatives from dozens of different companies](https://foundation.graphql.org/members/). The idea is that it’s an impartial and open home for the GraphQL community.

You can find out more by visiting [foundation.graphql.org](https://foundation.graphql.org/).

---
title: Frequently Asked Questions (FAQ)
sidebarTitle: General
category: FAQ
layout: FAQLayout
permalink: /faq/
questions: Why should I use GraphQL?,Is GraphQL a database language like SQL?,Does GraphQL replace REST?,How can I learn GraphQL?,Is GraphQL frontend or backend?,Does GraphQL replace Redux or other state management libraries?,Is GraphQL only for React or JavaScript developers?,What is a GraphQL client and why would I use one?,What is the GraphQL Foundation?,How can I contribute to the GraphQL specification?
---

## Why should I use GraphQL?

<!-- TODO -->

Soufflé candy lollipop [dragée cake chocolate](). Marzipan lemon drops sweet roll I love cake ice cream muffin chupa chups gummi bears. Ice cream fruitcake I love sweet roll croissant ice cream. Gummi bears sesame snaps cake apple pie cake jelly. Gingerbread powder I love apple pie marzipan jelly beans sugar plum sesame snaps. Tiramisu chupa chups I love bear claw cake. Macaroon muffin topping ice cream bear claw cookie I love marshmallow. Pie gummies toffee candy pastry soufflé. Chupa chups toffee gummi bears I love cake lemon drops.

## Is GraphQL a database language like SQL?

No, but this is a common misconception. GraphQL is designed for APIs, not databases. It’s a specification for how to request and modify data through an API layer. Then it determines how that data is communicated between servers and clients.

GraphQL is frequently used for database interactions though. For example, it can be built into a wrapper around a database or a [GraphQL server](/code/#server-libraries) can query various databases. There are also [services](/code/#services) that implement the GraphQL specification and then allow clients to use GraphQL to query that data source. But it can also be used without a database at all.

For more information on how to get GraphQL to interact with your database, check out our [documentation on resolvers](/learn/execution/#root-fields-resolvers).

## Does GraphQL replace REST?

No, not necessarily. They both handle APIs and [serve the same purpose](/learn/thinking-in-graphs/#business-logic-layer) from a business perspective. GraphQL is considered an alternative to REST, but it’s not a definitive replacement.

GraphQL and REST can actually co-exist in your stack. For example, you can abstract REST APIs behind a [GraphQL server](/code/#server-libraries). This can be done by masking your REST endpoint into a GraphQL endpoint using [root resolvers](/learn/execution/#root-fields-resolvers). 

For an opinionated perspective on how GraphQL compares to REST, check out [How To GraphQL](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/).

## How can I learn GraphQL?

There are many resources available to help you learn GraphQL, including this website. In [our documentation](/learn/), you’ll find a series of articles that explain essential GraphQL concepts and how they work. Our [Community page](/community) is full of resources to reference and groups to join.

For more practical guides, you can visit the [How to GraphQL](https://www.howtographql.com/) fullstack tutorial website. We also have a free online course with edX, [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis). 

## Is GraphQL frontend or backend?

Neither. Instead, it’s [how you can exchange information between the two](https://www.howtographql.com/basics/3-big-picture/). Both the client and the server should understand and communicate through the GraphQL specification.

## Does GraphQL replace Redux or other state management libraries?

No, GraphQL isn’t a state management library - but it can reduce the need for one.

One benefit of state management libraries like Redux is that they can manipulate API responses into a format that your application understands. With GraphQL, you have control over [what data you request](/learn/queries/#fields) and [how that data is formatted](/learn/execution/). So this benefit is already built-in. Many [client libraries](https://graphql.org/code/#graphql-clients) can also be used to manage state and have features like caching built-in. You may still decide to implement a state management library, but using it to format response data won’t be necessary.

## Is GraphQL only for React or JavaScript developers?

No, not at all. [GraphQL services can be written in any language](/learn/schema/#type-language). Our [Code page](/code/) contains a long list of libraries available to help with that.

It’s understandable why you’d think this, though. GraphQL was introduced at a [React conference](https://www.youtube.com/watch?v=9sc8Pyc51uU) and [GraphQL.js](/graphql-js/) is one of the most widely used reference implementations to date. We know this can be confusing, so we’re working to improve our documentation and add more code samples that aren’t written in JavaScript.

## What is a GraphQL client and why would I use one?

GraphQL clients can help you handle [queries and mutations](https://graphql.org/learn/queries/) to a [GraphQL server](https://graphql.org/code/#server-libraries). This could be done manually, but it would require a lot of work depending on the amount of data you have. By utilizing the underlying structure of a GraphQL API, clients can abstract away some of these tedious processes. Features that can be automated include batching, caching, UI updates, build-time schema validation, and many more. 

You can find a list of GraphQL clients in various languages on our [Code page](https://graphql.org/code/#graphql-clients). There’s also an [in-depth explanation of their benefits](https://www.howtographql.com/advanced/0-clients/) on How To GraphQL.

It takes more time to implement a GraphQL client upfront, but it becomes worth it the more features you need. You might want to start out [using HTTP requests](https://graphql.org/learn/serving-over-http/) as the underlying transport layer (here’s [an example in JavaScript](https://graphql.org/graphql-js/graphql-clients/)), then switch to a more intricate client service as your application grows in complexity.

## What is the GraphQL Foundation?

The [GraphQL Foundation](https://foundation.graphql.org/faq/) provides governance for GraphQL as well as vendor-neutral oversight of funding, events, operations resources, and more. It was formed in 2018 by [various tech companies](https://landscape.graphql.org/category=graph-ql-foundation-member&format=logo-mode) and hosted under the [Linux Foundation](https://www.linuxfoundation.org/). The idea is that it’s an open, neutral home for the GraphQL community.

You can find out more by visiting [foundation.graphql.org](https://foundation.graphql.org/).

## How can I contribute to the GraphQL specification?

GraphQL is still an evolving language and contributions are very welcome! The specification (including the [latest working draft](https://spec.graphql.org/)) is open source and [contributor guidelines](https://github.com/graphql/graphql-spec/blob/master/CONTRIBUTING.md) are available on GitHub.
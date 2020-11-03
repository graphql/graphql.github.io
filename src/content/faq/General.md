---
title: Frequently Asked Questions (FAQ)
layout: faq
category: General
permalink: /faq/
questions: Why should I use GraphQL?,Is GraphQL a database language like SQL?,Does GraphQL replace REST?,How can I learn GraphQL?,Is GraphQL frontend or backend?,Does GraphQL replace Redux or other state management libraries?,Is GraphQL only for React or JavaScript developers?,What is a GraphQL client and why would I use one?,What is the GraphQL Foundation?,How can I contribute to the GraphQL specification?
---

## Why should I use GraphQL?

## Is GraphQL a database language like SQL?

## Does GraphQL replace REST?

## How can I learn GraphQL?

## Is GraphQL frontend or backend?

## Does GraphQL replace Redux or other state management libraries?

## Is GraphQL only for React or JavaScript developers?

## What is a GraphQL client and why would I use one?

## What is the GraphQL Foundation?

## How can I contribute to the GraphQL specification?

## Does GraphQL use HTTP?

<!-- TODO -->

## Who is behind GraphQL?

Loads of people! The [GraphQL specification and all related projects](http://github.com/graphql/) are open source, so anyone is welcome to [contribute](#how-can-i-contribute-to-the-specification). That being said, there is a structure in place behind the repositories - particularly for resolving conflicts within the community and guiding technical decisions. 

The [GraphQL Foundation](#what-is-the-graphql-foundation) provides most of the oversight for GraphQL and is made up of [representatives from 20 different companies](https://foundation.graphql.org/members/). There are also monthly virtual [GraphQL Working Group (WG)](https://github.com/graphql/graphql-wg) meetings. These meetings are operated by the GraphQL Foundation and designed to bring together maintainers of commonly used GraphQL libraries and tools, as well as significant contributors to the GraphQL community. While it tends to be mostly foundation members in attendance, the WG meetings are completely open. Anyone is able to join and [propose items to the agenda](https://github.com/graphql/graphql-wg/blob/master/agendas/). Additionally, GraphQL will soon have a Technical Steering Committee (TSC) to advise on implementation details. More on that coming soon.

If this is confusing, don’t worry - there’s a lot going on. To get a more visual high-level overview, check out the [GraphQL Landscape](https://landscape.graphql.org/).

## How does GraphQL affect my product’s performance?

<!-- TODO -->

## Does GraphQL support offline usage?

No, or at least not natively. But there are [GraphQL clients](#what-is-a-graphql-client-and-why-would-i-need-one) that enable you to build offline-first through caching, holding your mutations in a queue, service workers, or another feature designed to perform data operations while offline. 

You can find a [list of GraphQL clients on our Code page](/code/#graphql-clients).

## How does authentication work with GraphQL?

There’s nothing special about it within the specification, but you can implement authentication with common patterns, such as [OAuth](https://oauth.net/) or [JWT](https://jwt.io/). Some [GraphQL libraries](/code/) include a specific protocol for authentication as well. Although if you’re working with a pipeline model, we recommend that [GraphQL should be placed after all authentication middleware](/learn/serving-over-http/#web-request-pipeline).

If you’re using [GraphQL.js](/graphql-js/) to build your API server, we have documentation on [handling authentication with Express middleware](/graphql-js/authentication-and-express-middleware/).

## How can I set up authorization with GraphQL?

As tempting as it is to define your authorization logic in your GraphQL implementation, we recommend enforcing authorization behavior in the [business logic layer](/learn/thinking-in-graphs/#business-logic-layer). That way, you have a single source of truth for authorization. 

For a more detailed explanation, go to our [Authorization documentation](/learn/authorization/).

## What are the security concerns with GraphQL?

<!-- TODO -->

## How can I document my GraphQL API?

One of the benefits of GraphQL is that it is inherently self-documenting. This means that when you use an interactive tool like [GraphiQL](https://github.com/graphql/graphiql), you’re able to explore what data is exposed by your GraphQL API. This includes the [fields](/learn/queries/#fields), [types](/learn/schema/#type-system), and more. You can also add a [`description` field](https://spec.graphql.org/draft/#sec-Documentation) to provide supplementary notes about your endpoint. 

For many, this provides sufficient API reference documentation. But it doesn’t reduce the need for other forms of documentation, such as guides that explain how the general concepts tie into your specific use case.

## What’s the best way to follow specification releases?

The latest working draft release of the GraphQL specification can be found at [spec.graphql.org/draft](https://spec.graphql.org/draft/). Previous editions can also be found at permalinks that match their [release tag](https://github.com/graphql/graphql-spec/releases).

## Does GraphQL replace ORMs?

No, GraphQL is a specification. It [doesn’t understand the concept of databases](#is-graphql-a-database-language-like-sql). There are, however, ORMs built specifically for GraphQL. A few of those are listed under the [Services section of our Code page](/code/#services). 

## Is GraphQL the right fit for designing a microservice architecture?

Yes, it can be. If you’re integrating GraphQL into your microservice architecture, we’d recommend having one GraphQL schema as an API gateway rather than having your client talk to multiple GraphQL services. This way, you can split your backend into microservices, but then still aggregate all of your data to the frontend from a single API.

There are many ways to create an API gateway, but the benefit of using GraphQL is that you can take advantage of features like [caching](/learn/caching/), request budgeting, and planning out query schedules.
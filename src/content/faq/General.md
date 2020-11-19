---
title: Frequently Asked Questions (FAQ)
layout: faq
category: General
permalink: /faq/
gettingStartedQuestions: Why should I use GraphQL?,Does GraphQL replace REST?,How can I learn GraphQL?,Is GraphQL a database language like SQL?,Is GraphQL only for React or JavaScript developers?
generalQuestions: Is GraphQL frontend or backend?,Does GraphQL use HTTP?,How does GraphQL affect my product’s performance?,What is a GraphQL client and why would I use one?,Does GraphQL replace ORMs?,Is GraphQL owned by Facebook?,Who is behind GraphQL?,What is the GraphQL Foundation?
bestPracticesQuestions: Is GraphQL scalable?,Does GraphQL support offline usage?,What are the security concerns with GraphQL?,How can I set up authorization with GraphQL?,How does authentication work with GraphQL?,Is GraphQL the right fit for designing a microservice architecture?,How does versioning work in GraphQL?,How can I document my GraphQL API?
specificationQuestions: What is the best way to follow specification releases?,How can I contribute to the GraphQL specification?,Where is the documentation for subscriptions?
frontendQuestions: Does GraphQL replace Redux or other state management libraries?
---

## Why should I use GraphQL?

It depends on your use case, but in general, GraphQL has a few key features that stand out. For example, GraphQL enables you to:

* Aggregate data from [multiple UI components](/learn/queries/#fragments).
* Create a representation of your data that feels familiar and natural ([a graph](/learn/thinking-in-graphs/#it-s-graphs-all-the-way-down)).
* Ensure that all of your data is [statically typed](/learn/schema/) and these types inform [what queries the schema supports](/learn/introspection/).
* [Reduce the need for breaking changes](/learn/best-practices/#versioning), but utilize a [built-in mechanism for deprecations](https://spec.graphql.org/draft/#sec-Deprecation) when you need to.
* Access to a [powerful tooling ecosystem](/code/#generic-tools) with GUIs, editor integrations, code generation, linting, analytics, and more.

[Our homepage](/) outlines even more reasons to use GraphQL.

You can try out GraphQL without rewriting your entire application. For instance, starting with a single HTTP request that wraps an existing REST call. Your [GraphQL schema](/learn/thinking-in-graphs/#shared-language) and [business domain model](/learn/thinking-in-graphs/#business-logic-layer) can expand gradually. We recommend focusing on one use case at first and only building the part of the schema needed for that. 

## Does GraphQL replace REST?

No, not necessarily. They both handle APIs and can [serve similar purposes](/learn/thinking-in-graphs/#business-logic-layer) from a business perspective. GraphQL is often considered an alternative to REST, but it’s not a definitive replacement.

GraphQL and REST can actually co-exist in your stack. For example, you can abstract REST APIs behind a [GraphQL server](https://www.howtographql.com/advanced/1-server/). This can be done by masking your REST endpoint into a GraphQL endpoint using [root resolvers](/learn/execution/#root-fields-resolvers). 

For an opinionated perspective on how GraphQL compares to REST, check out [How To GraphQL](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/).

## How can I learn GraphQL?

There are many resources available to help you learn GraphQL, including this website. In [our documentation](/learn/), you’ll find a series of articles that explain essential GraphQL concepts and how they work. Our [Community page](/community) is full of resources to reference and groups to join.

For more practical guides, visit the [How to GraphQL](https://www.howtographql.com/) fullstack tutorial website. We also have a free online course with edX, [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis). 

Before you start your learning journey, make sure you know [what an API is](https://www.codenewbie.org/blogs/an-intro-to-apis) and how communication generally works between client and server.

## Is GraphQL a database language like SQL?

No, but this is a common misconception.

GraphQL is a specification typically used for remote client-server communications. Unlike SQL, GraphQL is agnostic to the data source(s) used to retrieve data and persist changes. Accessing and manipulating data is performed with arbitrary functions called [resolvers](/learn/execution/). GraphQL coordinates and aggregates the data from these resolver functions, then returns the result to the client. Generally, these resolver functions should delegate to a [business logic layer](/learn/thinking-in-graphs/#business-logic-layer) responsible for communicating with the various underlying data sources. These data sources could be remote APIs, databases, [local cache](/learn/caching/), and nearly anything else your programming language can access.

For more information on how to get GraphQL to interact with your database, check out our [documentation on resolvers](/learn/execution/#root-fields-resolvers).

## Is GraphQL only for React or JavaScript developers?

No, not at all. [GraphQL is a specification](https://spec.graphql.org/) that can be [implemented in any language](/learn/schema/#type-language). Our [Code page](/code/) contains a long list of libraries in many different programming languages to help with that.

It’s understandable why you’d think this, though. GraphQL was introduced at a [React conference](https://www.youtube.com/watch?v=9sc8Pyc51uU) and [GraphQL.js](/graphql-js/) is one of the most widely used implementations to date. We know this can be confusing, so we’re working to improve our documentation and add more code samples that aren’t written in JavaScript.

## Is GraphQL frontend or backend?

Both. GraphQL specifies how you can [exchange information between client and server](https://www.howtographql.com/basics/3-big-picture/). This includes how the server can indicate [what data and operations are available](/learn/introspection/), how the client should [format requests](/learn/queries/), how the server should [execute these queries](/learn/execution/), and what the client will [receive in response](/learn/serving-over-http/#response).

## Does GraphQL use HTTP?

<<<<<<< HEAD
Yes, [GraphQL is typically served over HTTP](/learn/best-practices/#http). This is largely due to how pervasive the HTTP protocol is in our industry. But it helps that you try out GraphQL by creating [a single HTTP request](#why-should-i-use-graphql). Guidelines for setting up a GraphQL server to operate over HTTP are available in our [Serving over HTTP](/learn/serving-over-http/) documentation. 

While HTTP is the most common choice for client-server protocol, it’s not the only one. GraphQL is agnostic to the transport layer. So, for example, you could use [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for GraphQL subscriptions instead of HTTP to consume realtime data. 

## How does GraphQL affect my product’s performance?

On a typical GraphQL backend, every field on every type has a focused, single-purpose function for resolving that value. Also, instead of trying to handle data batching on the client, [GraphQL moves that logic to the server](/learn/best-practices/#server-side-batching-caching). As a result, there are some inherent performance benefits. Minimizing over-fetching and making [fewer roundtrips to the server](/learn/queries/#fields) are two of them.

Other performance factors should be considered when building out your GraphQL implementation. For example, it’s possible for a GraphQL service to be ‘chatty’ and repeatedly load data from your database. This is commonly solved by [implementing a batching technique](/learn/best-practices/#server-side-batching-caching) or [utilizing a tool like DataLoader](https://github.com/graphql/dataloader). 
=======
<!-- TODO -->
>>>>>>> Initial design - not pretty

## What is a GraphQL client and why would I use one?

GraphQL clients can help you handle [queries, mutations,](/learn/queries/) and [subscriptions](https://spec.graphql.org/draft/#sec-Subscription) to a [GraphQL server](https://www.howtographql.com/advanced/1-server/). They use the underlying structure of a GraphQL API to automate certain processes. This includes batching, UI updates, build-time schema validation, and more.

A list of GraphQL clients in various languages is available on our [Code page](/code/). There’s also an [in-depth explanation of their benefits](https://www.howtographql.com/advanced/0-clients/) on How To GraphQL.

You don't need a specific client to work with GraphQL, though. You might want to start out by [issuing GraphQL results with a regular HTTP client](/learn/serving-over-http/). Then later switch to a GraphQL-optimized client as your application grows in complexity.

## Does GraphQL replace ORMs?

<<<<<<< HEAD
No, GraphQL is a specification typically used for remote client-server communications. It's [agnostic to the data source(s) used](#is-graphql-a-database-language-like-sql) and doesn’t implement an object-relational mapping technique. But there are ORMs built specifically for GraphQL. A few of those are listed under the [Services section of our Code page](/code/#services). 
=======
No, GraphQL is a specification. It [doesn’t understand the concept of databases](#is-graphql-a-database-language-like-sql). There are, however, ORMs built specifically for GraphQL. A few of those are listed under the [Services section of our Code page](/code/#services). 
>>>>>>> Initial design - not pretty

## Is GraphQL owned by Facebook?

No, GraphQL is governed by the [GraphQL Foundation](#what-is-the-graphql-foundation).

That said, the specification was originally developed at Facebook and [Facebook is a member](https://foundation.graphql.org/members/) of the GraphQL Foundation. You might notice that some of our [GitHub repositories](https://github.com/graphql/) still have the license listed under Facebook Inc. We're updating those and have already converted major projects, like [GraphiQL](https://github.com/graphql/graphiql/blob/main/LICENSE) and [DataLoader](https://github.com/graphql/dataloader/blob/master/LICENSE), to the the new copyright: "Copyright (c) 2020 GraphQL Contributors."

## Who is behind GraphQL?

<<<<<<< HEAD
Many people! The [GraphQL specification and all related projects](http://github.com/graphql/) are open source, so anyone is welcome to [contribute](#how-can-i-contribute-to-the-specification). That said, there is a structure in place behind the repositories. This exists to resolve conflicts within the community and guiding technical decisions.

The [GraphQL Foundation](#what-is-the-graphql-foundation) provides most of the oversight for GraphQL. It's made up of [representatives from dozens of different companies](https://foundation.graphql.org/members/). 

There are also monthly virtual [GraphQL Working Group (WG)](https://github.com/graphql/graphql-wg) meetings managed by the GraphQL Foundation. These meetings are designed to bring together maintainers of commonly used GraphQL libraries and tools, as well as significant contributors to the GraphQL community. The WG meetings are completely open. Anyone is able to join and [propose items to the agenda](https://github.com/graphql/graphql-wg/blob/master/agendas/). 

In the [November 2020 WG meeting](https://www.youtube.com/watch?v=UybZp9O24Ow), it was announced that GraphQL will have a Technical Steering Committee (TSC) going forward. More on that coming soon.

If this is confusing, don’t worry - there’s a lot going on. To get a more visual, high-level overview, check out the [GraphQL Landscape](https://landscape.graphql.org/).
=======
Loads of people! The [GraphQL specification and all related projects](http://github.com/graphql/) are open source, so anyone is welcome to [contribute](#how-can-i-contribute-to-the-specification). That being said, there is a structure in place behind the repositories - particularly for resolving conflicts within the community and guiding technical decisions. 

The [GraphQL Foundation](#what-is-the-graphql-foundation) provides most of the oversight for GraphQL and is made up of [representatives from 20 different companies](https://foundation.graphql.org/members/). There are also monthly virtual [GraphQL Working Group (WG)](https://github.com/graphql/graphql-wg) meetings. These meetings are operated by the GraphQL Foundation and designed to bring together maintainers of commonly used GraphQL libraries and tools, as well as significant contributors to the GraphQL community. While it tends to be mostly foundation members in attendance, the WG meetings are completely open. Anyone is able to join and [propose items to the agenda](https://github.com/graphql/graphql-wg/blob/master/agendas/). Additionally, GraphQL will soon have a Technical Steering Committee (TSC) to advise on implementation details. More on that coming soon.

If this is confusing, don’t worry - there’s a lot going on. To get a more visual high-level overview, check out the [GraphQL Landscape](https://landscape.graphql.org/).
>>>>>>> Initial design - not pretty

## What is the GraphQL Foundation?

The [GraphQL Foundation](https://foundation.graphql.org/faq/) is a neutral foundation that provides governance for GraphQL. This includes vendor-neutral oversight of open-source repositories, funding, events, and more. It's hosted under the [Linux Foundation](https://www.linuxfoundation.org/) and consists of [representatives from dozens of different companies](https://foundation.graphql.org/members/). The idea is that it’s an impartial and open home for the GraphQL community.

You can find out more by visiting [foundation.graphql.org](https://foundation.graphql.org/).

<<<<<<< HEAD
## Is GraphQL scalable?

Yes, GraphQL is designed to be scalable and is used by many companies in production under a very high load.

GraphQL comes with some [built-in performance boosts](#how-does-graphql-affect-my-product-s-performance) that can help. But once you push it to production, you're responsible for scaling it across instances and monitoring performance.

## Does GraphQL support offline usage?

No, or at least not natively. But there are [GraphQL clients](#what-is-a-graphql-client-and-why-would-i-need-one) that enable you to build offline-first. They use features designed to perform data operations while offline, such as caching and service workers.

You can find a list of GraphQL clients in various languages on our [Code page](/code/).

## What are the security concerns with GraphQL?

Most of the security concerns associated with GraphQL are typical for any API or service. A few examples: SQL injections, Denial of Service (DoS) attacks, or someone abusing flawed authentication. But there are also some attacks specific to GraphQL. For instance, [batching attacks](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#batching-attacks). These attacks can happen as a result of GraphQL allowing you to batch multiple queries (or requests for multiple object instances) in a single network call. 

No matter the concern, it’s important to be proactive. There are many ways to securing your GraphQL server. Using a timeout, setting a maximum depth for queries, and throttling queries based on the server time it needs to complete are all potential approaches. 

For an overview of common security concerns and how to address them, check out the [Security tutorial on How to GraphQL](https://www.howtographql.com/advanced/4-security/) and [OWASP’s GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html).

## How can I set up authorization with GraphQL?

We recommend enforcing authorization behavior in the [business logic layer](/learn/thinking-in-graphs/#business-logic-layer). That way, you have a single source of truth for authorization. 
=======
## How does GraphQL affect my product’s performance?

<!-- TODO -->

## Does GraphQL support offline usage?

No, or at least not natively. But there are [GraphQL clients](#what-is-a-graphql-client-and-why-would-i-need-one) that enable you to build offline-first through caching, holding your mutations in a queue, service workers, or another feature designed to perform data operations while offline. 

You can find a [list of GraphQL clients on our Code page](/code/#graphql-clients).

## What are the security concerns with GraphQL?

<!-- TODO -->

## How can I set up authorization with GraphQL?

As tempting as it is to define your authorization logic in your GraphQL implementation, we recommend enforcing authorization behavior in the [business logic layer](/learn/thinking-in-graphs/#business-logic-layer). That way, you have a single source of truth for authorization. 
>>>>>>> Initial design - not pretty

For a more detailed explanation, go to our [Authorization documentation](/learn/authorization/).

## How does authentication work with GraphQL?

<<<<<<< HEAD
You can implement authentication with common patterns, such as [OAuth](https://oauth.net/) or [JWT](https://jwt.io/). There’s nothing special about authentication within the GraphQL specification. 

Some [GraphQL libraries](/code/#language-support) include a specific protocol for authentication as well. Although if you’re working with a pipeline model, we recommend that [GraphQL be placed after all authentication middleware](/learn/serving-over-http/#web-request-pipeline).
=======
There’s nothing special about it within the specification, but you can implement authentication with common patterns, such as [OAuth](https://oauth.net/) or [JWT](https://jwt.io/). Some [GraphQL libraries](/code/) include a specific protocol for authentication as well. Although if you’re working with a pipeline model, we recommend that [GraphQL should be placed after all authentication middleware](/learn/serving-over-http/#web-request-pipeline).
>>>>>>> Initial design - not pretty

If you’re using [GraphQL.js](/graphql-js/) to build your API server, we have documentation on [handling authentication with Express middleware](/graphql-js/authentication-and-express-middleware/).

## Is GraphQL the right fit for designing a microservice architecture?

<<<<<<< HEAD
Yes, it can be. If you’re integrating GraphQL into your microservice architecture, we’d recommend having one GraphQL schema as an API gateway rather than having your client talk to multiple GraphQL services. This way, you can split your backend into microservices, but then still aggregate all your data to the frontend from a single API.

There are many ways to create an API gateway. The benefit of using GraphQL is that you can take advantage of features like [caching](/learn/caching/), request budgeting, and planning out query schedules.

## How does versioning work in GraphQL?

There’s nothing that will prevent a GraphQL service from being versioned like any other REST API. That said, GraphQL avoids versioning by design. Instead, GraphQL provides the tools to continually build and evolve your schema. For example, GraphQL only returns the data that’s explicitly requested. This means that you can add new features (and all the associated types and fields) without creating a breaking change or bloating results for existing queries.

You can read more about [how versioning works in GraphQL](/learn/best-practices/#versioning) in our Best Practices section.

## How can I document my GraphQL API?

One of the benefits of GraphQL is that it's inherently self-documenting. This means that when you use an interactive tool like [GraphiQL](https://github.com/graphql/graphiql), you’re able to explore what data is exposed by your GraphQL API. This includes the [fields](/learn/queries/#fields), [types](/learn/schema/#type-system), and more. You can also add a [description field](https://spec.graphql.org/draft/#sec-Documentation) to provide supplementary notes about your endpoint. This description field supports strings and Markdown.

For many, this provides enough API reference documentation. But it doesn’t reduce the need for other forms of documentation. You'll likely still need to create guides that explain how the general concepts tie into your specific use case.

## What is the best way to follow specification releases?

The latest working draft release of the GraphQL specification can be found at [spec.graphql.org/draft](https://spec.graphql.org/draft/). Previous editions are also available at permalinks that match their [release tag](https://github.com/graphql/graphql-spec/releases).

The entire process behind each release is open source. You can monitor specification proposals by following [pull requests in the graphql-spec repository](https://github.com/graphql/graphql-spec/pulls). You can also watch past GraphQL Working Group discussions various proposals on [YouTube](https://www.youtube.com/channel/UCERcwLeheOXp_u61jEXxHMA).
=======
Yes, it can be. If you’re integrating GraphQL into your microservice architecture, we’d recommend having one GraphQL schema as an API gateway rather than having your client talk to multiple GraphQL services. This way, you can split your backend into microservices, but then still aggregate all of your data to the frontend from a single API.

There are many ways to create an API gateway, but the benefit of using GraphQL is that you can take advantage of features like [caching](/learn/caching/), request budgeting, and planning out query schedules.

## How can I document my GraphQL API?

One of the benefits of GraphQL is that it is inherently self-documenting. This means that when you use an interactive tool like [GraphiQL](https://github.com/graphql/graphiql), you’re able to explore what data is exposed by your GraphQL API. This includes the [fields](/learn/queries/#fields), [types](/learn/schema/#type-system), and more. You can also add a [`description` field](https://spec.graphql.org/draft/#sec-Documentation) to provide supplementary notes about your endpoint. 

For many, this provides sufficient API reference documentation. But it doesn’t reduce the need for other forms of documentation, such as guides that explain how the general concepts tie into your specific use case.

## What’s the best way to follow specification releases?

The latest working draft release of the GraphQL specification can be found at [spec.graphql.org/draft](https://spec.graphql.org/draft/). Previous editions can also be found at permalinks that match their [release tag](https://github.com/graphql/graphql-spec/releases).
>>>>>>> Initial design - not pretty

## How can I contribute to the GraphQL specification?

GraphQL is still evolving and contributions are very welcome! The specification (including the [latest working draft](https://spec.graphql.org/)) is open source. [Contributor guidelines](https://github.com/graphql/graphql-spec/blob/master/CONTRIBUTING.md) are available on GitHub.

There are more ways to get involved with GraphQL beyond the specification though. Updating the content on [this website and the documentation](https://github.com/graphql/graphql.github.io), for example. Or contributing to [graphql-js](https://github.com/graphql/graphql-js), [express-graphql](https://github.com/graphql/express-graphql), [GraphiQL](https://github.com/graphql/graphiql), or [one of the many other projects](https://github.com/graphql/) maintained by the [GraphQL Foundation](#what-is-the-graphql-foundation). 

<<<<<<< HEAD
## Where is the documentation for subscriptions?

It's not on this website yet, but we're working on it. For now, the specification includes details for [how to write and execute subscriptions](https://spec.graphql.org/draft/#sec-Subscription). 

If you'd like to help write guides on subscriptions, please [let us know](https://github.com/graphql/graphql.github.io/issues/993). 

=======
>>>>>>> Initial design - not pretty
## Does GraphQL replace Redux or other state management libraries?

No, GraphQL isn’t a state management library - but it can reduce the need for one.

<<<<<<< HEAD
One benefit of state management libraries like Redux is that they can manipulate API responses into a format that your application understands. With GraphQL, you have control over [what data you request](/learn/queries/#fields) and typically results are formatted in a client-friendly way by the graph design. So this benefit is already built-in. Many [client libraries](#what-is-a-graphql-client-and-why-would-i-need-one) can also be used to manage state and have features like caching built-in. You may still decide to implement a state management library, but using it to format response data is generally not necessary.
=======
One benefit of state management libraries like Redux is that they can manipulate API responses into a format that your application understands. With GraphQL, you have control over [what data you request](/learn/queries/#fields) and typically results are formatted in a client-friendly way by virtue of the graph design. So this benefit is already built-in. Many [client libraries](https://graphql.org/code/#graphql-clients) can also be used to manage state and have features like caching built-in. You may still decide to implement a state management library, but using it to format response data is generally not necessary.
>>>>>>> Initial design - not pretty

---
title: Best Practices
layout: faq
permalink: /faq/#best-practices
questions: Is GraphQL scalable?,Does GraphQL support offline usage?,What are the security concerns with GraphQL?,How can I set up authorization with GraphQL?,How does authentication work with GraphQL?,Is GraphQL the right fit for designing a microservice architecture?,How does versioning work in GraphQL?,How can I document my GraphQL API?
position: 3
---

## Is GraphQL scalable?

Yes, if you scale it. 

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

For a more detailed explanation, go to our [Authorization documentation](/learn/authorization/).

## How does authentication work with GraphQL?

You can implement authentication with common patterns, such as [OAuth](https://oauth.net/) or [JWT](https://jwt.io/). There’s nothing special about authentication within the GraphQL specification. 

Some [GraphQL libraries](/code/#language-support) include a specific protocol for authentication as well. Although if you’re working with a pipeline model, we recommend that [GraphQL be placed after all authentication middleware](/learn/serving-over-http/#web-request-pipeline).

If you’re using [GraphQL.js](/graphql-js/) to build your API server, we have documentation on [handling authentication with Express middleware](/graphql-js/authentication-and-express-middleware/).

## Is GraphQL the right fit for designing a microservice architecture?

Yes, it can be. If you’re integrating GraphQL into your microservice architecture, we’d recommend having one GraphQL schema as an API gateway rather than having your client talk to multiple GraphQL services. This way, you can split your backend into microservices, but then still aggregate all your data to the frontend from a single API.

There are many ways to create an API gateway. The benefit of using GraphQL is that you can take advantage of features like [caching](/learn/caching/), request budgeting, and planning out query schedules.

## How does versioning work in GraphQL?

There’s nothing that will prevent a GraphQL service from being versioned like any other REST API. That said, GraphQL avoids versioning by design. Instead, GraphQL provides the tools to continually build and evolve your schema. For example, GraphQL only returns the data that’s explicitly requested. This means that you can add new features (and all the associated types and fields) without creating a breaking change or bloating results for existing queries.

You can read more about [how versioning works in GraphQL](/learn/best-practices/#versioning) in our Best Practices section.

## How can I document my GraphQL API?

One of the benefits of GraphQL is that it's inherently self-documenting. This means that when you use an interactive tool like [GraphiQL](https://github.com/graphql/graphiql), you’re able to explore what data is exposed by your GraphQL API. This includes the [fields](/learn/queries/#fields), [types](/learn/schema/#type-system), and more. You can also add a [description field](https://spec.graphql.org/draft/#sec-Documentation) to provide supplementary notes about your endpoint. 

For many, this provides enough API reference documentation. But it doesn’t reduce the need for other forms of documentation. You'll likely still need to create guides that explain how the general concepts tie into your specific use case.
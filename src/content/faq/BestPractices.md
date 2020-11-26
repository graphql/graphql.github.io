---
title: Frequently Asked Questions (FAQ)
sectionTitle: Best Practices
layout: faq
permalink: /faq/#best-practices
questions: How does GraphQL affect my product’s performance?,Does GraphQL support offline usage?,What are the security concerns with GraphQL?,How can I set up authorization with GraphQL?,How does authentication work with GraphQL?,Is GraphQL the right fit for designing a microservice architecture?,How can I document my GraphQL API?
position: 3
---

## How does GraphQL affect my product’s performance?

<!-- TODO -->

## Does GraphQL support offline usage?

No, or at least not natively. But there are [GraphQL clients](#what-is-a-graphql-client-and-why-would-i-need-one) that enable you to build offline-first. They use features designed to perform data operations while offline, such as caching and service workers.

You can find a list of GraphQL clients in various languages on our [Code page](/code/).

## What are the security concerns with GraphQL?

<!-- TODO -->

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

## How can I document my GraphQL API?

One of the benefits of GraphQL is that it's inherently self-documenting. This means that when you use an interactive tool like [GraphiQL](https://github.com/graphql/graphiql), you’re able to explore what data is exposed by your GraphQL API. This includes the [fields](/learn/queries/#fields), [types](/learn/schema/#type-system), and more. You can also add a [description field](https://spec.graphql.org/draft/#sec-Documentation) to provide supplementary notes about your endpoint. 

For many, this provides enough API reference documentation. But it doesn’t reduce the need for other forms of documentation. You'll likely still need to create guides that explain how the general concepts tie into your specific use case.
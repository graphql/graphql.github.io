---
title: GraphQL Foundation Monthly Newsletter October 2020
tags: ["newsletter"]
layout: blog
date: 2020-11-12
byline: GraphQL Foundation
permalink: /blog/2020-11-12-graphql-foundation-monthly-newsletter-october-2020
---

[GraphQL](https://graphql.org/) has redefined how developers work with APIs and client-server interactions. And as the community works hard to foster the growth and adoption of GraphQL, we are excited to share the work of the community and discussions via the monthly GraphQL Foundation newsletter.

## WG Updates

The [GraphQL Working Group](https://github.com/graphql/graphql-wg) meets monthly, and records [detailed minutes](https://github.com/graphql/graphql-wg/blob/master/notes/2020-10-01.md). You can also listen to the replays of GraphQL technical meetings on [YouTube](https://youtube.graphql.org).

### [Query ambiguity: discussion of replacement terms](https://github.com/graphql/graphql-spec/issues/715)

In the GraphQL ecosystem the term "query" can seem overloaded and ambiguous - sometimes it refers to the query operation type or a query operation, sometimes it refers to a GraphQL request or a GraphQL document containing operations, sometimes it refers to the contents of selection sets (as in "query reuse"), and sometimes it is used as a verb to refer to the generic act of querying a server for information.

The WG discussed the best way to remove this ambiguity and how to move forward.

### [Schema Coordinates RFC check in](https://github.com/graphql/graphql-spec/pull/746)

The RFC is filed, and the next action is to turn this into an actual spec edit.

### [Tagged type update](https://github.com/graphql/graphql-spec/pull/733)

This is an RFC for a new "Tagged type" to be added to GraphQL. It replaces the ["@oneField directive"](https://github.com/graphql/graphql-spec/pull/586) proposal following feedback from the Input Unions Working Group. Please note that "Tagged type" is the working name, and may change if we come up with a better name for it.

A Tagged type defines a list of named members each with an associated type (like the fields in Object types and Input Object types), but differs from Object types and Input Object types in that exactly one of those members must be present.

The aim of the Tagged type is to introduce a form of polymorphism in GraphQL that can be symmetric between input and output. In output, it can generally be used as an alternative to Union (the differences will be outlined below). It goes beyond interfaces and unions in that it allows the same type to be specified more than once, which is particularly useful to represent filters such as this pseudocode `{greaterThan: Int} | {lessThan: Int}`.

## In Other News...

- [Vox Media evaluates Apollo GraphQL Federation and The Guild Schema Stitching](https://product.voxmedia.com/2020/11/2/21494865/to-federate-or-stitch-a-graphql-gateway-revisited) for the best GraphQL platform to manage “a chorus of applications working together to publish modern media”
- AWS released a “[Decision Guide to GraphQL Implementation](https://aws.amazon.com/graphql/guide/)”
- [Netflix discusses](https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2) how it scales its API with [Apollo GraphQL](https://www.apollographql.com/) Federation via its next generation architecture, “Studio Edge”, which uses federation as a critical element.
- [Building a GraphQL server with GraphQL Helix](https://dev.to/danielrearden/building-a-graphql-server-with-graphql-helix-2k44), a newly released library for building GraphQL APIs. The aim of GraphQL Helix is to allow developers to use new features that are not yet supported in other libraries and to prevent vendor lock-in.
- [GraphQL Tools v7 was released to deliver the next generation GraphQL API Gateway](https://the-guild.dev/blog/graphql-tools-v7), bringing a new way to federate multiple GraphQL servers, focusing on standard spec compliant GraphQ
- We’ve already announced that The Guild has recently joined the GraphQL Foundation and now [they wrote a blog post about it](https://the-guild.dev/blog/joining-graphql-foundation). Who will be the next to join?

## Upcoming Events:

- **Nov 17**: [GraphQL Contributor Days](https://www.graphql-meetup.com/#/graphql-contributor-days-november-2020), in partnership with [Hasura](https://hasura.io/), will give important updates to the community, and provide a forum for anyone using GraphQL to have direct access to core contributors and authors of various libraries and frameworks through live chat and an online broadcast.
- **Dec 2**: [Relay Meetup](https://relaymeetup.com/) is a global, online meetup on Relay, the GraphQL client. This event will feature a conversation about the @defer and @stream directives and why it should be brought to the official GraphQL specification.
- **Dec 7-8**: [GraphQL Galaxy Conference](https://graphqlgalaxy.com) is a new remote conference focusing on all things[ GraphQL](https://twitter.com/search?q=%23GraphQL&src=hashtag_click).
- Missed Apollo Day on Nov. 10th? Check out some of the great talks on [Twitch](https://www.twitch.tv/apollographql).

## Get Involved!

Developers can get involved in the community and contribute to the project at [https://github.com/graphql](https://github.com/graphql).

Organizations interested in becoming members of the GraphQL Foundation or the GraphQL Specification can learn more on our [member page](/foundation/join). If you have questions about membership, please send an email to [membership@graphql.org](mailto:membership@graphql.org).

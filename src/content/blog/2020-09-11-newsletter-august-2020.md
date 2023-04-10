---
title: GraphQL Foundation Monthly Newsletter August 2020
tags: ["newsletter"]
layout: blog
date: 2020-09-11
byline: GraphQL Foundation
permalink: /blog/2020-09-11-graphql-foundation-monthly-newsletter-august-2020
---

[GraphQL](https://graphql.org) has redefined how developers work with APIs and client-server interactions. And as the community works hard to foster the growth and adoption of GraphQL, we are excited to share the work of the community and discussions via a new monthly GraphQL Foundation newsletter.

All work on GraphQL and related projects, both big and small, is important to the growth and maturity of the project, which has already seen adoption from many of the world’s largest internet-scale companies.

Many of these items are just in beginning discussions while some are further along. The goal of this monthly post is to summarize and share what’s top of mind for the community and help others get involved. These are only initial discussion topics. For notes on the full discussion during the monthly WG calls please refer to these [call notes](https://docs.google.com/document/d/1_jvxzCkI6VWo2KEobisoiW1n_irJ4dp0aD8Pq9UXuvw/edit#)

## Updates

### [GraphQL over WebSocket refresh, existing issues and security implications](https://github.com/enisdenjo/graphql-transport-ws/blob/master/PROTOCOL.md)

This discussion topic proposes taking on the following two critical items of security and bypassing the onConnect event. And possibly re-writing the WebSocket protocol from scratch with full RFCs

### [Tagged Type RFC](https://github.com/graphql/graphql-spec/pull/733)

This is an RFC for a new "Tagged" type to be added to GraphQL, to help address the input polymorphism feature gap. Originally proposed as the @oneField directive, the Tagged type has evolved into an entire new type in the type system, and is currently the lead proposal from the Input Unions Working Group.

A Tagged type defines a list of named member fields each with an associated type (like the fields in Object and Input Object types); but with the stipulation that exactly one of these fields must be present (no more, no less). Depending on the types of the member fields, a Tagged type could be appropriate for input, output, or both, which is proving to be quite controversial; it's possible that the tagged type might be scoped to input only before release. The Tagged type was most recently introduced to the GraphQL Working Group in August and is undergoing feedback and revision before an expected update with the working group in October or November.

If you have use-cases for input polymorphism, please take a look - feedback is very welcome.

### [Standardize naming for Field coordinates](https://github.com/graphql/graphql-spec/issues/735)

This PR proposes the following 2 RFCs

1. Formalizing the naming and definition of field coordinates (as discussed in [#735](https://github.com/graphql/graphql-spec/issues/735))
2. Formalizing the way in which a Field Node (and list thereof) contained within a query document can be serialized as field coordinates

### [Adding generics to DocumentNode and Source to allow TypeScript type inference](https://github.com/graphql/graphql-js/issues/2727)

[@dotansimha](https://github.com/dotansimha) from [The Guild](https://the-guild.dev) had recently implemented an improved version of DocumentNode, called TypedDocumentNode, that allows type generics for result type and variable type and contributed it to graphql-js.

This improved version allows TypeScript to infer the types automatically when an object that matches the signature is used.

You can learn more by reading about it on his [blog post](https://the-guild.dev/blog/typed-document-node).

## In Other News

- We recently welcomed the newest member of the GraphQL Foundation - [The Guild](https://the-guild.dev). [Here](https://foundation.graphql.org/members/) you can find the list of all current members of the foundation.
- [@hereisnaman](https://github.com/hereisnaman) successfully finished his Google Summer of Code (GSoC) project and is in the process of merging his[PR](https://github.com/graphql/graphql-js/pull/2770). Learn more about it [here](https://foundation.graphql.org/news/2020/06/30/google-summer-of-code-2020-participant-naman/).
- GraphQL was accepted to the Google Season of Docs (GSoD) and [@carolstran](https://github.com/carolstran) will be working on the [FAQ section](https://developers.google.com/season-of-docs/docs/participants/project-graphql-carolstran) of graphql.org
- [GraphQL over HTTP](https://github.com/graphql/graphql-over-http) was moved and is now under GraphQL Foundation
- [@lilianammmatos](https://github.com/lilianammmatos) and [@robrichard have](https://github.com/robrichard) made big progress on `@deferer & @stream`. Yo can learn more by watching their talk about it at the [GraphQL Summit](https://www.youtube.com/watch?v=icv_Pq06aOY):
- [@andimarek](https://github.com/andimarek) and [@eapache](https://github.com/eapache) started the [GraphQL Scalars](https://github.com/graphql/graphql-scalars/issues) initiative. You can also learn more by watching their talk about it at the [GraphQL Summit](https://www.youtube.com/watch?v=SRGTaYL3h9c).
- All WG recordings were published on [Youtube](https://www.youtube.com/channel/UCERcwLeheOXp_u61jEXxHMA).

## Get Involved!

Developers can get involved in the community and contribute to the project at [https://github.com/graphql](https://github.com/graphql).

Organizations interested in becoming members of the GraphQL Foundation or the GraphQL Specification can learn more on our [member page](/foundation/join). If you have questions about membership, please send an email to [membership@graphql.org](mailto:membership@graphql.org).

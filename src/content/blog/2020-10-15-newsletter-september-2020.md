---
title: GraphQL Foundation Monthly Newsletter September 2020
tags: ["newsletter"]
layout: blog
date: 2020-10-15
byline: GraphQL Foundation
permalink: /blog/2020-10-15-graphql-foundation-monthly-newsletter-september-2020
---

[GraphQL](https://graphql.org/) has redefined how developers work with APIs and client-server interactions. And as the community works hard to foster the growth and adoption of GraphQL, we are excited to share the work of the community and discussions via a new monthly GraphQL Foundation newsletter.

All work on GraphQL and related projects, both big and small, is important to the growth and maturity of the project, which has already seen adoption from many of the world’s largest internet-scale companies.

Many of these items are just in beginning discussions while some are further along. The goal of this monthly post is to summarize and share what’s top of mind for the community and help others get involved. These are only initial discussion topics. For notes on the full discussion during the monthly WG calls please refer to these [call notes](https://github.com/graphql/graphql-wg/blob/b1bfe0cee461d752146dc77e5c35a5e8d7921272/notes/2020-09-03.md#allowing-deprecation-of-inputs-10m-evan).

## WG Updates:

### Allowing deprecation of inputs

Discussed whether the spec should allow deprecating an input that is required. Two concerns: deprecations are intended to be actionable; introspection does not include deprecated things by default - could break tooling that's no longer receiving deprecated inputs as part of their introspection results.

- Regarding case 1: not much of a blocker; the action from deprecation doesn't need to come from a schema (e.g. it could be switch to a new version/endpoint)
- Regarding case 2: much more of an issue because we could be breaking clients. My suggestion is to return required arguments even if they're deprecated - introspection should always give you what's necessary even if you say you don't want it.

### @defer/@stream

trying to answer the “why we don’t support Defer on field question”. The reasoning for that is the original Apollo implementation was only on fields. We ran into problems in that it’s difficult to coordinate

### Querying Query query queries: "query" ambiguity

The issue was first raised around the ambiguity of the term "query" as used in the GraphQL spec and ecosystem back in April. In just this title, we've referred to requesting, the Query type, a query operation, and a nested selection set; but that's just some of the ways we use this term, which can make it really hard for people new to GraphQL to get up to speed. Benjie has analyzed the use of the term, and has proposed a consistent set of terminology to use based on other terms used in the GraphQL spec already, this was discussed at the most recent Working Group. See [Spec PR #777](https://github.com/graphql/graphql-spec/pull/777).

### Other topics discussed:

- [TypeScript Migration Progress in graphql-js](https://github.com/graphql/graphql-js/issues/2104)
- [How to bootstrap graphql-js working group?](https://github.com/graphql/graphql-js/issues/2787)
- GitHub infrastructure for managing Working groups
- Custom Scalars subproject

## Ecosystem Updates:

Vscode-graphql, which uses the official GraphQL Language Server, has now become the official reference vscode extension! Like GraphiQL, we will work to ensure all new spec language features are introduced here. After making the announcement we gained 30,000 new users! [This blog post](https://rikki.dev/vscode-graphql-lsp-0-3-0/) will tell you more about all the new features.

## In Other News...

- Dgraph Labs launched [Slash GraphQL](https://www.producthunt.com/posts/slash-graphql), a product that can help you get a working GraphQL backend in minutes
- A new library for the WebSocket Protocol has been created. Read more [here](https://the-guild.dev/blog/graphql-over-websockets).
- The Guild has created a new [GraphQL-ESLint library](https://github.com/dotansimha/graphql-eslint) for linting your GraphQL schemas and operations with community and custom rules. Read more [here](https://the-guild.dev/blog/introducing-graphql-eslint).
- GraphQL CLI 4.1 has been released. [Read here](https://the-guild.dev/blog/whats-new-in-graphql-cli-4.1.0) about the new functionality.
- You can now consume WebHooks as GraphQL Subscriptions thanks to the new version of [GraphQL Mesh](https://github.com/urigo/graphql-mesh). Read more [here](https://the-guild.dev/blog/graphql-mesh-subscriptions).
- Hasura’s [Enterprise GraphQL Conf](https://hasura.io/enterprisegraphql/) is taking place October 20-22. There is still time to register
- AWS released a new webinar “[Build Modern Serverless Applications with GraphQL APIs and AWS AppSync](https://pages.awscloud.com/Build-Modern-Serverless-Applications-with-GraphQL-APIs-and-AWS-AppSync_2020_0918-MBL_OD.html?&trk=ep_card-el_a131L0000084iG3QAI&trkCampaign=NA-FY20-AWS-DIGMKT-WEBINAR-SERIES-September_2020_0918-MBL&sc_channel=el&sc_campaign=pac_2018-2019_exlinks_ondemand_OTT_evergreen&sc_outcome=Product_Adoption_Campaigns&sc_geo=NAMER&sc_country=mult)”
- Catch up on recent talks from the [GraphQL Berlin](https://www.youtube.com/watch?v=4UDsR4z2KIY) Meetup
- [GraphQL Amsterdam](https://www.meetup.com/Amsterdam-GraphQL-Meetup/events/273901137/), [GraphQL Copenhagen](https://www.meetup.com/Copenhagen-GraphQL-Meetup-Group/events/273901144/), React GraphQL Academy and The Guild are collaborating on an online GraphQL Meetup. Check out the details [here](https://twitter.com/reactgqlacademy/status/1313789927834947585?s=20).
- Apollo created an [Error Handling Visualizer](https://apollo-visualizer.vercel.app/) tool, which provides an interactive playground to visualize the relationship between nullability and error handling in GraphQL, specifically with Apollo Client.

## Get Involved!

Developers can get involved in the community and contribute to the project at [https://github.com/graphql](https://github.com/graphql).

Organizations interested in becoming members of the GraphQL Foundation or the GraphQL Specification can learn more on our [member page](/foundation/join). If you have questions about membership, please send an email to [membership@graphql.org](mailto:membership@graphql.org).

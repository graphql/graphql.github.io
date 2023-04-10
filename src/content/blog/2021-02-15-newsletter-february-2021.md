---
title: GraphQL Foundation Monthly Newsletter February 2021
tags: ["newsletter"]
layout: blog
date: 2021-02-15
byline: GraphQL Foundation
permalink: /blog/2021-02-15-graphql-foundation-monthly-newsletter-february-2021
---

[GraphQL](https://graphql.org/) has redefined how developers work with APIs and client-server interactions. And as the community works hard to foster the growth and adoption of GraphQL, we are excited to share the work of the community and discussions via the monthly GraphQL Foundation newsletter.

GraphQL reached new heights in 2020 and is only poised to continue it’s meteoric rise in 2021. Thank you again for your involvement in this project and your support of the GraphQL Foundation. We are excited for another productive year!

## Working Group Updates

### [Advancing no introspection at root of Subscription operation ](https://github.com/graphql/graphql-spec/pull/776)

The group decided to disallow since it doesn’t work in the reference implementation. During the graphql-js implementation some issues were discovered around fragments that are being fixed. Read more [here](https://github.com/graphql/graphql-spec/pull/776).

### [Default value coercion update](https://github.com/graphql/graphql-spec/pull/793)

Currently this is a case where infinite loops can occur. The WG is working to figure out how to avoid this in the spec [here](https://github.com/graphql/graphql-spec/pull/793#issuecomment-738736539).

### [Defer/stream updates](https://github.com/graphql/graphql-spec/blob/main/rfcs/DeferStream.md)

The official experimental branch of graphql-js/express-graphql. The WG is working to update the initialCount, validation rule in GraphQL.js, and the spec.

### Schema Coordinates Spec

The RFC and spec edit have been out for a few months with credit due to everyone who has reviewed those. Last time the field arguments were the discussion there were two main contenders: `Query.business(id:)` versus `Query.business.id`. The WG is looking for consensus. The discussion summarized can be found [here](https://github.com/graphql/graphql-spec/pull/746#issuecomment-740914167).

### \_Typename is not valid at subscription root

`__typename` does not return an async iterator and has been deemed not useful at the root of a subscription operation, yet it is allowed by GraphQL validation. This field has caused some confusion in the community, and the WG has proposed explicitly validating it to prevent the field to catch these issues earlier.

### Default value coercion

There's inconsistency in the handling of default values between user-supplied defaults (i.e. variables in operation documents) and schema-supplied defaults (for arguments or input object fields). The WG discussed ways in which a poorly constructed GraphQL schema can break the type safety guarantees of GraphQL and proposed addressing this by making schema defaults operate in a more expected manner. Next steps are to get an implementation finished so that we can advance the spec changes to stage 2.

## In Other News...

- [Federated GraphQL @ Walmart](https://medium.com/walmartglobaltech/federated-graphql-walmart-bfc85c2553de)
- [Apollo Extends Explorer GraphQL IDE to Development Environments](https://thenewstack.io/apollo-extends-explorer-graphql-ide-to-development-environments/)
- [How Netflix Scales its API with GraphQL Federation (Part 2)](https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-2-bbe71aaec44a)
- [Hasura launched a 3 week series of articles, live-streams, and A.M.As for GraphQL beginners and experts.](https://hasura.io/blog/graphql-january-with-hasura/)
- [Prisma announced Nexus 1.0: A Major Release for Type-Safe, Code-First GraphQL APIs](https://www.prisma.io/blog/announcing-the-release-of-nexus-schema-v1-b5eno5g08d0b)
- ZDNet: [2021 Technology trend review: Cloud, Kubernetes, and GraphQL](https://zdnet.com/article/2021-technology-trend-review-part-1-blockchain-cloud-open-source/)
- TechTarget: [Enterprise application trends that will impact 2021: GraphQL vs. REST choice steers microservices development](https://searchapparchitecture.techtarget.com/feature/Enterprise-application-trends-that-will-impact)
- [Top 20 GraphQL Jobs Postings](https://www.dice.com/jobs/q-GraphQL-jobs)
- GraphQL Galaxy’s talk uploaded online, [check out the Keynote](https://youtu.be/mfg6ZJ2GGRc)!
- The [new Schema Stitching Handbook was released](https://the-guild.dev/blog/a-new-year-for-schema-stitching), together with examples and video walkthrough with everything you need to know about Federated/Distributed GraphQL Gateways
- [The Guild announced GraphQL Modules 1.0](https://the-guild.dev/blog/graphql-modules-v1) as a major rewrite after 3 years of experience. The new version includes better simplicity and performance
- With [GraphQL Mesh](https://graphql-mesh.com/) you can now wrap any existing API and add reactivity to it - check out [this blog post about how to do it](https://the-guild.dev/blog/add-reactivity-to-an-existing-source)
- [spotify-graphql is approaching v2.0](https://twitter.com/whereischarly/status/1349467930166239232?s=20) as a complete rewrite, instead of manual code it uses GraphQL Mesh under the hood to generate the API
- Software Engineering Daily: [Podcast with DGraph’s Manit Jain](https://softwareengineeringdaily.com/2021/01/19/dgraph-native-graphql-database-with-manish-jain/)

## Upcoming Events:

- Asia’s largest [GraphQL conference](https://graphql.asia/) is back! February 24th & 25th

## Get Involved!

Developers can get involved in the community and contribute to the project at [https://github.com/graphql](https://github.com/graphql).

Organizations interested in becoming members of the GraphQL Foundation or the GraphQL Specification can learn more on our [member page](/foundation/join/). If you have questions about membership, please send an email to [membership@graphql.org](mailto:membership@graphql.org).

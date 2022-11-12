---
title: GraphQL Foundation Monthly Newsletter June 2021
tags: ["newsletter"]
layout: blog
date: 2021-06-30
byline: GraphQL Foundation
permalink: /blog/2021-06-30-graphql-foundation-monthly-newsletter-june-2021
---

# GraphQL Foundation Monthly Newsletter 2021

[GraphQL](https://graphql.org/) has redefined how developers work with APIs and client-server interactions. And as the community works hard to foster the growth and adoption of GraphQL, we are excited to share the work of the community and discussions via the monthly GraphQL Foundation newsletter.

GraphQL reached new heights in 2020 and is only poised to continue it’s meteoric rise in 2021. Thank you again for your involvement in this project and your support of the GraphQL Foundation. We are excited for another productive year!

## Working Group Updates

### GraphQL Foundation marketing committee

The newly created GraphQL Foundation marketing committee is responsible for coordinating marketing activities in support of the [Foundation](https://foundation.graphql.org/) and the [projects](https://github.com/graphql). They meet regularly, and welcome participation from Foundation and community members.

The meeting agendas and minutes are open and available in [meetings/](https://github.com/graphql/marketing/blob/main/meetings). We generally meet on the fourth Thursday of the month at 9am PT. To be added to the recurring invite, please contact [operations@graphql.org](mailto:operations@graphql.org).

### [Release plan for next version of GraphQL specification](https://github.com/graphql/graphql-spec/milestone/2)

The next release is in the final stages of review and is anticipated to be released soon. Details on the release are TBD.


## Schema Coordinates update

The WG is evaluating  how to use Schema Coordinates (e.g. what can we improve by using schema coordinates, and is Looking for support in advancing from Draft to Accepted.


## Full unicode support

The WG is looking for support in advancing this iteration from Proposal to Draft. Most notably full unicode is already supported today, albeit without having explicit tests for it. 

The only new code that is added is the verification of the surrogate pairs. The current implementation allows for invalid surrogate pairs.

### Fragment Arguments RFC

For the past 5+ years, Relay has had the [@arguments directive](https://relay.dev/docs/api-reference/graphql-and-directives/#arguments), which is not spec compliant. In some sense, Relay is a _dual GraphQL client_: there's Relay syntax which is used to resolve data available locally on the client, and then that syntax compiles down into a spec compliant syntax to resolve data from an external source (aka a "server"), which hydrates a graph of "local" data the relay-specific resolvers operate over.

This means Relay can get away with having user-written fragments that are freed from operation-defined knowledge: Relay's fragments can be provided with variable values that were never defined at the operation level, to use when resolving arguments.


## Roundtable discussion on @defer/@stream

Read the lengthy and informative conversation [here](https://github.com/graphql/graphql-wg/blob/main/notes/2021-06-03.md), or watch on Youtube [here](https://www.youtube.com/watch?v=d4HhIo82Whg&list=PLP1igyLx8foH30_sDnEZnxV_8pYW3SDtb&index=1).

### graphql-js update on the Typescript migration

The working group will be converting as much of graphql-js to TypeScript as possible, which will probably need some breaking changes due to default values and other changes. One of the aims is to also be readable so they might release these breaking changes along with the TypeScript migration.

### Default Value Coercion RFC

The WG has spent several weeks working to integrate the default value changes into GraphQL Ruby, which has resulted in several architectural discussions and some bug reports. 

### Glossary RFC

The purpose of this RFC is to add clarity and precision, especially after the many meanings of a query. The WG is working to define the terms first, then will revisit extracting it into an appendix.

### Query Level Nullability RFC

Used by many including Yelp and Netflix, the proposal is to allow queries that can include a non-null designator (!) to indicate that a field should be treated non-nullable and if it returns null it should escalate following the standard GraphQL error bubbling.


## In Other News...

*   Database, Trends & Applications: [Hasura Adds the Ability to Access Existing Data and Move it with GraphQL API](https://www.dbta.com/Editorial/News-Flashes/Hasura-Adds-the-Ability-to-Access-Existing-Data-and-Move-it-with-GraphQL-API-147680.aspx)
*   InfoQ: [Rebuilding Twitter's Public API](https://www.infoq.com/presentations/twitter-public-api/)
*   ZDNet: [MuleSoft adds DataGraph to Anypoint Platform to streamline API requests](https://www.zdnet.com/article/mulesoft-adds-datagraph-to-anypoint-platform-streamlining-api-requests/)


## Upcoming Events:

*   [GraphQL Conf. 2021](https://graphqlconf.org/) - September 29th


## Get Involved!

Developers can get involved in the community and contribute to the project at [https://github.com/graphql](https://github.com/graphql).

Organizations interested in becoming members of the GraphQL Foundation or the GraphQL Specification can learn more on our [member page](https://graphql.org/foundation/join). If you have questions about membership, please send an email to membership@graphql.org.



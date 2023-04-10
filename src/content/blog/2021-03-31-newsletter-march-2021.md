---
title: GraphQL Foundation Monthly Newsletter March 2021
tags: ["newsletter"]
layout: blog
date: 2021-03-31
byline: GraphQL Foundation
permalink: /blog/2021-03-31-graphql-foundation-monthly-newsletter-march-2021
---

[GraphQL](https://graphql.org/) has redefined how developers work with APIs and client-server interactions. And as the community works hard to foster the growth and adoption of GraphQL, we are excited to share the work of the community and discussions via the monthly GraphQL Foundation newsletter.

GraphQL reached new heights in 2020 and is only poised to continue it’s meteoric rise in 2021. Thank you again for your involvement in this project and your support of the GraphQL Foundation. We are excited for another productive year!

## Working Group Updates

**GraphQL Foundation marketing committee**

The newly created GraphQL Foundation marketing committee is responsible for coordinating marketing activities in support of the [Foundation](https://foundation.graphql.org/) and the [projects](https://github.com/graphql). They meet regularly, and welcome participation from Foundation and community members.

The meeting agendas and minutes are open and available in [meetings/](https://github.com/graphql/marketing/blob/main/meetings). We generally meet on the fourth Thursday of the month at 9am PT. To be added to the recurring invite, please contact operations@graphql.org.

**Allowing fields to diverge more**

This is one of the most complicated validation rules, which is about overlapping fields and not forcing to ensure every field is unique in a query, especially if you compose queries. They have to be merged together and ensure the field is only executed once. There's a rule to ensure this merging can be done.

The working group has agreed to add prose or a non-normative note to this validation rule to explain this.

**Operation Expressions**

Operation expressions is an extension to the Schema Coordinates syntax that allows for a host of new use cases. Outlined [here](https://github.com/graphql/graphql-spec/pull/823) are some of the use cases that have been discussed so far, and have iterated on the syntax, but everything in this is very much in flux.

**Directions via introspection report**

Custom directives are not currently introspectable. This has been a big discussion over the years. Recently, graphql-java has implemented (almost merged) the ability to query directive by introspection.

**Oneof Input Objects and Oneof Fields**

Oneof Input Objects are a special variant of Input Objects where the type system asserts that exactly one of the fields must be set and non-null, all others being omitted. This is represented in introspection with the `__Type.oneField: Boolean` field, and in SDL via the `@oneOf` directive on the input object. The working group has agreed to Contribute syntax thoughts and on the RFC itself, and write an implementation in GraphQL.js

## In Other News...

- ZDNet: [Databases, graphs, and GraphQL: The past, present, and future](https://www.zdnet.com/article/databases-graphs-and-graphql-past-present-and-future/)
- ZDNet: [Hasura connects GraphQL to the REST of the world](https://www.zdnet.com/article/hasura-connects-graphql-to-the-rest-of-the-world/)
- ADT Mag: [Netflix Open Sources GraphQL for Spring Boot](https://adtmag.com/articles/2021/02/17/netflix-open-sources-graphql-for-spring-boot.aspx)
- ProgrammableWeb: [Facebook Adds Relay Hooks for Improved GraphQL Data Fetching](https://www.programmableweb.com/news/facebook-adds-relay-hooks-improved-graphql-data-fetching/brief/2021/03/11)
- [Dgraph Labs Launches Slash GraphQL, Industry’s First GraphQL-Native Database Backend-As-A-Service](https://www.globenewswire.com/news-release/2020/09/10/2091563/0/en/Dgraph-Labs-Launches-Slash-GraphQL-Industry-s-First-GraphQL-Native-Database-Backend-As-A-Service.html)
- [How Square accelerates product development with Apollo GraphQL](https://www.apollographql.com/blog/how-square-accelerates-product-development-with-apollo-graphql/)
- [Netflix: Beyond REST Rapid Development with GraphQL Microservices](https://netflixtechblog.com/beyond-rest-1b76f7c20ef6)
- [The Guild announce early access to GraphQL Hive - A new Schema Registry for your GraphQL Workflows](https://the-guild.dev/blog/graphql-hive-preview)

## Upcoming Events:

- The GraphQL community will come together once again for [GraphQL Summit](https://summit.graphql.com/) April 7th & 8th

## Get Involved!

Developers can get involved in the community and contribute to the project at [https://github.com/graphql](https://github.com/graphql).

Organizations interested in becoming members of the GraphQL Foundation or the GraphQL Specification can learn more on our [member page](https://foundation.graphql.org/join). If you have questions about membership, please send an email to membership@graphql.org.

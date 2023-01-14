---
title: GraphQL Custom Scalar specifications
tags: ["announcements"]
layout: blog
date: 2023-01-14
byline: Andreas Marek, Donna Zhou
permalink: /blog/2023-01-14-graphql-scalars
---

# Announcing contributed GraphQL custom scalar specifications

We are very happy to announce the official home for contributed GraphQL [custom scalar](https://spec.graphql.org/draft/#sec-Scalars.Custom-Scalars) specifications at [scalars.graphql.org](https://scalars.graphql.org/).

You are welcome to contribute custom scalar specifications (abbreviated as "specs"). Once your spec is merged in, it will be hosted at `scalars.graphql.org/<GitHub-username>/<specification-name>`. See how to contribute on the [contribution guide](https://scalars.graphql.org/readme-contribution-guide).

Our first contributed spec is for [DateTime](https://scalars.graphql.org/andimarek/date-time). You can point users to the spec's URL with the built-in `@specifiedBy` [directive](https://spec.graphql.org/draft/#sec--specifiedBy) in your GraphQL schema.

```graphql
scalar DateTime
  @specifiedBy(url: "https://scalars.graphql.org/andimarek/date-time")
```

## Elevating the GraphQL type system with custom scalars

Custom scalars have been part of the GraphQL spec since day one. They have the unique ability to extend the GraphQL type system with custom types. While custom scalars are powerful, they were more like a black box for the consumers of the API.

Originally, it was very hard for consumers to understand custom scalars as a GraphQL schema did not provide any information apart from its name. For example, it was difficult to understand the exact format of a `DateTime` custom scalar. It was also difficult to know whether the `DateTime` custom scalar in API A was exactly the same as the `DateTime` in API B.

We added the built-in `@specifiedBy` directive some time ago, which assigns a URL for the spec of a custom scalar. This provides a standard way to document custom scalars. The `@specifiedBy` directive is also introspectable.

However, we have since learned that this was not enough. The burden of writing a custom scalar specs and hosting them was left for each API itself to solve.

With the custom scalar spec project, we provide templates for writing custom scalar specs and also host the specs at a GraphQL Foundation owned domain [scalars.graphql.org](https://scalars.graphql.org/). This greatly reduces the effort to clearly document and share your custom scalar specs.

Our hope is that this enables an ecosystem of clearly documented custom scalars and eliminates the need to reinvent popular ones again and again. Ultimately, a popular enough custom scalar will be practically indistinguishable from the built-in ones and elevate the GraphQL type system.

## Get involved!

See how to contribute a custom scalar spec on the [contribution guide](https://scalars.graphql.org/readme-contribution-guide).

If you have any comments or questions, please open an issue on the [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars).

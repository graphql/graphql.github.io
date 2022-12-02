---
title: GraphQL Custom Scalar specifications
tags: ["announcements"]
layout: blog
date: 2022-12-01
byline: Andreas Marek, Donna Zhou
permalink: /blog/2022-12-01-custom-scalars
---

# Announcing contributed GraphQL custom scalar specifications

We are very happy to announce the official home for contributed GraphQL [custom scalar](https://spec.graphql.org/draft/#sec-Scalars.Custom-Scalars) specifications at [scalars.graphql.org](https://scalars.graphql.org/).

You are welcome to [contribute](https://scalars.graphql.org/new-scalar) custom scalar specifications. Once your specification is merged in, it will be hosted at `scalars.graphql.org/<GitHub-username>/<specification-name>`.

Our first contributed specification is for [DateTime](https://scalars.graphql.org/andimarek/date-time). You can point users to the specification's URL with the built-in `@specifiedBy` [directive](https://spec.graphql.org/draft/#sec--specifiedBy) in your GraphQL schema.

```graphql
scalar DateTime @specifiedBy(url: "https://scalars.graphql.org/andimarek/date-time")
```

## Why we need custom scalar specifications
We were inspired to start this project after an incident at work caused by a difference in `DateTime` implementations in two GraphQL services. The problem was a difference in how many digits were used to represent a fraction of a second. This incident highlighted a flaw in the often cited [RFC-3339 specification](https://www.ietf.org/rfc/rfc3339.txt), which does not explicitly state the number of digits to be used to represent a fraction of a second.

To prevent such incidents in the future, we created a [refined version](https://scalars.graphql.org/andimarek/date-time) of the RFC-3339 specification, so that `DateTime` scalars can be consistently implemented in any GraphQL service. We thought others might be interested in our `DateTime` specification too, so we created a [repository](https://github.com/graphql/graphql-scalars) to share custom scalar specifications.

We wanted to make documentation easy and use the built-in `@specifiedBy` directive to reference specifications. We have set up a public and official GraphQL Foundation-owned domain to host specifications. Your contributed specifications will be published at `scalars.graphql.org/<GitHub-username>/<specification-name>`.

You can reference specifications inside a schema as follows:

```graphql
scalar DateTime @specifiedBy(url: "https://scalars.graphql.org/andimarek/date-time")
```

You can also reference specifications inside custom scalar implementations, for example in the `graphql-java-extended-scalars` [DateTime scalar](https://github.com/graphql-java/graphql-java-extended-scalars/blob/master/src/main/java/graphql/scalars/datetime/DateTimeScalar.java#L113).

## How to contribute custom scalar specifications
See the [contribution guide](https://scalars.graphql.org/new-scalar) and the [implementation guide](https://scalars.graphql.org/guide). We have included a [general template](https://scalars.graphql.org/template) and a more [simplified template for String-based scalars](https://scalars.graphql.org/template-string).

Open a pull request on the [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars) to add your custom scalar specification. Once merged, your specification will be hosted at `scalars.graphql.org/<GitHub-username>/<specification-name>`.

## Get involved!
If you have any comments or questions, please open an issue on the [graphql-scalars GitHub repository](https://github.com/graphql/graphql-scalars).

We hope to avoid incidents in the future by making it easier to document, standardize, and share custom scalar specifications. We are looking forward to seeing your custom scalar specifications!

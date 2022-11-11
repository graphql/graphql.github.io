---
title: GraphQL Foundation adopts graphql-http
tags: ["newsletter"]
layout: blog
date: 2022-11-07
byline: GraphQL Foundation
permalink: /blog/2022-11-07-graphql-foundation-graphql-http
---

# GraphQL Foundation adopts graphql-http

GraphQL is most commonly served over HTTP. However despite GraphQL being well
specified, this HTTP transport is not. To correct for this, the GraphQL working
group has been working on the [GraphQL over HTTP](https://graphql.github.io/graphql-over-http/draft/)
specification.

Alongside a specification, we prefer a true implementation to have as a
reference. This ensures the ideas we specify can be implemented well, and that
as edge-cases arise in software we can ensure their solutions are reflected in
the specification as well.

For GraphQL over HTTP, this has nominally been [express-graphql](https://github.com/graphql/express-graphql).
This package makes it easy to create a GraphQL serving endpoint from an express
server. However as the Node community has grown over the years, alternatives to
express have emerged and there is no longer one framework to align to. Also, as
our maintenance bandwidth has focused on other projects, express-graphql has
fallen behind.

Luckily, thanks to the focused efforts of [Denis Badurina](https://github.com/enisdenjo),
we have an alternative in [graphql-http](https://github.com/graphql/graphql-http).
Denis has been part of the committee working on the GraphQL over HTTP
specification, and sought to build a dependency-free compliant GraphQL server
that works with most all existing Node and Deno HTTP frameworks.

The decision was made to adopt the [graphql-http](https://github.com/graphql/graphql-http)
project into the GraphQL Foundation (with Denis continuing as the lead
maintainer), as well as to make it the official reference implementation of
GraphQL over HTTP.

We will be deprecating [express-graphql](https://github.com/graphql/express-graphql)
as part of this change, and recommending those using it migrate to graphql-http.

---
title: Introduction
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/intro/
next: /docs/typesystem/
---

GraphQL consists of a type system, query language and execution semantics,
static validation, and type introspection, each outlined below. To guide you
through each of these components, we've written an example designed to
illustrate the various pieces of GraphQL. This example is included in the
[GraphQL.js](https://github.com/graphql/graphql-js) reference implementation
as a set of [end-to-end tests](https://github.com/graphql/graphql-js/tree/master/src/__tests__).

This example is not comprehensive, but it is designed to quickly introduce
the core concepts of GraphQL, to provide some context before diving into
the more detailed specification or the [GraphQL.js](https://github.com/graphql/graphql-js)
reference implementation.

The premise of the example is that we want to use GraphQL to query for
information about characters and locations in the original Star Wars
trilogy.

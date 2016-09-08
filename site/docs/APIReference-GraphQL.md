---
title: GraphQL
layout: ../_core/CodeLayout
category: API Reference
permalink: /docs/api-reference-graphql/
next: /docs/api-reference-language/
---

The `graphql` module exports a core subset of GraphQL functionality for creation
of GraphQL type systems and servers.

```js
import { ... } from 'graphql'; // ES6
var GraphQL = require('graphql'); // CommonJS
```

## Overview

*Entry Point*

<ul class="apiIndex">
  <li>
    <a href="#graphql">
      <pre>function graphql</pre>
      Lexes, parses, validates, and executes a GraphQL request on a schema.
    </a>
  </li>
</ul>

*Schema*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-type-system/#graphqlschema">
      <pre>class GraphQLSchema</pre>
      A representation of the capabilities of a GraphQL Server.
    </a>
  </li>
</ul>

*Type Definitions*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-type-system/#graphqlscalartype">
      <pre>class GraphQLScalarType</pre>
      A scalar type within GraphQL.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlobjecttype">
      <pre>class GraphQLObjectType</pre>
      An object type within GraphQL that contains fields.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlinterfacetype">
      <pre>class GraphQLInterfaceType</pre>
      An interface type within GraphQL that defines fields implementations will contain.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqluniontype">
      <pre>class GraphQLUnionType</pre>
      A union type within GraphQL that defines a list of implementations.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlenumtype">
      <pre>class GraphQLEnumType</pre>
      An enum type within GraphQL that defines a list of valid values.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlinputobjecttype">
      <pre>class GraphQLInputObjectType</pre>
      An input object type within GraphQL that represents structured inputs.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqllist">
      <pre>class GraphQLList</pre>
      A type wrapper around other types that represents a list of those types.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlnonnull">
      <pre>class GraphQLNonNull</pre>
      A type wrapper around other types that represents a non-null version of those types.
    </a>
  </li>
</ul>

*Scalars*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-type-system/#graphqlint">
      <pre>var GraphQLInt</pre>
      A scalar type representing integers.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlfloat">
      <pre>var GraphQLFloat</pre>
      A scalar type representing floats.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlstring">
      <pre>var GraphQLString</pre>
      A scalar type representing strings.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlboolean">
      <pre>var GraphQLBoolean</pre>
      A scalar type representing booleans.
    </a>
  </li>
  <li>
    <a href="../api-reference-type-system/#graphqlid">
      <pre>var GraphQLID</pre>
      A scalar type representing IDs.
    </a>
  </li>
</ul>

*Errors*

<ul class="apiIndex">
  <li>
    <a href="../api-reference-errors/#formaterror">
      <pre>function formatError</pre>
      Format an error according to the rules described by the Response Format.
    </a>
  </li>
</ul>

## Entry Point

### graphql

```js
graphql(
  schema: GraphQLSchema,
  requestString: string,
  rootValue?: ?any,
  contextValue?: ?any,
  variableValues?: ?{[key: string]: any},
  operationName?: ?string
): Promise<GraphQLResult>
```

The `graphql` function lexes, parses, validates and executes a GraphQL request.
It requires a `schema` and a `requestString`. Optional arguments include a
`rootValue`, which will get passed as the root value to the executor, a `contextValue`,
which will get passed to all resolve functions,
`variableValues`, which will get passed to the executor to provide values for
any variables in `requestString`, and `operationName`, which allows the caller
to specify which operation in `requestString` will be run, in cases where
`requestString` contains multiple top-level operations.

## Schema

See the [Type System API Reference](../api-reference-type-system#schema).

## Type Definitions

See the [Type System API Reference](../api-reference-type-system#definitions).

## Scalars

See the [Type System API Reference](../api-reference-type-system#scalars).

## Errors

See the [Errors API Reference](../api-reference-errors)

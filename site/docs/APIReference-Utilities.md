---
title: Utilities
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-utilities/
---

The `graphql/utilities` module contains common useful computations to use with
the GraphQL language and type objects.

```js
import { ... } from 'graphql/utilities'; // ES6
var GraphQLUtilities = require('graphql/utilities'); // CommonJS
```

## Overview

*Introspection*

<ul class="apiIndex">
  <li>
    <a href="#introspectionquery">
      <pre>var introspectionQuery</pre>
      A GraphQL introspection query containing enough information to reproduce a type system.
    </a>
  </li>
  <li>
    <a href="#buildclientschema">
      <pre>function buildClientSchema</pre>
      Produces a client schema given the result of querying a schema with `introspectionQuery`.
    </a>
  </li>
</ul>

*Schema Language*

<ul class="apiIndex">
  <li>
    <a href="#printschema">
      <pre>function printSchema</pre>
      Prints the schema in a standard format.
    </a>
  </li>
  <li>
    <a href="#printintrospectionschema">
      <pre>function printIntrospectionSchema</pre>
      Prints the introspections featurs of the schema in a standard format.
    </a>
  </li>
  <li>
    <a href="#buildastschema">
      <pre>function buildASTSchema</pre>
      Builds a schema from a parsed AST Schema.
    </a>
  </li>
  <li>
    <a href="#typefromast">
      <pre>function typeFromAST</pre>
      Looks up a type referenced in an AST in the GraphQLSchema.
    </a>
  </li>
  <li>
    <a href="#astfromvalue">
      <pre>function astFromValue</pre>
      Produces a GraphQL Input Value AST given a JavaScript value.
    </a>
  </li>
</ul>

*Visitors*

<ul class="apiIndex">
  <li>
    <a href="#typeinfo">
      <pre>class TypeInfo</pre>
      Tracks type and field definitions during a visitor AST traversal..
    </a>
  </li>
</ul>

*Value Validation*

<ul class="apiIndex">
  <li>
    <a href="#isvalidjsvalue">
      <pre>function isValidJSValue</pre>
      Determins if a JavaScript value is valid for a GraphQL type.
    </a>
  </li>
  <li>
    <a href="#isvalidliteralvalue">
      <pre>function isValidLiteralValue</pre>
      Determins if a literal value from an AST is valid for a GraphQL type.
    </a>
  </li>
</ul>

## Introspection

### introspectionQuery

```js
var introspectionQuery: string
```

A GraphQL query that queries a server's introspection system for enough
information to reproduce that server's type system.

### buildClientSchema

```js
function buildClientSchema(
  introspection: IntrospectionQuery
): GraphQLSchema
```

Build a GraphQLSchema for use by client tools.

Given the result of a client running the introspection query, creates and
returns a GraphQLSchema instance which can be then used with all graphql-js
tools, but cannot be used to execute a query, as introspection does not
represent the "resolver", "parse" or "serialize" functions or any other
server-internal mechanisms.

## Schema Representation

### printSchema

```js
function printSchema(schema: GraphQLSchema): string {
```

Prints the provided schema in the Schema Language format.

### printIntrospectionSchema

```js
function printIntrospectionSchema(schema: GraphQLSchema): string {
```

Prints the built-in introspection schema in the Schema Language format.

### buildASTSchema

```js
function buildASTSchema(
  ast: SchemaDocument,
  queryTypeName: string,
  mutationTypeName: ?string
): GraphQLSchema
```

This takes the ast of a schema document produced by `parseSchemaIntoAST` in
`graphql/language/schema` and constructs a GraphQLSchema instance which can be
then used with all graphql-js tools, but cannot be used to execute a query, as
introspection does not represent the "resolver", "parse" or "serialize"
functions or any other server-internal mechanisms.

### typeFromAST

```js
function typeFromAST(
  schema: GraphQLSchema,
  inputTypeAST: Type
): ?GraphQLType
```

Given the name of a Type as it appears in a GraphQL AST and a Schema, return the
corresponding GraphQLType from that schema.

### astFromValue

```js
function astFromValue(
  value: any,
  type?: ?GraphQLType
): ?Value
```
Produces a GraphQL Input Value AST given a JavaScript value.

Optionally, a GraphQL type may be provided, which will be used to
disambiguate between value primitives.

## Visitors

### TypeInfo

```js
class TypeInfo {
  constructor(schema: GraphQLSchema)
  getType(): ?GraphQLOutputType {
  getParentType(): ?GraphQLCompositeType {
  getInputType(): ?GraphQLInputType {
  getFieldDef(): ?GraphQLFieldDefinition {
  getDirective(): ?GraphQLDirective {
  getArgument(): ?GraphQLArgument {
}
```

TypeInfo is a utility class which, given a GraphQL schema, can keep track
of the current field and type definitions at any point in a GraphQL document
AST during a recursive descent by calling `enter(node)` and `leave(node)`.

## Value Validation

### isValidJSValue

```js
function isValidJSValue(value: any, type: GraphQLInputType): string[]
```

Given a JavaScript value and a GraphQL type, determine if the value will be
accepted for that type. This is primarily useful for validating the
runtime values of query variables.

### isValidLiteralValue

```js
function isValidLiteralValue(
  type: GraphQLInputType,
  valueAST: Value
): string[]
```

Utility for validators which determines if a value literal AST is valid given
an input type.

Note that this only validates literal values, variables are assumed to
provide values of the correct type.

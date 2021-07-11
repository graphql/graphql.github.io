---
title: graphql/schema-coordinates
layout: docs
category: API Reference
permalink: /graphql-js/schema-coordinates/
sublinks: parseSchemaCoordinate,printSchemaCoordinate,nodeFromSchemaCoordinate,schemaCoordinateFromNode
next: /graphql-js/type/
---

The `graphql/schema-coordinates` module is responsible for parsing and working with Schema Coordinates. You can import either from the `graphql/schema-coordinates` module, or from the root `graphql` module. For example:

```js
import { SchemaCoordinates } from 'graphql'; // ES6
var { SchemaCoordinates } = require('graphql'); // CommonJS
```

## Overview

<ul class="apiIndex">
  <li>
    <a href="#parseSchemaCoordinate">
      <pre>function parseSchemaCoordinate</pre>
      Parses a Schema Coordinate string according to the Schema Coordinate Grammar
    </a>
  </li>
  <li>
    <a href="#printSchemaCoordinate">
      <pre>function printSchemaCoordinate</pre>
      Prints a Schema Coordinate string from its AST
    </a>
  </li>
  <li>
    <a href="#nodeFromSchemaCoordinate">
      <pre>function nodeFromSchemaCoordinate</pre>
      Returns a GraphQL AST node from its Schema Coordinate and Schema
    </a>
  </li>
  <li>
    <a href="#schemaCoordinateFromNode">
      <pre>function schemaCoordinateFromNode</pre>
      Returns the Schema Coordinate of a GraphQL Schema AST node
    </a>
  </li>
</ul>

## SchemaCoordinates

### parseSchemaCoordinate

```js
function parseSchemaCoordinate(schemaCoordinate: string): SchemaCoordinateAST
```

Takes a Schema Coordinate as a string, and returns its corresponding AST
representation.

### printSchemaCoordinate

```js
function printSchemaCoordinate(schemaCoordinateAST: SchemaCoordinateAST): string
```

Serializes a Schema Coordinate AST back into a Schema Coordinate string.

### nodeFromSchemaCoordinate

```js
function nodeFromSchemaCoordinate(
    schemaCoordinate: string,
    schema: GraphQLSchema,
): ?ASTNode // TODO: Define some subset of ASTNode that Schema Coordinates can represent
```

Takes a Schema Coordinate and a GraphQLSchema and returns the AST node of the
corresponding type, field, argument, enum value, or directive in the Schema.

### schemaCoordinateFromNode

```js
function schemaCoordinateFromNode(
    // TODO: confirm we can walk up the tree with an ASTNode (such that we don't need a GraphQLSchema as an argument too)
    node: ASTNode,
): ?string
```

Takes a GraphQL Schema AST Node and returns its Schema Coordinate string
representation.
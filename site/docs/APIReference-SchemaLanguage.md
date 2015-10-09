---
title: Schema Language
layout: ../_core/DocsLayout
category: API Reference
permalink: /docs/api-reference-schema-language/
next: /docs/api-reference-utilities/
---

The `graphql/language/schema` module is responsible for parsing and operating on
the GraphQL schema definition language.

```js
import { ... } from 'graphql/language/schema'; // ES6
var GraphQLSchemaLanguage = require('graphql/language/schema'); // CommonJS
```

## Overview

*Parser*

<ul class="apiIndex">
  <li>
    <a href="#parseschemaintoast">
      <pre>function parseSchemaIntoAST</pre>
      Parses a string representation of a schema into a Schema AST
    </a>
  </li>
  <li>
    <a href="#kind">
      <pre>var Kind</pre>
      Represents the various kinds of parsed Schema AST nodes.
    </a>
  </li>
</ul>

*Visitor*

<ul class="apiIndex">
  <li>
    <a href="#visitschema">
      <pre>function visitSchema</pre>
      A general-purpose visitor to traverse a parsed GraphQL Schema AST
    </a>
  </li>
</ul>

*Printer*

<ul class="apiIndex">
  <li>
    <a href="#printschema">
      <pre>function printSchema</pre>
      Prints the schema AST in a standard format.
    </a>
  </li>
</ul>

## Parser

### parseSchemaIntoAST

```js
export function parseSchemaIntoAST(
  source: Source | string,
  options?: ParseOptions
): SchemaDocument
```

Given a schema string, parses it into a Schema AST.

#### Example

```js
var schemaAST = parseSchemaIntoAST('type Hello { world: String }');
```

### Kind

An enum that describes the different kinds of Schema AST nodes.

## Visitor

### visitSchema

```js
export function visitSchema(root, visitor, keys); any
```

The equivalent of `graphql/language`'s
**[visit](../api-reference-language/#visit)** method, but for
schema ASTs parsed by `parseSchemaIntoAST`.

## Printer

### printSchema

```
function printSchema(ast): string
```

Converts a Schema AST into a string, using one set of reasonable
formatting rules.

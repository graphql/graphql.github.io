---
title: Schemas and Types
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/schema/
next: /docs/schema/
---

### ToC

* Type system
* Type language
* Basics (Schema, Objects & Fields)
* Scalars & Enums
* Lists & NonNull (mention error handling)
* Interfaces & Unions

### Type system

If you've seen a GraphQL query before, you know that the GraphQL query language is basically about selecting fields on objects. So, for example, in the following query:

```graphql
{
  hero {
    name
    appearsIn
  }
}
```

1. We start with the a special "root" object
2. We select the `hero` field on that
3. For each object returned by `hero`, we select the `name` and `appearsIn` fields

So you can predict what the query will return without knowing that much about the server. But the question remains - what fields can we select? What kinds of objects might they return? What fields are available on those sub-objects? That's where the schema comes in.

Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

### Type language

GraphQL services can be written in any language. Since we can't rely on a specific programming language syntax, like JavaScript, to talk about GraphQL schemas, we'll define our own simple language. We'll use the "GraphQL schema language" - it's similar to the query language, and allows us to talk about GraphQL schemas in a language-agnostic way.

### Objects and fields

The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:

```graphql
type Character {
  name: String!
  appearsIn: [Episode]
}
```

The language is pretty readable, but let's go over it so that we can have a shared vocabulary:

- `Character` is a _GraphQL Object Type_, meaning it's a type with some fields. Most of the types in your schema will be object types.
- `name` and `appearsIn` are _fields_ on the `Character` type. That means that `name` and `appearsIn` are the only fields that can appear in any part of a GraphQL query that operates on the `Character` type.
- `String` is one of the built-in _scalar_ types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.
- `String!` means that the field is _non-nullable_, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
- `[Episode]` represents an _array_ of `Episode` objects. This means that you can always expect an array, with zero or more items, when you query the `appearsIn` field.

Now you know what a GraphQL object type looks like, and how to read the basics of the GraphQL type language.

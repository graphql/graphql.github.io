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
* Arguments (TODO)
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

### The Query and Mutation types

Most types in your schema will just be normal object types, but there are two types that are unique within a schema:

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

Every GraphQL service has exactly zero or one each of the `Query` and `Mutation` types. These types are mostly the same as a regular object type, but they are special because they define the _entry point_ of every GraphQL query. So if you see a query that looks like:

```graphql
query {
  hero {
    name
  }
  droid(id: "2001") {
    name
  }
}
```

That means that the GraphQL service needs to have a `Query` type with `hero` and `droid` fields:

```graphql
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```

Mutations work in a similar way - you define fields on the `Mutation` type, and those are available as the root mutation fields you can call in your query.

It's important to remember that other than this special status, the `Query` and `Mutation` types are the same as any other GraphQL object type, and their fields work exactly the same way.

### Scalar types

A GraphQL object type has a name and fields, but at some point those fields have to resolve to some concrete data. That's where the scalar types come in: they represent the leaves of the query.

In the following query, the `name` and `appearsIn` will resolve to scalar types:

```graphql
{
  hero {
    name
    appearsIn
  }
}
```

We know this because those fields don't have any sub-fields - they are the leaves of the query.

GraphQL comes with a set of default scalar types out of the box:

- `Int`: A signed 32‐bit integer.
- `Float`: A signed double-precision floating-point value.
- `String`: A UTF‐8 character sequence.
- `Boolean`: `true` or `false`.
- `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

In most GraphQL service implementations, there is also a way to specify custom scalar types. For example, we could define a `Date` type:

```graphql
scalar Date
```

Then it's up to our implementation to define how that type should be serialized, deserialized, and validated. For example, you could specify that the `Date` type should always be serialized into an integer timestamp, and your client should know to expect that format for any date fields.

### Enumeration types

Also called _Enums_, enumeration types are a special kind of scalar that is restricted to a particular set of allowed values. This allows you to:

1. Validate that any arguments of this type are one of the allowed values
2. Communicate through the type system that a field will always be one of a finite set of values

Here's what an enum definition might look like in the GraphQL schema language:

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

This means that wherever we use the type `Episode` in our schema, we expect it to be exactly one of `NEWHOPE`, `EMPIRE`, or `JEDI`.

Note that GraphQL service implementations in various languages will have their own language-specific way to deal with enums. In languages that support enums as a first-class citizen, the implementation might take advantage of that; in a language like JavaScript with no enum support, these values might be internally mapped to a set of integers. However, this should not leak out to the client, which will operate entirely in terms of the string names of the values.

### Lists and Non-Null

Object types, scalars, and enums are the only kinds of types you can define in GraphQL. But when you use the types in other parts of the schema, or in your query variable declarations, you can apply additional _type modifiers_ that affect validation of those values. Let's look at an example:

```graphql
type Character {
  name: String!
  appearsIn: [Episode]
}
```

Here, we're using a `String` type and marking it as _Non-Null_ by adding an exclamation mark, `!` after the type name. This means that our server always expects to return a non-null value for this field, and if it ends up getting a null value that will actually trigger a GraphQL execution error, letting the client know that something has gone wrong.

The Non-Null type modifier can also be used when defining arguments for a field, which will cause the GraphQL server to return a validation error if a null value is passed as that argument, whether in the GraphQL string or in the variables.

Lists work in a similar way: We can use a type modifier to mark a type as a `List`, which indicates that this field will return an array of that type. In the schema language, this is denoted by wrapping the type in square brackets, `[` and `]`. It works the same for arguments, where the validation step will expect an array for that value.

The Non-Null and List modifiers can be combined. For example, you can have a List of Non-Null Strings:

```graphql
myField: [String!]
```

This means that the _list itself_ can be null, but it can't have any null members. For example, in JSON:

```js
myField: null // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
```

Now, let's say we defined a Non-Null List of Strings:

```graphql
myField: [String]!
```

This means that the list itself cannot be null, but it can contain null values:

```js
myField: null // error
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```

You can arbitrarily nest any number of Non-Null and List modifiers, according to your needs.

### Interfaces

Like many type systems, GraphQL supports interfaces. An _Interface_ is an abstract type that includes a certain set of fields that a type must include to implement the interface.

For example, you could have an interface `Character` that represents any character in the Star Wars trilogy:

```graphql
interface Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
}
```

This means that any type that _implements_ `Character` needs to have these exact fields, with these arguments and return types.

For example, here are some types that might implement `Character`:

```graphql
type Human : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

type Droid : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  primaryFunction: String
}
```

You can see that both of these types have all of the fields from the `Character` interface, but also bring in extra fields, `homePlanet` and `primaryFunction`, that are specific to that particular type of character.

Interfaces are useful when you want to return an object or set of objects, but those might be of several different types. For example, in the following query:

```graphql
query HeroForEpisode($ep: Episode!){
  hero(episode: $ep) {
    name
  }
}
```

The `hero` field returns the type `Character`, which means it might be either a `Human` or a `Droid` depending on the `episode` argument. In the query above, you can only ask for fields that exist on the `Character` interface, and to ask for a field on the concrete type, you need to use a fragment:

```graphql
query HeroForEpisode($ep: Episode!){
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

Learn more about this in the [conditional fragments](XXX) section in the query guide.

### Union types

Union types are very similar to interfaces, but they don't get to specify any common fields between the types.

XXX no example in SWAPI

```graphql
union SearchResult = Photo | Person

type Person {
  name: String
  age: Int
}

type Photo {
  height: Int
  width: Int
}
```

In this case, if you query a field that returns the `SearchResult` union type, you need to use a conditional fragment to be able to query any fields at all.

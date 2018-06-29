---
title: Schemas and Types
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/schema/
next: /learn/validation/
sublinks: Type System,Type Language,Object Types and Fields,Arguments,The Query and Mutation Types,Scalar Types,Enumeration Types,Lists and Non-Null,Interfaces,Union Types,Input Types
---

On this page, you'll learn all you need to know about the GraphQL type system and how it describes what data can be queried. Since GraphQL can be used with any backend framework or programming language, we'll stay away from implementation-specific details and talk only about the concepts.

### Type system

If you've seen a GraphQL query before, you know that the GraphQL query language is basically about selecting fields on objects. So, for example, in the following query:

```graphql
# { "graphiql": true }
{
  hero {
    name
    appearsIn
  }
}
```

1. We start with a special "root" object
2. We select the `hero` field on that
3. For the object returned by `hero`, we select the `name` and `appearsIn` fields

Because the shape of a GraphQL query closely matches the result, you can predict what the query will return without knowing that much about the server. But it's useful to have an exact description of the data we can ask for - what fields can we select? What kinds of objects might they return? What fields are available on those sub-objects? That's where the schema comes in.

Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

### Type language

GraphQL services can be written in any language. Since we can't rely on a specific programming language syntax, like JavaScript, to talk about GraphQL schemas, we'll define our own simple language. We'll use the "GraphQL schema language" - it's similar to the query language, and allows us to talk about GraphQL schemas in a language-agnostic way.

### Object types and fields

The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

The language is pretty readable, but let's go over it so that we can have a shared vocabulary:

- `Character` is a _GraphQL Object Type_, meaning it's a type with some fields. Most of the types in your schema will be object types.
- `name` and `appearsIn` are _fields_ on the `Character` type. That means that `name` and `appearsIn` are the only fields that can appear in any part of a GraphQL query that operates on the `Character` type.
- `String` is one of the built-in _scalar_ types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.
- `String!` means that the field is _non-nullable_, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
- `[Episode]!` represents an _array_ of `Episode` objects. Since it is also _non-nullable_, you can always expect an array (with zero or more items) when you query the `appearsIn` field.

Now you know what a GraphQL object type looks like, and how to read the basics of the GraphQL type language.

### Arguments

Every field on a GraphQL object type can have zero or more arguments, for example the `length` field below:

```graphql
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```

All arguments are named. Unlike languages like JavaScript and Python where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically. In this case, the `length` field has one defined argument, `unit`.

Arguments can be either required or optional. When an argument is optional, we can define a _default value_ - if the `unit` argument is not passed, it will be set to `METER` by default.

### The Query and Mutation types

Most types in your schema will just be normal object types, but there are two types that are special within a schema:

```graphql
schema {
  query: Query
  mutation: Mutation
}
```

Every GraphQL service has a `query` type and may or may not have a `mutation` type. These types are the same as a regular object type, but they are special because they define the _entry point_ of every GraphQL query. So if you see a query that looks like:

```graphql
# { "graphiql": true }
query {
  hero {
    name
  }
  droid(id: "2000") {
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

It's important to remember that other than the special status of being the "entry point" into the schema, the `Query` and `Mutation` types are the same as any other GraphQL object type, and their fields work exactly the same way.

### Scalar types

A GraphQL object type has a name and fields, but at some point those fields have to resolve to some concrete data. That's where the scalar types come in: they represent the leaves of the query.

In the following query, the `name` and `appearsIn` fields will resolve to scalar types:

```graphql
# { "graphiql": true }
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

Note that GraphQL service implementations in various languages will have their own language-specific way to deal with enums. In languages that support enums as a first-class citizen, the implementation might take advantage of that; in a language like JavaScript with no enum support, these values might be internally mapped to a set of integers. However, these details don't leak out to the client, which can operate entirely in terms of the string names of the enum values.

### Lists and Non-Null

Object types, scalars, and enums are the only kinds of types you can define in GraphQL. But when you use the types in other parts of the schema, or in your query variable declarations, you can apply additional _type modifiers_ that affect validation of those values. Let's look at an example:

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

Here, we're using a `String` type and marking it as _Non-Null_ by adding an exclamation mark, `!` after the type name. This means that our server always expects to return a non-null value for this field, and if it ends up getting a null value that will actually trigger a GraphQL execution error, letting the client know that something has gone wrong.

The Non-Null type modifier can also be used when defining arguments for a field, which will cause the GraphQL server to return a validation error if a null value is passed as that argument, whether in the GraphQL string or in the variables.

```graphql
# { "graphiql": true, "variables": { "id": null } }
query DroidById($id: ID!) {
  droid(id: $id) {
    name
  }
}
```

Lists work in a similar way: We can use a type modifier to mark a type as a `List`, which indicates that this field will return an array of that type. In the schema language, this is denoted by wrapping the type in square brackets, `[` and `]`. It works the same for arguments, where the validation step will expect an array for that value.

The Non-Null and List modifiers can be combined. For example, you can have a List of Non-Null Strings:

```graphql
myField: [String!]
```

This means that the _list itself_ can be null, but it can't have any null members. For example, in JSON:

```js
myField: null // valid
myField: [] // valid
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
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```

You can arbitrarily nest any number of Non-Null and List modifiers, according to your needs.

### Interfaces

Like many type systems, GraphQL supports interfaces. An _Interface_ is an abstract type that includes a certain set of fields that a type must include to implement the interface.

For example, you could have an interface `Character` that represents any character in the Star Wars trilogy:

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

This means that any type that _implements_ `Character` needs to have these exact fields, with these arguments and return types.

For example, here are some types that might implement `Character`:

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

You can see that both of these types have all of the fields from the `Character` interface, but also bring in extra fields, `totalCredits`, `starships` and `primaryFunction`, that are specific to that particular type of character.

Interfaces are useful when you want to return an object or set of objects, but those might be of several different types.

For example, note that the following query produces an error:

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI" } }
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    primaryFunction
  }
}
```

The `hero` field returns the type `Character`, which means it might be either a `Human` or a `Droid` depending on the `episode` argument. In the query above, you can only ask for fields that exist on the `Character` interface, which doesn't include `primaryFunction`.

To ask for a field on a specific object type, you need to use an inline fragment:

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI" } }
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

Learn more about this in the [inline fragments](/learn/queries/#inline-fragments) section in the query guide.

### Union types

Union types are very similar to interfaces, but they don't get to specify any common fields between the types.

```graphql
union SearchResult = Human | Droid | Starship
```

Wherever we return a `SearchResult` type in our schema, we might get a `Human`, a `Droid`, or a `Starship`. Note that members of a union type need to be concrete object types; you can't create a union type out of interfaces or other unions.

In this case, if you query a field that returns the `SearchResult` union type, you need to use a conditional fragment to be able to query any fields at all:

```graphql
# { "graphiql": true}
{
  search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}
```

### Input types

So far, we've only talked about passing scalar values, like enums or strings, as arguments into a field. But you can also easily pass complex objects. This is particularly valuable in the case of mutations, where you might want to pass in a whole object to be created. In the GraphQL schema language, input types look exactly the same as regular object types, but with the keyword `input` instead of `type`:

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}
```

Here is how you could use the input object type in a mutation:

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI", "review": { "stars": 5, "commentary": "This is a great movie!" } } }
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

The fields on an input object type can themselves refer to input object types, but you can't mix input and output types in your schema. Input object types also can't have arguments on their fields.

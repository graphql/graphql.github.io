---
title: Type System
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/typesystem/
next: /docs/queries/
---

At the heart of any GraphQL implementation is a description of what types
of objects it can return, described in a GraphQL type system and returned
in the GraphQL Schema.

For our Star Wars example, the
[starWarsSchema.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js)
file in GraphQL.js defines this type system.

The most basic type in the system will be `Human`, representing characters
like Luke, Leia, and Han. All humans in our type system will have a name,
so we define the `Human` type to have a field called "name". This returns
a String, and we know that it is not null (since all `Human`s have a name),
so we will define the "name" field to be a non-nullable String. Using a
shorthand notation that we will use throughout the spec and documentation,
we would describe the human type as:

```
type Human {
  name: String
}
```

This shorthand is convenient for describing the basic shape of a type
system; the JavaScript implementation is more full-featured, and allows types
and fields to be documented. It also sets up the mapping between the
type system and the underlying data; for a test case in GraphQL.js, the
underlying data is a [set of JavaScript objects](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js),
but in most cases the backing data will be accessed through some service, and
this type system layer will be responsible for mapping from types and fields to
that service.

A common pattern in many APIs, and indeed in GraphQL is to give
objects an ID that can be used to refetch the object. So let's add
that to our Human type. We'll also add a string for their home
planet.

```
type Human {
  id: String
  name: String
  homePlanet: String
}
```

Since we're talking about the Star Wars trilogy, it would be useful
to describe what episodes each character appears in. To do so, we'll
first define an enum, which lists the three episodes in the trilogy:

```
enum Episode { NEWHOPE, EMPIRE, JEDI }
```

Now we want to add a field to `Human` describing what episodes they
were in. This will return a list of `Episode`s:

```
type Human {
  id: String
  name: String
  appearsIn: [Episode]
  homePlanet: String
}
```

Now, let's introduce another type, `Droid`:


```
type Droid {
  id: String
  name: String
  appearsIn: [Episode]
  primaryFunction: String
}
```

Now we have two types! Let's add a way of going between them: humans
and droids both have friends. But humans can be friends with both
humans and droids. How do we refer to either a human or a droid?

If we look, we note that there's common functionality between
humans and droids; they both have IDs, names, and episodes
they appear in. So we'll add an interface, `Character`, and make
both `Human` and `Droid` implement it. Once we have that, we can
add the `friends` field, that returns a list of `Character`s.

Our type system so far is:

```
enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

type Human : Character {
  id: String
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

type Droid : Character {
  id: String
  name: String
  friends: [Character]
  appearsIn: [Episode]
  primaryFunction: String
}
```

One question we might ask, though, is whether any of those fields can return
`null`. By default, `null` is a permitted value for any type in GraphQL,
since fetching data to fulfill a GraphQL query often requires talking
to different services that may or may not be available. However, if the
type system can guarantee that a type is never null, then we can mark
it as Non Null in the type system. We indicate that in our shorthand
by adding an "!" after the type. We can update our type system to note
that the `id` is never null.

Note that while in our current implementation, we can guarantee that more
fields are non-null (since our current implementation has hard-coded data),
we didn't mark them as non-null. One can imagine we would eventually
replace our hardcoded data with a backend service, which might not be
perfectly reliable; by leaving these fields as nullable, we allow
ourselves the flexibility to eventually return null to indicate a backend
error, while also telling the client that the error occurred.

```
enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

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

We're missing one last piece: an entry point into the type system.

When we define a schema, we define an object type that is the basis for all
queries. The name of this type is `Query` by convention, and it describes
our public, top-level API. Our `Query` type for this example will look like
this:

```
type Query {
  hero(episode: Episode): Character
  human(id: String!): Human
  droid(id: String!): Droid
}
```

In this example, there are three top-level operations
that can be done on our schema:

 - `hero` returns the `Character` who is the hero of the Star Wars trilogy; it
takes an optional argument that allows us to fetch the hero of a specific
episode instead.
 - `human` accepts a non-null string as a query argument, a human's ID, and
returns the human with that ID.
 - `droid` does the same for droids.

These fields demonstrate another feature of the type system, the ability
for a field to specify arguments that configure their behavior.

When we package the whole type system together, defining the `Query` type
above as our entry point for queries, this creates a GraphQL Schema.

This example just scratched the surface of the type system. The specification
goes into more detail about this topic in the "Type System" section, and the [type](https://github.com/graphql/graphql-js/blob/master/src/type)
directory in GraphQL.js contains code implementing
a specification-compliant GraphQL type system.

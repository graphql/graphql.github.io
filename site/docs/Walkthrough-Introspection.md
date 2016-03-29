---
title: Introspection
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/introspection/
next: /docs/api-reference-graphql/
---

It's often useful to ask a GraphQL schema for information about what
queries it supports. GraphQL allows us to do so using the introspection
system!

For our Star Wars example, the file
[starWarsIntrospection-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsIntrospection-test.js)
contains a number of queries demonstrating the introspection system, and is a
test file that can be run to exercise the reference implementation's
introspection system.

We designed the type system, so we know what types are available, but if
we didn't, we can ask GraphQL, by querying the `__schema` field, always
available on the root type of a Query. Let's do so now, and ask what types
are available.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __schema {
    types {
      name
    }
  }
}







`} />);
</script>

Wow, that's a lot of types! What are they? Let's group them:

 - **Query, Character, Human, Episode, Droid** - These are the ones that we
defined in our type system.
 - **String, Boolean** - These are built-in scalars that the type system
provided.
 - **__Schema, __Type, __TypeKind, __Field, __InputValue, __EnumValue,
__Directive** - These all are preceded with a double underscore, indicating
that they are part of the introspection system.

Now, let's try and figure out a good place to start exploring what queries are
available. When we designed out type system, we specified what type all queries
would start at; let's ask the introspection system about that!

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __schema {
    queryType {
      name
    }
  }
}
`} />);
</script>

And that matches what we said in the type system section, that
the `Query` type is where we will start! Note that the naming here
was just by convention; we could have named our `Query` type anything
else, and it still would have been returned here had we specified it
was the starting type for queries. Naming it `Query`, though, is a useful
convention.

It is often useful to examine one specific type. Let's take a look at
the `Droid` type:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
  }
}
`} />);
</script>

What if we want to know more about Droid, though? For example, is it
an interface or an object?

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    kind
  }
}
`} />);
</script>

`kind` returns a `__TypeKind` enum, one of whose values is `OBJECT`. If
we asked about `Character` instead we'd find that it is an interface:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Character") {
    name
    kind
  }
}
`} />);
</script>

It's useful for an object to know what fields are available, so let's
ask the introspection system about `Droid`:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}




`} />);
</script>

Those are our fields that we defined on `Droid`!

`id` looks a bit weird there, it has no name for the type. That's
because it's a "wrapper" type of kind `NON_NULL`. If we queried for
`ofType` on that field's type, we would find the `String` type there,
telling us that this is a non-null String.

Similarly, both `friends` and `appearsIn` have no name, since they are the
`LIST` wrapper type. We can query for `ofType` on those types, which will
tell us what these are lists of.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}





`} />);
</script>

Let's end with a feature of the introspection system particularly useful
for tooling; let's ask the system for documentation!

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  __type(name: "Droid") {
    name
    description
  }
}
`} />);
</script>

So we can access the documentation about the type system using introspection,
and create documentation browsers, or rich IDE experiences.

This has just scratched the surface of the introspection system; we can
query for enum values, what interfaces a type implements, and more. We
can even introspect on the introspection system itself. The specification goes
into more detail about this topic in the "Introspection" section, and the [introspection](https://github.com/graphql/graphql-js/blob/master/src/type/introspection.js)
file in GraphQL.js contains code implementing a specification-compliant GraphQL
query introspection system.

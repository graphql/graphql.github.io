---
title: Queries and Mutations
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/queries/
next: /docs/queries/
---

### Outline

* A simple query
* Fields, arguments, and aliases
* Fragments
* Comments
* Variables
* Directives (skip & include)
* A simple mutation

### A simple query

Before we dive into all of the features of the query language, let's start with a very simple query, and look at the result we might get when we run it:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
  }
}
`} />);
</script>

You can see immediately that the query has exactly the same shape as the result. This is essential to GraphQL, because you always get back what you expect, and the server knows exactly what fields the client is asking for.

The field `name` returns a `String` type, in this case the name of the main hero of Star Wars, `"R2-D2"`.

Oh, one more thing - the query above is **interactive**. That means you can change it as you like and see the new result. Try adding an `appearsIn` field to the `hero` object in the query, and see the new result.

### Nested data

In the previous example, we just asked for a simple string, but fields can also refer to objects. In that case, you can make a _sub-selection_ - GraphQL queries can traverse related objects and their fields, letting clients fetch lots of related data in one request, instead of making several roundtrips as one would need in a classic REST architecture.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}
`} />);
</script>

Filtering fields and traversing related objects is pretty nice, but we are just getting started.

### Arguments

If the only thing we could do was traverse objects and their fields, GraphQL would already be a very useful language for data fetching. But when you add the ability to pass arguments to fields, things get much more interesting.

In a system like REST, you can only pass a single set of arguments - the query parameters and URL segments in your request. But in GraphQL, every field and nested object can get its own set of arguments, making GraphQL a complete replacement for making multiple API fetches.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
# XXX we should add an example of an argument on a nested field
# people often get confused thinking you can only pass arguments
# to top-level fields, since that's how it works in REST
{
  hero(episode: EMPIRE) {
    name
  }
}
`} />);
</script>

Arguments can be of many different types. In the above example, we have used an Enumeration type, which represents one of a finite set of options (in this case, episides from the original Star Wars trilogy). GraphQL comes with a default set of types, but a GraphQL server can also declare its own custom types, as long as they can be serialized into your transport format.

Read more about the GraphQL type system here. XXX this page doesn't exist yet

### Aliases

If you have a sharp eye, you may have noticed that, since the result object fields match the name of the field in the query but don't include arguments, you can't directly query for the same field with different arguments. That's why you need _aliases_ - they let you rename the result of a field to anything you want.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
`} />);
</script>

In the above example, the two `hero` fields would have conflicted, but since we can alias them to different names, we can get both results in one request.

### Fragments

Let's say we had a relatively complicated page in our app, which let us look at two heroes side by side, along with their friends. You can imagine that such a query could quickly get complicated, because we would need to repeat the fields at least twice - one for each side of the comparison.

That's why GraphQL includes reusable units called _fragments_. Fragments let you construct sets of fields, and then include them in queries where you need to. Here's an example of how you could solve the above situation using fragments:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
`} />);
</script>

You can see how the above query would be pretty repetitive if the fields were repeated. The concept of fragments is frequently used to split complicated application data requirements into smaller chunks, especially when you need to combine lots of UI components with different fragments into one initial data fetch.

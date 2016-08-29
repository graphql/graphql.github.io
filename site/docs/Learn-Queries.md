---
title: Queries and Mutations
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/queries/
next: /docs/queries/
---

### ToC

XXX we should probably generate one

* A simple query
* Nesting
* Arguments
* Aliases
* Fragments
* Comments
* Variables
* Operation names
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

Note that in this example, the `friends` field returns an array of items. In GraphQL, queries don't specify whether the return value should be a single item or an array. You need to know which one to expect ahead of time, but it will always be consistent with what is indicated in the schema.

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

### Variables

So far, we have been writing all of our arguments inside the query string. But in most applications, the arguments to fields will be dynamic: For example, there might be a dropdown that lets you select which Star Wars episode you are interested in, or a search field, or a set of filters.

It wouldn't be a good idea to pass these dynamic arguments directly in the query string, because then our client-side code would need to dynamically manipulate the query string at runtime, and serialize it into a GraphQL-specific format. Instead, GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called _variables_.

When we start working with variables, we need to do three things:

1. Replace the static value in the query with `$variableName`
2. Declare `$variableName` in our query
3. Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary

Here's what it looks like all together:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={`
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
`} variables={`{
  "episode": "JEDI"
}`} />);
</script>

Now, in our client code, we can simply pass a different variable rather than needing to construct an entirely new query. This is also in general a good practice for denoting which arguments in our query are expected to be dynamic - we should never be doing string interpolation to construct queries from user-supplied values.

### Operation name

One thing we also saw in the example above is that our query has acquired a _name_. Up until now, we have been using a shorthand syntax where we omit both the `query` keyword and the query name, but in production apps it's useful to use these to make our code less ambiguous.

Think of this just like a function name in your favorite programming language. For example, in JavaScript we can easily work only with anonymous functions, but when we give a function a name, it's easier to track it down, debug our code, and log when it's called. In the same way, GraphQL query and mutation names, along with fragment names, can be a useful debugging tool on the server side to identify different GraphQL requests.

### Directives: skip and include

We discussed above how variables enable us to avoid doing manual string interpolation to construct dynamic queries. Passing variables in arguments solves a pretty big class of these problems, but we might also need a way to dynamically change the structure and shape of our queries using variables. For example, we can imagine a UI component that has a summarized and detailed view, where one includes more fields than the other.

Let's construct a query for such a component:

```graphql
query Hero($episode: Episode, $withFriends: Boolean) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}

variables: {
  episode: 'JEDI',
  withFriends: false
}
```

We needed to use a new feature in GraphQL called a _directive_. A directive can be attached to a field or fragment inclusion, and can affect execution of the query in any way the server desires. The core GraphQL specification includes exactly two directives, which must be supported by any spec-compliant GraphQL server implementation:

- `@include(if: Boolean)` Only include this field in the result if the argument is `true`.
- `@skip(if: Boolean)` Skip this field if the argument is `true`.

Directives can be useful to get out of situations where you otherwise would need to do string manipulation to add and remove fields in your query. Server implementations may also add experimental features by defining completely new directives.

### Mutations

Most discussions of GraphQL focus on data fetching, but any complete data platform needs a way to modify server-side data as well.

In REST, any request might end up causing some side-effects on the server, but by convention it's suggested that one doesn't use `GET` requests to modify data. GraphQL is similar - technically any query could be implemented to cause a data write. However, it's useful to establish a convention that any operations that cause writes should be sent explicitly via a mutation.

Here's an example of a simple mutation:

```graphql
mutation CreateCharacterInEpisode($name: String!, $appearsIn: Episode!) {
  createCharacter(name: $name)
  addCharacterToEpisode(name: $name, episode: $appearsIn)
}
```

You can see that a mutation can contain multiple fields, just like a query. There's one important distinction between queries, and mutations, other than the name:

**While query fields are executed in parallel, mutation fields run in series, one after the other.**

This means that even though we sent `createCharacter` and `addCharacterToEpisode` in one request, the first is guaranteed to finish before the second begins, ensuring that we create the character before trying to add it an episode.

#### Returning data from mutations

Just like in queries, you can ask for nested fields in the mutation result. This can be useful for fetching the new state of an object after an update:

```graphql
mutation IncrementCredits($characterId: ID!) {
  incrementCredits(characterId: $characterId) {
    totalCredits
  }
}
```

In this case, the `incrementCredits` mutation field returns a `Character` object, so we can query the new value of `totalCredits` after giving that character some more credits. Otherwise, we would have needed to send two requests - one to update the credits, and another to get the new value - or guess at the new amount based on outdated data.

That's all! Now you know everything you need to know about GraphQL queries and mutations to build a pretty good application. For more advanced features and tips, check out the advanced section.

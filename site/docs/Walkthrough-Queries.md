---
title: Queries
layout: ../_core/DocsLayout
category: Walkthrough
permalink: /docs/queries/
next: /docs/validation/
---

GraphQL queries declaratively describe what data the issuer wishes
to fetch from whoever is fulfilling the GraphQL query.

For our Star Wars example, the
[starWarsQuery-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsQuery-test.js)
file in the GraphQL.js repository contains a number of queries and responses.
That file is a test file that uses the schema discussed in the "Type System" walkthrough and a set of
sample data, located in
[starWarsData.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js).
This test file can be run to exercise the reference implementation.

An example query on this schema would be:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
query HeroNameQuery {
  hero {
    name
  }
}
`} />);
</script>

The initial line, `query HeroNameQuery`, defines a query with the operation
name `HeroNameQuery` that starts with the schema's root query type; in this
case, `Query`. As defined above, `Query` has a `hero` field that returns a
`Character`, so we'll query for that. `Character` then has a `name` field that
returns a `String`, so we query for that, completing our query.

Specifying the `query` keyword and an operation name is only required when a
GraphQL document defines multiple operations.  We therefore could have written
the previous query with the query shorthand:

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

Assuming that the backing data for the GraphQL server identified R2-D2 as the
hero. The response continues to vary based on the request; if we asked for
R2-D2's ID and friends with this query then we'll get back a response like this:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    id
    name
    friends {
      id
      name
    }
  }
}
`} />);
</script>

One of the key aspects of GraphQL is its ability to nest queries. In the
above query, we asked for R2-D2's friends, but we can ask for more information
about each of those objects. So let's construct a query that asks for R2-D2's
friends, gets their name and episode appearances, then asks for each of *their*
friends, resulting in a nested response.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    name
    friends {
      name
      appearsIn
      friends {
        name
      }
    }
  }
}
`} />);
</script>

The `Query` type defined a way to fetch a human given their
ID. We can use it by hardcoding the ID in the query:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  human(id: "1000") {
    name
  }
}
`} />);
</script>

Alternately, we could have defined the query to have a query parameter:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
query FetchSomeIDQuery($someId: String!) {
  human(id: $someId) {
    name
  }
}
`} values={{someId: `1000`}} />);
</script>

This query is now parameterized by `$someId`; to run it, we must provide
that ID. If we ran it with `$someId` provided as "1000", we would get Luke;
provided as "1002", we would get Han. If we passed an invalid ID here,
we would get `null` back for the `human`, indicating that no such object
exists. If we don't provide `$someId` at all, an error is returned. In the above
example, we ran the query with `$someId` set to "1000".

Notice that the key in the response is the name of the field, by default.
It is sometimes useful to change this key, for clarity or to avoid key
collisions when fetching the same field with different arguments.

We can do that with field aliases, as demonstrated in the following query where
we aliased the result of the `human` field to the key `luke`:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    name
  }
}
`} />);
</script>

Notice the key in the response is "luke" and not "human", as it was in our
previous example where we did not use the alias.

This is particularly useful if we want to use the same field twice
with different arguments, as in the following query where we alias the result of
the first `human` field to the key `luke`, and the second to `leia`:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    name
  }
  leia: human(id: "1003") {
    name
  }
}
`} />);
</script>

Now imagine we wanted to ask for Luke and Leia's home planets. We could do so
with this query:

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    name
    homePlanet
  }
  leia: human(id: "1003") {
    name
    homePlanet
  }
}
`} />);
</script>

but we can already see that this could get unwieldy, since we have to add new
fields to both parts of the query. Instead, we can extract out the common fields
into a fragment, and include the fragment in the query, to get the same result.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  luke: human(id: "1000") {
    ...HumanFragment
  }
  leia: human(id: "1003") {
    ...HumanFragment
  }
}

fragment HumanFragment on Human {
  name
  homePlanet
}
`} />);
</script>

The two previous queries will both get the same result, but using fragments was
less verbose or fragile; if we wanted to add more fields, we could add
it to the common fragment rather than copying it into multiple places.

We defined the type system above, so we know the type of each object
in the output; the query can ask for that type using the special
field `__typename`, defined on every object. Since R2-D2 is a droid, this will
return `Droid`.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero {
    __typename
    name
  }
}
`} />);
</script>

This was particularly useful because `hero` was defined to return a `Character`,
which is an interface; we might want to know what concrete type was actually
returned. If we instead asked for the hero of episode V we would find that it
was Luke, who is a `Human`.

<script data-inline>
  import MiniGraphiQL from '../_core/MiniGraphiQL';
  import { StarWarsSchema } from './_swapiSchema';
  renderHere(<MiniGraphiQL schema={StarWarsSchema} query={ `
{
  hero(episode: EMPIRE) {
    __typename
    name
  }
}
`} />);
</script>

As with the type system, this example just scratched the surface of the query
language. The specification goes into more detail about this topic in the
"Language" section, and the
[language](https://github.com/graphql/graphql-js/blob/master/src/language)
directory in GraphQL.js contains code implementing a
specification-compliant GraphQL query language parser and lexer.

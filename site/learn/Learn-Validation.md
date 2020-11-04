---
title: Validation
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/validation/
next: /learn/execution/
---

By using the type system, it can be predetermined whether a GraphQL query
is valid or not. This allows servers and clients to effectively inform
developers when an invalid query has been created, without having to rely
on runtime checks.

For our Star Wars example, the file
[starWarsValidation-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsValidation-test.js)
contains a number of queries demonstrating various invalidities, and is a test
file that can be run to exercise the reference implementation's validator.

To start, let's take a complex valid query. This is a nested query, similar to
an example from the previous section, but with the duplicated fields factored
out into a fragment:

```graphql
# { "graphiql": true }
{
  hero {
    ...NameAndAppearances
    friends {
      ...NameAndAppearances
      friends {
        ...NameAndAppearances
      }
    }
  }
}

fragment NameAndAppearances on Character {
  name
  appearsIn
}
```

And this query is valid. Let's take a look at some invalid queries...

A fragment cannot refer to itself or create a cycle, as this could result in
an unbounded result! Here's the same query above but without the explicit three
levels of nesting:

```graphql
# { "graphiql": true }
{
  hero {
    ...NameAndAppearancesAndFriends
  }
}

fragment NameAndAppearancesAndFriends on Character {
  name
  appearsIn
  friends {
    ...NameAndAppearancesAndFriends
  }
}
```

When we query for fields, we have to query for a field that exists on the
given type. So as `hero` returns a `Character`, we have to query for a field
on `Character`. That type does not have a `favoriteSpaceship` field, so this
query is invalid:

```graphql
# { "graphiql": true }
# INVALID: favoriteSpaceship does not exist on Character
{
  hero {
    favoriteSpaceship
  }
}
```

Whenever we query for a field and it returns something other than a scalar
or an enum, we need to specify what data we want to get back from the field.
Hero returns a `Character`, and we've been requesting fields like `name` and
`appearsIn` on it; if we omit that, the query will not be valid:

```graphql
# { "graphiql": true }
# INVALID: hero is not a scalar, so fields are needed
{
  hero
}
```

Similarly, if a field is a scalar, it doesn't make sense to query for
additional fields on it, and doing so will make the query invalid:

```graphql
# { "graphiql": true }
# INVALID: name is a scalar, so fields are not permitted
{
  hero {
    name {
      firstCharacterOfName
    }
  }
}
```

Earlier, it was noted that a query can only query for fields on the type
in question; when we query for `hero` which returns a `Character`, we
can only query for fields that exist on `Character`. What happens if we
want to query for R2-D2s primary function, though?

```graphql
# { "graphiql": true }
# INVALID: primaryFunction does not exist on Character
{
  hero {
    name
    primaryFunction
  }
}
```

That query is invalid, because `primaryFunction` is not a field on `Character`.
We want some way of indicating that we wish to fetch `primaryFunction` if the
`Character` is a `Droid`, and to ignore that field otherwise. We can use
the fragments we introduced earlier to do this. By setting up a fragment defined
on `Droid` and including it, we ensure that we only query for `primaryFunction`
where it is defined.

```graphql
# { "graphiql": true }
{
  hero {
    name
    ...DroidFields
  }
}

fragment DroidFields on Droid {
  primaryFunction
}
```

This query is valid, but it's a bit verbose; named fragments were valuable
above when we used them multiple times, but we're only using this one once.
Instead of using a named fragment, we can use an inline fragment; this
still allows us to indicate the type we are querying on, but without naming
a separate fragment:

```graphql
# { "graphiql": true }
{
  hero {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

This has just scratched the surface of the validation system; there
are a number of validation rules in place to ensure that a GraphQL query
is semantically meaningful. The specification goes into more detail about this
topic in the "Validation" section, and the
[validation](https://github.com/graphql/graphql-js/blob/master/src/validation)
directory in GraphQL.js contains code implementing a
specification-compliant GraphQL validator.

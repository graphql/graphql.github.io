# Validation

<p className="learn-subtitle">Learn how GraphQL validates operations using a schema</p>

On this page, we'll explore an important phase in the lifecycle of a GraphQL request called [validation](https://spec.graphql.org/draft/#sec-Validation). A request must be syntactically correct to run, but it should also be valid when checked against the API's schema. 

In practice, when a GraphQL operation reaches the server, the document is first parsed and then validated using the type system. This allows servers and clients to effectively inform developers when an invalid query has been created, without relying on runtime checks. Once the operation is validated, it can be [executed](/learn/execution/) on the server and a response will be delivered to the client.

## Validation examples

The GraphQL specification describes the detailed conditions that must be satisfied for a request to be considered valid. In the sections that follow, we'll look at a few examples of common validation issues that may occur in GraphQL operations.

### Requesting non-existent fields

When we query for a field, the field must be defined on the relevant type. As `hero` returns a `Character` type, its selection set may only request the `Character` type's fields; `Character` does not have a `favoriteSpaceship` field, so this query is invalid:

```graphql
# { "graphiql": true }
# INVALID: favoriteSpaceship does not exist on Character
query {
  hero {
    favoriteSpaceship
  }
}
```

### Selection sets and leaf fields

Whenever we query for a field and it returns something other than a Scalar or Enum type, we need to specify what data we want to get back from the field (a "selection set"). The `hero` query field returns a `Character`, and we've already seen examples that request fields like `name` and `appearsIn` on it. If we omit those leaf field selections, then the query will not be valid:

```graphql
# { "graphiql": true }
# INVALID: hero is not a scalar, so fields are needed
query {
  hero
}
```

Similarly, querying fields of a scalar or enum doesn’t make sense, therefore adding a selection set to a leaf field will make the query invalid:

```graphql
# { "graphiql": true }
# INVALID: name is a scalar, so fields are not permitted
query {
  hero {
    name {
      firstCharacterOfName
    }
  }
}
```

### Missing fragments for fields that output abstract types

Earlier, it was noted that a query can only ask for fields on the type in question. So when we query for `hero` which returns a `Character`, we can only request fields that exist on the `Character` Interface type. What happens if we want to query for R2-D2's primary function, though?

```graphql
# { "graphiql": true }
# INVALID: primaryFunction does not exist on Character
query {
  hero {
    name
    primaryFunction
  }
}
```

That query is invalid, because `primaryFunction` is not one of the shared fields defined by the `Character` Interface type. We want some way of indicating that we wish to fetch `primaryFunction` if the `Character` is a `Droid`, and to ignore that field otherwise. We can use the [fragments](/learn/queries/#fragments) to do this. By setting up a fragment defined on `Droid` and including it in the selection set, we ensure that we only query for `primaryFunction` where it is defined:

```graphql
# { "graphiql": true }
query {
  hero {
    name
    ...DroidFields
  }
}

fragment DroidFields on Droid {
  primaryFunction
}
```

This query is valid, but it's a bit verbose; named fragments were valuable above when we used them multiple times, but we're only using this one once. Instead of using a named fragment, we can use an [inline fragment](/learn/queries/#inline-fragments); this still allows us to indicate the type we are querying on, but without naming a separate fragment:

```graphql
# { "graphiql": true }
query {
  hero {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
```

### Cyclic fragment spreads

To start, let's take a complex valid query. This is a nested query, but with the duplicated fields factored out into a fragment:

```graphql
# { "graphiql": true }
query {
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

The following is an alternative to the above query, attempting to use recursion instead of the explicit three levels of nesting. This new query is invalid because a fragment cannot refer to itself (directly or indirectly) since the resulting cycle could create an unbounded result!

```graphql
# { "graphiql": true }
query {
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

This has just scratched the surface of the validation system; there are a number of validation rules in place to ensure that a GraphQL operation is semantically meaningful. The specification goes into more detail about this topic in the [validation section](https://spec.graphql.org/draft/#sec-Validation), and the [validation directory in the reference implementation](https://github.com/graphql/graphql-js/blob/main/src/validation) contains code implementing a specification-compliant GraphQL validator.

## Validation errors

As we have seen in the examples above, when a GraphQL server encounters a validation error in a request, it will return information about what happened in the `errors` key of the response. Specifically, when GraphQL detects a validation issue in a document, it raises a _request error_ before execution begins, meaning that no partial data will be included in the response.

And because the GraphQL specification requires all implementations to validate incoming requests against the schema, developers won't need to write specific runtime logic to handle these validation issues manually.

## Next steps

To recap what we've learned about validation:

- To be executed, requests must include a syntactically correct document that is considered valid when checked against the schema
- The specification requires implementations check incoming requests contain valid field selections, correct fragment usage, and more
- When a validation issue occurs, the server will raise a request error and return to the client information about what happened; field execution will not start

Head over to the [Execution](/learn/execution/) page to learn how GraphQL provides data for each field in a request after the validation step successfully completes.
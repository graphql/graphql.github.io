---
name: graphql-query
description: Complete GraphQL query string generation for python.
url: https://denisart.github.io/graphql-query/
github: denisart/graphql-query
---

**graphql_query** is complete GraphQL query string builder for python. With **graphql_query**
you can The documentation for **graphql_query** can be found at https://denisart.github.io/graphql-query.

```sh
$ pip install graphql_query
```

Code for the simple query

```graphql
{
  hero {
    name
  }
}
```

it is

```python
from graphql_query import Operation, Query

hero = Query(name="hero", fields=["name"])
operation = Operation(type="query", queries=[hero])

print(operation.render())
"""
query {
  hero {
    name
  }
}
"""
```

For generation of the following query

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

we have

```python
from graphql_query import Argument, Directive, Field, Operation, Query, Variable

episode = Variable(name="episode", type="Episode")
withFriends = Variable(name="withFriends", type="Boolean!")

arg_episode = Argument(name="episode", value=episode)
arg_if = Argument(name="if", value=withFriends)

hero = Query(
    name="hero",
    arguments=[arg_episode],
    fields=[
        "name",
        Field(
            name="friends",
            fields=["name"],
            directives=[Directive(name="include", arguments=[arg_if])]
        )
    ]
)
operation = Operation(
    type="query",
    name="Hero",
    variables=[episode, withFriends],
    queries=[hero]
)
print(operation.render())
"""
query Hero(
  $episode: Episode
  $withFriends: Boolean!
) {
  hero(
    episode: $episode
  ) {
    name
    friends @include(
      if: $withFriends
    ) {
      name
    }
  }
}
"""
```

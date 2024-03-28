---
name: Ariadne Codegen
description: Generate fully typed Python GraphQL client from any schema and queries.
github: mirumee/ariadne-codegen
---

Install Ariadne Codegen:

```
$ pip install ariadne-codegen
```

Create `queries.graphql` file:

```graphql
mutation CreateToken($username: String!, $password: String!) {
  createToken(username: $username, password: $password) {
    token
    errors {
      field
      message
    }
  }
}
```

Add `[ariadne-codegen]` section to your `pyproject.toml`:

```
[ariadne-codegen]
queries_path = "queries.graphql"
remote_schema_url = "http://example.com/graphql/"
```

Generate client:

```
$ ariadne-codegen
```

And use it in your Python projects:

```python
from graphql_client import Client

with Client("http://example.com/graphql/") as client:
    result = client.create_token(username="Admin", password="Example123)

    if result.errors:
        error = result.errors[0]
        raise ValidationError({error.field: error.message})

    auth_token = result.token
```

---
name: Ariadne Codegen
description: Generate fully typed Python GraphQL client from any schema and queries.
url: https://github.com/mirumee/ariadne-codegen
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
import asyncio
from graphql_client import Client


async def create_token_gql():
    client = Client("http://example.com/graphql/")
    result = await client.create_token(username="Admin", password="Example123")

    if result.errors:
        error = result.errors[0]
        raise ValidationError({error.field: error.message})

    return result.token

asyncio.run(create_token_gql())
```

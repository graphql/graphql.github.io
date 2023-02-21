---
name: Ariadne
description: Ariadne is a Python library for implementing GraphQL servers using schema-first approach. It supports both synchronous and asynchronous query execution, ships with batteries included for common GraphQL server problems like query cost validation or performance tracing and has simple API that is easy to extend or replace.
url: https://ariadnegraphql.org
github: mirumee/ariadne
---

Ariadne can be installed with pip:

```bash
$ pip install ariadne
```

Minimal "Hello world" server example:

```python
from ariadne import ObjectType, gql, make_executable_schema
from ariadne.asgi import GraphQL

type_defs = gql(
    """
    type Query {
        hello: String!
    }
    """
)

query_type = ObjectType("Query")

@query_type.field("hello")
def resolve_hello(*_):
    return "Hello world!"

schema = make_executable_schema(type_defs, query_type)

app = GraphQL(schema, debug=True)
```

Run the server with uvicorn:

```
$ pip install uvicorn
$ uvicorn example:app
```

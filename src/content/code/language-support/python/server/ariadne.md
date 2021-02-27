---
name: Ariadne
description: Ariadne is a Python library for implementing GraphQL servers using schema-first approach. It supports both synchronous and asynchronous query execution, ships with batteries included for common GraphQL server problems like query cost validation or performance tracing and has simple API that is easy to extend or replace.
url: https://ariadnegraphql.org
github: mirumee/ariadne
---

Ariadne can be installed with pip:

```bash
pip install ariadne
```

It ships with many GraphQL server implementations, enabling easy experimentation:

```python
from ariadne import ObjectType, QueryType, gql, make_executable_schema
from ariadne.asgi import GraphQL
# Define types using Schema Definition Language (https://graphql.org/learn/schema/)
# Wrapping string in gql function provides validation and better error traceback
type_defs = gql("""
    type Query {
        hello: String!
    }
""")
# Bind resolver functions to Query's fields using QueryType
query_type = QueryType()
# Resolvers are simple python functions
@query_type.field("hello")
def resolve_hello(*_):
    return "Hello world!"
# Create executable GraphQL schema
schema = make_executable_schema(type_defs, query_type)
# Create an ASGI app using the schema, running in debug mode
app = GraphQL(schema, debug=True)
```

Above server can be ran with uvicorn:

```
pip install uvicorn
uvicorn example:app
```

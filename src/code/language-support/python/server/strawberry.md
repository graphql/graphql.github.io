---
name: Strawberry
description: Strawberry is a Python library for implementing code first GraphQL servers using modern Python features like type hints.
url: https://strawberry.rocks
github: strawberry-graphql/strawberry
---

Here's an example of a Strawberry hello world, first install the library:

```bash
pip install strawberry-graphql
```

Create an `app.py` file with this content:

```python
import strawberry

@strawberry.type
class Query:
    @strawberry.field
    def hello(self, name: str = "World") -> str:
        return f"Hello {name}"

schema = strawberry.Schema(query=Query)
```

Then run `strawberry server app` and you will have a basic schema server
running on `http://localhost:8000`.

Strawberry also has views for ASGI, Flask and Django and provides utilities
like dataloaders and tracing.

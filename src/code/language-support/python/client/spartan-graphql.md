---
name: Spartan GraphQL
description: Compile GraphQL documents into a typed Python package with no imposed transport, no runtime dependencies, and no redundant validation.
github: tibdex/spartan-graphql
tags:
  - tools-and-libraries
  - frontend
---

> **Spartan**, _adj._ … distinguished by simplicity, frugality, courage, or brevity of speech.
>
> — _Oxford English Dictionary_

Spartan GraphQL compiles GraphQL documents into a typed Python package, and stops there:

- **no imposed transport**: bytes in, bytes out;
- **no runtime dependencies**: nothing to install or upgrade (apart from `typing-extensions` before Python 3.15);
- **no redundant validation**: just dicts, statically checked (by mypy, Pyright, Pyrefly, ty, etc.).

Install spartan-graphql:

```bash
pip install spartan-graphql
```

Write your operations in a `bookshop/get_order.graphql` file:

```graphql
query GetOrder($id: ID!) {
  order(id: $id) {
    id
    status
  }
}
```

Point a `bookshop/graphql.config.yml` file at your schema and documents:

```yaml
schema: schema.graphqls
documents: "*.graphql"
extensions:
  spartan:
    moduleRoot: ..
    package: bookshop.graphql
```

Generate the package:

```bash
spartan-graphql bookshop/graphql.config.yml
```

Bring your own transport, here in `bookshop/transport.py` and with the standard library alone:

```python
from typing import Literal
from urllib.request import Request as HTTPRequest, urlopen

from bookshop.graphql.runtime import Request


def send[Data](request: Request[Literal["query", "mutation"], Data], /) -> Data:
    prepared = request.prepare()
    http_request = HTTPRequest(
        "https://bookshop.example/graphql",
        data=bytes(prepared),
        headers={
            "Accept": "application/graphql-response+json",
            "Content-Type": "application/json",
        },
    )

    with urlopen(http_request) as response:
        return prepared.parse(response.read())
```

And let your type checker verify every variable and every field of the response:

```python
from typing import Literal, assert_type

from bookshop.get_order_graphql import GetOrder
from bookshop.transport import send

data = send(GetOrder({"id": "o1"}))
order = data["order"]

# `Query.order` is nullable, so the type checker requires this check.
if order is None:
    print("No such order.")
else:
    assert_type(order["id"], str)
    assert_type(order["status"], Literal["PENDING", "SHIPPED", "DELIVERED", "CANCELED"])
    print(f"Order {order['id']} is {order['status']}.")
```

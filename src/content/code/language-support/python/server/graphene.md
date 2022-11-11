---
name: Graphene
description: A Python library for building GraphQL APIs.
url: http://graphene-python.org/
github: graphql-python/graphene
---

To run a Graphene hello world script:

```bash
pip install graphene
```

Then run `python hello.py` with this code in `hello.py`:

```python
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String(name=graphene.String(default_value="World"))

  def resolve_hello(self, info, name):
    return 'Hello ' + name

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello']) # "Hello World"
```

There are also nice bindings for [Relay](https://facebook.github.io/relay/), Django, SQLAlchemy, and Google App Engine.

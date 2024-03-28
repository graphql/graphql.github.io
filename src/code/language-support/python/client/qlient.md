---
name: Qlient
description: A fast and modern graphql client designed with simplicity in mind.
github: qlient-org/python-qlient
---

Here's an example of a qlient hello world.

first install the library:

```bash
pip install qlient
```

Create a `swapi_client_example.py` file with this content:

```python
from qlient.http import HTTPClient, GraphQLResponse

client = HTTPClient("https://swapi-graphql.netlify.app/.netlify/functions/index")

res: GraphQLResponse = client.query.film(
    # swapi graphql input fields
    id="ZmlsbXM6MQ==",

    # qlient specific
    _fields=["id", "title", "episodeID"]
)

print(res.request.query)  # query film($id: ID) { film(id: $id) { id title episodeID } }
print(res.request.variables)  # {'id': 'ZmlsbXM6MQ=='}
print(res.data)  # {'film': {'id': 'ZmlsbXM6MQ==', 'title': 'A New Hope', 'episodeID': 4}}
```

Close the file and run it using python:

```bash
python swapi_client_example.py
```

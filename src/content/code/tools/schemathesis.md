---
name: Schemathesis
description: A modern API testing tool for web applications built with Open API and GraphQL specifications.
url: https://github.com/schemathesis/schemathesis
github: schemathesis/schemathesis
---

Install Schemathesis via `pip`:

```bash
pip install schemathesis
```

Then, create a file `test_api.py` with the content below and replace the `URL` value with your own GraphQL endpoint URL:

```python
from hypothesis import settings
import schemathesis

URL = "https://your.app.com/graphql"
schema = schemathesis.graphql.from_url(URL)

@schema.parametrize()
@settings(deadline=None)
def test_api(case):
    response = case.call()
    case.validate_response(response)
```

Then run `pytest test_api.py`. Note that you can write your app in any programming language; the tool will communicate with it over HTTP.

Schemathesis will generate valid queries automatically based on the schema and will minimize failing cases.
For example, running the code above against `https://bahnql.herokuapp.com/graphql` uncovers that running the `{ search(searchTerm: "") { stations { name } } }` query leads to a server error:

```
{"errors":[{"message":"Cannot read property \'city\' of undefined","locations":[{"line":1,"column":28}],"path":["search","stations"]}],"data":null}
```

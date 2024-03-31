---
name: Schemathesis
description: A modern API testing tool for web applications built with Open API and GraphQL specifications.
github: schemathesis/schemathesis
---

Run Schemathesis via Docker against your GraphQL endpoint:

```bash
docker run schemathesis/schemathesis \
  run https://your.app.com/graphql
```

Schemathesis will generate queries matching your GraphQL schema and catch server crashes automatically.
Generated queries have arbitrary depth and may contain any subset of GraphQL types defined in the input schema.
They expose edge cases in your code that are unlikely to be found otherwise.

Note that you can write your app in any programming language; the tool will communicate with it over HTTP.

For example, running the command above against `https://bahnql.herokuapp.com/graphql` uncovers that running the `{ search(searchTerm: "") { stations { name } } }` query leads to a server error:

```json
{
  "errors": [
    {
      "message": "Cannot read property 'city' of undefined",
      "locations": [
        {
          "line": 1,
          "column": 28
        }
      ],
      "path": ["search", "stations"]
    }
  ],
  "data": null
}
```

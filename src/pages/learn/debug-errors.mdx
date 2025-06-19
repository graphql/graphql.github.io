# Common HTTP Errors and How to Debug Them

When building or consuming a GraphQL API over HTTP, it's common to run into
errors, especially during development. Understanding how to recognize and resolve these issues
can save you time and frustration.

This guide outlines common HTTP and GraphQL errors, what they mean, and how to debug them 
effectively. It follows the recommendations of the
[GraphQL over HTTP spec (draft)](https://graphql.github.io/graphql-over-http/draft/),
which standardizes how GraphQL works over HTTP, including request formats, status codes,
and media types. Keep in mind that implementations may vary, so treat this as a general guide rather
than a definitive reference.

## `400 Bad Request`: Syntax or parse errors

### What it means

The server couldn't parse your request. Either the GraphQL query string is malformed,
or the JSON body isn't valid. This is the primary error status recommended by the GraphQL over HTTP specification.

### Common causes

- JSON syntax errors
- Sending a plain string without wrapping it in `{ "query": "..." }`
- Using `Content-Type: application/graphql` without supporting it

### How to debug

- Validate your JSON body using a linter or formatter.
- Make sure you're sending a `POST` request with a `Content-Type: application/json` header.
- Check your GraphQL query for syntax errors. Use an IDE or linter to verify it.

## `405 Method Not Allowed`: Wrong HTTP Method

### What it means

You're using an unsupported HTTP method. Most GraphQL servers require `POST` for mutations
and may allow `GET` for queries.

### Common causes

- Sending a `PUT` or `DELETE` request instead of `POST` or `GET`
- Sending a `GET` request for a mutation, or to a server that only supports `POST` requests

### How to debug

- Check your HTTP method. Mutations must use `POST`.
- Make sure your server supports `GET` for queries.
- Refer to the [GraphQL over HTTP spec](https://graphql.github.io/graphql-over-http/draft/) to 
confirm method support.

## `500 Internal Server Error`: Unexpected server failures

### What it means

Something went wrong on the server. 

### Common causes

- An unhandled exception in a resolver
- Schema validation issues during server startup
- Missing or misconfigured middleware

### How to debug

- Check server logs or stack traces.
- Add error handling to resolvers.

## GraphQL errors with `200 OK`

### What it means

The HTTP layer succeeded, but the GraphQL operation produced errors.

### Common causes

- Runtime errors during execution
- Violating schema constraints (e.g. returning the wrong data type, or `null` in a non-nullable position)

Older servers and clients (those not using
`Content-Type: application/graphql-response+json`) may also use 200 OK in the case of
complete request failure (no `data`). Common causes include:

- Querying a field that doesn't exist
- Passing incorrect arguments to a field
- Omitting a selection set on a non-leaf field
- Failure to specify the `operationName` when multiple operations exist in the request

### How to debug

Check the `errors` array in the response body. If the response includes a `data` property, then 
your query document is likely valid and you most likely hit a runtime exception - perhaps due to
invalid input, access denial, or a bug in server logic.

If there's no `data` field, the request likely failed during validation. For example:

```json
{
  "errors": [
    {
      "message": "Cannot query field \"foo\" on type \"Query\".",
      "locations": [{ "line": 1, "column": 3 }]
    }
  ]
}
```

Use introspection or an IDE to verify your query matches the schema.

## Implementation-specific status codes

Some GraphQL server implementations may use additional HTTP status codes that are not explicitly recommended 
by the specification. These vary by implementation.

- `415 Unsupported Media Type`: The server doesn't understand the request's `Content-Type`. This can occur
when a GraphQL query is sent with `Content-Type: text/plain` or another unsupported type. 
- `422 Unprocessable Entity`: Some implementations use this for GraphQL validation errors instead of `200` + errors array.

These error codes are not recommended by the specification for most cases. Different GraphQL servers handle 
validation errors differently. When in doubt, use error codes supported by the specification.

## Understanding GraphQL response formats

Traditionally, GraphQL servers have returned responses using the `application/json` media type.
However, the [GraphQL over HTTP spec](https://graphql.github.io/graphql-over-http/draft/) recommends 
that clients request (and servers respond with) a more specific type: `application/graphql-response+json`.

This newer media type identifies the payload as a GraphQL response and helps clients
distinguish it from other types of JSON, making the response safe to process even if
it uses a non-2xx status code. A trusted proxy, gateway, or other intermediary
might describe an error using JSON, but would never do so using `application/graphql-response+json`
unless it was a valid GraphQL response.

### What to know

- Servers may respond with `application/graphql-response+json` or
`application/json`.
- Clients can request this media type using the `Accept` header: `Accept: application/graphql-response+json, application/json;q=0.9` (prefer the new media type over the old one, but accept both)
- This content type is recommended, and support for it is growing.
- If your client uses content negotiation, ensure your server can response with the appropriate
type or fallback to `application/json`.

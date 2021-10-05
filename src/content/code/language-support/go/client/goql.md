---
name: goql
description: goql is a GraphQL client library with built-in two-way marshaling support via struct tags. This is key because it allows for strongly typed GraphQL queries as opposed to variables containing a string representation of the query. This also facilitates more advanced features, such as sparse field sets.
url: https://github.com/getoutreach/goql
github: getoutreach/goql
---

GraphQL operations can be defined by using normal Go struct types along with the help of struct tags. For example:

```go
type QueryUserCollection struct {
	UserCollection struct {
		Collection []struct {
			ID   string
			Name string
		} `goql:"keep"`
	} `goql:"userCollection(filter:$filter<[Filter]>,sort:$sort<[String]>,size:$size<Int>,before:$before<String>,after:$after<String>)"`
}
```

when passed through the GraphQL query marshaller renders the following string:

```graphql
query($filter: [Filter], $sort: [String], $size: Int, $before: String, $after: String) {
    userCollection(filter: $filter, sort: $sort, size: $size, before: $before, after: $after) {
        collection {
            id
            name
        }
    }
}
```

The client has the ability to marshal the response from the server back into the type. This way of doing things also allows you to use the same types to define your response, typically in JSON format, back to the client.

For more information on this process, see the documentation defined [here](https://github.com/getoutreach/goql#goql).

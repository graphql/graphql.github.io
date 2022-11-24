---
name: Ballerina GraphQL Library
description: The `ballerina/graphql` standard library also provides a GraphQL client for interacting with GraphQL endpoints.
url: https://ballerina.io/learn/by-example/graphql-client/
github: ballerina-platform/module-ballerina-graphql
---

Run the sample GraphQL endpoint given in the "Server" section.

Then add the following to a file named `client.bal` and run the `bal run client.bal -- Ballerina` command to execute it.

```ballerina
import ballerina/graphql;
import ballerina/io;

public function main(string nameOfUser) returns error? {
    graphql:Client gqlClient = check new("http://localhost:4000/graphql");
    string query = "($name: String!) { greeting(name: $name) }";
    json response = check gqlClient->execute(query, {"name": nameOfUser});
    io:println(response);
}
```

It will print a response similar to the following.

```
{"data":{"greeting":"Hello Ballerina!"}}
```

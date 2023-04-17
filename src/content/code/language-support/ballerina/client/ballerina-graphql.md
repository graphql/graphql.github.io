---
name: ballerina-graphql
description: The Ballerina Standard Library Package for consume GraphQL services.
url: https://lib.ballerina.io/ballerina/graphql/latest
github: ballerina-platform/module-ballerina-graphql
---

To run a `ballerina-graphql` client:

- Download and install [Ballerina Language](https://ballerina.io/downloads)
- Then run `bal run graphql_client.bal` to run the service, with this code in the `graphql_client.bal` file:

```ballerina
import ballerina/graphql;
import ballerina/io;

type Response record {
    record { string hello; } data;
};

public function main() returns error? {
    graphql:Client helloClient = check new ("localhost:9090/graphql");
    string document = "{ hello }";
    Response response = check helloClient->execute(document);
    io:println(response.data.hello);
}
```

## Features

- Dependently-typed response retrieval with Ballerina type inferring
- Custom client generation support

---
name: ballerina-graphql
description: The Ballerina Standard Library Package for write GraphQL services.
url: https://lib.ballerina.io/ballerina/graphql/latest
github: ballerina-platform/module-ballerina-graphql
---

To run a `ballerina-graphql` hello world server:

- Download and install [Ballerina Language](https://ballerina.io/downloads)
- Then run `bal run graphql_service.bal` to run the service, with this code in the `graphql_service.bal` file:

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {
    resource function get hello() returns string {
        return "Hello, world!";
    }
}
```

## Features

- Built with Ballerina `service` and `listener` model, which are first-class citizens in Ballerina
- Supports subscriptions over websocket (No additional libraries needed)
- Supports file upload
- Built-in GraphiQL client

---
name: Ballerina GraphQL Library
description: The package available as a part of the standard library of Ballerina for developing GraphQL APIs.
url: https://ballerina.io/learn/write-a-graphql-api-with-ballerina/
github: ballerina-platform/module-ballerina-graphql
---

Add the following to a file named `hello.bal` and run the `bal run hello.bal` command to execute it.

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(4000) {

    resource function get greeting(string name) returns string {
        return string `Hello ${name}!`;
    }
}
```

Once the service is up and running, you can run the following query to test it.

```
{
    greeting(name: "Ballerina")
}
```

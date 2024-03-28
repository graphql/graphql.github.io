---
name: Spring for GraphQL
description: Spring for GraphQL provides support for Spring applications built on GraphQL Java.
url: https://spring.io/projects/spring-graphql
github: spring-projects/spring-graphql
---

Spring for GraphQL provides support for Spring applications built on
[GraphQL Java](https://www.graphql-java.com/). See the official [Spring guide](https://spring.io/guides/gs/graphql-server/) for how to build a GraphQL service in 15 minutes.

- It is a joint collaboration between the GraphQL Java team and Spring engineering.
- Our shared philosophy is to provide as little opinion as we can while focusing on comprehensive support for a wide range of use cases.
- It aims to be the foundation for all Spring, GraphQL applications.

Features:

- Server handling of GraphQL requests over HTTP, WebSocket, and RSocket.
- An annotation-based programming model where @Controller components use annotations to declare handler methods with flexible method signatures to fetch the data for specific GraphQL fields. For example:

```java
@Controller
public class GreetingController {

    @QueryMapping
    public String hello() {
        return "Hello, world!";
    }

}
```

- Client support for executing GraphQL requests over HTTP, WebSocket, and RSocket.
- Dedicated support for testing GraphQL requests over HTTP, WebSocket, and RSocket, as well as for testing directly against a server.

To get started, check the Spring GraphQL starter on https://start.spring.io and the
[samples](https://docs.spring.io/spring-graphql/docs/current/reference/html/#samples) in this repository.

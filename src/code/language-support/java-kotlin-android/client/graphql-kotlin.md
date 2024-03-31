---
name: graphql-kotlin
description: A set of libraries for running GraphQL client and server in Kotlin.
github: ExpediaGroup/graphql-kotlin
---

GraphQL Kotlin provides a set of lightweight type-safe GraphQL HTTP clients. The library provides Ktor HTTP client and Spring WebClient based reference implementations as well as allows for custom implementations using other engines. Jackson and kotlinx-serialization type-safe data models are generated at build time by the provided Gradle and Maven plugins.

To generate Jackson models that will be used with GraphQL Kotlin Spring WebClient, add following to your Gradle build file:

```kotlin
// build.gradle.kts
import com.expediagroup.graphql.plugin.gradle.graphql

plugins {
    id("com.expediagroup.graphql") version $latestGraphQLKotlinVersion
}

dependencies {
  implementation("com.expediagroup:graphql-kotlin-spring-client:$latestGraphQLKotlinVersion")
}

graphql {
    client {
        // target GraphQL endpoint
        endpoint = "http://localhost:8080/graphql"
        // package for generated client code
        packageName = "com.example.generated"
    }
}
```

By default, GraphQL Kotlin plugins will look for query files under `src/main/resources`. Given `HelloWorldQuery.graphql` sample query:

```graphql
query HelloWorldQuery {
  helloWorld
}
```

Plugin will generate classes that are simple POJOs implementing GraphQLClientRequest interface and represent a GraphQL request.

```kotlin
package com.example.generated

import com.expediagroup.graphql.client.types.GraphQLClientRequest
import kotlin.String
import kotlin.reflect.KClass

const val HELLO_WORLD_QUERY: String = "query HelloWorldQuery {\n    helloWorld\n}"

class HelloWorldQuery: GraphQLClientRequest<HelloWorldQuery.Result> {
    override val query: String = HELLO_WORLD_QUERY

    override val operationName: String = "HelloWorldQuery"

    override fun responseType(): KClass<HelloWorldQuery.Result> = HelloWorldQuery.Result::class

    data class Result(
        val helloWorld: String
    }
}
```

We can then execute our queries using target client.

```kotlin
package com.example.client

import com.expediagroup.graphql.client.spring.GraphQLWebClient
import com.expediagroup.graphql.generated.HelloWorldQuery
import kotlinx.coroutines.runBlocking

fun main() {
    val client = GraphQLWebClient(url = "http://localhost:8080/graphql")
    runBlocking {
        val helloWorldQuery = HelloWorldQuery()
        val result = client.execute(helloWorldQuery)
        println("hello world query result: ${result.data?.helloWorld}")
    }
}
```

See [graphql-kotlin client docs](https://opensource.expediagroup.com/graphql-kotlin/docs/client/client-overview) for additional details.

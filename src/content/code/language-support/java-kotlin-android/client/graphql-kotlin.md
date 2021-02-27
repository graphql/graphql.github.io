---
name: graphql-kotlin
description: A set of libraries for running GraphQL client and server in Kotlin.
url: https://github.com/ExpediaGroup/graphql-kotlin/
github: ExpediaGroup/graphql-kotlin
---

GraphQL Kotlin provides a set of lightweight type-safe GraphQL HTTP clients. The library provides Ktor HTTP client and Spring WebClient based reference implementations as well as allows for custom implementations using other engines. Type-safe data models are generated at build time by the GraphQL Kotlin Gradle and Maven plugins.

To generate Ktor based GraphQL client add following to your Gradle build file:

```kotlin
// build.gradle.kts
import com.expediagroup.graphql.plugin.generator.GraphQLClientType
import com.expediagroup.graphql.plugin.gradle.graphql

plugins {
    id("com.expediagroup.graphql") version $latestGraphQLKotlinVersion
}

dependencies {
  implementation("com.expediagroup:graphql-kotlin-ktor-client:$latestGraphQLKotlinVersion")
}

graphql {
    client {
        // target GraphQL endpoint
        endpoint = "http://localhost:8080/graphql"
        // package for generated client code
        packageName = "com.example.generated"
        clientType = GraphQLClientType.KTOR
    }
}
```

By default, GraphQL Kotlin plugin will look for query files under `src/main/resources`. Given `helloWorld: String!` query we can add following `HelloWorldQuery.graphql` sample query to our repo:

```graphql
query HelloWorldQuery {
  helloWorld
}
```

Plugin will generate following client code:

```kotlin
package com.example.generated

import com.expediagroup.graphql.client.GraphQLKtorClient
import com.expediagroup.graphql.types.GraphQLResponse
import kotlin.String

const val HELLO_WORLD_QUERY: String = "query HelloWorldQuery {\n    helloWorld\n}"

class HelloWorldQuery(
  private val graphQLClient: GraphQLKtorClient<*>
) {
  suspend fun execute(requestBuilder: HttpRequestBuilder.() -> Unit = {}): GraphQLResponse<HelloWorldQuery.Result> =
      graphQLClient.execute(HELLO_WORLD_QUERY, "HelloWorldQuery", null, requestBuilder)

  data class Result(
    val helloWorld: String
  )
}
```

We can then execute the client 

```kotlin
package com.example.client

import com.expediagroup.graphql.client.GraphQLKtorClient
import com.expediagroup.graphql.generated.HelloWorldQuery
import kotlinx.coroutines.runBlocking
import java.net.URL

fun main() {
    val client = GraphQLKtorClient(url = URL("http://localhost:8080/graphql"))
    val helloWorldQuery = HelloWorldQuery(client)
    runBlocking {
        val result = helloWorldQuery.execute()
        println("hello world query result: ${result.data?.helloWorld}")
    }
    client.close()
}
```

See [graphql-kotlin docs](https://expediagroup.github.io/graphql-kotlin/docs/getting-started) for additial details.
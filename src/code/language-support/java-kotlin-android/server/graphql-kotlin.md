---
name: graphql-kotlin
description: A set of libraries for running GraphQL client and server in Kotlin.
github: ExpediaGroup/graphql-kotlin
---

GraphQL Kotlin follows a code first approach for generating your GraphQL schemas. Given the similarities between Kotlin and GraphQL, such as the ability to define nullable/non-nullable types, a schema can be generated from Kotlin code without any separate schema specification. To create a reactive GraphQL web server add following dependency to your Gradle build file:

```kotlin
// build.gradle.kts
implementation("com.expediagroup", "graphql-kotlin-spring-server", latestVersion)
```

We also need to provide a list of supported packages that can be scanned for exposing your schema objects through reflections. Add following configuration to your `application.yml` file:

```yaml
graphql:
  packages:
    - "com.your.package"
```

With the above configuration we can now create our schema. In order to expose your queries, mutations and/or subscriptions in the GraphQL schema you simply need to implement corresponding marker interface and they will be automatically picked up by `graphql-kotlin-spring-server` auto-configuration library.

```kotlin
@Component
class HelloWorldQuery : Query {
  fun helloWorld() = "Hello World!!!"
}
```

This will result in a reactive GraphQL web application with following schema:

```graphql
type Query {
  helloWorld: String!
}
```

See [graphql-kotlin docs](https://expediagroup.github.io/graphql-kotlin/docs) for additial details.

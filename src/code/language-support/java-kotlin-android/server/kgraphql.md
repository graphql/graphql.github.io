---
name: KGraphQL
description: KGraphQL is a pure Kotlin implementation of a code-first GraphQL server with focus on a rich and easy-to-use DSL that leverages existing code to set up the schema.
url: https://stuebingerb.github.io/KGraphQL/
github: stuebingerb/KGraphQL
tags:
  - tools-and-libraries
  - backend
---

Here's an example of how to create a simple schema based on a Kotlin data class plus a property resolver that gets applied onto your class:

```kotlin
data class Article(val id: Int, val text: String)

suspend fun main() {
    val schema = KGraphQL.schema {
        query("article") {
            resolver { id: Int?, text: String ->
                Article(id ?: -1, text)
            }
        }
        type<Article> {
            property("fullText") {
                resolver { article: Article ->
                    "${article.id}: ${article.text}"
                }
            }
        }
    }

    schema.execute("""
        {
            article(id: 5, text: "Hello World") {
                id
                fullText
            }
        }
    """.trimIndent()).let(::println)

    // {"data":{"article":{"id":5,"fullText":"5: Hello World"}}}
}
```

KGraphQL is using coroutines behind the scenes to provide great asynchronous performance.

See [KGraphQL docs](https://stuebingerb.github.io/KGraphQL/Installation/) for more in depth usage.

## Ktor Plugin

KGraphQL has a Ktor plugin which gives you a fully functional GraphQL server with a single [install](https://ktor.io/docs/server-plugins.html#install) function call. The example below shows how to set up a GraphQL server within Ktor and it will give you a [GraphQL IDE](https://github.com/graphql/graphiql/tree/main) out of the box by entering `localhost:8080/graphql`.

```kotlin
fun Application.module() {
  install(GraphQL) {
    playground = true
    schema {
      query("hello") {
        resolver { -> "World!" }
      }
    }
  }
}
```

You can follow the [Ktor tutorial](https://stuebingerb.github.io/KGraphQL/Tutorials/ktor/) to set up a KGraphQL server with Ktor.

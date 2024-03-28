---
name: KGraphQL
description: KGraphQL is a Kotlin implementation of GraphQL. It provides a rich DSL to set up the GraphQL schema.
url: https://kgraphql.io/
github: aPureBase/KGraphQL
---

Here's an example on how to create a simple schema based on a kotlin data class plus a property resolver that gets applied onto your class.

```kotlin
data class Article(val id: Int, val text: String)

fun main() {
    val schema = KGraphQL.schema {
        query("article") {
            resolver { id: Int?, text: String ->
                Article(id ?: -1, text)
            }
        }
        type<Article> {
            property<String>("fullText") {
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
    """).let(::println)
}
```

KGraphQL is using coroutines behind the scenes to provide great asynchronous performance.

See [KGraphQL docs](https://kgraphql.io/Installation/) for more in depth usage.

## Ktor Plugin

KGraphQL has a Ktor plugin which gives you a fully functional GraphQL server with a single [install](https://ktor.io/docs/zfeatures.html) function call. Example below shows how to set up a GraphQL server within Ktor and it will give you a [GraphQL Playground](https://github.com/graphql/graphql-playground) out of the box by entering `localhost:8080/graphql`.

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

You can follow the [Ktor tutorial](https://kgraphql.io/Tutorials/ktor/) to set up a KGraphQL server with ktor from scratch up.

---
name: Baton
description: A Relay-style GraphQL client for Compose on Android and the JVM, in which each composable declares the GraphQL fragment it reads and a compiler checks every fragment against the schema at build time.
github: shergin/baton
tags:
  - tools-and-libraries
  - frontend
---

Baton brings Relay's model to Compose. A composable declares the GraphQL fragment it reads with a `@Fragment` annotation and takes the generated lens as a parameter. Baton's compiler is built on the Relay compiler and uses Relay's directives. It checks every fragment against the schema at build time and generates a typed, read-only lens per fragment, with one accessor for each field the fragment declares. A screen's `@Query` spreads the fragments of the composables it shows, and the compiler assembles them into one operation, so each screen sends one request.

Responses are normalized into a store that Compose's snapshot state observes, so when a field changes, only the composables that read that field recompose. Baton supports Relay connections for pagination, optimistic responses, subscriptions, `@defer`, and a store that persists on SQLite.

The runtime is published to Maven Central as `com.shergin.baton:baton` for the JVM and Android, and the Gradle plugin `com.shergin.baton` runs the compiler. A separate Swift runtime for SwiftUI uses the same compiler. The API will change before 1.0.

A row declares the fields it reads, and the screen's query spreads the row's fragment:

```kotlin
@Fragment($$"""
    fragment IssueRow_issue on Issue {
      number
      title
      author { login }
    }
    """)
@Composable
fun IssueRow(issue: IssueRow_issue) {
    Column {
        Text("#${issue.number} ${issue.title}")
        Text(issue.author?.login ?: "ghost")
    }
}

@Query($$"""
    query IssuesQuery($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        nameWithOwner
        issues(first: 20, states: OPEN) {
          nodes { id ...IssueRow_issue }
        }
      }
    }
    """)
@Composable
fun IssuesScreen(owner: String, name: String) {
    val query = rememberQuery(
        IssuesQuery(owner = owner, name = name),
    )
    when (val phase = query.phase) {
        is Phase.Ready -> phase.data.repository?.let { repo ->
            LazyColumn {
                item { Text(repo.nameWithOwner) }
                items(repo.issues.nodes.orEmpty()) {
                    IssueRow(it.issueRow)
                }
            }
        }
        Phase.Loading ->
            CircularProgressIndicator()
        is Phase.Failed -> ErrorView(phase.error) {
            query.retry()
        }
    }
}
```

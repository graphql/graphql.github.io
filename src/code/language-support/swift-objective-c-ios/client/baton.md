---
name: Baton
description: A Relay-style GraphQL client for SwiftUI, in which each view declares the GraphQL fragment it reads and a compiler checks every fragment against the schema at build time.
github: shergin/baton
tags:
  - tools-and-libraries
  - frontend
---

Baton brings Relay's model to SwiftUI. A view declares the GraphQL fragment it reads with `@Fragment`, beside its body. Baton's compiler is built on the Relay compiler and uses Relay's directives. It checks every fragment against the schema at build time and generates a typed, read-only lens per fragment, with one accessor for each field the fragment declares. A screen's `@Query` spreads the fragments of the views it shows, and the compiler assembles them into one operation, so each screen sends one request.

Responses are normalized into a store whose records SwiftUI's Observation tracks, so when a field changes, only the views that read that field render again. Baton supports Relay connections for pagination, optimistic responses, subscriptions, `@defer`, and a store that persists on SQLite. UIKit and AppKit controllers can read the same data a view does.

Baton is distributed with Swift Package Manager and supports iOS 26 and macOS 26. A separate Kotlin runtime for Compose uses the same compiler. The API will change before 1.0.

A row declares the fields it reads, and the screen's query spreads the row's fragment:

```swift
struct IssueRow: View {
    @Fragment("""
    fragment IssueRow_issue on Issue {
      number
      title
      author { login }
    }
    """)
    var issue: IssueRow_issue

    var body: some View {
        VStack(alignment: .leading) {
            Text("#\(issue.number) \(issue.title)")
            Text(issue.author?.login ?? "ghost")
                .foregroundStyle(.secondary)
        }
    }
}

struct IssuesScreen: View {
    @Query("""
    query IssuesQuery($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        nameWithOwner
        issues(first: 20, states: OPEN) {
          nodes { id ...IssueRow_issue }
        }
      }
    }
    """)
    var issues: IssuesQuery

    var body: some View {
        switch issues.phase {
        case .ready(let data):
            if let repo = data.repository {
                List {
                    ForEach(repo.issues.nodes ?? .empty) {
                        IssueRow(issue: $0.issueRow)
                    }
                }
                .navigationTitle(repo.nameWithOwner)
            }
        case .loading:
            ProgressView()
        case .failed(let error):
            ErrorView(error) { issues.retry() }
        }
    }
}
```

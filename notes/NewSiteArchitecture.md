# New GraphQL.org Site Architecture:

## Index

_Goal:_ This is the landing page and is our opportunity to quickly capture attention and explain what GraphQL is and why you should care.

_Timeframe:_ Launch Mon, Sept 12th

This page is effectively a marketing page for GraphQL and should be the visual, scrollable version of the "Introducing GraphQL" conference talks and should be rich with visual metaphor and illustration and take advantage of whitespace to make individual salient points.

Above the fold, this page should succinctly explain what GraphQL is and illustrate with a simple (editable) query/response example. Before scrolling, you should understand the following:

- GraphQL solves the same problem as REST.
- GraphQL is a query language for APIs (and not Databases).
- GraphQL is sent by client applications, such as an iOS app.
- GraphQL is evaluated by a web service and often returned as JSON.
- GraphQL services provide a complete description of your data with a type system.
- It's easy to build powerful tools for your data using GraphQL.

Below the fold we should introduce concepts one at a time, each with visual metaphor and take-aways:

1. GraphQL clients describe what they need in terms of how client developers think about data.

- If you're familiar with JSON, GraphQL is easy to learn and understand.
- GraphQL only sends what you ask for, nothing more or less, making your app faster and more stable.
- It's easy to anticipate the shape of the result of any query.

2. GraphQL queries can access many "resources" in a single network request.

- A query can access properties of not just one object, but of many related objects.
- A query can access multiple unrelated objects at once.
- Compared to REST, GraphQL collects all the data needed for your app with much less network activity, making your app faster.

3. GraphQL services describes what's possible with a strong type system.

- GraphQL services provide a complete description of your data.
- Every `{ }` corresponds to an object of a particular type, and every type describes the fields available.
- GraphQL only runs queries that make sense and provides helpful error messages.
- Tools and IDEs can make editing queries easy via type-aheads.
  - GraphiQL is a free tool that you can use.
- Type system defines descriptions, making it easy to keep documentation up to date.
- Every query guarantees the shape and type of its response.

4. GraphQL is composable via fragments.

- Fragments describe a portion of some Type to be queried.
- Fragments are often used next to View code where data is used.
- Fragments are composed together to create full queries.

5. GraphQL makes backwards-compatible APIs easy.

- Server does not need to worry about concerns of any particular client, only the complete set of capabilities. Clients are responsible for the data they receive.
- Because GraphQL only sends what you ask for, new capabilities can be introduced via new fields on types with no impact on existing queries.
- Old capabilities can be marked "deprecated" with no impact on existing queries.
- No versioning your API when using GraphQL leads to cleaner code on the server.

6. GraphQL queries are answered by simple functions on your server.

- GraphQL is not backed by any database technology, just like REST.
- Every field on each type is represented by a function for retrieving that data.
- GraphQL will call your functions and execute a query with optimal concurrency.
- It's easy to write a GraphQL API using your existing data model.

Finally, there will be a set of links for learning more (diving into `Learn`) and for getting started (in `Code`). As well as a wall-o-logo for companies using GraphQL.

## Learn

_Goal:_ Introduce GraphQL, one concept at a time, covering both primary concepts and best practices.

_Timeframe:_ Basic primary concepts by Sept 12th, advanced primary concepts by Sept 30th, best practices as ready over Q3/Q4.

Where "GraphQL the Spec" is designed for a specific audience of those building GraphQL servers, this represents "GraphQL the Book" and is designed for the audience of anyone who wishes to use GraphQL. It should cover both GraphQL core concepts in addition to best practices and further topics, and it should range from introductory concepts through advanced concepts.

The landing page for this section should begin as a more information-rich introduction to GraphQL, explaining why you might use it, and give a brief overview of the constituent parts. Take-aways from this introduction page:

- GraphQL is a query language.
- GraphQL servers describe a type system, called a "schema".
- Clients can access a GraphQL server's type system to learn about what's possible.
- Clients send queries to servers and typically get back JSON.
- GraphQL servers validate and execute GraphQL queries.

There is then a TOC through the sections and chapters (this is a straw-man list, open to reordering and addition)

- Introducing GraphQL (this initial page)
- Core Concepts:
  - Requests:
    - Basics (queries & mutations, fields, arguments, aliases, comments)
    - Variables
    - Fragments
    - Values
    - Directives (skip & include)
  - Type System:
    - Basics (Schema, Objects & Fields)
    - Scalars & Enums
    - Lists & NonNull (mention error handling)
    - Interfaces & Unions
  - How GraphQL Works:
    - Validation
    - Execution & Error Handling
    - Introspection
- Best Practices:
  - Servers:
    - Serving over HTTP
    - Authentication & Authorization
    - Mutations
    - Paginating Lists
    - Schema Changes & Versioning
    - Query Performance (Batching & Caching)
    - Security & Rate Limiting
    - Schema Design Guidelines
  - Clients:
    - Using Variables
    - Co-locating Fragments
    - Caching Results
    - Persisted Queries
    - Generating Models
    - Migrating from REST

## Code

_Goal:_ Introduce open source GraphQL tools along with quick getting started guidelines for each.

_Timeframe:_ At least 3 servers described by Sept 12th, remainder by Sept 30th.

This page is all about fulfilling the "Ok I'm sold! Now what?" conundrum. It should first very quickly reintroduce the elements of GraphQL you would expect to see software for as well as offer a quick path towards getting something working.

1. Servers

Explain the purpose of a GraphQL server, that there are servers written for many different languages and environments, and that graphql-js is the reference implementation operated by Facebook.

Each server should contain the following:

- Logo
- Name of Project
- Language/Environment
- Link to website
- Getting started (e.g. npm install + code sample)

2. Clients

Explain the purpose of a GraphQL client, that it's okay to just use curl/XHR/fetch, and that clients can offer more value via smart caches and integration with UI frameworks.

Each client should contain similar set of info as servers.

3. Services

Hosted GraphQL-as-a-service have an opportunity to pitch themselves here.

4. Tools

Common tools used by GraphQL community, e.g. GraphiQL.

## Community

_Goal:_ Central dispatch for finding help for GraphQL questions, learning about conferences and meetups, and connecting with the community.

_Timeframe:_ Simple version by Sept 12th, evolve over time.

This page should serve as a high-level view of what resources are available and what's going on in the community. It should encourage pull-requests to facilitate being updated by the community over time.

- Links out to:
  - Stack Overflow topic
  - Slack/Discord channels
  - Popular blogs
  - Twitter feed
- Calendar of upcoming meetups or conference talks related to GraphQL (encourage edits by community)
- Grid of recorded videos about GraphQL (conf talks, etc.).

## Blog

_Goal:_ GraphQL core team's blog, signal-boosting popular articles written elsewhere.

While any evergreen content typically belongs as chapters in the "Learn" section, the Blog is an opportunity for GraphQL core team members or occasional invited contributors to discuss experiments, interesting applications, or signal-boost things like new releases of the GraphQL spec, the reference implementation, upcoming events, or links out to interesting articles.

Task: generate RSS feed (maybe also email subscription?)

Long term goal: metric frequency of posts, set goals to moderate frequency.

## Spec

Link out to GraphQL spec.

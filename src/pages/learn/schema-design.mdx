# Schema Design

<p className="learn-subtitle">Design and evolve a type system over time without versions</p>

## Versioning

While there's nothing that prevents a GraphQL service from being versioned just like any other API, GraphQL takes a strong opinion on avoiding versioning by providing the tools for the continuous evolution of a GraphQL schema.

Why do most APIs version? When there's limited control over the data that's returned from an API endpoint, _any change_ can be considered a breaking change, and breaking changes require a new version. If adding new features to an API requires a new version, then a tradeoff emerges between releasing often and having many incremental versions versus the understandability and maintainability of the API.

In contrast, GraphQL only returns the data that's explicitly requested, so new capabilities can be added via new types or new fields on existing types without creating a breaking change. This has led to a common practice of always avoiding breaking changes and serving a versionless API.

## Nullability

Most type systems which recognise "null" provide both the common type and the _nullable_ version of that type, whereby default types do not include "null" unless explicitly declared. However, in a GraphQL type system, every field is _nullable_ by default. This is because there are many things that can go awry in a networked service backed by databases and other services. A database could go down, an asynchronous action could fail, an exception could be thrown. Beyond simply system failures, authorization can often be granular, where individual fields within a request can have different authorization rules.

By defaulting every field to _nullable_, any of these reasons may result in just that field returned "null" rather than having a complete failure for the request. Instead, GraphQL provides [non-null](/learn/schema/#lists-and-non-null) variants of types which make a guarantee to clients that if requested, the field will never return "null". Instead, if an error occurs, the previous parent field will be "null" instead.

When designing a GraphQL schema, it's important to keep in mind all the problems that could go wrong and if "null" is an appropriate value for a failed field. Typically it is, but occasionally, it's not. In those cases, use non-null types to make that guarantee.
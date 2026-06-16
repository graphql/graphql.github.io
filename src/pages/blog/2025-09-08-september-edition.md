---
title: "Announcing the September 2025 Edition of the GraphQL Specification"
tags: ["spec"]
date: 2025-09-08
byline: Lee Byron
featured: true
---

It’s here: the [September 2025 edition of the GraphQL specification](https://spec.graphql.org/September2025/)!

This is the first edition of the specification since [October 2021](https://spec.graphql.org/October2021/), and it reflects years of steady, collaborative work from the GraphQL community. More than 100 commits, hundreds of comments, and contributions from dozens of community members went into this update — all with the goal of keeping GraphQL stable, expressive, and primed for the next generation of AI-ready API development.

Since its initial release 10 years ago, GraphQL has grown into a critical layer of infrastructure at startups, enterprises, and platforms across industries. The spec has two guiding priorities:

**Stability first**: With so many tools and services built on GraphQL, the ecosystem relies on a solid foundation. This release fixes inconsistencies, addresses edge cases, and helps avoid performance pitfalls.

**Expressiveness for API consumers**: Developers use GraphQL because it’s intuitive, flexible, and powerful. This edition makes the language even more productive and expressive, particularly for AI-first applications.

## **Why It Matters**

Several updates in this edition make GraphQL an even better foundation for AI assistants, codegen tools, and autonomous agents:

- Descriptions on executable documents give LLMs richer context for intent understanding and safer refactoring.
- Schema Coordinates provide a precise, both human- and machine-readable way to reference fields and types, improving traceability, evals, and automated PR feedback.
- OneOf input objects simplify schema entrypoints whilst maintaining type safety by expressing mutually exclusive inputs directly in the schema. This is particularly helpful for prompt and form generation.
- The clarified execution/error terminology and request `extensions` make responses more predictable for deterministic parsers and toolchains.

## **Notable Updates**

- **OneOf Input Objects (a.k.a. input unions)** \
  A long-requested feature! This unlocks more natural ways to model mutually exclusive inputs, leading to tidier schemas and unlocking use-cases that couldn’t be safely expressed previously - check out the [blog post](https://graphql.org/blog/2025-09-04-multioption-inputs-with-oneof/). [RFC #825](https://github.com/graphql/graphql-spec/pull/825)
- **Schema Coordinates** \
  A standardized way to refer to parts of a schema, paving the way for better tooling, error reporting, and developer experience. [RFC #794](https://github.com/graphql/graphql-spec/pull/794)
- **Descriptions on Documents** \
  Improved support for documenting queries and operations — helpful for humans and increasingly relevant for AI-powered tools. [RFC #1170](https://github.com/graphql/graphql-spec/pull/1170)
- **Expanded Deprecation Support** \
  Deprecation is now more broadly supported across schema elements, making it easier to evolve APIs without breaking clients. \[RFCs [#805](https://github.com/graphql/graphql-spec/pull/805), [#1040](https://github.com/graphql/graphql-spec/pull/1040), [#1053](https://github.com/graphql/graphql-spec/pull/1053), [#1142](https://github.com/graphql/graphql-spec/pull/1142)\]
- **Full Unicode Support** \
  The language grammar now supports the entire Unicode range, improving internationalization and accessibility. [RFC #849](https://github.com/graphql/graphql-spec/pull/849)
- **Editorial Improvements** \
  The spec is clearer, more consistent, and easier to contribute to. Ambiguities have been reduced, and the style guide has been modernized.

## **Thank you, contributors!**

This edition wouldn’t exist without the dedication of the GraphQL community. Dozens of contributors — from core maintainers to first-time spec authors — invested their time and expertise to make GraphQL better for everyone.

Special thanks to the many reviewers, implementers, and champions who shaped this release.

You can explore the full list of contributors in the [changelog](https://github.com/graphql/graphql-spec/blob/main/changelogs/September2025.md).

## **Get involved**

GraphQL is a living standard. If you’re building APIs, tooling, or clients, your voice matters in shaping its future. Anyone can join [working group meetings](https://github.com/graphql/graphql-wg) and contribute proposals, reviews, or feedback.

📖 **Read the full spec:** [GraphQL September 2025 Specification](https://spec.graphql.org/September2025/) \
🔎 **Review all changes:** [Full changelog & diff](https://github.com/graphql/graphql-spec/compare/October2021...f29fbcd2ab5af763fce7ad62896eb62465a669b3) \
🤝 **Contribute:** [How to get involved](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md)

---
name: GraPHPinator
description: A GraphQL implementation for modern PHP. Includes features from latest draft, middleware directives and modules with extra functionality.
github: infinityloop-dev/graphpinator
---

GraPHPinator is feature complete PHP implementation of GraphQL server. Its job is transformation of query string into resolved Json result for a given Schema.

- Aims to be compliant with the latest draft of GraphQL specification.
- Fully typesafe, and therefore minimum required PHP version is 8.0. Sacrafices a tiny bit of convenience for huge amount of clarity and safety - no random configuration `array`s, no mixed types, no variable function arguments - this library doesnt try to save you from verbosity, but makes sure you always know what you've got.
- Code first.
- Flexible. Easy to extend with extra functionality using Modules or middleware Directives.
- Includes some opt-in extensions which are out of scope of official specs:
  - [Printer](https://github.com/infinityloop-dev/graphpinator-printer) - Schema printing for GraPHPinator typesystem.
  - [Extra types](https://github.com/infinityloop-dev/graphpinator-extra-types) - Some useful and commonly used types, both scalar or composite.
  - [Constraint directives](https://github.com/infinityloop-dev/graphpinator-constraint-directives) - Typesystem directives to declare additional validation on top of GraphQL typesystem.
  - [Where directives](https://github.com/infinityloop-dev/graphpinator-where-directives) - Executable directives to filter values in lists.
  - File upload using [multipart-formdata](https://github.com/jaydenseric/graphql-multipart-request-spec) specs (currently bundled).
  - [Query cost limit module](https://github.com/infinityloop-dev/graphpinator-query-cost) - Modules to limit query cost by restricting maximum depth or number of nodes.
- Project is composed from multiple smaller packages, which may be used standalone:
  - [Tokenizer](https://github.com/infinityloop-dev/graphpinator-tokenizer) - Lexical analyzer of GraphQL document.
  - [Parser](https://github.com/infinityloop-dev/graphpinator-parser) - Syntactic analyzer of GraphQL document.

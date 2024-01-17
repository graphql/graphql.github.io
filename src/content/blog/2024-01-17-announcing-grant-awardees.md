---
title: "Announcing the GraphQL Foundation's Grant Awardees: Benefitting a GraphQL Ecosystem for All"
tags: ["blog"]
layout: blog
date: 2024-01-17
byline: Jory Burson and Benjie Gillam
permalink: /blog/2024-01-17-announcing-grant-awardees
---

We are thrilled to announce the recipients of grants from the GraphQL Foundation, which were selected from an application process initiated in late 2022. Awardees were selected after an extensive review and vote of the GraphQL TSC. These grant awards recognize and support important projects that advance GraphQL technologies, particularly in the realms of GraphQL over HTTP and the GraphQL Language Service Server.

**Bolstering GraphQL over HTTP — Denis Badurina**

The first grant has been awarded to a project focussed on increasing interoperability between the various implementations of GraphQL clients and servers using HTTP as the transport layer. The [GraphQL–over–HTTP subcommittee](https://github.com/graphql/graphql-over-http) was formed with the goal of writing a specification to increase interoperability between clients and servers that expose GraphQL schemas via HTTP endpoints. At a [recent GraphQL Working Group](https://github.com/graphql/graphql-wg/blob/main/notes/2023/2023-11.md#graphql-over-http-is-advancing-to-stage-2-5m-benjie), the GraphQL–over–HTTP spec was advanced to Stage 2 (Draft) status. This achievement was thanks in a large part to [Denis Badurina](https://github.com/enisdenjo)'s development and maintenance of the reference implementation of the GraphQL–over–HTTP specification: [graphql-http](https://github.com/graphql/graphql-http) and the associated [testing tool](https://graphql-http.com/). This tool can be used to test if any GraphQL API is compliant with the GraphQL–over–HTTP specification, no matter what language it is written in. Denis has worked tirelessly with maintainers of various servers to ensure that the tool, the server, and the specification are aligned.

This grant will enable Denis to continue to invest into maintenance and development of this important project for GraphQL interoperability and collaboration. When informed he was to be a grant awardee, Denis said: "this is awesome news! I'll start by saying thank you. I am very humbled, excited and happy that my work has a worthwhile impact on the GraphQL ecosystem. Thank you for choosing me, I will continue doing my best."

**Future–proofing the GraphQL Language Service Server — Rikki Schulte**

The second grant recognizes a project that is vital for consumers of GraphQL. One of the most popular tools in the GraphQL toolbox is [GraphiQL](https://github.com/graphql/graphiql/blob/a80801970e095e493eb0fda7687766f103bf701e/packages/graphiql/README.md) — our in–browser IDE that enables exploring and querying a GraphQL API. It's often the first experience that potential users have with GraphQL, and very quickly helps them to "[grok](https://dictionary.cambridge.org/dictionary/english/grok)" some core concepts such as the built in documentation, type safety, and only receiving what you ask for. Underlying this beautifully simple interface is a powerful and complex combination of tools and libraries which also power other projects such as alternative GraphQL IDEs and code editor integrations. Key to this is the GraphQL Language Server and associated libraries.

[Rikki Schulte](https://github.com/acao), one of the long term maintainers of GraphiQL and the associated projects, is the recipient of this second grant. The grant will support her to improve the stability and maintainability of the GraphQL Language Server by providing a more comprehensive end–to–end test suite which should enable an overhaul of its aging architecture. Building on the Language Server's existing schema–aware auto–complete, jump to definition, and real–time error feedback; the ultimate goal of the Language Server project is to give all GraphQL programmers access to advanced features such as support for more languages and sophisticated refactoring tools whilst keeping astride of advances to the GraphQL specification itself.

What makes this project particularly exciting is its commitment to making GraphQL development more accessible and efficient. By providing tools that integrate seamlessly into existing development environments, Rikki hopes to lower the barrier to entry for new GraphQL developers and increase productivity for seasoned professionals. Rikki commented:

"I'm thrilled to receive this grant, as it will help me to focus on improving the stability and maintainability of the LSP server and vscode reference implementation, so that we can refactor for improved performance and contributor experience, and to introduce new exciting features with greater confidence. I owe it all to the GraphQL community!"

**A Commitment to Ecosystem and Community Growth**

Both projects embody the GraphQL Foundation's commitment to open source and community–driven development. By supporting these initiatives, the foundation is not only investing in individual technologies but also in the broader GraphQL community. These grants will facilitate collaboration, knowledge sharing and innovation, fostering a vibrant ecosystem around GraphQL.

In recognition of the work required to tend to such an ecosystem, the GraphQL Foundation together with the TSC has also funded [Benjie Gillam](https://github.com/benjie) to support the crucial “gardening” work that helps keep the GraphQL community moving forward, together. Benjie will continue to serve as our Community Manager in 2024 on contract with the Foundation, commenting:

"It has been a joy and a privilege helping to cultivate the vibrant ecosystem of the GraphQL community, and this support from the GraphQL Foundation will help me to continue this work: welcoming new members, fostering collaboration across the Foundation's own projects and beyond, and helping the wheels of progress to keep turning smoothly. Thank you GraphQL community!"

**Looking Forward**

As we celebrate the recipients of this year's grants, we also look forward to the impact their work will have on the GraphQL community and the tech industry at large. Their projects are not just about advancing individual technologies; they are about shaping the future of how we build and interact with GraphQL APIs.

The GraphQL Foundation is proud to support these talented individuals and teams, and we are excited to see their projects come to fruition. We believe their work will be instrumental in driving the next wave of innovation in GraphQL technology.

Stay tuned for updates on these projects and their contributions to the GraphQL ecosystem. We are just at the beginning of a new chapter in GraphQL's story, and the best is yet to come!

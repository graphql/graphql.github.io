---
title: Insights from The Guild's Q&A Session
tags: ["blog"]
layout: blog
date: 2023-06-20
byline: Jory Burson
permalink: /blog/2023-06-20-the-guild-qna-recap
---

In the fast-paced world of software development, staying updated with the latest technologies and best practices is crucial. GraphQL, a query language for APIs, has gained immense popularity for its flexibility and efficiency in fetching data. To delve deeper into the realm of GraphQL and its impact, a recent Q&A session with members of [The Guild](https://the-guild.dev/), an organization of open source contributors, provided valuable insights and recommendations. Let's explore the highlights of this session and gain a better understanding of the power of GraphQL.

**Philosophies and structure for open source organizations:**

During the Q&A session, The Guild members emphasized that their organization was created for the main purpose of long term open source maintenance. This decision led the organization to structure the group's work in a different way, such as having all of their projects under individual contributors names and not under the Guild’s [GitHub org](https://github.com/the-guild-org/), like [Yoga](https://github.com/dotansimha/graphql-yoga), [Mesh](https://github.com/Urigo/graphql-mesh) and [others](https://the-guild.dev/#platform).

They also focused on hiring people who were already community contributors before joining The Guild, in order to ensure that they support existing open source contributors and reduce bias in the selection process (by focusing on the individual's work, rather than their location or identity). That led into a diverse team from all across the globe, and they have written more about that model [in their about page](https://the-guild.dev/about-us).

During the Q&A, The Guild emphasized their support for local Meetup groups and their history of helping to start new ones. This commitment to community involvement reflects their dedication to fostering knowledge sharing and collaboration, which is essential for sustainable open source projects.

**Authorization and Shielding with Envelop:**

The Guild team recommended using [Envelop](https://the-guild.dev/blog/introducing-envelop), a plugin system that manipulates the execution flow, for [authorization and shielding in GraphQL APIs](https://the-guild.dev/blog/graphql-authentication-with-envelop-and-auth0). This approach provides a powerful alternative to directly wrapping resolvers, ensuring robust security measures are in place. By leveraging Envelop, developers can enhance the authorization control in their GraphQL APIs.

**Granular Authorization Control with Postgres's Row-Level Security:**

In addition to Envelop, the discussion highlighted the use of Postgres's Row-Level Security as a means of achieving more granular authorization control. This feature allows developers to define security policies at the database level, ensuring that only authorized users can access specific rows of data. By incorporating Postgres's Row-Level Security, developers can further fortify their GraphQL APIs against unauthorized access.

**The Advantages of "Non-Spec" GraphQL and Envelop/Yoga plugins:**

The discussion also touched upon the benefits of using "non-spec" GraphQL features. With Envelop, you can safely use [advanced GraphQL features](https://the-guild.dev/graphql/envelop/v3/guides/using-graphql-features-from-the-future) before they are included in the official spec, which releases less frequently.

These tools offer additional functionalities and optimizations, enabling developers to maximize the potential of GraphQL in their projects. The Guild team emphasized the value of exploring these options to enhance performance and streamline development processes while also giving valuable feedback from real production usage to the [GraphQL Working Group](https://graphql.org/community/developers/#the-graphql-working-group) about these features.

**Caching GraphQL Operations:**

Participants in the session raised intriguing points about caching GraphQL operations. The Guild team acknowledged the potential advantages of adding caching to GraphQL requests, optimizing response times and reducing unnecessary network traffic. The point was raised that one can achieve more granular caching with GraphQL than with REST, and a primary reason people think caching is harder in GraphQL is the lack of knowledge about tools like [Stellate](https://stellate.co/) and [Yoga’s response caching support](https://the-guild.dev/graphql/yoga-server/docs/features/response-caching).

**GraphQL Workflows at scale:**

In discussing larger-scale usage of GraphQL, The Guild participants referenced some of their work helping large teams manage GraphQL APIs using workflows and tools using tools sluch as [GraphQL Hive](https://the-guild.dev/graphql/hive), an open source schema registry. Some of the [new features recently released to Hive](https://the-guild.dev/blog/tag/graphql-hive), such as the [schema policy feature](https://the-guild.dev/blog/hive-introducing-schema-policy), enable organizations to enforce best practices and schema rules across many different teams automatically.

**Community Stewardship and Future Collaborations:**

The Guild team acknowledged the importance of community contributions and discussed their efforts to improve and simplify the [GraphQL community website](https://graphql.org/), and emphasized the importance of fostering a vibrant and inclusive GraphQL community. The Q&A session with The Guild offered a wealth of knowledge and insights into the world of GraphQL. Furthermore, the session highlighted areas for improvement and opportunities for community members to contribute. For more information check out [The Guild’s projects](https://the-guild.dev/#platform) and [blog](https://the-guild.dev/blog) and our [GraphQL official community page](https://graphql.org/community/).

As the GraphQL ecosystem continues to evolve, sessions like these provide valuable guidance and foster a sense of community among developers, paving the way for innovation and growth in our exciting ecosystem. Please [join us on June 28](https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N25ycGVoaXViOHZxdXFzN3Y5dWNiaGY2OGsgbGludXhmb3VuZGF0aW9uLm9yZ19pazc5dDl1dWoycDMyaTNyMjAzZGd2NW1vOEBn&tmsrc=linuxfoundation.org_ik79t9uuj2p32i3r203dgv5mo8%40group.calendar.google.com) for our next [Discord Q&A](http://discord.graphql.org/) session featuring engineering leaders from Hasura.

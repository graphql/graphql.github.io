---
title: Recapping our latest Q&A Session - Scaling UI Development with Relay GraphQL
tags: ["blog"]
layout: blog
date: 2023-07-19
byline: Jory Burson
permalink: /blog/2023-07-19-hasura-qna-recap
---

On July 12, we hosted an an enlightening Q&A session on scaling UI development with Relay GraphQL. Participants included several experts from [Hasura](https://hasura.io/) as well as interested attendees from our Discord community. The Q&A session was all about discussing the power of Relay in the realm of UI development. [Tanmai Gopal](https://www.linkedin.com/in/tanmaig/), CEO of Hasura, and [Akshaya Acharya](https://twitter.com/_nullxone), developer at Hasura, led the conversation, sharing their experiences and knowledge about the utilization of Relay and GraphQL in managing UI projects.

For those who couldn't make it, we've captured the highlights and insights shared during the discussion. Read on, and join us for our next Q&A Session on July 26 for another discussion about GraphQL at Scale on the [GraphQL Community Discord](https://discord.graphql.org) server!

1. **Scaling UI development with Relay GraphQL**: The Hasura team discussed how Relay GraphQL can facilitate scaling UI development, emphasizing how it can be a practical solution to prevent in-house development of similar mechanisms.

2. **Relay and React Server Component (RSC)**: They discussed their learnings from comparing and trying Relay with React's next-gen features like RSC and server actions. They pointed out that Relay fits well into things like RSC and solves issues that RSC alone does not handle, such as "compose API fetching across different types of components and craft the best / minimal set of queries."

3. **Migration to Relay**: The Hasura team shared their ongoing experience of migrating existing UI to Relay to improve team productivity. They emphasized the need to introduce Relay in independent and then closely connected components to avoid data inconsistency issues.

4. **Nullable-by-default schema with client controlled nullability**: The team also discussed the idea of using a nullable-by-default schema with client-controlled nullability. They noted that, while this approach can solve problems related to resolver errors and changes in the data model, it requires careful handling on the client side.

5. **Integration of Relay with NextJS**: Examples were shared on how to integrate Relay with the NextJS App Router and NextJS Pages Router.

6. **Development Tools for Relay**: They showed interest in the tools the community is using to build a backend Relay server, and the challenges faced while working with Relay.

7. **Relay and backend practices**: The Hasura team mentioned that they have not enforced nullable-by-default schemas yet and they can handle breaking changes rapidly due to their ability to iterate quickly on their GraphQL server.

The discussion provided valuable insights into how Relay GraphQL can ease and scale UI development. Notably, the real-world experiences shared by the Hasura team brought home the potential and practical advantages of using Relay in handling large-scale UI projects.

For those who missed it or wish to revisit, the [full transcript](https://discord.com/channels/625400653321076807/1098318659727921275/1128737562412974211) is available on our [Discord channel](https://discord.graphql.org).

Stay tuned for more such interactive Q&A sessions about modern topics and opportunities with GraphQL. If you have an idea or request for a Q&A session, please let us know!

---
title: GraphQL for Developers
layout: docs
category: Community
permalink: /community/developers/
next: /community/project-resources/
sublinks: How GraphQL is developed,Participating in development,GraphQL project governance
---

The following resources are intended to describe how GraphQL development processes work, how to get involved, and where to get help.

## Essential links

- The [GraphQL Specification](https://spec.graphql.org)
- GraphQL [reference implementations and tools](/code/)
- The official [GraphQL GitHub org](https://github.com/graphql)
- The official [GraphQL Discord](https://discord.graphql.org)
  - We're in the process of moving our official chat to Discord, but you may still find historical discussion at ~~the official [GraphQL Slack](https://slack.graphql.org)~~.
- Instructions on how to sign the [GraphQL Specification Membership Agreement](https://github.com/graphql/graphql-wg/tree/HEAD/membership)
- The [GraphQL project calendar](https://calendar.graphql.org)
- Meeting replays on the [GraphQL YouTube channel](https://youtube.graphql.org)
- The [GraphQL Community Grant](/foundation/community-grant/) program

## How GraphQL is developed

At its core, the GraphQL project is organized around the [specification](https://spec.graphql.org), with a wide variety of supporting implementations and tools.

GraphQL has an active and mutually beneficial relationship with its many implementations. The GraphQL specification is continuously evolving under the care of the [GraphQL Working Group](https://github.com/graphql/graphql-wg), which consists of GraphQL spec experts, contributors to public [reference implementations](/code/), and implementers. At any given time, GraphQL specification updates are a combination of anticipatory planning with documentation of patterns and behaviors that are already proven in production, sometimes at very large scale.

### Working groups

The GraphQL specification, sub-specifications, and official reference implementations are developed using the working group model. The working groups meet monthly or as-needed in order to review ideas and plan their work.

#### The GraphQL Working Group

The [GraphQL Working Group](https://github.com/graphql/graphql-wg) is the main group that plans and implements changes to the [GraphQL specification](https://spec.graphql.org). It meets actively and is the default place for discussion for topics which do not have a separate breakout working group (breakout working groups include the [Input Union WG](https://github.com/graphql/graphql-spec/blob/main/rfcs/InputUnion.md) and the [GraphQL-over-HTTP WG](https://github.com/graphql/graphql-over-http)).

- **GitHub**: [github.com/graphql/graphql-wg](https://github.com/graphql/graphql-wg)
- **Meeting frequency:** Monthly, generally the first Thursday ([calendar](https://calendar.graphql.org))
- **Agenda:** [GitHub](https://github.com/graphql/graphql-wg/tree/main/agendas)
- **Recordings:** [YouTube](https://www.youtube.com/playlist?list=PLP1igyLx8foH30_sDnEZnxV_8pYW3SDtb)

#### GraphQL.js Working Group

The [GraphQL.js Working Group](https://github.com/graphql/graphql-js-wg) works on one of the main reference implementations, [graphql.js](https://github.com/graphql/graphql-js).

- **GitHub**: [github.com/graphql/graphql-js-wg](https://github.com/graphql/graphql-wg)
- **Meeting frequency:** Monthly, generally the last Wednedsay ([calendar](https://calendar.graphql.org))
- **Agenda:** [GitHub](https://github.com/graphql/graphql-js-wg/tree/main/agendas)
- **Recordings:** [YouTube](https://www.youtube.com/playlist?list=PLP1igyLx8foHghwopNuQM7weyP5jR147I)

If you would like to set up a working group around a specific topic, please join a [GraphQL Working Group meeting](https://github.com/graphql/graphql-wg) and present your idea.

## Participating in development

GraphQL is developed in the open, through [GitHub](https://github.com/graphql) and working group meetings that are open for anyone to attend (so long as they are covered under the [free membership agreement](https://github.com/graphql/graphql-wg/tree/HEAD/membership)). In addition, anybody is welcome to view the [recordings of our meetings on YouTube](https://youtube.graphql.org)

### First steps

If you want to get involved in GraphQL, add yourself to the meeting agenda for one of our [working groups or implementations](https://github.com/graphql/graphql-wg/blob/main/GraphQL-TSC.md#about-the-graphql-specification-project), sign the document if you haven't already, and show up! Or, if you prefer, just open a PR against our projects as this will also initiate the spec membership signature process.

We welcome your participation!

### Getting up to speed

All of our work [happens in the open](https://github.com/graphql). In addition, we record our workgroups' meetings on [YouTube](https://youtube.graphql.org). If you are interested in quickly getting up to speed on what's happening in a working group, the meeting minutes and [replays](https://youtube.graphql.org) are a great place to begin.

### Asking questions

The best place to ask a development-related question is in a working group meeting, or by opening a GitHub issue. Please note that if you have an implementation question, you may get a faster answer by [asking in one of the channels more geared toward users](/community/users/#where-to-ask-questions).

## GraphQL project governance

GraphQL was open sourced by Facebook in 2015, and became a neutrally governed project managed by the Linux Foundation in 2019. In keeping with best practices, the technical governance of the GraphQL project is separate and distinct from the financial and policy governance of the [GraphQL Foundation](/foundation/).

### Technical governance

The GraphQL project is a chartered under the [Joint Development Foundation](https://www.jointdevelopment.org/) (JDF). JDF is a part of the Linux Foundation family, and is an organization specifically dedicated to making open standards easier to manage.

The GraphQL specification, the GraphQL Working Group, and all other sub-working groups and implementations in the [GraphQL GitHub organization](https://github.com/graphql) are governed by the [GraphQL project charter](https://technical-charter.graphql.org).

The [Technical Steering Committee](https://github.com/graphql/graphql-wg/blob/main/GraphQL-TSC.md), or TSC, is established in the [technical charter](https://technical-charter.graphql.org) as the top technical decision-making body. It consists of [representatives from the GraphQL technical community](https://github.com/graphql/graphql-wg/blob/main/GraphQL-TSC.md#tsc-voting-members) and is responsible for overseeing specification and development work, and approving new releases. TSC members serve a two-year term.

### Financial and policy governance

The [GraphQL Foundation](/foundation/) provides financial support for the GraphQL project. In keeping with best practices, the Foundation is a separate organization, which helps to ensure that technical decisions are made upon their own merit and independent of financial contributions. The GraphQL Foundation uses the funds raised through [membership dues](/foundation/join/) to support the work of the GraphQL Project through investments in infrastructure, coordination support services, developer grants, and mentorship programs.

The [GraphQL Foundation](/foundation/) is supported entirely by [membership dues](/foundation/join/), from [companies](/foundation/members/) who wish to support the long-term sustainability of the GraphQL ecosystem.

---
title: Frontend
layout: faq
permalink: /faq/#frontend
questions: Does GraphQL replace Redux or other state management libraries?
position: 5
---

## Does GraphQL replace Redux or other state management libraries?

No, GraphQL isn’t a state management library - but it can reduce the need for one.

One benefit of state management libraries like Redux is that they can manipulate API responses into a format that your application understands. With GraphQL, you have control over [what data you request](/learn/queries/#fields) and typically results are formatted in a client-friendly way by the graph design. So this benefit is already built-in. Many [client libraries](#what-is-a-graphql-client-and-why-would-i-need-one) can also be used to manage state and have features like caching built-in. You may still decide to implement a state management library, but using it to format response data is generally not necessary.
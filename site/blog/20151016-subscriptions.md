---
title: "Subscriptions in GraphQL and Relay"
layout: ../_core/BlogLayout
permalink: /blog/subscriptions-in-graphql-and-relay/
date: 16 Oct 2015
byline: Dan Schafer and Laney Kuenzel
---

When we announced and open-sourced GraphQL and Relay this year, we described how they can be used to perform reads with queries, and to perform writes with mutations. However, oftentimes clients want to get pushed updates from the server when data they care about changes. To support that, we’ve introduced a third operation into the GraphQL specification: subscription.

## Event-based subscriptions

The approach that we’ve taken to subscriptions parallels that of mutations; just as the list of mutations that the server supports describes all of the actions that a client can take, the list of subscriptions that the server supports describes all of the events that it can subscribe to. Just as a client can tell the server what data to refetch after it performs a mutation with a GraphQL selection, the client can tell the server what data it wants to be pushed with the subscription with a GraphQL selection.

For example, in the Facebook schema, we have a mutation field named `storyLike`, that clients can use to like a post. The client might want to refetch the like count, as well as the like sentence (“Dan and 3 others like this”. We do this translation on the server because of the complexity of that translation in various languages). To do so, they would issue the following mutation:

```
mutation StoryLikeMutation($input: StoryLikeInput) {
  storyLike(input: $input) {
    story {
      likers { count }
      likeSentence { text }
    }
  }
}
```

But when you’re looking at a post, you also want to get pushed an update whenever someone else likes the post! That’s where subscriptions come in; the Facebook schema has a subscription field named `storyLikeSubscribe` that allows the client to get pushed data anytime someone likes or unlikes that story! The client would create a subscription like this:

```
subscription StoryLikeSubscription($input: StoryLikeSubscribeInput) {
  storyLikeSubscribe(input: $input) {
    story {
      likers { count }
      likeSentence { text }
    }
  }
}
```


The client would then send this subscription to the server, along with the value for the `$input` variable, which would contain information like the story ID to which we are subscribing:

```graphql
input StoryLikeSubscribeInput {
  storyId: string
  clientSubscriptionId: string
}
```

At Facebook, we send this query to the server at build time to generate a unique ID for it, then subscribe to a special MQTT topic with the subscription ID in it, but many different subscription mechanisms could be used here.

On the server, we then trigger this subscription every time someone likes a post. If all of our clients were using GraphQL, we could put this hook in the GraphQL mutation; since we have non-GraphQL clients as well, we put the hook in a layer below the GraphQL mutation to ensure it always fires.

## Why not Live Queries?

Notably, this approach requires the client to subscribe to events that it cares about. Another approach is to have the client subscribe to a query, and ask for updates every time the result of that query changes. Why didn’t we take that approach?

Let’s look back at the data we wanted to refetch for the story:

```
fragment StoryLikeData on Story {
  story {
    likers { count }
    likeSentence { text }
  }
}
```

What events could trigger that a change to the data fetched in that fragment?

* Someone likes the post.
* Someone unlikes the post.
* Someone who had liked the post deactivates their account (changes the like count down one, changes the like sentence to decrement the translated count).
* Someone who had liked the post reactivates their account (changes the like count up one, changes the like sentence to increment the translated count).
* Someone who had liked the post blocks you (cannot show them in the like sentence).
* Someone who had liked the post changes their name (need to update the text of the like sentence).
* Our internal ranking model for the ordering of names in the like sentence updates, and we should be listing a different person first (want to update the text of the like sentence).

And that’s just the tip of the iceberg in terms of events; each of those events also becomes tricky when there are thousands of people subscribed, and millions of people who liked the post. Implementing live queries for this set of data proved to be immensely complicated.

When building event-based subscriptions, the problem of determining what should trigger an event is easy, since the event defines that explicitly. It also proved fairly straight-forward to implement atop existing message queue systems. For live queries, though, this appeared much harder. The value of our fields is determined by the result of their resolve function, and figuring out all of the things that could alter the result of that function was difficult. We could in theory have polled on the server to implement this, but that had efficiency and timeliness issues. Based on this, we decided to invest in the event-based subscription approach.

## What’s next?

We’re actively building out the event-based subscription approach described above. We’ve built out live liking and commenting features on our iOS and Android apps using that approach, and are continuing to flesh out its functionality and API. While its current implementation at Facebook is coupled to Facebook’s infrastructure, we’re certainly looking forward to open sourcing our progress here as soon as we can.

Because our backend and schema don’t offer easy support for live queries, we don’t have any plans to develop them at Facebook. At the same time, it’s clear that there are backends and schemas for which live queries are feasible, and that they offer a lot of value in those situations. The discussion in the community on this topic has been fantastic, and we’re excited to see what kind of live query proposals emerge from it!

Subscriptions create a ton of possibilities for creating truly dynamic applications. We’re excited to continue developing GraphQL and Relay with the help of the community to enable these possibilities.

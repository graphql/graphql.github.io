---
title: Authorization
layout: ../_core/DocsLayout
category: Best Practices
permalink: /learn/authorization/
next: /learn/pagination/
---

> Delegate authorization logic to the business logic layer

Authorization is a type of business logic that describes whether a given user/session/context has permission to perform an action or see a piece of data. For example:

*“Only authors can see their drafts”*

Enforcing this kind of behavior should happen in the [business logic layer](/learn/thinking-in-graphs/#business-logic-layer). It is tempting to place authorization logic in the GraphQL layer like so:

```javascript
var postType = new GraphQLObjectType({
  name: ‘Post’,
  fields: {
    body: {
      type: GraphQLString,
      resolve: (post, args, context, rootValue) => {
        // return the post body only if the user is the post's author
        if (context.user && (context.user.id === post.authorId)) {
          return post.body;
        }
        return null;
      }
    }
  }
});
```

Notice that we define “author owns a post" by checking whether the post's `authorId` field equals the current user’s `id`. Can you spot the problem? We would need to duplicate this code for each entry point into the service. Then if the authorization logic is not kept perfectly in sync, users could see different data depending on which API they use. Yikes! We can avoid that by having a [single source of truth](/learn/thinking-in-graphs/#business-logic-layer) for authorization.

Defining authorization logic inside the resolver is fine when learning GraphQL or prototyping. However, for a production codebase, delegate authorization logic to the business logic layer. Here’s an example:

```javascript
//Authorization logic lives inside postRepository
var postRepository = require('postRepository');

var postType = new GraphQLObjectType({
  name: ‘Post’,
  fields: {
    body: {
      type: GraphQLString,
      resolve: (post, args, context, rootValue) => {
        return postRepository.getBody(context.user, post);
      }
    }
  }
});
```

In the example above, we see that the business logic layer requires the caller to provide a user object. If you are using GraphQL.js, the User object should be populated on the `context` or `rootValue` arguments of the resolver.

We recommend passing a fully-hydrated User object instead of an opaque token or API key to your business logic layer. This way, we can handle the distinct concerns of [authentication](/graphql-js/authentication-and-express-middleware/) and authorization in different stages of the request processing pipeline.

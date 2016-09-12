---
title: Authorization
layout: ../_core/DocsLayout
category: Best Practices
permalink: /learn/authorization/
next: /learn/serving-over-http/
---

Authorization rules are a type of business logic that describe whether a given user/session/context has permission to perform a given action or see a piece of data. For example:

*“Only authors can see their drafts”*

Enforcing this kind of behavior should happen in the [business logic layer](/learn/thinking-in-graphs/#business-logic-layer). It is tempting to place authorization logic in the GraphQL layer like so:

```javascript
var postType = new GraphQLObjectType({
  name: ‘Post’,
  fields: {
    body: {
      type: GraphQLString,
      resolve: function (post, args, context, rootValue) {
        // return the post body only if the user is the post's author
        if(context.user && (context.user.id === post.authorId)) {
          return post.body;
        }
        return null;
      }
    }
  }
});
```

Notice that we define “author owns a post" by checking whether the post's authorId field equals the current user’s id. This is an implementation detail that should be encapsulated in the business domain layer.

Defining authorization logic inside the resolver is fine when learning GraphQL or prototyping. For production, we recommend delegating this kind of decision to the business logic layer. Here’s what we mean:

```javascript
//Authorization logic lives inside postRepository
var postRepository = require('postRepository');

var postType = new GraphQLObjectType({
  name: ‘Post’,
  fields: {
    body: {
      type: GraphQLString,
      resolve: function (post, args, context, rootValue) {
        return postRepository.getBody(context.user, post);
      }
    }
  }
});
```

In the example above, we see that the business logic layer requires the caller to provide a user object. If you are using GraphQL.js, the User object should be passed populated on the context or rootValue arguments of the resolver.

We recommend passing a hydrated User object instead of an opaque token or API key because there is plenty of handy middleware to help you perform [authentication](/graphql-js/authentication-and-express-middleware/).

---
title:  "How to Build Realtime Apps with GraphQL Subscriptions"
layout: ../_core/BlogLayout
permalink: /blog/how-to-build-realtime-apps-with-graphql-subscriptions/
date: 10 Nov 2016
byline: "Michael Paris"
guestBio: CEO of Scaphold.io
---

## The Case for Subscriptions

When Facebook open-sourced GraphQL, they described how applications can perform reads with queries, and writes with mutations. However, often times clients want to get pushed updates from the server when data they care about changes. Enter GraphQL Subscriptions. Subscriptions make real-time functionality a first class citizen in GraphQL!

Subscriptions offer a clean and efficient way to get pushed updates in realtime. They act in parallel to mutations. Just like how mutations describe the set of actions you can take to change your data, subscriptions define the set of events that you can subscribe to when data changes. In fact, you can think of subscriptions as a way to react to mutations that are performed on your server.

For example, think about a chat application like **Slack**. To create a good user experience, our application needs to stay up to date at all times. I.E. when a co-worker sends me a message, I shouldn't have to refresh the page to see the message. A much better solution is to have the server push my chat client the message as soon as it is created. This is how Subscriptions work. When someone creates a message (or in other words issues a mutation), the server immediately pushes the data to every client that is also subscribed to that event.

To build an app like Slack, we need to be able to say:

> Hey, every time someone posts a new message to a channel I am a member of, tell me!

With subscriptions we can do this by issuing a query like this:

```
subscription SubscribeToNewMessage($messageFilter: MessageWhereArgs) {
    subscribeToMessage(mutations:[createMessage], filter: $messageFilter) {
        mutation
        value {
            id
            content
        }
    }
}
```

For now, don't worry too much about the input arguments but just note that we can choose which mutations we would like to subscribe to as well as supply certain filters so that we only get pushed updates for the data we care about.

Now, every time another user calls a mutation like this:

```
mutation CreateMessage($message: CreateMessageInput!) {
    createMessage(input: $message) {
        changedMessage {
            id
            content
        }
    }
}
```

Every subscribed client will be pushed an update as long as the new message satisfies the filter it used to first subscribe! It's that easy!

## This Tutorial (TLDR)

Throughout this post, we are going to take a **practical dive into GraphQL subscriptions and build a simple chat application**. To do this we will be building a React application in the spirit of Slack that we are going to call **Slackr**. Our application will come complete with realtime messaging and social authentication. Although, we will be using React for demonstration purposes, Apollo Client and subscriptions will work with basically any Javascript frontend so I will do my best to keep the code snippets in this post as unopinionated as possible.

We are going to use [**Scaphold.io**](https://scaphold.io) as our backend provider because we can get a powerful, realtime GraphQL API in a matter of minutes (less than 4 minutes to be exact) when it could take weeks to build and deploy our own. If you are interested in how subscriptions are implemented on the backend I will be following up this post with a server-side technical review of how we implemented subscriptions on our servers.

Check out slackr!

![](https://assets.scaphold.io/tutorials/slackr/slackr.gif)


##### Get the code on Github
If you would like to follow along, our [**Slackr** Starter Kit is available on Github](https://github.com/scaphold-io/slackr-graphql-subscriptions-starter-kit). We will only be looking at snippets from that repo so take a peek if you'd like to see the whole picture.

## Getting Started

#### We're happy to announce that subscriptions are now available for all Scaphold Apps!

We have worked closely with the Apollo Team to remove all the friction from building realtime applications using GraphQL! Here is quick guide on how you can easily start building realtime apps **for free** using Apollo Client and Scaphold.io!

1) Go to Scaphold.io and create a free app!

2) That's it! You now have a fully featured, realtime GraphQL API ready to power your app!

Okay so it really is that easy, but let's make things a little more interesting!

Let's create a data model for our Slackr app! 

#### Design our Data Model

This is one area where Scaphold excels over previous realtime BaaS offerings like Firebase. Although Firebase has powerful primitives for building realtime apps, they lack the ability to define powerful data models. Our use of GraphQL allows us to provides the best of both worlds. By leveraging GraphQL, we can provide millisecond subscription latencies for simple queries as well as allow you to define much more complex queries that will be rerun on every update. This can be much more efficient than exising solutions as you can often get all the data you want pushed to you in realtime without having to issue any other requests. 

Let's try this out by defining the data model for our **Slackr** app. Our app will be like a dumbed down version of slack. A user can subscribe to any number of public channels and each channel can contain any number of messages each of which has an author.

Here is a simplified version of our data model in GraphQL schema language.

```
type User {
    id: ID!
    username: String!
    nickname: String
    picture: String
    messages: MessageConnection
    channels: ChannelConnection
}

type Message {
    id: ID!
    content: String!
    author: User!
    channel: Channel!
}

type Channel {
    id: ID!
    name: String!
    members: UserConnection
    messages: MessageConnection
}

# Note: A Connection is a paginated relation. This allows us to connect 
# arbitrarily large sets of objects with one another
```

To aid you in developing your application's data model, Scaphold comes with a graphical schema designer. As you make changes to your schema, the infrastructure behind the scenes will automatically update to match the new schema. There is a lot you can do with the schema designer including creating Interfaces, Enums, defining permissions, and more. To start, let's just create a few types, add some fields, and create relations between your types via **Connection** fields.

Creating your schema is easy! Here is me doing it!

![](https://assets.scaphold.io/tutorials/slackr/configure2.gif)

**This is what I did**

1) Using the schema designer, create two new types **Message** and **Channel**

2) On the **Channel** type add the fields

- `name` with type `String`.

- `messages` with type `Connection`, ofType `Message`, reverseName `channel`, and cardinality `One to Many`.

- `members` with type `Connection`, ofType `User`, reverseName `channels`, and cardinality `Many To Many`.

- `isPublic` with type `Boolean` and a defaultValue of `false`.

3) On the **Message** type, add the fields

- `content` with type `String`.

- `author` with type `Connection`, ofType `User`, reverseName `messages`, and cardinality `Many To One` with the Many on the Message side.

4) On the **User** type, add the fields:

- `nickname` with type `String`

- `picture` with type `String`
    
    
That should do it! As we were poking around and adding types, fields, and relations the infrastrucutre needed to power your app was automatically deployed and configured for your new schema. We have now done all the setup that is necessary to start building our application. To get a feel for what capabilities our new API has in store, let's jump over to GraphiQL to explore our API and prototype some queries.

#### Exploring your API in GraphiQL

As we said earlier, Subscriptions are reactions to mutations made elsewhere. Before diving into building our front-end we can play with our new realtime subscriptions using GraphiQL. Here is what it looks like:

![](http://assets.scaphold.io/tutorials/slackr/subs2.gif)

We first issue a subcription query (seen below) and can then watch as changes are pushed to us from the server whenever we create new messages.

```
subscription SubscribeToNewMessage($messageFilter: MessageWhereArgs) {
    subscribeToNewMessage(mutations:[createMessage], where: $messageFilter) {
        mutation
        value {
            id
            content
            author {
                id
                username
            }
        }
    }
}
```

Notice that this subscription query is slightly different than the subscription query I showed before. See how we are asking for the nested `author` id and username? This is a simple example showing the power that comes from combining realtime data with a structured data model. Not only will our client application receive an update within milliseconds of a new **Message** being created but it will also automatically receive the related `author` of the **Message** without having to issue another request. This is just one example that shows how GraphQL can make your applications not only more efficient but easier to develop.

Under the hood, a websocket connection is being established between our Apollo Client instance and Scaphold's webservers. This connection stays open as long as our subscription is alive and acts as the transport that allows the server to send updates to the client.

The pane that pops out from the right of GraphiQL will show all new messages that satisfy our filter. To see it in action lets call the `createMessage` mutation to create a new **Message** object.

```
mutation CreateMessage($message: CreateMessageInput!) {
    createMessage(input: $message) {
        changedMessage {
            id
            content
        }
    }
}
```

Each time you create a new object that satisfies your subscription filter, you should see a new object appear in the pane to the right! That new message was pushed to us from the server in realtime! Each message should also come with the associated user attached so you can easily present user information alongside the message in your UI!

Take some time to play around with your new API! It has a bunch of goodies hidden in it so poke around the doc explorer to see what it has to offer! For starters, we've generated a GraphQL Subscription for each type that you have in your data model.

### Connecting to your API from your application

The Scaphold GraphiQL page has already implemented the subscription protocol for you. The good news is that it is really easy to set this up in your own application. Here is how.

1) Download Apollo Client from npm! (Apollo Client works pretty much the same whether you are building a React, AngularJS, or vanilla JavaScript applications)

- `npm install apollo-client graphql-tag --save`

- If using React also `npm install react-apollo --save`

- If using Angular2 also `npm install angular2-apollo --save`

2) Configure the Apollo Client network layer to work with websockets. To do this we can use the following two code snippets:

```
/* File: addGraphQLSubscriptions.js */

import { print } from 'graphql-tag/printer';

// quick way to add the subscribe and unsubscribe functions to the network interface
export default function addGraphQLSubscriptions(networkInterface, wsClient) {
  return Object.assign(networkInterface, {
    subscribe(request, handler) {
      return wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id) {
      wsClient.unsubscribe(id);
    },
  });
}

/* End of file: addGraphQLSubscriptions.js */
```

The `addGraphQLSubscriptions` function retrofits the Apollo Client network interface with the subscribe and unsubscribe methods that we can use from our application code.

```
/* File: makeApolloClient.js */

import addGraphQLSubscriptions from './addGraphQLSubscriptions';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';

// creates a subscription ready Apollo Client instance
export function makeApolloClient() {
  const scapholdUrl = 'v2.api.scaphold.io/graphql/my-awesome-app';
  const graphqlUrl = `https://${scapholdUrl}`;
  const websocketUrl = `wss://${scapholdUrl}`;
  const networkInterface = createNetworkInterface(graphqlUrl);
  networkInterface.use([{
    applyMiddleware(req, next) {
      // Easy way to add authorization headers for every request
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      if (localStorage.getItem('scaphold_user_token')) {
        // This is how to authorize users using http auth headers
        req.options.headers.Authorization = `Bearer ${localStorage.getItem('scaphold_user_token')}`;
      }
      next();
    },
  }]);
  const wsClient = new Client(websocketUrl);
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

  const clientGraphql = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    initialState: {},
  });
  return clientGraphql;
}
/* End of File: makeApolloClient.js */
```

The `makeApolloClient` function then creates a new Apollo Client instance, applies the subscription methods, and adds a peice of authentication middleware before returning the client for use in our application.

This is all we need to do to configure our Apollo Client instance for subscriptions. 

### Using subscriptions from vanilla js

Using subscriptions from our application could not be much simpler. At Scaphold, we build our user interfaces with React, but Apollo Client works with any javascript frontend. Here is an unopinionated example.

```
import makeApolloClient from './makeApolloClient';

// Make our apollo client instance
const client = makeApolloClient();

// Our subscription query
const subscriptionQuery = `
subscription SubscribeToNewMessage($messageFilter: MessageWhereArgs) {
    subscribeToNewMessage(mutations:[createMessage], where: $messageFilter) {
        mutation
        value {
            id
            content
        }
    }
}
`;

// Our subscription filter
const vars = {
  messageFilter: {
    content: {
      channelId: {
        eq: 'AChannelId'
      }
    }
  }
};

// Initiate the subscription observable
const subscriptionObservable = client.subscribe({
  query: subscriptionQuery,
  variables: vars,
});

// Use observable.subscribe to handle new data pushed from the server and errors.
const messageSubscription = subscriptionObservable.subscribe({
  next(newObj) {
    console.log('Received new data');
    // Merge the new data with our client side data cache. See Below *
  },
  error(err) {
    console.log(`Error Subscribing: ${err.message}`);
  },
});
```

First you can see that we have provided a GraphQL query and variables to Apollo's GraphQL function to initiate the subscription. In this case we are only interested in new posts that belong to the channel with id 'MyChannelId'. In reality, the `channelId` would be a base64 encoded string created automatically when you create a **Channel** but this works for demonstration purposes. If you take a look in the doc explorer you will see that in addition to the `eq` operator, you can specify a list of channel ids to include or exclude using the `in` and `notIn` operators.

> Note: The above example uses the default `subscribe` method to listen for updates. There is also a higher-level, `subscribeToMore` method that manages more for us. E.G. it will keep track of open subscriptions and automatically close them for us. It also allows you to pass in a `updateQuery` function that lets you define how you would like to merge the new data with the cache.

##### Merging changes with the client side cache

An important topic to discuss when it comes to subscriptions is how to merge new data pushed from the server with the client side cache. There are many ways to do this and it often changes from application to application. At Scaphold, we use [ImmutableJS](https://facebook.github.io/immutable-js/) data structures and [redux](http://redux.js.org/) alongside the Apollo Client managed cache but this is largely up to you.

Apollo Client does a lot really nice things for you that can mostly eliminate the need to do any custom work. The key to merging changes with the Apollo cache is the `updateQuery` method passed to `subscribeToMore`. To see an example of this let's take a snippet from our **Slackr** React application.

### Using Subscriptions from React

Let's look at a more real world example using react. Apollo comes packed with really nice react-binding that we can use to simplify the process of subscribing to data and merging new data into the client side cache. 

Here is a condensed example from our Slackr app.

[See the complete code on GitHub](https://github.com/scaphold-io/slackr-graphql-subscriptions-starter-kit/blob/master/src/components/messages.jsx)

```
import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const ChannelMessagesQuery = gql`
query GetPublicChannels($channelId: ID!, $messageOrder: [MessageOrderByArgs]) {
  getChannel(id: $channelId) {
    id
    name
    messages(last: 50, orderBy: $messageOrder) {
      edges {
        node {
          id
          content
          createdAt
          author {
            id
            username
            nickname
            picture
          }
        }
      }
    }
  }
}
`;

class Messages extends React.Component {

    ...

    componentWillReceiveProps(newProps) {
        if (
            !newProps.data.loading && 
            newProps.data.getChannel
        ) {
            if (
                !this.props.data.getChannel ||
                newProps.data.getChannel.id !== this.props.data.getChannel.id
            ) {
                // If we change channels, subscribe to the new channel
                this.subscribeToNewMessages();
            }
        }
    }
    
    /* 
    *   Initiates the subscription and specifies how new data should be merged 
    *   into the cache using the updateQuery method.
    */
    subscribeToNewMessages() {
        this.subscription = this.props.data.subscribeToMore({
            document: gql`
                subscription newMessages($subscriptionFilter:MessageSubscriptionFilter) {
                    subscribeToMessage(mutations:[createMessage], filter: $subscriptionFilter) {
                        value {
                            id
                            content
                            createdAt
                            author {
                                id
                                username
                                nickname
                                picture
                            }
                        }
                    }
                }
            `,
            variables: {
                subscriptionFilter: {
                    channelId: {
                        // We're using react-router and grabbing the channelId from the url
                        // to designate which channel to subscribe to
                        eq: this.props.params ? this.props.params.channelId : null
                    }
                }
            },
            
            /*
            *    Update query specifies how the new data should be merged 
            *    with our previous results. Note how the structure of the
            *    object we return here directly matches the structure of 
            *    the GetPublicChannels query.
            */
            updateQuery: (prev, { subscriptionData }) => {
                const newEdges = [
                    ...prev.getChannel.messages.edges,
                    {
                        node: {
                            ...subscriptionData.data.subscribeToMessage.value,
                        }
                    }
                ]; 
                return {
                    getChannel: { 
                        messages: {
                            edges: newEdges,
                        } 
                    } 
                };
            },
        });
    }
    
    ...
}

const MessagesWithData = compose(
  graphql(ChannelMessagesQuery, {
    options: (props) => {
      const channelId = props.params ? props.params.channelId : null;
      return {
        returnPartialData: true,
        variables: {
          channelId,
          messageOrder: [
            {
              field: 'createdAt',
              direction: 'ASC'
            }
          ],
        },
      };
    },
  }),
  ... // We compose a few more queries in the actual app.
)(Messages);

export default MessagesWithData;

```

A few things are going on here. To make sense of what is happening, let's start from the logical beginning which actually occurs at the end of the file. See this line `const MessagesWithData = compose(graphql(ChannelMessagesQuery, ...));` towards the bottom of the snippet? This is the standard way to use Apollo to connect a React component with data from a GraphQL query. The `graphql` function will wrap our component in a higher-order component that grabs our data and makes it available to our component via its `props`. In this example, we will be able to access our **Channel** data from our component with `this.props.data.getChannel` as soon as it is fetched.

> Note: The `returnPartialData: true` option is important. When you want to use `subscribeToMore` to merge results into the result of a normal query it is necessary to specify this.

Okay so we have connected our component with a regular old GraphQL query, but how do we make it realtime? The key is the method `subscribeToMore`.  Look at our `subscribeToNewMessages` method. Apollo's `graphql` function fits our component with the data prop that exposes the `subscribeToMore` method. We use this method to attach a subscription query which then calls the `updateQuery` method we pass in every time a new peice of data is pushed from the server. The object we return from `updateQuery` is then merged with our previous results and persisted in the client side cache. This way, `this.props.data.getChannel...` is always kept up to date and we can use it like normal to render our UI.

Take a minute to look over this file. Apollo does a great job allowing us to use realtime subscriptions alongside traditional queries and mutations. The combination of `subscribeToMore` and `updateQuery` offer a powerful set of tools to keep our UI up to date when dealing with realtime data!

## User Authentication

We have now covered the basics of how to use GraphQL subscriptions from both vanilla JS as well as React. We're now ready to finish up the surface area of our application! One of the nice things Scaphold does for you is handling user authentication. There is also an auth0 integration that lets you easily add social auth to any application instantly. In our Slackr app, we have enabled GitHub login so user's can easily chime in on our app without having to create any messy usernames or password.

Authentication with a Scaphold API is done via the `Authorization` http header. We use [JSON Web Tokens](https://jwt.io/) to securely authenticate your users and have integrations that allow you to pull in the auth provider of your choice. You've actually already seen how to add authentication to Apollo Client.

Remember this from makeApolloClient.js?

```
/* File: makeApolloClient.js */
const networkInterface = createNetworkInterface(graphqlUrl);
networkInterface.use([{
    applyMiddleware(req, next) {
        // Easy way to add authorization headers for every request
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }
        if (localStorage.getItem('scaphold_user_token')) {
            // This is how to authorize users using http auth headers
            req.options.headers.Authorization = `Bearer ${localStorage.getItem('scaphold_user_token')}`;
        }
        next();
    },
}]);
```

This auth middleware looks for a token names 'scaphold_user_token' in the browser's local storage and then appends the necessary auth header to each request. This is great because all we need to do is pick a authentication mechanism and then save the token we get back from logging in to local storage and the middleware will handle the rest.

#### Social authentication for any application

**Slackr** uses Auth0 lock for easy authentication. To make this work, we must first add the Auth0 integration to our API on Scaphold. It's easy!

1) Go to [Auth0](https://auth0.com) and create a free account.

2) Under the Social connections tab on the left, enable GitHub as an oauth provider.
    - You will need to create a GitHub application to get the clientId and secret to give to Auth0.

3) From the clients tab on the left in Auth0, open your application and grab your Auth0 clientId and client secret.

4) Go to Scaphold's integrations page and enter the clientId and client secret in a new Auth0 integration.

5) Presto chango, your API is now ready to handle social authentication!

One easy way to add authentication to your client app is by using Auth0 Lock. Lock is essentially a smart sign-in form that you can drop into any web or mobile application. You use Lock to handle the OAuth and then you can link the social credential with Scaphold's API using the `loginWithAuth0Lock` mutation that is now available in your API.

For a full example of how to do this take a look at [auth.js](https://github.com/scaphold-io/slackr-graphql-subscriptions-starter-kit/blob/master/src/utilities/auth.js) and [channels.jsx](https://github.com/scaphold-io/slackr-graphql-subscriptions-starter-kit/blob/master/src/components/channels.jsx) in our **Slackr** app starter kit.

The login flow is simple. First we open lock, the user then enters his or her credentials or chooses from a set of social auth providers, and then Lock handles the OAuth handshake and returns a login credential. We then make one more call to Auth0 to grab the auth0 profile and then we send the auth0 user identity to Scaphold's servers where it is then matched with a Scaphold user. As part of the `loginWithAuth0Lock` mutation payload, Scaphold will return the auth token that is to be stored in local storage on the client and attached to http requests as the Authorization header by the Apollo Client auth middleware.

## Wrapping Up

Congrats! Now you've seen how you can use Scaphold, Apollo, and GraphQL subscriptions to build realtime, real-world applications in a fraction of the time it used to. To review what we did, we...

1. Defined our applications data model using Scaphold's Graphical Schema Designer and a realtime GraphQL API was automatically configured and deployed for us.

2. As soon as we finished designing our schema, we jumped over to GraphiQL to prototype our subscriptions query and saw data pushed to us in realitme.

3. We discussed how you can easily add realtime subscriptions to you own application using Apollo Client.

4. Last, we added social authentication to our API via the Auth0 Integration to allow our users to login via GitHub.

This is a great start but there is still alot we could do. We could start by adding permissions to our data for fine-grained access control which would allow us to create private channels. We could also instantly add iOS and Android push notifications so that we can alert our users when our application is closed. Stay tuned for more updates as more features come out daily!

Happy Scapholding!

var React = require('react');
var Site = require('./_core/Site');
var SiteData = require('./_core/SiteData');
var HeaderLinks = require('./_core/HeaderLinks');
var Marked = require('./_core/Marked');

var index = React.createClass({
  render: function() {
    return (
      <Site>
        <div className="hero">
          <div className="abs">
            <div className="hero-nav nav-main">
              <div className="wrap">
                <div className="algolia-search-wrapper">
                  <input id="algolia-doc-search" type="text" placeholder="Search docs..." />
                </div>
                <HeaderLinks section={this.props.section} />
              </div>
            </div>

            <div className="content">
              <img className="main-logo" src={'/img/logo.svg'} width="240" height="240" />
              <h1 className="text"><strong>GraphQL</strong></h1>
              <h2 className="minitext">
                {SiteData.description}
              </h2>
            </div>
          </div>
        </div>

        <section className="content wrap">
          <section className="marketing-row">
            <div className="marketing-col">
              <h3>Powerful</h3>
              <p>
                {`GraphQL has built-in support for nested data, batching requests, filtering unwanted data, and query validation. Any complicated REST API contains an ad hoc, informally-specified, bug-ridden, slow implementation of half of GraphQL.`}
              </p>
            </div>
            <div className="marketing-col">
              <h3>Efficient</h3>
              <p>
                {`One GraphQL query can replace multiple REST API requests and return only the data you need, saving bandwidth and making your code simpler and faster. That's why Facebook uses it to power the world's most popular app.`}
              </p>
            </div>
            <div className="marketing-col">
              <h3>Strongly Typed</h3>
              <p>
                {`GraphQL builds type-checking into the API layer, catching many bugs automatically regardless of your programming language. This means you need far less validation code on both client and server.`}
              </p>
            </div>
          </section>
        </section>

        <hr className="home-divider" />

        <section className="home-content wrap">

        <Marked>{`

A GraphQL query is hierarchical, like JSON. The shape of the response is based on the shape of the query. A query looks like:

    {
      person(name: "Leia Organa") {
        eyeColor,
        yearOfBirth,
        loveInterest {
          name,
          eyeColor,
          shotFirst
        }
      }
    }

A response to that query looks like:

    {
      "person": {
        "eyeColor": "brown",
        "yearOfBirth": 19,
        "loveInterest": {
          "name": "Han Solo",
          "eyeColor": "hazel",
          "shotFirst": true
        }
      }
    }

A few neat things are happening here.

* GraphQL only sends the fields you asked for, so you use less bandwidth and your app runs faster.

* The form of the response matches the form of the query. You don't need to check an API reference to know what the response is going to look like.

* A single query is accessing multiple objects. This means we need fewer network requests to build the same experience.

---

GraphQL services are defined with a strong type system. Here's a GraphQL schema that can handle the query above:

    type Person {
      name: String,
      eyeColor: String,
      yearOfBirth: Int,
      loveInterest: Person,
      shotFirst: Boolean
    }

    type Query {
      person(name: String): Person
    }

    schema {
      query: Query
    }

GraphQL servers know how to validate a query against a schema, so they won't run queries that don't make sense. This catches a lot of bugs automatically.

The schema makes it easier to document a GraphQL service. You often only need to look at the schema to learn how to use a GraphQL API. The type system also enables powerful tools like [GraphiQL](https://github.com/graphql/graphiql), which lets you explore an API directly from the GraphQL server.

---

TODO: continue from "4) GraphQL is composable via fragments." in the straw-man outline.

        `}</Marked>
        </section>

        <hr className="home-divider" />

        <section className="home-bottom-section">
          <div className="buttons-unit">
            <a className="button" href="docs/getting-started">
              Get Started
            </a>
            <a
              className="button"
              href={'https://github.com/graphql/graphql-js/'}>
              Reference Implementation
            </a>
            <a
              className="button"
              href={'http://facebook.github.io/graphql/'}>
              Read the Spec
            </a>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = index;

import React from 'react';
import Prism from '../../../components/Prism';

const SingleRequest = () => {
    return (
        <div className="grayWash">
        <section className="point2" id="single-request">
          <div className="prose2">
            <h2>
              Get many resources
              <br />
              in a single request
            </h2>
            {/*Illustration: a query 2 or 3 levels deep]*/}
            <p>
              GraphQL queries access not just the properties of one resource but
              also smoothly follow references between them. While typical REST
              APIs require loading from multiple URLs, GraphQL APIs get all the
              data your app needs in a single request. Apps using GraphQL can be
              quick even on slow mobile network&nbsp;connections.
            </p>
          </div>
          <div className="app-to-server" aria-hidden>
            <img
              src="/img/phone.svg"
              width="496"
              height="440"
              className="phone"
            />
            <div className="query">
              <Prism code={
`{
    hero {
    name
    friends {
        name
        }
    }
}`} language="graphql" />
            </div>
            <div className="response">
            <Prism code={
`{
    "hero": {
      "name": "Luke Skywalker",
      "friends": [
        { "name": "Obi-Wan Kenobi" },
        { "name": "R2-D2" },
        { "name": "Han Solo" },
        { "name": "Leia Organa" }
      ]
    }
}`} language="json" />
            </div>
            <img
              src="/img/server.svg"
              width="496"
              height="440"
              className="server"
            />
          </div>
        </section>
      </div>
    );
};

export default SingleRequest;

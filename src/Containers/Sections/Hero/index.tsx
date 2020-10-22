import { Link } from 'gatsby';
import React from 'react';
import HeaderLinks from '../../../components/HeaderLinks';
import Prism from '../../../components/Prism';

  
const Hero = () => {
    return (
      <div className="hero">
        <div className="abs">
          <header aria-hidden>
            <section>
              <HeaderLinks />
            </section>
          </header>
          <section className="intro">
            <div className="named-logo">
              <img src="/img/logo.svg" alt="GraphQL Logo" />
              <h1>GraphQL</h1>
            </div>

            <div className="marketing-col">
              <h3>Describe your data</h3>
              <Prism
                code={`type Project {
  name: String
  tagline: String
  contributors: [User] 
}`}
                language={"graphql"}
              />
            </div>

            <div className="marketing-col">
              <h3>Ask for what you want</h3>
              <Prism
                code={`{
  project(name: "GraphQL") {
    tagline
  }
}`}
                language={"graphql"}
              />
            </div>

            <div className="marketing-col">
              <h3>Get predictable results</h3>
              <Prism
                code={`{
  "project": {
    "tagline": "A query language for APIs"
  }
}`}
                language={"json"}
              />
            </div>
          </section>

          <div className="buttons-unit">
            <Link className="button" to="/code/">
              Get Started
            </Link>
            <Link className="button" to="/learn/">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    )
};

export default Hero;
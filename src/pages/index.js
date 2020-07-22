import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import title from 'title'
import BackgroundImage from 'gatsby-background-image'

import Prism from '../components/Prism'
import Layout from '../components/Layout'
import Search from '../components/Search'
import HeaderLinks from '../components/HeaderLink'

import logo from '../img/logo.svg'
import phoneSvg from '../img/phone.svg'
import serverSvg from '../img/server.svg'
import graphiqlVideo from '../img/graphiql.mp4'

const IndexPage = () => {
  const {
    bgImage,
    facebookLogo,
    githubLogo,
    pinterestLogo,
    intuitLogo,
    courseraLogo,
    shopifyLogo,
  } = useStaticQuery( graphql`
    query UserLogosHomePage {
      bgImage: file(sourceInstanceName: {eq: "images"}, name: {eq: "graph-wash"}) {
        name
        childImageSharp{
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      facebookLogo: file(sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "logos"}, name: {eq: "facebook"}) {
        name
        childImageSharp{
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      githubLogo: file(sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "logos"}, name: {eq: "github"}) {
          name
          childImageSharp{
            fixed(height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      pinterestLogo: file(sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "logos"}, name: {eq: "pinterest"}) {
        name
        childImageSharp{
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      intuitLogo: file(sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "logos"}, name: {eq: "intuit"}) {
        name
        childImageSharp{
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      courseraLogo: file(sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "logos"}, name: {eq: "coursera"}) {
        name
        childImageSharp{
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      shopifyLogo: file(sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "logos"}, name: {eq: "shopify"}) {
        name
        childImageSharp{
          fixed(height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
` )

  // [Illustration: just a simple query and response?
  useEffect( () => {
    let i = 0
    let forward = true

    const showResponse = num => {
      document.getElementById( 'r1' ).style.display = num === 1 ? 'block' : 'none'
      document.getElementById( 'r2' ).style.display = num === 2 ? 'block' : 'none'
      document.getElementById( 'r3' ).style.display = num === 3 ? 'block' : 'none'
    }

    showResponse( 1 )

    const type = () => {
      if ( forward ) {
        document.getElementById( `ch${i}` ).style.display = 'inline'
        i += 1
        if ( i === 20 ) {
          forward = false
          showResponse( 3 )
          setTimeout( type, 1500 )
        } else if ( i === 11 ) {
          showResponse( 2 )
          setTimeout( type, 1500 )
        } else {
          setTimeout( type, Math.random() * 180 + 70 )
        }
      } else {
        i -= 1
        document.getElementById( `ch${i}` ).style.display = 'none'
        if ( i === 0 ) {
          forward = true
          showResponse( 1 )
          setTimeout( type, 2000 )
        } else {
          setTimeout( type, 80 )
        }
      }
    }
    setTimeout( type, 2000 )
  }, [] )

  // Illustration of a type IDL following a query by line
  useEffect( () => {
    const typeHighlight = document.getElementById( 'type-highlight' )
    const queryHighlight = document.getElementById( 'query-highlight' )
    let line = 0

    const typeLines = [ 2, 6, 7, 6, 8, 13, 14, 9, 18, 19, 20, 13 ]
    const queryLines = [ 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14 ]

    const highlightLine = () => {
      typeHighlight.style.top = `${17 * typeLines[ line ] - 9}px`
      queryHighlight.style.top = `${17 * queryLines[ line ] - 9}px`
      line = ( line + 1 ) % typeLines.length
      setTimeout( highlightLine, 800 + Math.random() * 200 )
    }

    highlightLine()
  }, [] )

  // Illustration showing more legs added to a graph? Or a type evolving over time?
  useEffect( () => {
    let i = 0
    const inView = document.getElementById( 'typeEvolveView' )
    inView.className = `step${i}`

    setInterval( () => {
      i = ( i + 1 ) % 7
      inView.className = `step${i}`
    }, 2200 )
  }, [] )

  // Illustration of each field becoming a function?
  useEffect( () => {
    let i = 0
    const inView = document.getElementById( 'leverageCodeView' )
    const delayBefore = [ 800, 1800, 1200, 3000, 3000, 3000 ]
    const step = () => {
      inView.className = `step${i}`
      i = ( i + 1 ) % 6
      setTimeout( step, delayBefore[ i ] )
    }
    step()
  }, [] )

  return (
    <Layout className="index" title="Home" noSearch>

      <section className="fixedSearch">
        <Search />
      </section>

      <div className="hero">
        <BackgroundImage
          style={{
            position: '',
            backgroundPosition: 'center center',
            backgroundRepeat: 'repeat',
          }}
          fluid={bgImage.childImageSharp.fluid}
        >

          <div className="abs">
            <header aria-hidden>
              <section>
                <HeaderLinks />
              </section>
            </header>

            <section className="intro">
              <div className="named-logo">
                <img src={logo} alt="GraphQL Logo" />
                <h1>GraphQL</h1>
              </div>

              <div className="marketing-col">
                <h3>Describe your data</h3>
                <Prism exampleCode={`type Project {
  name: String
  tagline: String
  contributors: [User]
}`}
                />
              </div>

              <div className="marketing-col">
                <h3>Ask for what you want</h3>
                <Prism exampleCode={`{
  project(name: "GraphQL") {
    tagline
  }
}`}
                />
              </div>

              <div className="marketing-col">
                <h3>Get predictable results</h3>
                <Prism
                  language="json"
                  exampleCode={`{
  "project": {
    "tagline": "A query language for APIs"
  }
}`}
                />
              </div>

            </section>

            <div className="buttons-unit">
              <a className="button" href="/code/">
                Get Started
              </a>
              <a className="button" href="/learn/">
                Learn More
              </a>
            </div>
          </div>

        </BackgroundImage>
      </div>

      <section className="lead">
        <h1>A query language for your API</h1>
        <p>
          GraphQL is a query language for APIs and a runtime for fulfilling
          those queries with your existing data. GraphQL provides a complete
          and understandable description of the data in your API, gives
          clients the power to ask for exactly what they need and nothing
          more, makes it easier to evolve APIs over time, and enables powerful
          developer&nbsp;tools.
        </p>
      </section>

      <section className="point1" id="predictable-results">

        <div className="prose">
          <h2>Ask for what you need,<br />get exactly that</h2>
          {/* [Illustration: just a simple query and response?] */}
          <p>
            Send a GraphQL query to your API and get exactly what you need,
            nothing more and nothing less. GraphQL queries always return
            predictable results. Apps using GraphQL are fast and stable because
            they control the data they get, not the&nbsp;server.
          </p>
        </div>

        <div className="window faux-graphiql" aria-hidden>

          <div className="query">
            <pre className="prism">
              {'{'}
              {'\n  hero {'}
              {'\n    name'}
              {'\n    height\n    mass'.split( '' ).map( ( c, i ) => <span key={i} id={`ch${i}`} className="ch">{c === '\n' ? <br /> : c}</span> )}
              <span className="cursor" />
              {'\n  }'}
              {'\n}'}
            </pre>
          </div>

          <div className="response">
            <div id="r1">
              <Prism
                language="json"
                exampleCode={`{
  "hero": {
    "name": "Luke Skywalker"
  }
}`}
              />
            </div>
            <div id="r2">
              <Prism
                language="json"
                exampleCode={`{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72
  }
}`}
              />
            </div>
            <div id="r3">
              <Prism
                language="json"
                exampleCode={`{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72,
    "mass": 77
  }
}`}
              />
              {/* Live query example */}

            </div>
            {/* {queryResponseExample()} */}
          </div>

        </div>

      </section>

      <div className="grayWash">
        <section className="point2" id="single-request">

          <div className="prose">
            <h2>Get many resources<br />in a single request</h2>
            {/* Illustration: a query 2 or 3 levels deep] */}
            <p>
              GraphQL queries access not just the properties of one resource
              but also smoothly follow references between them. While typical
              REST APIs require loading from multiple URLs, GraphQL APIs get
              all the data your app needs in a single request. Apps using
              GraphQL can be quick even on slow mobile
              network&nbsp;connections.
            </p>
          </div>

          <div className="app-to-server" aria-hidden>
            <img src={phoneSvg} width="496" height="440" className="phone" alt="phone" />
            <div className="query">
              <Prism
                language="graphql"
                exampleCode={`{
  hero {
    name
    friends {
      name
    }
  }
}`}
              />
            </div>
            <div className="response">
              <Prism
                language="json"
                exampleCode={`{
  "hero": {
    "name": "Luke Skywalker",
    "friends": [
      { "name": "Obi-Wan Kenobi" },
      { "name": "R2-D2" },
      { "name": "Han Solo" },
      { "name": "Leia Organa" }
    ]
  }
}`}
              />
            </div>
            <img src={serverSvg} width="496" height="440" className="server" alt="server" />
          </div>

        </section>
      </div>

      <section className="point3" id="type-system">

        <div className="prose">
          <h2>Describe what&rsquo;s possible<br />with a type system</h2>
          {/* Illustration of a type IDL following a query by line] */}
          {/* Under: a server <-> client (Capabilities, Requirements)]? */}
          <p>
            GraphQL APIs are organized in terms of types and fields,
            not endpoints. Access the full capabilities of your data from a
            single endpoint. GraphQL uses types to ensure Apps only ask for
            what&rsquo;s possible and provide clear and helpful errors. Apps can
            use types to avoid writing manual parsing&nbsp;code.
          </p>
        </div>

        <div className="window strong-typed-query" aria-hidden>

          <div className="query">
            <div id="query-highlight" className="highlight" />
            <Prism
              language="graphql"
              exampleCode={`{
  hero {
    name
    friends {
      name
      homeWorld {
        name
        climate
      }
      species {
        name
        lifespan
        origin {
          name
        }
      }
    }
  }
}`}
            />
          </div>

          <div className="type-system">
            <div id="type-highlight" className="highlight" />
            <Prism
              language="graphql"
              exampleCode={`type Query {
  hero: Character
}

type Character {
  name: String
  friends: [Character]
  homeWorld: Planet
  species: Species
}

type Planet {
  name: String
  climate: String
}

type Species {
  name: String
  lifespan: Int
  origin: Planet
}`}
            />
          </div>

        </div>

      </section>

      <div className="darkWash">
        <section className="point4" id="powerful-tools">

          <div className="prose">
            <h2>Move faster with<br />powerful developer tools</h2>
            {/* Illustration of GraphiQL validation error and typeahead, animated?] */}
            <p>
              Know exactly what data you can request from your API without
              leaving your editor, highlight potential issues before sending a
              query, and take advantage of improved code intelligence. GraphQL
              makes it easy to build powerful tools like <a href="https://github.com/graphql/graphiql" target="_blank" rel="noreferrer noopener">Graph<em>i</em>QL</a> by
              leveraging your API&rsquo;s type system.
            </p>
          </div>

          <div className="graphiqlVid">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video autoPlay loop playsInline>
              <source src={graphiqlVideo} type="video/mp4" />
            </video>
          </div>

        </section>
      </div>

      <div className="grayWash">
        <section className="point5" id="without-versions">

          <div className="prose">
            <h2>Evolve your API<br />without versions</h2>
            {/* Illustration showing more legs added to a graph? Or a type evolving over time?] */}
            <p>
              Add new fields and types to your GraphQL API without impacting
              existing queries. Aging fields can be deprecated
              and hidden from tools. By using a single evolving version,
              GraphQL APIs give apps continuous access to new features and
              encourage cleaner, more maintainable server&nbsp;code.
            </p>
          </div>

          <div className="window type-evolution" aria-hidden>
            <div id="typeEvolveView">

              <div className="v1">
                <Prism
                  language="graphql"
                  exampleCode={`type Film {
  title: String
  episode: Int
  releaseDate: String



}`}
                />
              </div>

              <div className="v2">
                <div className="add" />
                <Prism
                  language="graphql"
                  exampleCode={`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String


}`}
                />
              </div>

              <div className="v3">
                <div className="add" />
                <Prism
                  language="graphql"
                  exampleCode={`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String

}`}
                />
              </div>

              <div className="v4">
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="remove" />
                <Prism
                  language="graphql"
                  exampleCode={`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String
  directedBy: Person
}

type Person {
  name: String
  directed: [Film]
  actedIn: [Film]
}`}
                />
              </div>

              <div className="v5">
                <div className="add" />
                <Prism
                  language="graphql"
                  exampleCode={`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String @deprecated
  directedBy: Person
}

type Person {
  name: String
  directed: [Film]
  actedIn: [Film]
}`}
                />
              </div>

            </div>
          </div>

        </section>
      </div>

      <section className="point6" id="bring-your-own-code">

        <div className="prose">
          <h2>Bring your own<br />data and code</h2>
          {/* Illustration of each field becoming a function?] */}
          <p>
            GraphQL creates a uniform API across your entire application
            without being limited by a specific storage engine. Write GraphQL
            APIs that leverage your existing data and code with GraphQL
            engines available in many languages. You provide functions for
            each field in the type system, and GraphQL calls them with
            optimal&nbsp;concurrency.
          </p>
        </div>

        <div className="window leverage-code" aria-hidden>
          <div id="leverageCodeView">

            <Prism exampleCode={`type Character {
  name: String
  homeWorld: Planet
  friends: [Character]
}`}
            />

            <Prism
              language="javascript"
              exampleCode={`// type Character {
class Character {
  // name: String
  getName() {
    return this._name
  }

  // homeWorld: Planet
  getHomeWorld() {
    return fetchHomeworld(this._homeworldID)
  }

  // friends: [Character]
  getFriends() {
    return this._friendIDs.map(fetchCharacter)
  }
}`}
            />

            <Prism
              language="python"
              exampleCode={`# type Character {
class Character:
  # name: String
  def name(self):
    return self._name

  # homeWorld: Planet
  def homeWorld(self):
    return fetchHomeworld(self._homeworldID)

  # friends: [Character]
  def friends(self):
    return map(fetchCharacter, self._friendIDs)
`}
            />

            <Prism
              language="javascript"
              exampleCode={`// type Character {
public class Character {
  // name: String
  public String Name { get; }

  // homeWorld: Planet
  public async Task<Planet> GetHomeWorldAsync() {
    return await FetchHomeworldAsync(_HomeworldID);
  }

  // friends: [Character]
  public async IEnumerable<Task<Character>> GetFriendsAsync() {
    return _FriendIDs.Select(FetchCharacterAsync);
  }
}`}
            />

          </div>
        </div>

      </section>

      <section className="powered-by" id="whos-using">

        <div className="prose">
          <h2>Who&rsquo;s using GraphQL?</h2>
          <p>
            Facebook's mobile apps have been powered by GraphQL since 2012.
            A GraphQL spec was open sourced in 2015 and is now available in
            many environments and used by teams of all sizes.
          </p>
        </div>

        <div className="logos">
          {/* Waiting for permission from some of the below */}

          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Img
              fixed={facebookLogo.childImageSharp.fixed}
              title={title( facebookLogo.name )}
              alt={`${facebookLogo.name} logo`}
              className="round"
            />
          </a>

          {/* <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/twitter.png" title="Twitter" className="round" />
        </a> */}

          <a href="https://developer.github.com/v4/" target="_blank" rel="noopener noreferrer">
            <Img
              fixed={githubLogo.childImageSharp.fixed}
              title={title( githubLogo.name )}
              alt={`${githubLogo.name} logo`}
              className="round"
            />
          </a>

          <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
            <Img
              fixed={pinterestLogo.childImageSharp.fixed}
              title={title( pinterestLogo.name )}
              alt={`${pinterestLogo.name} logo`}
              className="round"
            />
          </a>

          {/* <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
            <img src="/users/logos/airbnb.png" title="Airbnb" className="round" />
          </a> */}

          <a href="https://www.intuit.com/" target="_blank" rel="noopener noreferrer">
            <Img
              fixed={intuitLogo.childImageSharp.fixed}
              title={title( intuitLogo.name )}
              alt={`${intuitLogo.name} logo`}
              className="round"
            />
          </a>

          <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer">
            <Img
              fixed={courseraLogo.childImageSharp.fixed}
              title={title( courseraLogo.name )}
              alt={`${courseraLogo.name} logo`}
              className="round"
            />
          </a>

          <a href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer">
            <Img
              fixed={shopifyLogo.childImageSharp.fixed}
              title={title( shopifyLogo.name )}
              alt={`${shopifyLogo.name} logo`}
              className="round"
            />
          </a>

        </div>

        <a className="button" href="/users/">
          More GraphQL Users
        </a>

      </section>

    </Layout>
  )
}

export default IndexPage

var React = require('react');
var Site = require('./_core/Site');
var SiteData = require('./_core/SiteData');
var HeaderLinks = require('./_core/HeaderLinks');
var Marked = require('./_core/Marked');
var Prism = require('./_core/Prism');
var Search = require('./_core/Search');

var index = React.createClass({
  render: function() {
    return (
      <Site className="index" noSearch={true}>
        <section className="fixedSearch">
          <Search />
        </section>

        <div className="hero">
          <div className="abs">
            <header aria-hidden>
              <section>
                <HeaderLinks section={this.props.section} />
              </section>
            </header>

            <section className="intro">
              <div className="named-logo">
                <img src="/img/logo.svg" />
                <h1>GraphQL</h1>
              </div>

              <div className="marketing-col">
                <h4>Describe your data</h4>
                <Prism language="graphql">
                  {`type Project {
  name: String
  tagline: String
  contributors: [User]
}`}
                </Prism>
              </div>

              <div className="marketing-col">
                <h4>Ask for what you want</h4>
                <Prism language="graphql">
                  {`{
  project(name: "GraphQL") {
    tagline
  }
}`}
                </Prism>
              </div>

              <div className="marketing-col">
                <h4>Get predictable results</h4>
                <Prism language="json">
                  {`{
  "project": {
    "tagline": "A query language for APIs"
  }
}`}
                </Prism>
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
        </div>

        <section className="lead">
          <h1>A query language for your API</h1>
          <p>
            GraphQL is a query language for APIs and a runtime for fulfilling
            those queries with your existing data. GraphQL provides a complete
            and understandable description of the data in your API, gives
            clients the power to ask for exactly what they need and nothing
            more, makes it easier to evolve APIs over time, and enables powerful
            developer&nbsp;tools.</p>
        </section>

        <section className="point1">
          <div className="prose">
            <h2>Ask for what you need,<br />get exactly that</h2>
            {/*[Illustration: just a simple query and response?]*/}
            <p>
              Send a GraphQL query to your API and get exactly what you need,
              nothing more and nothing less. GraphQL queries always return
              predictable results. Apps using GraphQL are fast and stable because
              they control the data they get, not the&nbsp;server.</p>
          </div>
          <div className="window faux-graphiql" aria-hidden>
            <div className="query">
              <pre className="prism">
                {'{'}
                {'\n  hero {'}
                {'\n    name'}
                {'\n    height\n    mass'.split('').map((c, i) =>
                  <span key={i} id={'ch' + i} className="ch">{c === '\n' ? <br/> : c}</span>)}
                <span className="cursor" />
                {'\n  }'}
                {'\n}'}
              </pre>
            </div>
            <div className="response">
              <div id="r1">
                <Prism language="json">
                  {`{
  "hero": {
    "name": "Luke Skywalker"
  }
}`}
                </Prism>
              </div>
              <div id="r2">
                <Prism language="json">
                  {`{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72
  }
}`}
                </Prism>
              </div>
              <div id="r3">
                <Prism language="json">
                  {`{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72,
    "mass": 77
  }
}`}
                </Prism>
              </div>
            </div>
            <script dangerouslySetInnerHTML={{__html: `(function(){
              var i = 0;
              var forward = true;
              setTimeout(type, 2000);
              showResponse(1);
              function type() {
                if (forward) {
                  document.getElementById('ch' + i).style.display = 'inline';
                  i++;
                  if (i === 20) {
                    forward = false;
                    showResponse(3);
                    setTimeout(type, 1500);
                  } else if (i === 11) {
                    showResponse(2);
                    setTimeout(type, 1500);
                  } else {
                    setTimeout(type, Math.random() * 180 + 70);
                  }
                } else {
                  i--;
                  document.getElementById('ch' + i).style.display = 'none';
                  if (i === 0) {
                    forward = true;
                    showResponse(1);
                    setTimeout(type, 2000);
                  } else {
                    setTimeout(type, 80);
                  }
                }
              }
              function showResponse(num) {
                document.getElementById('r1').style.display = num === 1 ? 'block' : 'none';
                document.getElementById('r2').style.display = num === 2 ? 'block' : 'none';
                document.getElementById('r3').style.display = num === 3 ? 'block' : 'none';
              }
            })()`}} />
          </div>
        </section>

        <div className="grayWash">
          <section className="point2">
            <div className="prose">
              <h2>Get many resources<br />in a single request</h2>
              {/*Illustration: a query 2 or 3 levels deep]*/}
              <p>
                GraphQL queries access not just the properties of one resource
                but also smoothly follow references between them. While typical
                REST APIs require loading from multiple URLs, GraphQL APIs get
                all the data your app needs in a single request. Apps using
                GraphQL can be quick even on slow mobile
                network&nbsp;connections.</p>
            </div>
            <div className="app-to-server" aria-hidden>
              <img src="/img/phone.svg" width="496" height="440" className="phone" />
              <div className="query">
              <Prism language="graphql">
                {`{
  hero {
    name
    friends {
      name
    }
  }
}`}
              </Prism>
              </div>
              <div className="response">
              <Prism language="json">
                {`{
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
              </Prism>
              </div>
              <img src="/img/server.svg" width="496" height="440" className="server" />
            </div>
          </section>
        </div>

        <section className="point3">
          <div className="prose">
            <h2>Describe what&rsquo;s possible<br />with a type system</h2>
            {/*Illustration of a type IDL following a query by line]*/}
            {/*Under: a server <-> client (Capabilities, Requirements)]?*/}
            <p>
              GraphQL APIs are organized in terms of types and fields,
              not endpoints. Access the full capabilities of your data from a
              single endpoint. GraphQL uses types to ensure Apps only ask for
              what&rsquo;s possible and provide clear and helpful errors. Apps can
              use types to avoid writing manual parsing&nbsp;code.</p>
          </div>
          <div className="window strong-typed-query" aria-hidden>
          <div className="query">
          <div id="query-highlight" className="highlight" />
          <Prism language="graphql">
                {`{
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
          </Prism>
          </div>
          <div className="type-system">
          <div id="type-highlight" className="highlight" />
          <Prism language="graphql">
                {`type Query {
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
          </Prism>
          </div>
          <script dangerouslySetInnerHTML={{__html: `(function(){
            var typeHighlight = document.getElementById('type-highlight');
            var queryHighlight = document.getElementById('query-highlight');
            var line = 0;
            var typeLines  = [2,6,7,6,8,13,14, 9,18,19,20,13];
            var queryLines = [2,3,4,5,6, 7, 8,10,11,12,13,14];
            highlightLine();
            function highlightLine() {
              typeHighlight.style.top = (17 * typeLines[line] - 9) + 'px';
              queryHighlight.style.top = (17 * queryLines[line] - 9) + 'px';
              line = (line + 1) % typeLines.length;
              setTimeout(highlightLine, 800 + Math.random() * 200);
            }
          })()`}} />
          </div>
        </section>

        <div className="darkWash">
        <section className="point4">
          <div className="prose">
            <h2>Move faster with<br />powerful developer tools</h2>
            {/*Illustration of GraphiQL validation error and typeahead, animated?]*/}
            <p>
              Know exactly what data you can request from your API without
              leaving your editor, highlight potential issues before sending a
              query, and take advantage of improved code intelligence. GraphQL
              makes it easy to build powerful tools like <a href="https://github.com/graphql/graphiql" target="_blank">Graph<em>i</em>QL</a> by
              leveraging your API&rsquo;s type system.</p>
          </div>
          <div className="graphiqlVid" dangerouslySetInnerHTML={{__html: `
            <video autoplay loop playsinline>
              <source src="/img/graphiql.mp4?x" type="video/mp4" />
            </video>
          `}} />
        </section>
        </div>

        <div className="grayWash">
        <section className="point5">
          <div className="prose">
            <h2>Evolve your API<br />without versions</h2>
            {/*Illustration showing more legs added to a graph? Or a type evolving over time?]*/}
            <p>
              Add new fields and types to your GraphQL API without impacting
              existing queries. Aging fields can be deprecated
              and hidden from tools. By using a single evolving version,
              GraphQL APIs give apps continuous access to new features and
              encourage cleaner, more maintainable server&nbsp;code.</p>
          </div>
          <div className="window type-evolution" aria-hidden>
            <div id="typeEvolveView">
              <div className="v1">
                <Prism language="graphql">
                  {`type Film {
  title: String
  episode: Int
  releaseDate: String



}`}
                </Prism>
              </div>
              <div className="v2">
                <div className="add" />
                <Prism language="graphql">
                  {`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String


}`}
                </Prism>
              </div>
              <div className="v3">
                <div className="add" />
                <Prism language="graphql">
                  {`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String

}`}
                </Prism>
              </div>
              <div className="v4">
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="add" />
                <div className="remove" />
                <Prism language="graphql">
                  {`type Film {
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
                </Prism>
              </div>
              <div className="v5">
                <div className="add" />
                <Prism language="graphql">
                  {`type Film {
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
                </Prism>
              </div>
            </div>
            <script dangerouslySetInnerHTML={{__html: `(function(){
              var i = 0;
              var inView = document.getElementById('typeEvolveView');
              inView.className = 'step' + i;
              setInterval(function () {
                i = (i + 1) % 7;
                inView.className = 'step' + i;
              }, 2200);
            })()`}} />
          </div>
        </section>
        </div>

        <section className="point6">
          <div className="prose">
            <h2>Bring your own<br />data and code</h2>
            {/*Illustration of each field becoming a function?]*/}
            <p>
              GraphQL creates a uniform API across your entire application
              without being limited by a specific storage engine. Write GraphQL
              APIs that leverage your existing data and code with GraphQL
              engines available in many languages. You provide functions for
              each field in the type system, and GraphQL calls them with
              optimal&nbsp;concurrency.</p>
          </div>
          <div className="window leverage-code" aria-hidden>
            <div id="leverageCodeView">
              <Prism language="graphql">
                {`type Character {
  name: String
  homeWorld: Planet
  friends: [Character]
}`}
              </Prism>
              <Prism>
                {`// type Character {
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
              </Prism>
              <Prism language="python">
                {`# type Character {
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
              </Prism>
              <Prism>
                {`// type Character {
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
              </Prism>
            </div>
            <script dangerouslySetInnerHTML={{__html: `(function(){
              var i = 0;
              var inView = document.getElementById('leverageCodeView');
              var delayBefore = [ 800, 1800, 1200, 3000, 3000, 3000 ];
              function step() {
                inView.className = 'step' + i;
                i = (i + 1) % 6;
                setTimeout(step, delayBefore[i]);
              }
              step();
            })()`}} />
          </div>
        </section>

        <section className="powered-by">
          <div className="prose">
            <h2>Who&rsquo;s using GraphQL?</h2>
            <p>
              Facebook's mobile apps have been powered by GraphQL since 2012.
              A GraphQL spec was open sourced in 2015 and is now available in
              many environments and used by teams of all sizes.</p>
          </div>
          <div className="logos">
            {/* Waiting for permission from some of the below */}
            <a href="https://www.facebook.com/" target="_blank">
              <img src="/img/logos/facebook.png" title="Facebook" />
            </a>
            {/** /}
            <a href="https://twitter.com/" target="_blank">
              <img src="/img/logos/twitter.png" title="Twitter" className="round" />
            </a>
            <a href="https://github.com/" target="_blank">
              <img src="/img/logos/github.png" title="GitHub" className="round" />
            </a>
            <a href="https://www.pinterest.com/" target="_blank">
              <img src="/img/logos/pinterest.png" title="Pinterest" className="round" />
            </a>
            <a href="https://www.airbnb.com/" target="_blank">
              <img src="/img/logos/airbnb.png" title="Airbnb" className="round" />
            </a>
            <a href="https://www.intuit.com/" target="_blank">
              <img src="/img/logos/intuit.png" title="Intuit" />
            </a>
            {/**/}
            <a href="https://www.coursera.org/" target="_blank">
              <img src="/img/logos/coursera.png" title="Coursera" />
            </a>
          </div>
        </section>

      </Site>
    );
  }
});

module.exports = index;

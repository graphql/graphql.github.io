var React = require('react');
var Site = require('./_core/Site');
var HeaderLinks = require('./_core/HeaderLinks');
var Prism = require('./_core/Prism');
var Search = require('./_core/Search');

module.exports = ({ page, section }) =>
  <Site className="index" noSearch={true} page={page}>
    <section className="fixedSearch">
      <Search />
    </section>

    <div className="hero">
      <div className="abs">
        <header aria-hidden>
          <section>
            <HeaderLinks section={section} />
          </section>
        </header>

        <section className="intro">
          <div className="named-logo">
            <img src="/img/logo.svg" />
            <h1>GraphQL</h1>
          </div>

          <div className="marketing-col">
            <h3>描述你的数据</h3>
            <Prism language="graphql">
              {`type Project {
  name: String
  tagline: String
  contributors: [User]
}`}
            </Prism>
          </div>

          <div className="marketing-col">
            <h3>请求你所要的数据</h3>
            <Prism language="graphql">
              {`{
  project(name: "GraphQL") {
    tagline
  }
}`}
            </Prism>
          </div>

          <div className="marketing-col">
            <h3>得到可预测的结果</h3>
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
            马上开始
          </a>
          <a className="button" href="/learn/">
            了解更多
          </a>
        </div>

      </div>
    </div>

    <section className="lead">
      <h1>一种用于 API 的查询语言</h1>
      <p>GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。</p>
    </section>

    <section className="point1" id="predictable-results">
      <div className="prose">
        <h2>请求你所要的数据<br />不多不少</h2>
        {/*[Illustration: just a simple query and response?]*/}
        <p>向你的 API 发出一个 GraphQL 请求就能准确获得你想要的数据，不多不少。 GraphQL 查询总是返回可预测的结果。使用 GraphQL 的应用可以工作得又快又稳，因为控制数据的是应用，而不是服务器。</p>
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
      <section className="point2" id="single-request">
        <div className="prose">
          <h2>获取多个资源<br />只用一个请求</h2>
          {/*Illustration: a query 2 or 3 levels deep]*/}
          <p>GraphQL 查询不仅能够获得资源的属性，还能沿着资源间引用进一步查询。典型的 REST API 请求多个资源时得载入多个 URL，而 GraphQL 可以通过一次请求就获取你应用所需的所有数据。这样一来，即使是比较慢的移动网络连接下，使用 GraphQL 的应用也能表现得足够迅速。</p>
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

    <section className="point3" id="type-system">
      <div className="prose">
        <h2>描述所有的可能<br />类型系统</h2>
        {/*Illustration of a type IDL following a query by line]*/}
        {/*Under: a server <-> client (Capabilities, Requirements)]?*/}
        <p>GraphQL API 基于类型和字段的方式进行组织，而非入口端点。你可以通过一个单一入口端点得到你所有的数据能力。GraphQL 使用类型来保证应用只请求可能的数据，还提供了清晰的辅助性错误信息。应用可以使用类型，而避免编写手动解析代码。</p>
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
    <section className="point4" id="powerful-tools">
      <div className="prose">
        <h2>快步前进<br />强大的开发者工具</h2>
        {/*Illustration of GraphiQL validation error and typeahead, animated?]*/}
        <p>不用离开编辑器就能准确知道你可以从 API 中请求的数据，发送查询之前就能高亮潜在问题，高级代码智能提示。利用 API 的类型系统，GraphQL 让你可以更简单地构建如同
          <a href="https://github.com/graphql/graphiql" target="_blank">Graph<em>i</em>QL</a>
          的强大工具。</p>
      </div>
      <div className="graphiqlVid" dangerouslySetInnerHTML={{__html: `
        <video autoplay loop playsinline>
          <source src="/img/graphiql.mp4?x" type="video/mp4" />
        </video>
      `}} />
    </section>
    </div>

    <div className="grayWash">
    <section className="point5" id="without-versions">
      <div className="prose">
        <h2>API 演进<br />无需划分版本</h2>
        {/*Illustration showing more legs added to a graph? Or a type evolving over time?]*/}
        <p>给你的 GraphQL API 添加字段和类型而无需影响现有查询。老旧的字段可以废弃，从工具中隐藏。通过使用单一演进版本，GraphQL API 使得应用始终能够使用新的特性，并鼓励使用更加简洁、更好维护的服务端代码。</p>
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

    <section className="point6" id="bring-your-own-code">
      <div className="prose">
        <h2>使用你现有的<br />数据和代码</h2>
        {/*Illustration of each field becoming a function?]*/}
        <p>GraphQL 让你的整个应用共享一套 API，而不用被限制于特定存储引擎。GraphQL 引擎已经有多种语言实现，通过 GraphQL API 能够更好利用你的现有数据和代码。你只需要为类型系统的字段编写函数，GraphQL 就能通过优化并发的方式来调用它们。</p>
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
            {`// type Character
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
            {`# type Character
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
            {`// type Character
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

    <section className="powered-by" id="whos-using">
      <div className="prose">
        <h2>谁在使用 GraphQL？</h2>
        <p>Facebook 的移动应用从 2012 年就开始使用 GraphQL。GraphQL 规范于 2015 年开源，现已经在多种环境下可用，并被各种体量的团队所使用。</p>
      </div>
      <div className="logos">
        {/* Waiting for permission from some of the below */}
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/facebook.png" title="Facebook" />
        </a>
        {/**/}
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/twitter.png" title="Twitter" className="round" />
        </a>
        {/**/}
        <a href="https://developer.github.com/v4/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/github.png" title="GitHub" className="round" />
        </a>
        <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/pinterest.png" title="Pinterest" className="round" />
        </a>
        {/**/}
        <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/airbnb.png" title="Airbnb" className="round" />
        </a>
        {/**/}
        <a href="https://www.intuit.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/intuit.png" title="Intuit" />
        </a>
        <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/coursera.png" title="Coursera" />
        </a>
        <a href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/shopify.png" title="Shopify" className="round" />
        </a>
      </div>

      <a className="button" href="/users/">
        更多 GraphQL 使用者
      </a>

    </section>

  </Site>;

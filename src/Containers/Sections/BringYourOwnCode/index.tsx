import React, { useEffect } from "react"
import Prism from "../../../components/Prism"

const Index = (): JSX.Element => {
  useEffect(() => {
    let i = 0
    var inView = document.getElementById("leverageCodeView")
    var delayBefore = [800, 1800, 1200, 3000, 3000, 3000]
    let timer: any
    function step() {
      inView!.className = "step" + i
      i = (i + 1) % 6
      timer = setTimeout(step, delayBefore[i])
    }
    step()
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="point6" id="bring-your-own-code">
      <div className="prose2">
        <h2>
          Bring your own
          <br />
          data and code
        </h2>
        {/*Illustration of each field becoming a function?]*/}
        <p>
          GraphQL creates a uniform API across your entire application without
          being limited by a specific storage engine. Write GraphQL APIs that
          leverage your existing data and code with GraphQL engines available in
          many languages. You provide functions for each field in the type
          system, and GraphQL calls them with optimal&nbsp;concurrency.
        </p>
      </div>
      <div className="window leverage-code" aria-hidden>
        <div id="leverageCodeView">
          <Prism
            language="graphql"
            code={`type Character {
    name: String
    homeWorld: Planet
    friends: [Character]
}`}
          />
          <Prism
            language="javascript"
            code={`// type Character {
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
            language="javascript"
            code={`# type Character {
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
            code={`
// type Character {
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
  )
}

export default Index

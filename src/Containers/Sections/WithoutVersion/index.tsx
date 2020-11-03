import React, { useEffect } from "react"
import Prism from "../../../components/Prism"

const WithoutVersion = () => {
  useEffect(() => {
    let i = 0
    let inView = document.getElementById("typeEvolveView")
    inView!.className = "step" + i
    const interval = setInterval(function () {
      i = (i + 1) % 7
      inView!.className = "step" + i
    }, 2200)
    return () => clearInterval(interval)
  })
  return (
    <div className="grayWash">
      <section className="point5" id="without-versions">
        <div className="prose">
          <h2>
            Evolve your API
            <br />
            without versions
          </h2>
          {/*Illustration showing more legs added to a graph? Or a type evolving over time?]*/}
          <p>
            Add new fields and types to your GraphQL API without impacting
            existing queries. Aging fields can be deprecated and hidden from
            tools. By using a single evolving version, GraphQL APIs give apps
            continuous access to new features and encourage cleaner, more
            maintainable server&nbsp;code.
          </p>
        </div>
        <div className="window type-evolution" aria-hidden>
          <div id="typeEvolveView">
            <div className="v1">
              <Prism
                language="graphql"
                code={
`type Film {
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
                code={
`type Film {
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
                code={
`type Film {
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
                code={
`type Film {
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
                code={
`type Film {
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
  )
}

export default WithoutVersion

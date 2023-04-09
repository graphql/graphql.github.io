import React from "react"

const PowerFulTools = () => {
  return (
    <div className="darkWash">
      <section className="point4" id="powerful-tools">
        <div className="prose2">
          <h2>
            Move faster with
            <br />
            powerful developer tools
          </h2>
          {/*Illustration of GraphiQL validation error and typeahead, animated?]*/}
          <p>
            Know exactly what data you can request from your API without leaving
            your editor, highlight potential issues before sending a query, and
            take advantage of improved code intelligence. GraphQL makes it easy
            to build powerful tools like{" "}
            <a
              href="https://github.com/graphql/graphiql"
              target="_blank"
              rel="noopener"
            >
              Graph<em>i</em>QL
            </a>{" "}
            by leveraging your API&rsquo;s type system.
          </p>
        </div>
        <div className="graphiqlVid">
          {" "}
          <video autoPlay muted loop playsInline>
            <source src="/img/graphiql.mp4?x" type="video/mp4" />
          </video>
        </div>
      </section>
    </div>
  )
}

export default PowerFulTools

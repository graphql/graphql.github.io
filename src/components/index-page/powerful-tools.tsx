export function PowerFulTools() {
  return (
    <section className="conf-block container lg:w-4/6" id="powerful-tools">
      <div className="text-center">
        <h2>Move faster with powerful developer tools</h2>
        {/*Illustration of GraphiQL validation error and typeahead, animated?]*/}
        <p className="mx-auto lg:w-2/3">
          Know exactly what data you can request from your API without leaving
          your editor, highlight potential issues before sending a query, and
          take advantage of improved code intelligence. GraphQL makes it easy to
          build powerful tools like{" "}
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a
            href="https://github.com/graphql/graphiql"
            target="_blank"
            rel="noopener"
            className="text-primary hover:underline"
          >
            Graph<em className="font-sans">i</em>QL
          </a>{" "}
          by leveraging your API&rsquo;s type system.
        </p>
      </div>
    </section>
  )
}

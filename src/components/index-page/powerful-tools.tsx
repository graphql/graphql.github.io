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
      <div className="overflow-hidden rounded-t-xl shadow-[0_0_0_1px_rgba(0,0,0,.2),0_16px_64px_rgba(0,0,0,.6)]">
        <video
          disablePictureInPicture
          autoPlay
          muted
          loop
          playsInline
          className="hidden dark:block"
        >
          {/* todo: sync with main branch in graphql.org repo */}
          <source
            src="https://github.com/dimaMachina/graphql.github.io/raw/nextra/static/img/graphiql-dark.mp4"
            type="video/mp4"
          />
        </video>
        <video
          disablePictureInPicture
          autoPlay
          muted
          loop
          playsInline
          className="block dark:hidden"
        >
          <source
            src="https://github.com/dimaMachina/graphql.github.io/raw/nextra/static/img/graphiql-light.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  )
}

import React from "react"
import Layout from "../components/Layout"

export default ({ pageContext }) => {
  return (
    <Layout title="Who's Using | GraphQL" pageContext={pageContext}>
      <section className="whos-using-page">
        <div className="prose">
          <h1>Who&rsquo;s using GraphQL?</h1>
          <p>
            GraphQL is used by teams of all sizes in many different environments
            and languages to power mobile apps, websites, and APIs.
          </p>
          <p>
            Is your company using GraphQL?
            <br />
            Please send a pull request to the{" "}
            <a href="https://github.com/graphql/graphql-landscape">
              GraphQL Landscape
            </a>{" "}
            and follow{" "}
            <a href="https://github.com/graphql/graphql-landscape#new-entries">
              instructions.
            </a>
          </p>
        </div>

        <iframe
          frameBorder="0"
          id="landscape"
          scrolling="no"
          style={{ width: "1px", minWidth: "100%" }}
          src="https://landscape.graphql.org/card-mode?category=graph-ql-adopter&grouping=category&embed=yes"
          onLoad={() => {
            const scriptElem = document.createElement('script');
            scriptElem.type = 'text/javascript';
            scriptElem.src = "https://landscape.cncf.io/iframeResizer.js";
            scriptElem.onload = () => (window as any)["iFrameResize"]();
            document.body.appendChild(scriptElem);
          }}
        ></iframe>
      </section>
    </Layout>
  )
}

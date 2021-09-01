import React from "react"
import type { PageProps } from "gatsby"
import Layout from "../../components/Layout"

export default ({ pageContext }: PageProps<object, GatsbyTypes.SitePageContext>) => {
  return (
    <Layout title="GraphQL Foundation Members | GraphQL" pageContext={pageContext}>
      <section className="foundation-members-page">
        <div className="prose">
          <h1>GraphQL Foundation members</h1>
          <p>
            The <a href="/foundation/">GraphQL Foundation</a> is the primary way in which funding is
            raised and distributed to support essential GraphQL community programs. The members
            listed on this page are directly invested in the success and long-term sustainability of
            the GraphQL community.
          </p>
          <p>
            To learn more about the <a href="/foundation">GraphQL Foundation</a> and becoming a
            member, please see our <a href="/faq/graphql-foundation/">FAQ</a>,
            reach out to <a href="mailto:membership@graphql.org">membership@graphql.org</a>, or <a
            href="https://join.graphql.org">complete a membership application</a>.
          </p>
        </div>

        <iframe
          frameBorder="0"
          id="landscape"
          scrolling="no"
          style={{ width: "1px", minWidth: "100%" }}
          src="https://landscape.graphql.org/card-mode?category=graph-ql-foundation-member&grouping=category&embed=yes&style=borderless"
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

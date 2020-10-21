import React from "react"
import Layout from "../components/Layout"
import PageMarkdown from "../components/PageMarkdown"

export default ({ pageContext }) => {
  return (
    <Layout title="Code" pageContext={pageContext}>
      <section>
        <div className="documentationContent">
          <div className="inner-content">
            <h1>Code</h1>
            <PageMarkdown page={"code"} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

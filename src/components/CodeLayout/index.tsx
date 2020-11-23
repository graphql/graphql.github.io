import React from 'react'
import Marked from "../Marked";

export default ({ title, rawMarkdownBody, pageContext }: any) => (
  <section>
    <div className="documentationContent">
      <div className="inner-content">
        <h1>{title}</h1>
        <Marked pageContext={pageContext}>{rawMarkdownBody}</Marked>
      </div>
    </div>
  </section>
)
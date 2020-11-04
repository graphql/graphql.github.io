import React from 'react'
import Marked from "../Marked";

export default ({ title, rawMarkdownBody }: any) => (
  <section>
    <div className="documentationContent">
      <div className="inner-content">
        <h1>{title}</h1>
        <Marked>{rawMarkdownBody}</Marked>
      </div>
    </div>
  </section>
)
import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFound: React.FC = ({}) => {
  return (
    <Layout className="code">
      <div className="code-hero">
        <div className="code-hero-inner">
          <h1>Oops!</h1>
          <p>Page not found!</p>
        </div>
      </div>
    </Layout>
  )
}

export function Head() {
  return <Seo title="GraphQL: Page not found" />
}

export default NotFound

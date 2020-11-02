import React from "react"
import { Link } from "gatsby"

const WhosUsing = () => {
  return (
    <section className="powered-by" id="whos-using">
      <div className="prose">
        <h2>Who&rsquo;s using GraphQL?</h2>
        <p>
          Facebook's mobile apps have been powered by GraphQL since 2012. A
          GraphQL spec was open sourced in 2015 and is now available in many
          environments and used by teams of all sizes.
        </p>
      </div>
      <div className="logos">
        {/* Waiting for permission from some of the below */}
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/users/logos/facebook.png" title="Facebook" />
        </a>
        {/** /}
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
      <img src="/users/logos/twitter.png" title="Twitter" className="round" />
    </a>
    {/**/}
        <a
          href="https://docs.github.com/en/graphql"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/users/logos/github.png" title="GitHub" className="round" />
        </a>
        <a
          href="https://www.pinterest.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/users/logos/pinterest.png"
            title="Pinterest"
            className="round"
          />
        </a>
        {/** /}
    <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
      <img src="/users/logos/airbnb.png" title="Airbnb" className="round" />
    </a>
    {/**/}
        <a
          href="https://www.intuit.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/users/logos/intuit.png" title="Intuit" />
        </a>
        <a
          href="https://www.coursera.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/users/logos/coursera.png" title="Coursera" />
        </a>
        <a
          href="https://www.shopify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/users/logos/shopify.png"
            title="Shopify"
            className="round"
          />
        </a>
      </div>

      <Link to="/users" className="button">
        More GraphQL Users
      </Link>
    </section>
  )
}

export default WhosUsing

import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
  <footer>

    <section className="sitemap">

      <Link to="/" className="nav-home" aria-label="Homepage" />

      <div>
        <h5><Link to="/learn/">Learn</Link></h5>
        <Link to="/learn/">Introduction</Link>
        <Link to="/learn/queries/">Query Language</Link>
        <Link to="/learn/schema/">Type System</Link>
        <Link to="/learn/execution/">Execution</Link>
        <Link to="/learn/best-practices/">Best Practices</Link>
      </div>

      <div>
        <h5><Link to="/code">Code</Link></h5>
        <Link to="/code/#server-libraries">Servers</Link>
        <Link to="/code/#graphql-clients">Clients</Link>
        <Link to="/code/#tools">Tools</Link>
      </div>

      <div>
        <h5><Link to="/community">Community</Link></h5>
        <Link to="/community/upcoming-events/">Upcoming Events</Link>
        <a href="http://stackoverflow.com/questions/tagged/graphql" target="_blank" rel="noopener noreferrer">Stack Overflow</a>
        <a href="https://www.facebook.com/groups/graphql.community/" target="_blank" rel="noopener noreferrer">Facebook Group</a>
        <a href="https://twitter.com/GraphQL" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>

      <div>
        <h5>More</h5>
        <a href="https://graphql.github.io/graphql-spec/" target="_blank" rel="noopener noreferrer">GraphQL Specification</a>
        <a href="https://foundation.graphql.org/" target="_blank" rel="noopener noreferrer">GraphQL Foundation</a>
        <a href="https://github.com/graphql" target="_blank" rel="noopener noreferrer">GraphQL GitHub</a>
      </div>

    </section>

    <section className="copyright">
      Copyright © {`${new Date().getFullYear()}`} The GraphQL Foundation. All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage">Trademark Usage</a> page. Linux is a registered trademark of Linus Torvalds. <a href="http://www.linuxfoundation.org/privacy">Privacy Policy</a> and <a href="http://www.linuxfoundation.org/terms">Terms of Use</a>.
    </section>

  </footer>
)

export default Footer

import React from 'react';
import { Link } from "gatsby"

interface Props {
  sections: any[]
  currentPermalink?: string
}

const FAQSidebar = ({ sections, currentPermalink }: Props) => (
  <div className="nav-docs">
    <div className="nav-docs-section">
      <h3>FAQ Topics</h3>
      <ul>
        {sections.map(({ frontmatter }, i) => (
          <li key={i}>
            {frontmatter.permalink === currentPermalink ? (
              frontmatter.title
            ) : (
              <Link to={frontmatter.permalink}>{frontmatter.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default FAQSidebar;
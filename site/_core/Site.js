/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var HeaderLinks = require('./HeaderLinks');
var Search = require('./Search');
var SiteData = require('./SiteData');

export default ({ page, category, title, section, className, noSearch, children }) =>
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <title>
        {title ?
          `${title} | ${category || 'GraphQL'}` :
          `GraphQL | ${SiteData.description}`}
      </title>
      <meta name="viewport" content="width=640" />
      <meta name="description" content="GraphQL provides a complete description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools." />
      <meta property="og:title" content="GraphQL: A query language for APIs." />
      <meta property="og:description" content="GraphQL provides a complete description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://graphql.org/" />
      <meta property="og:image" content="/img/og_image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@graphql" />
      <meta name="twitter:title" content="GraphQL: A query language for APIs." />
      <meta name="twitter:description" content="GraphQL gives clients the power to ask for exactly what they need and nothing more, making it easier to evolve APIs over time." />
      <meta name="twitter:image" content="/img/twitter_image.png" />
      <link rel="shortcut icon" href="/img/favicon.png" />
      <link rel="home" type="application/rss+xml" href="/blog/rss.xml" title="GraphQL Team Blog" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:300|Roboto:300" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,600" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css" />
    </head>
    <body className={className}>

      <header>
        <section>
          <a className="nav-home" href="/">
            <img className="nav-logo" src="/img/logo.svg" alt="GraphQL Logo" width="30" height="30" />
            GraphQL
          </a>
          <HeaderLinks section={section} activeUrl={page.permalink} />
          {noSearch || <Search />}
        </section>
      </header>

      {children}

      <footer>
        <section className="sitemap">
          <a href="/" className="nav-home" aria-label="Homepage" />
          <div>
            <h5><a href="/learn/">Learn</a></h5>
            <a href="/learn/">Introduction</a>
            <a href="/learn/queries/">Query Language</a>
            <a href="/learn/schema/">Type System</a>
            <a href="/learn/execution/">Execution</a>
            <a href="/learn/best-practices/">Best Practices</a>
          </div>
          <div>
            <h5><a href="/code">Code</a></h5>
            <a href="/code/#server-libraries">Servers</a>
            <a href="/code/#graphql-clients">Clients</a>
            <a href="/code/#tools">Tools</a>
          </div>
          <div>
            <h5><a href="/community">Community</a></h5>
            <a href="/community/upcoming-events/">Upcoming Events</a>
            <a href="http://stackoverflow.com/questions/tagged/graphql" target="_blank" rel="noopener noreferrer">Stack Overflow</a>
            <a href="https://www.facebook.com/groups/graphql.community/" target="_blank" rel="noopener noreferrer">Facebook Group</a>
            <a href="https://twitter.com/GraphQL" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://graphql.github.io/graphql-spec/" target="_blank" rel="noopener noreferrer">GraphQL Specification</a>
            <a href="https://foundation.graphql.org/" target="_blank" rel="noopener noreferrer">GraphQL Foundation</a>
            <a href="https://github.com/graphql" target="_blank" rel="noopener noreferrer">GraphQL GitHub</a>
            {page && <a href={'https://github.com/graphql/graphql.github.io/edit/source/site/' + page.relPath} target="_blank" rel="noopener noreferrer">Edit this page &#x270E;</a>}
          </div>
        </section>
        <section className="copyright">
          Copyright © {`${new Date().getFullYear()}`} The GraphQL Foundation. All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage">Trademark Usage</a> page. Linux is a registered trademark of Linus Torvalds. <a href="http://www.linuxfoundation.org/privacy">Privacy Policy</a> and <a href="http://www.linuxfoundation.org/terms">Terms of Use</a>.
        </section>
      </footer>

      <script type="text/javascript" src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        docsearch({
          apiKey: 'd103541f3e6041148aade2e746ed4d61',
          indexName: 'graphql',
          inputSelector: '#algolia-search-input'
        });
      `}} />
      <script dangerouslySetInnerHTML={{
        __html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44373548-16', 'auto');
ga('send', 'pageview');
      `}} />
    </body>
  </html>

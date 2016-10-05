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

var Site = React.createClass({
  render: function() {
    var page = this.props.page;
    var suffix = this.props.category || 'GraphQL';
    var pageTitle = this.props.title ?
      `${this.props.title} | ${suffix}` :
      `GraphQL | ${SiteData.description}`;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>{pageTitle}</title>
          <meta name="viewport" content="width=640" />
          <meta property="og:title" content="GraphQL: A query language for APIs." />
          <meta property="og:description" content="GraphQL provides a complete description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://graphql.org/" />
          <meta property="og:image" content="/img/og_image.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@graphql" />
          <meta name="twitter:title" content="GraphQL: A query language for APIs." />
          <meta name="twitter:description" content="GraphQL gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools." />
          <meta name="twitter:image" content="/img/twitter_image.png" />
          <link rel="shortcut icon" href="/img/favicon.png" />
          <link rel="home" type="application/rss+xml" href="/blog/rss.xml" title="GraphQL Team Blog" />
          <link rel="stylesheet" href="/style.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:300|Roboto:300" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,600" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css" />
        </head>
        <body className={this.props.className}>

          <header>
            <section>
              <a className="nav-home" href="/">
                <img className="nav-logo" src="/img/logo.svg" width="30" height="30" />
                GraphQL
              </a>
              <HeaderLinks section={this.props.section} />
              {this.props.noSearch || <Search />}
            </section>
          </header>

          {this.props.children}

          <footer>
            <section className="sitemap">
              <a href="/" className="nav-home" />
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
                <a href="/code/#graphql-server-libraries">Servers</a>
                <a href="/code/#graphql-clients">Clients</a>
                <a href="/code/#tools">Tools</a>
              </div>
              <div>
                <h5><a href="/community">Community</a></h5>
                <a href="/community/upcoming-events/">Upcoming Events</a>
                <a href="http://stackoverflow.com/questions/tagged/graphql" target="_blank">Stack Overflow</a>
                <a href="https://www.facebook.com/groups/graphql.community/" target="_blank">Facebook Group</a>
                <a href="https://twitter.com/GraphQL" target="_blank">Twitter</a>
              </div>
              <div>
                <h5>More</h5>
                <a href="/blog">GraphQL Team Blog</a>
                <a href="http://facebook.github.io/graphql/" target="_blank">Read the Spec</a>
                <a href="https://github.com/graphql" target="_blank">GitHub</a>
                {page && <a href={'https://github.com/graphql/graphql.github.io/edit/source/site/' + page.relPath} target="_blank">Edit this page &#x270E;</a>}
              </div>
            </section>
            <a href="https://code.facebook.com/projects/" target="_blank" className="fbOpenSource">
              <img src="/img/oss_logo.png" alt="Facebook Open Source" width="170" height="45" />
            </a>
            <section className="copyright">
              Copyright &copy; 2016 Facebook Inc. The contents of this page are licensed BSD-3-Clause.
            </section>
          </footer>

          <script type="text/javascript" src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"></script>
          <script dangerouslySetInnerHTML={{__html: `
            docsearch({
              apiKey: 'd103541f3e6041148aade2e746ed4d61',
              indexName: 'graphql',
              inputSelector: '#algolia-search-input'
            });
          `}} />
          <script dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44373548-16', 'auto');
ga('send', 'pageview');
          `}} />
        </body>
      </html>
    );
  }
});

module.exports = Site;

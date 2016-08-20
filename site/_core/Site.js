/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var HeaderLinks = require('./HeaderLinks');
var SiteData = require('./SiteData');

var Site = React.createClass({
  render: function() {
    var pageTitle = this.props.title ? `${this.props.title} | GraphQL` : `GraphQL | ${SiteData.description}`;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>{pageTitle}</title>
          <meta name="viewport" content="width=device-width" />
          <meta property="og:title" content={'GraphQL | ' + SiteData.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://graphql.org/" />
          <meta property="og:description" content={SiteData.description} />

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
              <a className="nav-home" href={'/'}>
                <img className="nav-logo" src={'/img/logo.svg'} width="30" height="30" />
                GraphQL
              </a>
              <HeaderLinks section={this.props.section} />
            </section>
          </header>

          {this.props.children}

          <footer>
            <section className="sitemap">
              <img src="/img/logo-gray.svg" width="30" height="30" />
              <div>
                <h5><a>Learn</a></h5>
                <a>Introduction</a>
                <a>Query Language</a>
                <a>Type System</a>
                <a>How GraphQL Works</a>
                <a>Best Practices</a>
              </div>
              <div>
                <h5><a>Code</a></h5>
                <a>Servers</a>
                <a>Clients</a>
                <a>Tools</a>
              </div>
              <div>
                <h5><a>Community</a></h5>
                <a>Upcoming Events</a>
                <a>Conference Talks</a>
                <a>Stack Overflow</a>
                <a>Twitter</a>
              </div>
              <div>
                <h5><a>More</a></h5>
                <a>GraphQL Team Blog</a>
                <a>Read the Spec</a>
                <a>GitHub</a>
              </div>
            </section>
            <section className="copyright">
              Copyright &copy; 2016 Facebook Inc. The contents of this page are licensed BSD-3-Clause.
            </section>
          </footer>

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

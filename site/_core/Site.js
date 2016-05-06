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

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css" />
          <link rel="shortcut icon" href={'/img/favicon.png'} />
          <link rel="stylesheet" href={'/css/graphql.css'} />

          <script type="text/javascript" src="//use.typekit.net/vqa1hcx.js"></script>
          <script type="text/javascript">{'try{Typekit.load();}catch(e){}'}</script>
        </head>
        <body>

          <div className="container">
            <div className="nav-main">
              <div className="wrap">
                <a className="nav-home" href={'/'}>
                  <img className="nav-logo" src={'/img/logo.svg'} width="40" height="40" />
                  GraphQL
                </a>
                <HeaderLinks section={this.props.section} />
              </div>
            </div>

            {this.props.children}

            <footer className="wrap">
              <div className="right">©2016 Facebook Inc.</div>
            </footer>
          </div>

          <div id="fb-root" />

          <script type="text/javascript" src="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js"></script>
          <script dangerouslySetInnerHTML={{__html: `
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
            docsearch({
              apiKey: 'd103541f3e6041148aade2e746ed4d61',
              indexName: 'graphql',
              inputSelector: '#algolia-doc-search'
            });
          `}} />
        </body>
      </html>
    );
  }
});

module.exports = Site;

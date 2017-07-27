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
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <title>
        {title ?
          `${title} | ${category || 'GraphQL'}` :
          `GraphQL | ${SiteData.description}`}
      </title>
      <meta name="viewport" content="width=640" />
      <meta property="og:title" content="GraphQL: 一种用于 API 的查询语言。" />
      <meta property="og:description" content="GraphQL 提供了 API 中数据的完整描述，提供让客户端能够准确地获取需要的数据而不包含任何冗余的能力，让 API 更加容易随着时间推移而演进，并提供强大的开发者工具。" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://graphql.cn/" />
      <meta property="og:image" content="/img/og_image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@graphql" />
      <meta name="twitter:title" content="GraphQL: 一种用于 API 的查询语言。" />
      <meta name="twitter:description" content="GraphQL 提供让客户端能够准确地获取需要的数据而不包含任何冗余的能力，并让 API 更加容易随着时间推移而演进。" />
      <meta name="twitter:image" content="/img/twitter_image.png" />
      <link rel="shortcut icon" href="/img/favicon.png" />
      <link rel="home" type="application/rss+xml" href="/blog/rss.xml" title="GraphQL 团队博客" />
      <link rel="stylesheet" href="/style.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:300|Roboto:300" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,600" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/docsearch.js/1/docsearch.min.css" />
    </head>
    <body className={className}>

      <header>
        <section>
          <a className="nav-home" href="/">
            <img className="nav-logo" src="/img/logo.svg" width="30" height="30" />
            GraphQL
          </a>
          <HeaderLinks section={section} />
          {noSearch || <Search />}
        </section>
      </header>

      {children}

      <footer>
        <section className="sitemap">
          <a href="/" className="nav-home" />
          <div>
            <h5><a href="/learn/">学习</a></h5>
            <a href="/learn/">入门</a>
            <a href="/learn/queries/">查询语言</a>
            <a href="/learn/schema/">类型系统</a>
            <a href="/learn/execution/">执行</a>
            <a href="/learn/best-practices/">最佳实践</a>
          </div>
          <div>
            <h5><a href="/code">代码</a></h5>
            <a href="/code/#server-libraries">服务端</a>
            <a href="/code/#graphql-clients">客户端</a>
            <a href="/code/#tools">工具</a>
          </div>
          <div>
            <h5><a href="/community">社区</a></h5>
            <a href="/community/upcoming-events/">即将到来的活动</a>
            <a href="http://stackoverflow.com/questions/tagged/graphql" target="_blank" rel="noopener noreferrer">Stack Overflow</a>
            <a href="https://www.facebook.com/groups/graphql.community/" target="_blank" rel="noopener noreferrer">Facebook Group</a>
            <a href="https://twitter.com/GraphQL" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <div>
            <h5>更多</h5>
            <a href="/blog">GraphQL 团队博客</a>
            <a href="http://facebook.github.io/graphql/" target="_blank" rel="noopener noreferrer">阅读规范</a>
            <a href="https://github.com/graphql" target="_blank" rel="noopener noreferrer">GitHub</a>
            {page && <a href={'https://github.com/xitu/graphql.github.io/edit/zh-Hans/site/' + page.relPath} target="_blank" rel="noopener noreferrer">编辑本页 &#x270E;</a>}
          </div>
        </section>
        <a href="https://code.facebook.com/projects/" target="_blank" rel="noopener noreferrer" className="fbOpenSource">
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

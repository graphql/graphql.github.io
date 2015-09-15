/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var React = require('react');
var Site = require('../_core/Site');
var Marked = require('../_core/Marked');
var BlogSidebar = require('../_core/BlogSidebar');

var BlogIndex = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;
    var posts = site.files.blog
      .filter(file => !file.draft && path.extname(file.relPath) === '.md')
      .sort((a, b) => a.date < b.date);
    return (
      <Site section="blog" title="Blog">
        <section className="content wrap documentationContent">
          <BlogSidebar site={site} />
          {posts.map(post =>
            <div className="inner-content" key={post.permalink}>
              <h1><a href={post.url}>{post.title}</a></h1>
              <Marked url={post.url}>{post.content}</Marked>
            </div>
          )}
        </section>
      </Site>
    );
  }
});

module.exports = BlogIndex;

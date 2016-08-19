/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('./Site');
var BlogSidebar = require('./BlogSidebar');
var BlogPost = require('./BlogPost');

var BlogLayout = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;
    return (
      <Site section="blog" title={page.title}>
        <section className="content documentationContent">
          <BlogSidebar site={site} page={page} />
          <BlogPost post={page} isPermalink={true} />
        </section>
      </Site>
    );
  }
});

module.exports = BlogLayout;

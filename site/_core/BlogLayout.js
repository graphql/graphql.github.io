/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var path = require('path');
var React = require('react');
var Site = require('./Site');
var Marked = require('./Marked');
var BlogSidebar = require('./BlogSidebar');

var BlogLayout = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;
    return (
      <Site section="docs">
        <section className="content wrap documentationContent">
          <BlogSidebar site={site} page={page} />
          <div className="inner-content">
            <h1>{page.title}</h1>
            <Marked>{page.content}</Marked>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = BlogLayout;

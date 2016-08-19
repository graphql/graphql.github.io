/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('./Site');
var Marked = require('./Marked');

var support = React.createClass({
  render: function() {
    var page = this.props.page;
    return (
      <Site section={page.section}>
        <section className="content documentationContent nosidebar">
          <div className="inner-content">
            <Marked>{page.content}</Marked>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = support;

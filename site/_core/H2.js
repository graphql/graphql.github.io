/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Header = require('./Header');

var H2 = React.createClass({
  render: function() {
    return <Header {...this.props} level={2}>{this.props.children}</Header>
  }
});

module.exports = H2;

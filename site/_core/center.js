/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var center = React.createClass({
  render: function() {
    var {style} = this.props;
    style = Object.assign({}, style, {textAlign: 'center'});

    return (
      <div {...props} style={style}>{this.props.children}</div>
    );
  }
});

module.exports = center;

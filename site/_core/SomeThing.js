/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var SomeThing = React.createClass({
  getInitialState() {
    return { counter: this.props.count || 0 };
  },

  render: function() {
    return <div>count: {this.state.counter}</div>
  },

  componentDidMount() {
    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 })
    }, 1000);
  }
});

module.exports = SomeThing;

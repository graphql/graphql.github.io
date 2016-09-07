/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');

var Learn = React.createClass({
  render: function() {
    return (
      <Site section="learn" title="Learn">

        <section className="content documentationContent nosidebar">
          <div className="inner-content">
            <h1>Learn</h1>
            <p>
              Content coming soon...
            </p>
          </div>
        </section>

      </Site>
    );
  }
});

module.exports = Learn;

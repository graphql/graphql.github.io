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

export default ({ page }) =>
  <Site section={page.section}>
    <section className="content documentationContent nosidebar">
      <div className="inner-content">
        <Marked>{page.content}</Marked>
      </div>
    </section>
  </Site>

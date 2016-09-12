/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');
var DocsSidebar = require('../_core/DocsSidebar');

export default function({ page, site }) {
  return (
    <Site section="community" title="Community">
      <section className="content documentationContent">
        <DocsSidebar site={site} page={page} />
        <div className="inner-content">
          WIP.
        </div>
      </section>
    </Site>
  );
}

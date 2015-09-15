/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

module.exports = renderReactPage;

/**
 * Options:
 *
 *   - component: A Component constructor class
 *   - props: The props to provide to the Component
 *
 */
function renderReactPage(options) {
  var component = options.component;
  var props = options.props;

  var html = React.renderToStaticMarkup(React.createElement(component, props));

  // Assert correct return
  if (html.indexOf('</body></html') === -1) {
    throw new Error(
      'Component ' + component.displayName + ' did not return <html>'
    );
  }

  // Append DOCTYPE
  html = '<!DOCTYPE html>' + html;

  // Return rendered source
  return html;
}

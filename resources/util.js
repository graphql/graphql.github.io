/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function endsWith(string, partial) {
  return (
    partial.length <= string.length &&
    string.substr(string.length - partial.length) === partial
  );
}

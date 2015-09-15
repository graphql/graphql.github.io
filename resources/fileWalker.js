/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var fs = require('fs');
var path = require('path');

module.exports = fileWalker;

var IGNORE_RX =
  /^(?:_|\.|(?:node_modules|package\.json|README\.(?:md|markdown))$)/;

var INCLUDE_RX = /^(?:\.nojekyll|\.htaccess)/;

function fileWalker(dirPath, onVisitFile) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, files) => {
      if (error) {
        return reject(error);
      }

      var absFiles = files
        .filter(fileName => !IGNORE_RX.test(fileName) || INCLUDE_RX.test(fileName))
        .map(fileName => path.join(dirPath, fileName));

      lstatAll(absFiles, (error, stats) => {
        if (error) {
          return reject(error);
        }
        var awaitWalkers = absFiles.reduce((promise, absFileName, index) => {
          return promise.then(() => {
            if (stats[index].isDirectory()) {
              return fileWalker(absFileName, onVisitFile);
            } else {
              return onVisitFile(absFileName, stats[index]);
            }
          });
        }, Promise.resolve());

        awaitWalkers.then(() => resolve(), reject);
      });
    });
  });
}

function lstatAll(files, cb) {
  var count = files.length;
  var stats = [];
  var success = true;
  files.forEach((fileName, index) => {
    if (success) {
      fs.lstat(fileName, (error, stat) => {
        if (success) {
          if (error) {
            success = false;
            return cb(error);
          }
          stats[index] = stat;
          if (--count === 0) {
            cb(null, stats);
          }
        }
      });
    }
  });
}

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var vm = require('vm');
var webpack = require('webpack');
var React = require('react');
var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var renderReactPage = require('./renderReactPage');
import { endsWith } from './util';


module.exports = writer;

async function writer(buildDir, file, site) {
  var writePath = getWritePath(buildDir, file);

  // Non-modified content
  if (!file.content) {
    await promiseDirExists(path.dirname(writePath));
    await promisePipeEnds(
      fs.createReadStream(file.absPath).pipe(fs.createWriteStream(writePath))
    );
    return;
  }

  var data;

  // Render JS file
  if (endsWith(file.relPath, '.html.js') || endsWith(file.relPath, '.xml.js')) {
    data = renderReactPage({
      component: require(path.resolve(file.absPath)),
      props: { site, page: file }
    });
  } else if (endsWith(file.relPath, '.md') ||
             endsWith(file.relPath, '.markdown')) {
    var absLayoutPath = path.join(path.dirname(file.absPath), file.layout);
    data = renderReactPage({
      component: require(path.resolve(absLayoutPath)),
      props: { site, page: file }
    });
  } else {
    data = file.content;
  }

  data = await writeReact(writePath, file, data);

  data = await writeScript(writePath, file, data);

  await writeFile(writePath, data);
}

var REACT_COMPONENT_RX = /<react-component (.+?)(?:\/>|><\/react-component>)/g;

var ATTR_RX = /data-([^=]+)=("(?:(?:\\.)|[^"])*")/g;

function writeReact(writePath, file, fileData) {
  return new Promise((resolve, reject) => {
    var script;
    var id = 0;
    var withInitialRenders = fileData.replace(REACT_COMPONENT_RX, function (_, componentData) {
      var { module, props } = getReactData(componentData);
      var componentPath = require.resolve(path.resolve(path.dirname(file.absPath), module));
      var component = require(componentPath);
      var initialRender = React.renderToString(React.createElement(component, props));
      var guid = `r${++id}`;
      if (!script) {
        script = `var React = require('react');\n`;
      }
      script += `React.render(React.createElement(require("${componentPath}"), ${JSON.stringify(props)}), document.getElementById("${guid}"));\n`;
      return `<div id="${guid}">${initialRender}</div>`;
    });

    if (!script) {
      return resolve(fileData);
    }

    var tmpFile = '/tmp/' + file.relPath.replace('/', '__');

    fs.writeFile(tmpFile, script, err => {
      if (err) {
        return reject(err);
      }

      var pack = webpack({
        bail: true,
        entry: tmpFile,
        output: {
          path: path.dirname(writePath),
          filename: path.basename(writePath) + '.[hash].js'
        },
        externals: {
          'react': 'var React'
        },
        resolveLoader: {
          root: path.join(__dirname, '../node_modules')
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                optional: [ 'runtime' ],
              }
            }
          ]
        }
      });

      pack.run(function (err, stats) {
        if (err) {
          return reject(err);
        }

        resolve(
          withInitialRenders.replace(
            '</body></html>',
            `<script src="//cdn.jsdelivr.net/react/0.13.3/react.js"></script>` +
            `<script src="${path.basename(writePath)}.${stats.hash}.js"></script></body></html>`
          )
        );
      });

    });
  });
}

function getReactData(componentData) {
  var module;
  var props = {};
  var data = componentData.split(ATTR_RX);
  for (var i = 1; i < data.length; i += 3) {
    var name = data[i];
    var value = JSON.parse(data[i + 1]);
    if (name === 'module') {
      module = value;
    } else {
      props[name] =
        value === 'true' ? true :
        value === 'false' ? false :
        !value || isNaN(value) ? value : parseInt(value, 10);
    }
  }
  return { module, props };
}

var SCRIPT_RX = /<script data-inline>([^]+?)<\/script>/gm;

function writeScript(writePath, file, fileData) {
  return new Promise((resolve, reject) => {
    var renders;
    var id = 100;
    var script;
    var context;

    var withInitialRenders = fileData.replace(SCRIPT_RX, function (_, scriptData) {
      if (!script) {
        script = `var React = require('react');
          var id = 100;
          function renderHere(element) {
            React.render(element, document.getElementById('r' + (++id)));
          }`;
        var renderHere = function (element) {
          renders += `<div id="r${++id}">${React.renderToString(element)}</div>`;
        };
        var relRequire = reqPath => require(
          reqPath[0] === '.' ?
            path.resolve(path.dirname(file.absPath), reqPath) :
            reqPath
        );
        context = { console, process, React, require: relRequire, renderHere };
        context.global = context;
        context = vm.createContext(context);
      }
      var es5 = require('babel-core').transform(scriptData).code;
      script += `(function () {\n${es5}\n}());\n`;
      renders = '';
      var output = vm.runInContext(es5, context);
      return renders;
    });

    if (!script) {
      return resolve(withInitialRenders);
    }


    var tmpFile = path.join(path.dirname(file.absPath), '.tmp.js.' + path.basename(file.absPath));

    fs.writeFile(tmpFile, script, err => {
      if (err) {
        return reject(err);
      }

      var pack = webpack({
        bail: true,
        context: file.absPath,
        entry: tmpFile,
        output: {
          path: path.dirname(writePath),
          filename: path.basename(writePath) + '.[hash].js'
        },
        externals: {
          'react': 'var React'
        },
        resolveLoader: {
          root: path.join(__dirname, '../node_modules')
        },
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                optional: [ 'runtime' ],
              }
            }
          ]
        }
      });

      pack.run(function (err, stats) {
        fs.unlink(tmpFile, () => {

          if (err) {
            return reject(err);
          }

          resolve(
            withInitialRenders.replace(
              '</body></html>',
              `<script src="//cdn.jsdelivr.net/react/0.13.3/react.js"></script>` +
              `<script src="${path.basename(writePath)}.${stats.hash}.js"></script></body></html>`
            )
          );
        });
      });

    });


  });
}

function getWritePath(buildDir, file) {
  var writePath = file.url;
  if (endsWith(writePath, '/')) {
    writePath = path.join(writePath, 'index.html');
  }
  return path.join(buildDir, writePath.slice(1));
}

// Ensures directory exists, then writes file
async function writeFile(filePath, data) {
  await promiseDirExists(path.dirname(filePath));
  await _writeFile(filePath, data);
}

// Simple Promise wrapper around fs.writeFile
function _writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function promisePipeEnds(pipe) {
  return new Promise((resolve, reject) => {
    pipe.on('close', resolve).on('error', reject);
  });
}

function promiseDirExists(dir) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, err => err ? reject(err) : resolve());
  });
}

function mkdirp(p, cb) {
  p = path.resolve(p);
  fs.mkdir(p, 511 ^ process.umask(), error => {
    if (error && error.code === 'EEXIST') {
      return cb();
    } else if (error && error.code === 'ENOENT') {
      mkdirp(path.dirname(p), error2 => {
        return error2 ? cb(error2) : mkdirp(p, cb);
      });
    } else {
      cb(error);
    }
  });
}

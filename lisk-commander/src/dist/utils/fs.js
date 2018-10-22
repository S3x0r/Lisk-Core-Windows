'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeJSONSync = exports.readJSONSync = undefined;

var _fs = require('fs');

var readJSONSync = exports.readJSONSync = function readJSONSync(path) {
  var contents = (0, _fs.readFileSync)(path, 'utf8');
  var stripped = contents.replace(/^\uFEFF/, '');
  return JSON.parse(stripped);
}; /*
    * LiskHQ/lisk-commander
    * Copyright © 2017–2018 Lisk Foundation
    *
    * See the LICENSE file at the top-level directory of this distribution
    * for licensing information.
    *
    * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
    * no part of this software, including this file, may be copied, modified,
    * propagated, or distributed except according to the terms contained in the
    * LICENSE file.
    *
    * Removal or modification of this copyright notice is prohibited.
    *
    */
var writeJSONSync = exports.writeJSONSync = function writeJSONSync(path, contents) {
  var json = JSON.stringify(contents, null, '\t');
  return (0, _fs.writeFileSync)(path, json);
};
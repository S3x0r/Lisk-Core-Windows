'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /*
                                                                                                                                                                                                     * LiskHQ/lisk-commander
                                                                                                                                                                                                     * Copyright © 2017 Lisk Foundation
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


// TODO: Include commented placeholders when we support Node 8
var PLACEHOLDERS = ['%s', '%d',
// '%i',
// '%f',
'%j'];

var wrapLogFunction = function wrapLogFunction(fn, colour) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var colourArg = function colourArg(arg) {
      return _chalk2.default[colour](arg);
    };
    var isPlaceholderPresent = function isPlaceholderPresent(placeholder) {
      return args[0].includes(placeholder);
    };
    return PLACEHOLDERS.some(isPlaceholderPresent) ? fn.apply(undefined, [colourArg(args[0])].concat(_toConsumableArray(args.slice(1)))) : fn.apply(undefined, _toConsumableArray(args.map(colourArg)));
  };
};

var logger = {
  warn: wrapLogFunction(console.warn, 'yellow'),
  error: wrapLogFunction(console.error, 'red')
};

exports.default = logger;
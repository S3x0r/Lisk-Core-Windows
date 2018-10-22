'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
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


var _cliTable = require('cli-table3');

var _cliTable2 = _interopRequireDefault(_cliTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chars = {
	top: '═',
	'top-mid': '╤',
	'top-left': '╔',
	'top-right': '╗',
	bottom: '═',
	'bottom-mid': '╧',
	'bottom-left': '╚',
	'bottom-right': '╝',
	left: '║',
	'left-mid': '╟',
	mid: '─',
	'mid-mid': '┼',
	right: '║',
	'right-mid': '╢',
	middle: '│'
};

var getKeyValueObject = function getKeyValueObject(object) {
	if (!object || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
		return object;
	}
	return Object.entries(object).map(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		return key + ': ' + JSON.stringify(value, null, ' ');
	}).join('\n');
};

var addValuesToTable = function addValuesToTable(table, data) {
	Object.entries(data).forEach(function (_ref3) {
		var _ref4 = _slicedToArray(_ref3, 2),
		    key = _ref4[0],
		    values = _ref4[1];

		var strValue = Array.isArray(values) ? values.join('\n') : getKeyValueObject(values);
		table.push(_defineProperty({}, key, strValue));
	});
};

var tablify = function tablify(data) {
	var dataIsArray = Array.isArray(data);

	var table = new _cliTable2.default({
		chars: chars,
		style: {
			head: [],
			border: []
		}
	});

	if (dataIsArray) {
		data.forEach(function (value, key) {
			table.push([{ colSpan: 2, content: 'data ' + (key + 1) }]);
			addValuesToTable(table, value);
		});
	} else {
		addValuesToTable(table, data);
	}

	return table;
};

exports.default = tablify;
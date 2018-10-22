'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _constants = require('../utils/constants');

var _error = require('../utils/error');

var _helpers = require('../utils/helpers');

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
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


var description = 'Gets information from the blockchain. Types available: account, address, block, delegate, transaction.\n\n\tExamples:\n\t- get delegate lightcurve\n\t- get block 5510510593472232540\n';

var actionCreator = exports.actionCreator = function actionCreator() {
	return function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
			var type = _ref.type,
			    input = _ref.input;
			var pluralType, endpoint, req;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							pluralType = Object.keys(_constants.PLURALS).includes(type) ? _constants.PLURALS[type] : type;

							if (_constants.COMMAND_TYPES.includes(pluralType)) {
								_context.next = 3;
								break;
							}

							throw new _error.ValidationError('Unsupported type.');

						case 3:
							endpoint = (0, _helpers.deAlias)(pluralType);
							req = _defineProperty({
								limit: 1
							}, _constants.QUERY_INPUT_MAP[endpoint], input);
							return _context.abrupt('return', (0, _query2.default)(endpoint, req));

						case 6:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x) {
			return _ref2.apply(this, arguments);
		};
	}();
};

var get = (0, _helpers.createCommand)({
	command: 'get <type> <input>',
	autocomplete: _constants.COMMAND_TYPES,
	description: description,
	actionCreator: actionCreator,
	errorPrefix: 'Could not get'
});

exports.default = get;
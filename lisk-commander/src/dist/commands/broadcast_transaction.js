'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _api = require('../utils/api');

var _api2 = _interopRequireDefault(_api);

var _error = require('../utils/error');

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var description = 'Broadcasts a transaction to the network via the node\nspecified in the current config. Accepts a stringified JSON transaction as an\nargument, or a transaction can be piped from a previous command. If piping in\nnon-interactive mode make sure to quote out the entire command chain to avoid\npiping-related conflicts in your shell.\n\n\tExamples:\n\t- Interactive mode:\n\t\t- broadcast transaction \'{"type":0,"amount":"100",...}\'\n\t\t- create transaction transfer 100 13356260975429434553L --json | broadcast transaction\n\t- Non-interactive mode:\n\t\t- lisk "create transaction transfer 100 13356260975429434553L --json | broadcast transaction"\n';

var getTransactionInput = function getTransactionInput(_ref) {
	var transaction = _ref.transaction,
	    stdin = _ref.stdin,
	    shouldUseStdIn = _ref.shouldUseStdIn;

	var hasStdIn = stdin && stdin[0];
	if (shouldUseStdIn && !hasStdIn) {
		throw new _error.ValidationError('No transaction was provided.');
	}
	return shouldUseStdIn ? stdin[0] : transaction;
};

var actionCreator = exports.actionCreator = function actionCreator() {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var transaction = _ref2.transaction,
			    stdin = _ref2.stdin;
			var shouldUseStdIn, transactionInput, transactionObject;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							shouldUseStdIn = !transaction;
							transactionInput = getTransactionInput({
								transaction: transaction,
								stdin: stdin,
								shouldUseStdIn: shouldUseStdIn
							});
							transactionObject = void 0;
							_context.prev = 3;

							transactionObject = JSON.parse(transactionInput);
							_context.next = 10;
							break;

						case 7:
							_context.prev = 7;
							_context.t0 = _context['catch'](3);
							throw new _error.ValidationError('Could not parse transaction JSON. Did you use the `--json` option?');

						case 10:
							return _context.abrupt('return', shouldUseStdIn && transactionObject.error ? transactionObject : (0, _api2.default)().transactions.broadcast(transactionObject));

						case 11:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined, [[3, 7]]);
		}));

		return function (_x) {
			return _ref3.apply(this, arguments);
		};
	}();
};

var broadcastTransaction = (0, _helpers.createCommand)({
	command: 'broadcast transaction [transaction]',
	description: description,
	actionCreator: actionCreator,
	errorPrefix: 'Could not broadcast transaction'
});

exports.default = broadcastTransaction;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _transactions = require('../utils/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

var _error = require('../utils/error');

var _helpers = require('../utils/helpers');

var _input = require('../utils/input');

var _utils = require('../utils/input/utils');

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


var description = 'Verifies a transaction has a valid signature.\n\n\tExamples:\n\t- verify transaction \'{"type":0,"amount":"100",...}\'\n\t- verify transaction \'{"type":0,"amount":"100",...}\' --second-public-key 647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9ef6\n\t- create transaction transfer 100 123L --json | verify transaction\n';

var secondPublicKeyDescription = 'Specifies a source for providing a second public key to the command. The second public key must be provided via this option. Sources must be one of `file` or `stdin`. In the case of `file`, a corresponding identifier must also be provided.\n\n\tNote: if both transaction and second public key are passed via stdin, the transaction must be the first line.\n\n\tExamples:\n\t- --second-public-key file:/path/to/my/message.txt\n\t- --second-public-key 790049f919979d5ea42cca7b7aa0812cbae8f0db3ee39c1fe3cef18e25b67951\n';

var getTransactionInput = function getTransactionInput(_ref) {
	var transaction = _ref.transaction,
	    stdin = _ref.stdin;

	var hasStdIn = stdin && stdin[0];
	if (!transaction && !hasStdIn) {
		return null;
	}
	return transaction || stdin[0];
};

var processSecondPublicKey = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(secondPublicKey) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						return _context.abrupt('return', secondPublicKey.includes(':') ? (0, _utils.getData)(secondPublicKey) : secondPublicKey);

					case 1:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function processSecondPublicKey(_x) {
		return _ref2.apply(this, arguments);
	};
}();

var getStdInForNonInteractiveMode = function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
		var stdin;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!process.env.NON_INTERACTIVE_MODE) {
							_context2.next = 5;
							break;
						}

						_context2.next = 3;
						return (0, _utils.getStdIn)({ dataIsRequired: true });

					case 3:
						stdin = _context2.sent;
						return _context2.abrupt('return', (0, _input.getFirstLineFromString)(stdin.data));

					case 5:
						return _context2.abrupt('return', null);

					case 6:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function getStdInForNonInteractiveMode() {
		return _ref3.apply(this, arguments);
	};
}();

var actionCreator = exports.actionCreator = function actionCreator() {
	return function () {
		var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
			var transaction = _ref4.transaction,
			    stdin = _ref4.stdin,
			    _ref4$options = _ref4.options,
			    options = _ref4$options === undefined ? {} : _ref4$options;
			var transactionSource, transactionInput, transactionObject, secondPublicKey, verified;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							transactionSource = getTransactionInput({
								transaction: transaction,
								stdin: stdin
							});
							_context3.t0 = transactionSource;

							if (_context3.t0) {
								_context3.next = 6;
								break;
							}

							_context3.next = 5;
							return getStdInForNonInteractiveMode();

						case 5:
							_context3.t0 = _context3.sent;

						case 6:
							transactionInput = _context3.t0;

							if (transactionInput) {
								_context3.next = 9;
								break;
							}

							throw new _error.ValidationError('No transaction was provided.');

						case 9:
							transactionObject = void 0;
							_context3.prev = 10;

							transactionObject = JSON.parse(transactionInput);
							_context3.next = 17;
							break;

						case 14:
							_context3.prev = 14;
							_context3.t1 = _context3['catch'](10);
							throw new _error.ValidationError('Could not parse transaction JSON.');

						case 17:
							if (!options['second-public-key']) {
								_context3.next = 23;
								break;
							}

							_context3.next = 20;
							return processSecondPublicKey(options['second-public-key']);

						case 20:
							_context3.t2 = _context3.sent;
							_context3.next = 24;
							break;

						case 23:
							_context3.t2 = null;

						case 24:
							secondPublicKey = _context3.t2;
							verified = _transactions2.default.utils.verifyTransaction(transactionObject, secondPublicKey);
							return _context3.abrupt('return', {
								verified: verified
							});

						case 27:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined, [[10, 14]]);
		}));

		return function (_x2) {
			return _ref5.apply(this, arguments);
		};
	}();
};

var verifyTransaction = (0, _helpers.createCommand)({
	command: 'verify transaction [transaction]',
	description: description,
	actionCreator: actionCreator,
	options: [['--second-public-key <source>', secondPublicKeyDescription]],
	errorPrefix: 'Could not verify transaction'
});

exports.default = verifyTransaction;
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

var _input2 = _interopRequireDefault(_input);

var _utils = require('../utils/input/utils');

var _options = require('../utils/options');

var _options2 = _interopRequireDefault(_options);

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


var description = 'Sign a transaction using your secret passphrase.\n\n\tExample: sign transaction \'{"amount":"100","recipientId":"13356260975429434553L","senderPublicKey":null,"timestamp":52871598,"type":0,"fee":"10000000","recipientPublicKey":null,"asset":{}}\'\n';

var getTransactionInput = function getTransactionInput(_ref) {
	var transaction = _ref.transaction,
	    stdin = _ref.stdin;

	var hasStdIn = stdin && stdin[0];
	if (!transaction && !hasStdIn) {
		return null;
	}
	return transaction || stdin[0];
};

var getStdInForNonInteractiveMode = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var stdin;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!process.env.NON_INTERACTIVE_MODE) {
							_context.next = 5;
							break;
						}

						_context.next = 3;
						return (0, _utils.getStdIn)({ dataIsRequired: true });

					case 3:
						stdin = _context.sent;
						return _context.abrupt('return', stdin.data);

					case 5:
						return _context.abrupt('return', null);

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function getStdInForNonInteractiveMode() {
		return _ref2.apply(this, arguments);
	};
}();

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
			var transaction = _ref3.transaction,
			    stdin = _ref3.stdin,
			    _ref3$options = _ref3.options,
			    options = _ref3$options === undefined ? {} : _ref3$options;

			var passphraseSource, secondPassphraseSource, transactionSource, transactionInput, transactionObject, _ref5, passphrase, secondPassphrase;

			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							passphraseSource = options.passphrase, secondPassphraseSource = options['second-passphrase'];
							transactionSource = getTransactionInput({
								transaction: transaction,
								stdin: stdin
							});
							_context2.t0 = transactionSource;

							if (_context2.t0) {
								_context2.next = 7;
								break;
							}

							_context2.next = 6;
							return getStdInForNonInteractiveMode();

						case 6:
							_context2.t0 = _context2.sent;

						case 7:
							transactionInput = _context2.t0;

							if (transactionInput) {
								_context2.next = 10;
								break;
							}

							throw new _error.ValidationError('No transaction was provided.');

						case 10:
							transactionObject = void 0;
							_context2.prev = 11;

							transactionObject = JSON.parse(transactionInput);
							_context2.next = 18;
							break;

						case 15:
							_context2.prev = 15;
							_context2.t1 = _context2['catch'](11);
							throw new _error.ValidationError('Could not parse transaction JSON.');

						case 18:
							if (!transactionObject.error) {
								_context2.next = 20;
								break;
							}

							throw new Error(transactionObject.error);

						case 20:
							_context2.next = 22;
							return (0, _input2.default)(vorpal, {
								passphrase: {
									source: passphraseSource,
									repeatPrompt: true
								},
								secondPassphrase: !secondPassphraseSource ? null : {
									source: secondPassphraseSource,
									repeatPrompt: true
								}
							});

						case 22:
							_ref5 = _context2.sent;
							passphrase = _ref5.passphrase;
							secondPassphrase = _ref5.secondPassphrase;
							return _context2.abrupt('return', _transactions2.default.utils.prepareTransaction(transactionObject, passphrase, secondPassphrase));

						case 26:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined, [[11, 15]]);
		}));

		return function (_x) {
			return _ref4.apply(this, arguments);
		};
	}();
};

var signTransaction = (0, _helpers.createCommand)({
	command: 'sign transaction [transaction]',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.passphrase, _options2.default.secondPassphrase],
	errorPrefix: 'Could not sign transaction'
});

exports.default = signTransaction;
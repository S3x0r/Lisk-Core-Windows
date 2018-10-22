'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _input = require('../utils/input');

var _input2 = _interopRequireDefault(_input);

var _helpers = require('../utils/helpers');

var _options = require('../utils/options');

var _options2 = _interopRequireDefault(_options);

var _transactions = require('../utils/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

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


var description = 'Creates a transaction which will transfer the specified amount to an address if broadcast to the network.\n\n\tExamples:\n\t- create transaction transfer 100 13356260975429434553L\n\t- create transaction 0 100 13356260975429434553L\n';

var processInputs = function processInputs(amount, address) {
	return function (_ref) {
		var passphrase = _ref.passphrase,
		    secondPassphrase = _ref.secondPassphrase;
		return _transactions2.default.transfer({
			recipientId: address,
			amount: amount,
			passphrase: passphrase,
			secondPassphrase: secondPassphrase
		});
	};
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var amount = _ref2.amount,
			    address = _ref2.address,
			    options = _ref2.options;
			var passphraseSource, secondPassphraseSource, signature, normalizedAmount, processFunction;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							passphraseSource = options.passphrase, secondPassphraseSource = options['second-passphrase'], signature = options.signature;


							(0, _helpers.validateAddress)(address);
							normalizedAmount = (0, _helpers.normalizeAmount)(amount);
							processFunction = processInputs(normalizedAmount, address);
							return _context.abrupt('return', signature === false ? processFunction({
								passphrase: null,
								secondPassphrase: null
							}) : (0, _input2.default)(vorpal, {
								passphrase: {
									source: passphraseSource,
									repeatPrompt: true
								},
								secondPassphrase: !secondPassphraseSource ? null : {
									source: secondPassphraseSource,
									repeatPrompt: true
								}
							}).then(processFunction));

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x) {
			return _ref3.apply(this, arguments);
		};
	}();
};

var createTransactionTransfer = (0, _helpers.createCommand)({
	command: 'create transaction transfer <amount> <address>',
	alias: 'create transaction 0',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.noSignature, _options2.default.passphrase, _options2.default.secondPassphrase],
	errorPrefix: 'Could not create "transfer" transaction'
});

exports.default = createTransactionTransfer;
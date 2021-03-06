'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = exports.processInputs = undefined;

var _helpers = require('../utils/helpers');

var _input = require('../utils/input');

var _input2 = _interopRequireDefault(_input);

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


var description = 'Creates a transaction which will register a second passphrase for the account if broadcast to the network.\n\n\tExamples:\n\t- create transaction register second passphrase\n\t- create transaction 1\n';

var processInputs = exports.processInputs = function processInputs() {
	return function (_ref) {
		var passphrase = _ref.passphrase,
		    secondPassphrase = _ref.secondPassphrase;
		return _transactions2.default.registerSecondPassphrase({
			passphrase: passphrase,
			secondPassphrase: secondPassphrase
		});
	};
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var options = _ref2.options;
			var passphraseSource, secondPassphraseSource, signature, processFunction;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							passphraseSource = options.passphrase, secondPassphraseSource = options['second-passphrase'], signature = options.signature;
							processFunction = processInputs();
							return _context.abrupt('return', signature === false ? (0, _input2.default)(vorpal, {
								passphrase: null,
								secondPassphrase: {
									source: secondPassphraseSource,
									repeatPrompt: true
								}
							}).then(processFunction) : (0, _input2.default)(vorpal, {
								passphrase: {
									source: passphraseSource,
									repeatPrompt: true
								},
								secondPassphrase: {
									source: secondPassphraseSource,
									repeatPrompt: true
								}
							}).then(processFunction));

						case 3:
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

var createTransactionRegisterSecondPassphrase = (0, _helpers.createCommand)({
	command: 'create transaction register second passphrase',
	alias: 'create transaction 1',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.noSignature, _options2.default.passphrase, _options2.default.secondPassphrase],
	errorPrefix: 'Could not create "register second passphrase" transaction'
});

exports.default = createTransactionRegisterSecondPassphrase;
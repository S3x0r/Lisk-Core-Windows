'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

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


var description = 'Creates a transaction which will register the account as a multisignature account if broadcast to the network, using the following parameters:\n\t- The lifetime (the number of hours in which the transaction can be signed after being created).\n\t- The minimum number of distinct signatures required for a transaction to be successfully approved from the multisignature account.\n\t- A list of one or more public keys that will identify the multisignature group.\n\n\tExamples:\n\t- create transaction register multisignature account 24 2 215b667a32a5cd51a94c9c2046c11fffb08c65748febec099451e3b164452bca 922fbfdd596fa78269bbcadc67ec2a1cc15fc929a19c462169568d7a3df1a1aa\n\t- create transaction 4 24 2 215b667a32a5cd51a94c9c2046c11fffb08c65748febec099451e3b164452bca 922fbfdd596fa78269bbcadc67ec2a1cc15fc929a19c462169568d7a3df1a1aa\n';

var processInputs = function processInputs(lifetime, minimum, keysgroup) {
	return function (_ref) {
		var passphrase = _ref.passphrase,
		    secondPassphrase = _ref.secondPassphrase;
		return _transactions2.default.registerMultisignature({
			passphrase: passphrase,
			secondPassphrase: secondPassphrase,
			keysgroup: keysgroup,
			lifetime: lifetime,
			minimum: minimum
		});
	};
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var lifetime = _ref2.lifetime,
			    minimum = _ref2.minimum,
			    keysgroup = _ref2.keysgroup,
			    options = _ref2.options;
			var passphraseSource, secondPassphraseSource, signature, publicKeys, transactionLifetime, transactionMinimumConfirmations, processFunction;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							passphraseSource = options.passphrase, secondPassphraseSource = options['second-passphrase'], signature = options.signature;
							publicKeys = (0, _helpers.validatePublicKeys)(keysgroup);


							(0, _helpers.validateLifetime)(lifetime);
							(0, _helpers.validateMinimum)(minimum);

							transactionLifetime = parseInt(lifetime, 10);
							transactionMinimumConfirmations = parseInt(minimum, 10);
							processFunction = processInputs(transactionLifetime, transactionMinimumConfirmations, publicKeys);
							return _context.abrupt('return', signature === false ? processFunction({ passphrase: null, secondPassphrase: null }) : (0, _input2.default)(vorpal, {
								passphrase: {
									source: passphraseSource,
									repeatPrompt: true
								},
								secondPassphrase: !secondPassphraseSource ? null : {
									source: secondPassphraseSource,
									repeatPrompt: true
								}
							}).then(processFunction));

						case 8:
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

var createTransactionRegisterMultisignatureAccount = (0, _helpers.createCommand)({
	command: 'create transaction register multisignature account <lifetime> <minimum> <keysgroup...>',
	alias: 'create transaction 4',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.noSignature, _options2.default.passphrase, _options2.default.secondPassphrase],
	errorPrefix: 'Could not create "register multisignature account" transaction'
});

exports.default = createTransactionRegisterMultisignatureAccount;
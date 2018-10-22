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

var _cryptography = require('../utils/cryptography');

var _cryptography2 = _interopRequireDefault(_cryptography);

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


var description = 'Shows account information for a given passphrase.\n\n\tExample: show account\n';

var processInput = function processInput(_ref) {
	var passphrase = _ref.passphrase;

	var _cryptography$getKeys = _cryptography2.default.getKeys(passphrase),
	    privateKey = _cryptography$getKeys.privateKey,
	    publicKey = _cryptography$getKeys.publicKey;

	var _cryptography$getAddr = _cryptography2.default.getAddressFromPublicKey(publicKey),
	    address = _cryptography$getAddr.address;

	return {
		privateKey: privateKey,
		publicKey: publicKey,
		address: address
	};
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var options = _ref2.options;
			var passphraseSource;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							passphraseSource = options.passphrase;
							return _context.abrupt('return', (0, _input2.default)(vorpal, {
								passphrase: {
									source: passphraseSource,
									repeatPrompt: true
								}
							}).then(processInput));

						case 2:
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

var showAccount = (0, _helpers.createCommand)({
	command: 'show account',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.passphrase],
	errorPrefix: 'Could not show account'
});

exports.default = showAccount;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _cryptography = require('../utils/cryptography');

var _cryptography2 = _interopRequireDefault(_cryptography);

var _error = require('../utils/error');

var _helpers = require('../utils/helpers');

var _input = require('../utils/input');

var _input2 = _interopRequireDefault(_input);

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


var description = 'Decrypts your secret passphrase using a password using the initialisation vector (IV) which was provided at the time of encryption.\n\n\tExample: decrypt passphrase salt=25606e160df4ababae0a0bd656310d7f&cipherText=4f513208f47dc539f7&iv=a048b9c1176b561a2f884f19&tag=2ef4db8d5e03c326fc26c0a8aa7adb69&version=1\n';

var passphraseOptionDescription = 'Specifies a source for providing an encrypted passphrase to the command. If a string is provided directly as an argument, this option will be ignored. The encrypted passphrase must be provided via an argument or via this option. Sources must be one of `file` or `stdin`. In the case of `file`, a corresponding identifier must also be provided.\n\n\tNote: if both an encrypted passphrase and the password are passed via stdin, the password must be the first line.\n\n\tExamples:\n\t\t- --passphrase file:/path/to/my/encrypted_passphrase.txt (takes the first line only)\n\t\t- --passphrase stdin (takes the first line only)\n';

var processInputs = function processInputs(encryptedPassphrase) {
	return function (_ref) {
		var password = _ref.password,
		    data = _ref.data;
		return _cryptography2.default.decryptPassphrase({
			encryptedPassphrase: encryptedPassphrase || (0, _input.getFirstLineFromString)(data),
			password: password
		});
	};
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var encryptedPassphrase = _ref2.encryptedPassphrase,
			    options = _ref2.options;
			var passphraseSource, passwordSource;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							passphraseSource = options.passphrase;
							passwordSource = options.password;

							if (!(!encryptedPassphrase && !passphraseSource)) {
								_context.next = 4;
								break;
							}

							throw new _error.ValidationError('No encrypted passphrase was provided.');

						case 4:
							return _context.abrupt('return', (0, _input2.default)(vorpal, {
								password: {
									source: passwordSource
								},
								data: encryptedPassphrase ? null : {
									source: passphraseSource
								}
							}).then(processInputs(encryptedPassphrase)));

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

var decryptPassphrase = (0, _helpers.createCommand)({
	command: 'decrypt passphrase [encryptedPassphrase]',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.password, [_options2.default.passphrase[0], passphraseOptionDescription]],
	errorPrefix: 'Could not decrypt passphrase'
});

exports.default = decryptPassphrase;
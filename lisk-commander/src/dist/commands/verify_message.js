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


var description = 'Verify a message using the public key, the signature and the message.\n\n\tExample: verify message 647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9ef6 2a3ca127efcf7b2bf62ac8c3b1f5acf6997cab62ba9fde3567d188edcbacbc5dc8177fb88d03a8691ce03348f569b121bca9e7a3c43bf5c056382f35ff843c09 \'Hello world\'\n';

var processInputs = function processInputs(publicKey, signature, message) {
	return function (_ref) {
		var data = _ref.data;
		return _cryptography2.default.verifyMessage({
			publicKey: publicKey,
			signature: signature,
			message: message || data
		});
	};
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
			var publicKey = _ref2.publicKey,
			    signature = _ref2.signature,
			    message = _ref2.message,
			    options = _ref2.options;
			var messageSource;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							messageSource = options.message;

							if (publicKey) {
								_context.next = 3;
								break;
							}

							throw new _error.ValidationError('No public key was provided.');

						case 3:
							if (signature) {
								_context.next = 5;
								break;
							}

							throw new _error.ValidationError('No signature was provided.');

						case 5:
							if (!(!message && !messageSource)) {
								_context.next = 7;
								break;
							}

							throw new _error.ValidationError('No message was provided.');

						case 7:
							return _context.abrupt('return', (0, _input2.default)(vorpal, {
								data: message ? null : { source: messageSource }
							}).then(processInputs(publicKey, signature, message)));

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

var verifyMessage = (0, _helpers.createCommand)({
	command: 'verify message <publicKey> <signature> [message]',
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.message],
	errorPrefix: 'Could not verify message'
});

exports.default = verifyMessage;
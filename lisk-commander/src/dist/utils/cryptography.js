'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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


var _liskElements = require('lisk-elements');

var _liskElements2 = _interopRequireDefault(_liskElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wrapFunction = function wrapFunction(fn) {
	return function wrappedFunction() {
		try {
			return fn.apply(undefined, arguments);
		} catch (_ref) {
			var error = _ref.message;

			return { error: error };
		}
	};
};

var Crypto = function () {
	function Crypto() {
		var _this = this;

		_classCallCheck(this, Crypto);

		this.liskCrypto = _liskElements2.default.cryptography;

		['encryptMessage', 'decryptMessage', 'encryptPassphrase', 'decryptPassphrase', 'getKeys', 'getAddressFromPublicKey', 'signMessage', 'verifyMessage'].forEach(function (methodName) {
			_this[methodName] = wrapFunction(_this[methodName].bind(_this));
		});
	}

	_createClass(Crypto, [{
		key: 'encryptMessage',
		value: function encryptMessage(_ref2) {
			var message = _ref2.message,
			    passphrase = _ref2.passphrase,
			    recipient = _ref2.recipient;

			return this.liskCrypto.encryptMessageWithPassphrase(message, passphrase, recipient);
		}
	}, {
		key: 'decryptMessage',
		value: function decryptMessage(_ref3) {
			var cipher = _ref3.cipher,
			    nonce = _ref3.nonce,
			    passphrase = _ref3.passphrase,
			    senderPublicKey = _ref3.senderPublicKey;

			return {
				message: this.liskCrypto.decryptMessageWithPassphrase(cipher, nonce, passphrase, senderPublicKey)
			};
		}
	}, {
		key: 'encryptPassphrase',
		value: function encryptPassphrase(_ref4) {
			var passphrase = _ref4.passphrase,
			    password = _ref4.password;

			var encryptedPassphraseObject = this.liskCrypto.encryptPassphraseWithPassword(passphrase, password);
			var encryptedPassphrase = this.liskCrypto.stringifyEncryptedPassphrase(encryptedPassphraseObject);
			return { encryptedPassphrase: encryptedPassphrase };
		}
	}, {
		key: 'decryptPassphrase',
		value: function decryptPassphrase(_ref5) {
			var encryptedPassphrase = _ref5.encryptedPassphrase,
			    password = _ref5.password;

			var encryptedPassphraseObject = this.liskCrypto.parseEncryptedPassphrase(encryptedPassphrase);
			var passphrase = this.liskCrypto.decryptPassphraseWithPassword(encryptedPassphraseObject, password);
			return { passphrase: passphrase };
		}
	}, {
		key: 'getKeys',
		value: function getKeys(passphrase) {
			return this.liskCrypto.getKeys(passphrase);
		}
	}, {
		key: 'getAddressFromPublicKey',
		value: function getAddressFromPublicKey(publicKey) {
			return {
				address: this.liskCrypto.getAddressFromPublicKey(publicKey)
			};
		}
	}, {
		key: 'signMessage',
		value: function signMessage(_ref6) {
			var message = _ref6.message,
			    passphrase = _ref6.passphrase;

			return this.liskCrypto.signMessageWithPassphrase(message, passphrase);
		}
	}, {
		key: 'verifyMessage',
		value: function verifyMessage(_ref7) {
			var publicKey = _ref7.publicKey,
			    signature = _ref7.signature,
			    message = _ref7.message;

			return {
				verified: this.liskCrypto.verifyMessageWithPublicKey({
					publicKey: publicKey,
					signature: signature,
					message: message
				})
			};
		}
	}]);

	return Crypto;
}();

exports.default = new Crypto();
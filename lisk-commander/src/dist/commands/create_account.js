'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionCreator = undefined;

var _cryptography = require('../utils/cryptography');

var _cryptography2 = _interopRequireDefault(_cryptography);

var _helpers = require('../utils/helpers');

var _mnemonic = require('../utils/mnemonic');

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


var description = 'Returns a randomly-generated mnemonic passphrase with its corresponding public key and address.\n\n\tExample: create account\n';

var actionCreator = exports.actionCreator = function actionCreator() {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var passphrase, _cryptography$getKeys, privateKey, publicKey, _cryptography$getAddr, address;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            passphrase = (0, _mnemonic.createMnemonicPassphrase)();
            _cryptography$getKeys = _cryptography2.default.getKeys(passphrase), privateKey = _cryptography$getKeys.privateKey, publicKey = _cryptography$getKeys.publicKey;
            _cryptography$getAddr = _cryptography2.default.getAddressFromPublicKey(publicKey), address = _cryptography$getAddr.address;
            return _context.abrupt('return', {
              passphrase: passphrase,
              privateKey: privateKey,
              publicKey: publicKey,
              address: address
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var createAccount = (0, _helpers.createCommand)({
  command: 'create account',
  description: description,
  actionCreator: actionCreator,
  errorPrefix: 'Could not create account'
});

exports.default = createAccount;
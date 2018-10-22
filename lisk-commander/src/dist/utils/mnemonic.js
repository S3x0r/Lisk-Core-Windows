'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidMnemonicPassphrase = exports.createMnemonicPassphrase = undefined;

var _bip = require('bip39');

var _bip2 = _interopRequireDefault(_bip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMnemonicPassphrase = exports.createMnemonicPassphrase = _bip2.default.generateMnemonic; /*
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
var isValidMnemonicPassphrase = exports.isValidMnemonicPassphrase = _bip2.default.validateMnemonic;
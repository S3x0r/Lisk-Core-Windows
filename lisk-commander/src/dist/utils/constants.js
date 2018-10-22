'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NETHASHES = exports.API_PROTOCOLS = exports.CONFIG_VARIABLES = exports.QUERY_INPUT_MAP = exports.PLURALS = exports.COMMAND_TYPES = undefined;

var _liskElements = require('lisk-elements');

var _liskElements2 = _interopRequireDefault(_liskElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constants = _liskElements2.default.constants; /*
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

var COMMAND_TYPES = exports.COMMAND_TYPES = ['accounts', 'addresses', 'blocks', 'delegates', 'transactions'];

var PLURALS = exports.PLURALS = {
	account: 'accounts',
	address: 'addresses',
	block: 'blocks',
	delegate: 'delegates',
	transaction: 'transactions'
};

var QUERY_INPUT_MAP = exports.QUERY_INPUT_MAP = {
	accounts: 'address',
	blocks: 'blockId',
	delegates: 'username',
	transactions: 'id'
};

var CONFIG_VARIABLES = exports.CONFIG_VARIABLES = ['api.nodes', 'api.network', 'json', 'name', 'pretty'];

var API_PROTOCOLS = exports.API_PROTOCOLS = ['http:', 'https:'];

var NETHASHES = exports.NETHASHES = {
	main: constants.MAINNET_NETHASH,
	test: constants.TESTNET_NETHASH,
	beta: constants.BETANET_NETHASH
};
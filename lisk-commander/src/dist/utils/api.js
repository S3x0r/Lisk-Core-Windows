'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _liskElements = require('lisk-elements');

var _liskElements2 = _interopRequireDefault(_liskElements);

var _config = require('./config');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APIClient = _liskElements2.default.APIClient; /*
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

var seedNodes = {
  main: APIClient.constants.MAINNET_NODES,
  test: APIClient.constants.TESTNET_NODES,
  beta: APIClient.constants.BETANET_NODES
};

var getAPIClient = function getAPIClient() {
  var _getConfig = (0, _config.getConfig)(),
      _getConfig$api = _getConfig.api,
      nodes = _getConfig$api.nodes,
      network = _getConfig$api.network;

  var nethash = _constants.NETHASHES[network] || network;
  var clientNodes = nodes && nodes.length > 0 ? nodes : seedNodes[network];
  return new APIClient(clientNodes, { nethash: nethash });
};

exports.default = getAPIClient;
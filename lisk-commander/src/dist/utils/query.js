'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (endpoint, parameters) {
	return (
		// prettier-ignore
		(0, _api2.default)()[endpoint].get(parameters).then(function (res) {
			if (res.data) {
				if (Array.isArray(res.data)) {
					if (res.data.length === 0) {
						throw new Error('No ' + endpoint + ' found using specified parameters.');
					}
					return res.data[0];
				}
				return res.data;
			}
			// Get endpoints with 2xx status code should always return with data key.
			throw new Error('No data was returned.');
		})
	);
}; /*
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
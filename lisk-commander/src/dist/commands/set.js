'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _liskElements = require('lisk-elements');

var _liskElements2 = _interopRequireDefault(_liskElements);

var _constants = require('../utils/constants');

var _config = require('../utils/config');

var _error = require('../utils/error');

var _helpers = require('../utils/helpers');

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


var availableVariables = _constants.CONFIG_VARIABLES.join(', ');
var description = 'Sets configuration <variable> to [value(s)...]. Variables available: ' + availableVariables + '. Configuration is persisted in `' + (0, _config.configFilePath)() + '`.\n\n\tExamples:\n\t- set json true\n\t- set name my_custom_lisk_cli\n\t- set api.network main\n\t- set api.nodes https://127.0.0.1:4000,http://mynode.com:7000\n';

var WRITE_FAIL_WARNING = 'Config file could not be written: your changes will not be persisted.';

var NETHASH_ERROR_MESSAGE = 'Value must be a hex string with 64 characters, or one of main, test or beta.';

var URL_ERROR_MESSAGE = 'Node URLs must include a supported protocol (' + _constants.API_PROTOCOLS.map(function (protocol) {
	return protocol.replace(':', '');
}).join(', ') + ') and a hostname. E.g. https://127.0.0.1:4000 or http://localhost.';

var checkBoolean = function checkBoolean(value) {
	return ['true', 'false'].includes(value);
};

var setNestedConfigProperty = function setNestedConfigProperty(config, path, value) {
	var dotNotationArray = path.split('.');
	dotNotationArray.reduce(function (obj, pathComponent, i) {
		if (i === dotNotationArray.length - 1) {
			if (obj === undefined) {
				throw new _error.ValidationError('Config file could not be written: property \'' + dotNotationArray.join('.') + '\' was not found. It looks like your configuration file is corrupted. Please check the file at ' + (0, _config.configFilePath)() + ' or remove it (a fresh default configuration file will be created when you run Lisk Commander again).');
			}
			// eslint-disable-next-line no-param-reassign
			obj[pathComponent] = value;
			return config;
		}
		return obj[pathComponent];
	}, config);
};

var attemptWriteToFile = function attemptWriteToFile(newConfig, value, dotNotation) {
	var writeSuccess = (0, _config.setConfig)(newConfig);

	if (!writeSuccess && process.env.NON_INTERACTIVE_MODE === 'true') {
		throw new _error.FileSystemError(WRITE_FAIL_WARNING);
	}

	var message = value === '' || Array.isArray(value) && value.length === 0 ? 'Successfully reset ' + dotNotation + '.' : 'Successfully set ' + dotNotation + ' to ' + value + '.';

	var result = {
		message: message
	};

	if (!writeSuccess) {
		result.warning = WRITE_FAIL_WARNING;
	}

	return result;
};

var setValue = function setValue(dotNotation, value) {
	var config = (0, _config.getConfig)();
	setNestedConfigProperty(config, dotNotation, value);
	return attemptWriteToFile(config, value, dotNotation);
};

var setBoolean = function setBoolean(dotNotation, value) {
	if (!checkBoolean(value)) {
		throw new _error.ValidationError('Value must be a boolean.');
	}
	var newValue = value === 'true';
	return setValue(dotNotation, newValue);
};

var setArrayURL = function setArrayURL(dotNotation, value, inputs) {
	inputs.forEach(function (input) {
		var _url$parse = _url2.default.parse(input),
		    protocol = _url$parse.protocol,
		    hostname = _url$parse.hostname;

		if (!_constants.API_PROTOCOLS.includes(protocol) || !hostname) {
			throw new _error.ValidationError(URL_ERROR_MESSAGE);
		}
	});
	return setValue(dotNotation, inputs);
};

var setNethash = function setNethash(dotNotation, value) {
	if (dotNotation === 'api.network' && !Object.keys(_constants.NETHASHES).includes(value)) {
		if (value.length !== 64) {
			throw new _error.ValidationError(NETHASH_ERROR_MESSAGE);
		}
		try {
			_liskElements2.default.cryptography.hexToBuffer(value, 'utf8');
		} catch (error) {
			throw new _error.ValidationError(NETHASH_ERROR_MESSAGE);
		}
	}
	return setValue(dotNotation, value);
};

var handlers = {
	'api.nodes': setArrayURL,
	'api.network': setNethash,
	json: setBoolean,
	name: setValue,
	pretty: setBoolean
};

var actionCreator = exports.actionCreator = function actionCreator() {
	return function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
			var variable = _ref.variable,
			    values = _ref.values;
			var safeValues, safeValue;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (_constants.CONFIG_VARIABLES.includes(variable)) {
								_context.next = 2;
								break;
							}

							throw new _error.ValidationError('Unsupported variable name.');

						case 2:
							safeValues = values || [];
							safeValue = safeValues[0] || '';
							return _context.abrupt('return', handlers[variable](variable, safeValue, safeValues));

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x) {
			return _ref2.apply(this, arguments);
		};
	}();
};

var set = (0, _helpers.createCommand)({
	command: 'set <variable> [values...]',
	autocomplete: _constants.CONFIG_VARIABLES,
	description: description,
	actionCreator: actionCreator,
	errorPrefix: 'Could not set config variable'
});

exports.default = set;
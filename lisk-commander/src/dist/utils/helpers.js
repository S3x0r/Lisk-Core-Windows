'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createCommand = exports.wrapActionCreator = exports.prepareOptions = exports.createErrorHandler = exports.shouldUsePrettyOutput = exports.shouldUseJSONOutput = exports.deAlias = exports.normalizeAmount = exports.validateAmount = exports.validateAddress = exports.validateMinimum = exports.validateLifetime = exports.validatePublicKeys = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
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


var _error = require('../utils/error');

var _options = require('../utils/options');

var _options2 = _interopRequireDefault(_options);

var _print = require('../utils/print');

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var validatePublicKeys = exports.validatePublicKeys = function validatePublicKeys(publicKeys) {
	return publicKeys.map(function (publicKey) {
		try {
			Buffer.from(publicKey, 'hex');
		} catch (error) {
			throw new _error.ValidationError('Error processing public key ' + publicKey + ': ' + error.message + '.');
		}
		if (publicKey.length !== 64) {
			throw new _error.ValidationError('Public key ' + publicKey + ' length differs from the expected 64 hex characters for a public key.');
		}

		if (Buffer.from(publicKey, 'hex').length !== 32) {
			throw new _error.ValidationError('Public key ' + publicKey + ' bytes length differs from the expected 32 bytes for a public key.');
		}
		return publicKey;
	});
};

var regExpAddress = /^\d{1,21}[L|l]$/;
var regExpAmount = /^\d+(\.\d{1,8})?$/;
var DECIMAL_PLACES = 8;

var isStringInteger = function isStringInteger(n) {
	var parsed = parseInt(n, 10);
	return !Number.isNaN(parsed) && parsed.toString() === n;
};

var validateLifetime = exports.validateLifetime = function validateLifetime(lifetime) {
	if (!isStringInteger(lifetime)) {
		throw new _error.ValidationError('Lifetime must be an integer.');
	}
	return true;
};

var validateMinimum = exports.validateMinimum = function validateMinimum(minimum) {
	if (!isStringInteger(minimum)) {
		throw new _error.ValidationError('Minimum number of signatures must be an integer.');
	}
	return true;
};

var validateAddress = exports.validateAddress = function validateAddress(address) {
	if (!address.match(regExpAddress)) {
		throw new _error.ValidationError(address + ' is not a valid address.');
	}
	return true;
};

var validateAmount = exports.validateAmount = function validateAmount(amount) {
	if (!amount.match(regExpAmount)) {
		throw new _error.ValidationError('Amount must be a number with no more than 8 decimal places.');
	}
	return true;
};

var normalizeAmount = exports.normalizeAmount = function normalizeAmount(amount) {
	validateAmount(amount);

	var _amount$split = amount.split('.'),
	    _amount$split2 = _slicedToArray(_amount$split, 2),
	    preString = _amount$split2[0],
	    _amount$split2$ = _amount$split2[1],
	    postString = _amount$split2$ === undefined ? '' : _amount$split2$;

	var _map = [preString, postString].map(function (n) {
		return Array.from(n);
	}),
	    _map2 = _slicedToArray(_map, 2),
	    preArray = _map2[0],
	    postArray = _map2[1];

	var pad = new Array(DECIMAL_PLACES - postArray.length).fill('0');
	var combinedArray = [].concat(_toConsumableArray(preArray), _toConsumableArray(postArray), _toConsumableArray(pad));
	var combinedString = combinedArray.join('');
	var trimmed = combinedString.replace(/^0+/, '') || '0';
	return trimmed;
};

var deAlias = exports.deAlias = function deAlias(type) {
	return type === 'addresses' ? 'accounts' : type;
};

var shouldUseJSONOutput = exports.shouldUseJSONOutput = function shouldUseJSONOutput() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (!!options.json === options.json) return options.json;
	if (!!options.table === options.table) return !options.table;
	return !!config.json;
};

var shouldUsePrettyOutput = exports.shouldUsePrettyOutput = function shouldUsePrettyOutput(config, options) {
	return (options.pretty === true || config.pretty === true) && options.pretty !== false;
};

var createErrorHandler = exports.createErrorHandler = function createErrorHandler(prefix) {
	return function (_ref) {
		var message = _ref.message;
		return {
			error: prefix + ': ' + message
		};
	};
};

var validateOutputFormatOptions = function validateOutputFormatOptions(options) {
	if (options.json && options.table) {
		throw new _error.ValidationError('Cannot output both JSON and table.');
	}
	if (options.json === false && options.table === false) {
		throw new _error.ValidationError('Must output either JSON or table.');
	}
	return true;
};

var prepareOptions = exports.prepareOptions = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						return _context.abrupt('return', new Promise(function (resolve, reject) {
							try {
								validateOutputFormatOptions(options);
								resolve(options);
							} catch (error) {
								// eslint-disable-next-line no-param-reassign
								delete options.json;
								// eslint-disable-next-line no-param-reassign
								delete options.table;
								reject(error);
							}
						}));

					case 1:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function prepareOptions(_x3) {
		return _ref2.apply(this, arguments);
	};
}();

var wrapActionCreator = exports.wrapActionCreator = function wrapActionCreator(vorpal, actionCreator, errorPrefix) {
	return function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parameters) {
			var _this = this;

			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							return _context2.abrupt('return', prepareOptions(parameters.options).then(function () {
								return actionCreator(vorpal).call(_this, parameters);
							}).catch(createErrorHandler(errorPrefix)).then((0, _print2.default)(vorpal, parameters.options).bind(this)));

						case 1:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		function wrappedActionCreator(_x4) {
			return _ref3.apply(this, arguments);
		}

		return wrappedActionCreator;
	}();
};

var OPTION_TYPES = {
	string: ['message', 'passphrase', 'password', 'second-passphrase', 'unvotes', 'votes']
};

var createCommand = exports.createCommand = function createCommand(_ref4) {
	var command = _ref4.command,
	    autocomplete = _ref4.autocomplete,
	    description = _ref4.description,
	    alias = _ref4.alias,
	    actionCreator = _ref4.actionCreator,
	    _ref4$options = _ref4.options,
	    options = _ref4$options === undefined ? [] : _ref4$options,
	    errorPrefix = _ref4.errorPrefix;
	return function createdCommand(vorpal) {
		var action = wrapActionCreator(vorpal, actionCreator, errorPrefix);
		var commandInstance = vorpal.command(command).autocomplete(autocomplete).description(description).types(OPTION_TYPES).action(action);

		if (alias) commandInstance.alias(alias);

		[_options2.default.json, _options2.default.pretty, _options2.default.table].concat(_toConsumableArray(options)).forEach(function (option) {
			return commandInstance.option.apply(commandInstance, _toConsumableArray(option));
		});
	};
};
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getData = exports.getDataFromFile = exports.handleReadFileErrors = exports.getPassphrase = exports.getPassphraseFromSource = exports.getPassphraseFromFile = exports.getPassphraseFromEnvVariable = exports.getPassphraseFromPrompt = exports.createPromptOptions = exports.getStdIn = exports.splitSource = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _error = require('../error');

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


var capitalise = function capitalise(text) {
	return '' + text.charAt(0).toUpperCase() + text.slice(1);
};

var getPassphraseVerificationFailError = function getPassphraseVerificationFailError(displayName) {
	return capitalise(displayName) + ' was not successfully repeated.';
};
var getPassphraseSourceTypeUnknownError = function getPassphraseSourceTypeUnknownError(displayName) {
	return capitalise(displayName) + ' was provided with an unknown source type. Must be one of `env`, `file`, or `stdin`. Leave blank for prompt.';
};
var getPassphraseEnvVariableNotSetError = function getPassphraseEnvVariableNotSetError(displayName) {
	return 'Environmental variable for ' + displayName + ' not set.';
};
var getFileDoesNotExistError = function getFileDoesNotExistError(path) {
	return 'File at ' + path + ' does not exist.';
};
var getFileUnreadableError = function getFileUnreadableError(path) {
	return 'File at ' + path + ' could not be read.';
};
var ERROR_DATA_MISSING = 'No data was provided.';
var ERROR_DATA_SOURCE = 'Unknown data source type.';
var DEFAULT_TIMEOUT = 100;

var splitSource = exports.splitSource = function splitSource(source) {
	var delimiter = ':';
	var sourceParts = source.split(delimiter);
	return {
		sourceType: sourceParts[0],
		sourceIdentifier: sourceParts.slice(1).join(delimiter)
	};
};

var timeoutPromise = function timeoutPromise(ms) {
	return new Promise(function (resolve, reject) {
		var id = setTimeout(function () {
			clearTimeout(id);
			reject(new Error('Timed out after ' + ms + ' ms'));
		}, ms);
	});
};

var getStdIn = exports.getStdIn = function getStdIn() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    passphraseIsRequired = _ref.passphraseIsRequired,
	    secondPassphraseIsRequired = _ref.secondPassphraseIsRequired,
	    passwordIsRequired = _ref.passwordIsRequired,
	    dataIsRequired = _ref.dataIsRequired;

	var readFromStd = new Promise(function (resolve) {
		if (!(passphraseIsRequired || secondPassphraseIsRequired || passwordIsRequired || dataIsRequired)) {
			return resolve({});
		}

		var lines = [];
		var rl = _readline2.default.createInterface({ input: process.stdin });

		var handleClose = function handleClose() {
			var passphraseIndex = 0;
			var passphrase = passphraseIsRequired ? lines[passphraseIndex] : null;

			var secondPassphraseIndex = passphraseIndex + (passphrase !== null);
			var secondPassphrase = secondPassphraseIsRequired ? lines[secondPassphraseIndex] : null;

			var passwordIndex = secondPassphraseIndex + (secondPassphrase !== null);
			var password = passwordIsRequired ? lines[passwordIndex] : null;

			var dataStartIndex = passwordIndex + (password !== null);
			var dataLines = lines.slice(dataStartIndex);

			return resolve({
				passphrase: passphrase,
				secondPassphrase: secondPassphrase,
				password: password,
				data: dataLines.length ? dataLines.join('\n') : null
			});
		};

		return rl.on('line', function (line) {
			return lines.push(line);
		}).on('close', handleClose);
	});
	return Promise.race([readFromStd, timeoutPromise(DEFAULT_TIMEOUT)]);
};

var createPromptOptions = exports.createPromptOptions = function createPromptOptions(message) {
	return {
		type: 'password',
		name: 'passphrase',
		message: message
	};
};

var getPassphraseFromPrompt = exports.getPassphraseFromPrompt = function getPassphraseFromPrompt(vorpal, _ref2) {
	var displayName = _ref2.displayName,
	    shouldRepeat = _ref2.shouldRepeat;

	// IMPORTANT: prompt will exit if UI has no parent, but calling
	// ui.attach(vorpal) will start a prompt, which will complain when we call
	// vorpal.activeCommand.prompt(). Therefore set the parent directly.
	if (!vorpal.ui.parent) {
		// eslint-disable-next-line no-param-reassign
		vorpal.ui.parent = vorpal;
	}

	var handlePassphraseRepeat = function handlePassphraseRepeat(passphrase) {
		return vorpal.activeCommand.prompt(createPromptOptions('Please re-enter ' + displayName + ': ')).then(function (_ref3) {
			var passphraseRepeat = _ref3.passphrase;

			if (passphrase !== passphraseRepeat) {
				throw new _error.ValidationError(getPassphraseVerificationFailError(displayName));
			}
			return passphrase;
		});
	};

	var handlePassphrase = function handlePassphrase(_ref4) {
		var passphrase = _ref4.passphrase;
		return shouldRepeat ? handlePassphraseRepeat(passphrase) : passphrase;
	};

	return vorpal.activeCommand.prompt(createPromptOptions('Please enter ' + displayName + ': ')).then(handlePassphrase);
};

var getPassphraseFromEnvVariable = exports.getPassphraseFromEnvVariable = function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, displayName) {
		var passphrase;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						passphrase = process.env[key];

						if (passphrase) {
							_context.next = 3;
							break;
						}

						throw new _error.ValidationError(getPassphraseEnvVariableNotSetError(displayName));

					case 3:
						return _context.abrupt('return', passphrase);

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function getPassphraseFromEnvVariable(_x2, _x3) {
		return _ref5.apply(this, arguments);
	};
}();

var getPassphraseFromFile = exports.getPassphraseFromFile = function getPassphraseFromFile(path) {
	return new Promise(function (resolve, reject) {
		var stream = _fs2.default.createReadStream(path);
		var handleReadError = function handleReadError(error) {
			stream.close();
			var message = error.message;


			if (message.match(/ENOENT/)) {
				return reject(new _error.FileSystemError(getFileDoesNotExistError(path)));
			}
			if (message.match(/EACCES/)) {
				return reject(new _error.FileSystemError(getFileUnreadableError(path)));
			}

			return reject(error);
		};
		var handleLine = function handleLine(line) {
			stream.close();
			resolve(line);
		};

		stream.on('error', handleReadError);

		_readline2.default.createInterface({ input: stream }).on('error', handleReadError).on('line', handleLine);
	});
};

var getPassphraseFromSource = exports.getPassphraseFromSource = function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source, _ref6) {
		var displayName = _ref6.displayName;

		var _splitSource, sourceType, sourceIdentifier;

		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_splitSource = splitSource(source), sourceType = _splitSource.sourceType, sourceIdentifier = _splitSource.sourceIdentifier;
						_context2.t0 = sourceType;
						_context2.next = _context2.t0 === 'env' ? 4 : _context2.t0 === 'file' ? 5 : _context2.t0 === 'pass' ? 6 : 7;
						break;

					case 4:
						return _context2.abrupt('return', getPassphraseFromEnvVariable(sourceIdentifier, displayName));

					case 5:
						return _context2.abrupt('return', getPassphraseFromFile(sourceIdentifier));

					case 6:
						return _context2.abrupt('return', sourceIdentifier);

					case 7:
						throw new _error.ValidationError(getPassphraseSourceTypeUnknownError(displayName));

					case 8:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function getPassphraseFromSource(_x4, _x5) {
		return _ref7.apply(this, arguments);
	};
}();

var getPassphrase = exports.getPassphrase = function () {
	var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(vorpal, passphraseSource, options) {
		var optionsWithDefaults;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						optionsWithDefaults = Object.assign({ displayName: 'your secret passphrase' }, options);
						return _context3.abrupt('return', passphraseSource && passphraseSource !== 'prompt' ? getPassphraseFromSource(passphraseSource, optionsWithDefaults) : getPassphraseFromPrompt(vorpal, optionsWithDefaults));

					case 2:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function getPassphrase(_x6, _x7, _x8) {
		return _ref8.apply(this, arguments);
	};
}();

var handleReadFileErrors = exports.handleReadFileErrors = function handleReadFileErrors(path) {
	return function (error) {
		var message = error.message;

		if (message.match(/ENOENT/)) {
			throw new _error.FileSystemError(getFileDoesNotExistError(path));
		}
		if (message.match(/EACCES/)) {
			throw new _error.FileSystemError(getFileUnreadableError(path));
		}
		throw error;
	};
};

var getDataFromFile = exports.getDataFromFile = function () {
	var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(path) {
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						return _context4.abrupt('return', _fs2.default.readFileSync(path, 'utf8'));

					case 1:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function getDataFromFile(_x9) {
		return _ref9.apply(this, arguments);
	};
}();

var getData = exports.getData = function () {
	var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(source) {
		var _splitSource2, sourceType, path;

		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						if (source) {
							_context5.next = 2;
							break;
						}

						throw new _error.ValidationError(ERROR_DATA_MISSING);

					case 2:
						_splitSource2 = splitSource(source), sourceType = _splitSource2.sourceType, path = _splitSource2.sourceIdentifier;

						if (!(sourceType !== 'file')) {
							_context5.next = 5;
							break;
						}

						throw new _error.ValidationError(ERROR_DATA_SOURCE);

					case 5:
						return _context5.abrupt('return', getDataFromFile(path).catch(handleReadFileErrors(path)));

					case 6:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function getData(_x10) {
		return _ref10.apply(this, arguments);
	};
}();
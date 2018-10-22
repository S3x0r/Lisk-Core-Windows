'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getConfig = exports.setConfig = exports.configFilePath = undefined;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lockfile = require('lockfile');

var _lockfile2 = _interopRequireDefault(_lockfile);

var _default_config = require('../../default_config.json');

var _default_config2 = _interopRequireDefault(_default_config);

var _constants = require('./constants');

var _error = require('./error');

var _fs3 = require('./fs');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
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
var configDirName = '.lisk-commander';
var configFileName = 'config.json';
var lockfileName = 'config.lock';
var homedir = _os2.default.homedir();
var configDirPath = function configDirPath() {
	return process.env.LISK_COMMANDER_CONFIG_DIR || homedir + '/' + configDirName;
};
var configFilePath = exports.configFilePath = function configFilePath() {
	return configDirPath() + '/' + configFileName;
};
var lockfilePath = function lockfilePath() {
	return configDirPath() + '/' + lockfileName;
};

var attemptCallWithWarning = function attemptCallWithWarning(fn, path) {
	try {
		return fn();
	} catch (_) {
		var warning = 'WARNING: Could not write to `' + path + '`. Your configuration will not be persisted.';
		return _logger2.default.warn(warning);
	}
};

var attemptCallWithError = function attemptCallWithError(fn, errorMessage) {
	try {
		return fn();
	} catch (_) {
		_logger2.default.error(errorMessage);
		return process.exit(1);
	}
};

var attemptToCreateDir = function attemptToCreateDir(path) {
	var fn = _fs2.default.mkdirSync.bind(null, path);
	return attemptCallWithWarning(fn, path);
};

var attemptToCreateFile = function attemptToCreateFile(path) {
	var fn = _fs3.writeJSONSync.bind(null, path, _default_config2.default);
	return attemptCallWithWarning(fn, path);
};

var checkLockfile = function checkLockfile(path) {
	var locked = _lockfile2.default.checkSync(path);
	var errorMessage = 'Config lockfile at ' + lockfilePath() + ' found. Are you running Lisk Commander in another process?';
	if (locked) {
		_logger2.default.error(errorMessage);
		process.exit(1);
	}
};

var attemptToReadJSONFile = function attemptToReadJSONFile(path) {
	var fn = _fs3.readJSONSync.bind(null, path);
	var errorMessage = 'Config file cannot be read or is not valid JSON. Please check ' + path + ' or delete the file so we can create a new one from defaults.';
	return attemptCallWithError(fn, errorMessage);
};

var attemptToValidateConfig = function attemptToValidateConfig(config, path) {
	var rootKeys = _constants.CONFIG_VARIABLES.map(function (key) {
		return key.split('.')[0];
	});
	var fn = function fn() {
		return rootKeys.forEach(function (key) {
			if (!Object.keys(config).includes(key)) {
				throw new _error.ValidationError('Key ' + key + ' not found in config file.');
			}
		});
	};
	var errorMessage = 'Config file seems to be corrupted: missing required keys. Please check ' + path + ' or delete the file so we can create a new one from defaults.';
	return attemptCallWithError(fn, errorMessage);
};

var setConfig = exports.setConfig = function setConfig(newConfig) {
	checkLockfile(lockfilePath());
	_lockfile2.default.lockSync(lockfilePath());
	try {
		(0, _fs3.writeJSONSync)(configFilePath(), newConfig);
		return true;
	} catch (e) {
		return false;
	} finally {
		_lockfile2.default.unlockSync(lockfilePath());
	}
};

var getConfig = exports.getConfig = function getConfig() {
	if (!_fs2.default.existsSync(configDirPath())) {
		attemptToCreateDir(configDirPath());
	}

	if (!_fs2.default.existsSync(configFilePath())) {
		attemptToCreateFile(configFilePath());
		return _default_config2.default;
	}

	var config = attemptToReadJSONFile(configFilePath());
	attemptToValidateConfig(config, configFilePath());

	return config;
};
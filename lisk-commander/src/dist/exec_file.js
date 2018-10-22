'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /*
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


var handleError = function handleError(liskCommander, error) {
	return liskCommander.log(error.trim ? error.trim() : error);
};

var DIST_PATH = __dirname + '/../dist';

var generateScript = function generateScript(commandWithOptions) {
	return '\n\tprocess.env.NON_INTERACTIVE_MODE = true;\n\tprocess.env.EXEC_FILE_CHILD = true;\n\tvar liskCommander = require(\'' + DIST_PATH + '\').default;\n\n\tfunction handleSuccess() { process.exit(0) }\n\tfunction handleError() { process.exit(1) }\n\n\tliskCommander\n\t\t.exec(\'' + commandWithOptions.join(' ') + '\')\n\t\t.then(handleSuccess, handleError)\n';
};

var executeCommand = function executeCommand(liskCommander, commands, options) {
	var optionsToUse = Array.isArray(options) ? options : [];
	var commandWithOptions = [commands[0]].concat(_toConsumableArray(optionsToUse));
	var script = generateScript(commandWithOptions);

	return new Promise(function (resolve, reject) {
		_child_process2.default.exec('node --eval "' + script + '"', function (error, stdout, stderr) {
			if (error) return reject(handleError(liskCommander, error));
			if (stderr) return reject(handleError(liskCommander, stderr));

			liskCommander.log(stdout.trim());

			var remainingCommands = commands.slice(1);
			return remainingCommands.length ? executeCommand(liskCommander, remainingCommands, options).then(resolve, reject) : resolve();
		});
	});
};

var execFile = function execFile(liskCommander, path, options, exit) {
	var fileContents = _fs2.default.readFileSync(path, 'utf8');
	var commands = fileContents.split('\n').filter(Boolean).filter(function (line) {
		return !line.match(/^[\s]*#/);
	});

	return executeCommand(liskCommander, commands, options).then(function () {
		return exit(0);
	}, function () {
		return exit(1);
	});
};

exports.default = execFile;
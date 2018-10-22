'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _package = require('../package.json');

var _config = require('./utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = (0, _config.getConfig)().name || 'Lisk Commander'; /*
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

var delimiter = (0, _config.getConfig)().delimiter || 'lisk';
var liskCommander = (0, _vorpal2.default)();

var commandsDir = _path2.default.join(__dirname, 'commands');

_fs2.default.readdirSync(commandsDir).forEach(function (command) {
  var commandPath = _path2.default.join(commandsDir, command);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  var commandModule = require(commandPath);
  liskCommander.use(commandModule.default);
});

var copyright = _chalk2.default.dim('Lisk Commander  Copyright (C) 2017\u20132018  Lisk Foundation\nThis program comes with ABSOLUTELY NO WARRANTY; for details type `show w`.\nThis is free software, and you are welcome to redistribute it under certain conditions; type `show c` for details.\n');

var logo = _chalk2.default.rgb(36, 117, 185)('\n _      _     _       _____                                          _\n| |    (_)   | |     / ____|                                        | |\n| |     _ ___| | __ | |     ___  _ __ ___  _ __ ___   __ _ _ __   __| | ___ _ __\n| |    | / __| |/ / | |    / _ \\| \'_ ` _ \\| \'_ ` _ \\ / _` | \'_ \\ / _` |/ _ \\ \'__|\n| |____| \\__ \\   <  | |___| (_) | | | | | | | | | | | (_| | | | | (_| |  __/ |\n|______|_|___/_|\\_\\  \\_____\\___/|_| |_| |_|_| |_| |_|\\__,_|_| |_|\\__,_|\\___|_|\n');

var message = '\nRunning v' + _package.version + '.\nType `help` to get started.\n';
var intro = '' + copyright + logo + message;

liskCommander.delimiter(delimiter + '>').history(delimiter);

if (process.env.NON_INTERACTIVE_MODE !== 'true') {
  liskCommander.log(intro).show();
}

liskCommander.find('help').alias('?');
liskCommander.find('exit').description('Exits ' + name + '.');

exports.default = liskCommander;
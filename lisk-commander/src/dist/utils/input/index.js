'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFirstLineFromString = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('./utils');

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


var getFirstLineFromString = exports.getFirstLineFromString = function getFirstLineFromString(multilineString) {
	return typeof multilineString === 'string' ? multilineString.split(/[\r\n]+/)[0] : null;
};

var getInputsFromSources = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(vorpal, _ref) {
		var passphraseInput = _ref.passphrase,
		    secondPassphraseInput = _ref.secondPassphrase,
		    passwordInput = _ref.password,
		    dataInput = _ref.data;

		var _map, _map2, passphraseIsRequired, secondPassphraseIsRequired, passwordIsRequired, dataIsRequired, stdIn, passphrase, secondPassphrase, password, data;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_map = [passphraseInput, secondPassphraseInput, passwordInput, dataInput].map(function (input) {
							return !!input && input.source === 'stdin';
						}), _map2 = _slicedToArray(_map, 4), passphraseIsRequired = _map2[0], secondPassphraseIsRequired = _map2[1], passwordIsRequired = _map2[2], dataIsRequired = _map2[3];
						_context.next = 3;
						return (0, _utils.getStdIn)({
							passphraseIsRequired: passphraseIsRequired,
							secondPassphraseIsRequired: secondPassphraseIsRequired,
							passwordIsRequired: passwordIsRequired,
							dataIsRequired: dataIsRequired
						});

					case 3:
						stdIn = _context.sent;

						if (!(typeof stdIn.passphrase !== 'string' && passphraseInput)) {
							_context.next = 10;
							break;
						}

						_context.next = 7;
						return (0, _utils.getPassphrase)(vorpal, passphraseInput.source, {
							shouldRepeat: passphraseInput.repeatPrompt
						});

					case 7:
						_context.t0 = _context.sent;
						_context.next = 11;
						break;

					case 10:
						_context.t0 = stdIn.passphrase || null;

					case 11:
						passphrase = _context.t0;

						if (!(typeof stdIn.secondPassphrase !== 'string' && secondPassphraseInput)) {
							_context.next = 18;
							break;
						}

						_context.next = 15;
						return (0, _utils.getPassphrase)(vorpal, secondPassphraseInput.source, {
							displayName: 'your second secret passphrase',
							shouldRepeat: secondPassphraseInput.repeatPrompt
						});

					case 15:
						_context.t1 = _context.sent;
						_context.next = 19;
						break;

					case 18:
						_context.t1 = stdIn.secondPassphrase || null;

					case 19:
						secondPassphrase = _context.t1;

						if (!(typeof stdIn.password !== 'string' && passwordInput)) {
							_context.next = 26;
							break;
						}

						_context.next = 23;
						return (0, _utils.getPassphrase)(vorpal, passwordInput.source, {
							displayName: 'your password',
							shouldRepeat: passwordInput.repeatPrompt
						});

					case 23:
						_context.t2 = _context.sent;
						_context.next = 27;
						break;

					case 26:
						_context.t2 = stdIn.password || null;

					case 27:
						password = _context.t2;

						if (!(typeof stdIn.data !== 'string' && dataInput)) {
							_context.next = 34;
							break;
						}

						_context.next = 31;
						return (0, _utils.getData)(dataInput.source);

					case 31:
						_context.t3 = _context.sent;
						_context.next = 35;
						break;

					case 34:
						_context.t3 = stdIn.data || null;

					case 35:
						data = _context.t3;
						return _context.abrupt('return', {
							passphrase: passphrase,
							secondPassphrase: secondPassphrase,
							password: password,
							data: data
						});

					case 37:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function getInputsFromSources(_x, _x2) {
		return _ref2.apply(this, arguments);
	};
}();

exports.default = getInputsFromSources;
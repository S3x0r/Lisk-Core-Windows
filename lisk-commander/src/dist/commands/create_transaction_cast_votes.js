'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionCreator = undefined;

var _error = require('../utils/error');

var _input = require('../utils/input');

var _input2 = _interopRequireDefault(_input);

var _utils = require('../utils/input/utils');

var _helpers = require('../utils/helpers');

var _options = require('../utils/options');

var _options2 = _interopRequireDefault(_options);

var _transactions = require('../utils/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

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


var description = 'Creates a transaction which will cast votes (or unvotes) for delegate candidates using their public keys if broadcast to the network.\n\n\tExamples:\n\t- create transaction cast votes --votes 215b667a32a5cd51a94c9c2046c11fffb08c65748febec099451e3b164452bca,922fbfdd596fa78269bbcadc67ec2a1cc15fc929a19c462169568d7a3df1a1aa --unvotes e01b6b8a9b808ec3f67a638a2d3fa0fe1a9439b91dbdde92e2839c3327bd4589,ac09bc40c889f688f9158cca1fcfcdf6320f501242e0f7088d52a5077084ccba\n\t- create transaction 3 --votes 215b667a32a5cd51a94c9c2046c11fffb08c65748febec099451e3b164452bca,922fbfdd596fa78269bbcadc67ec2a1cc15fc929a19c462169568d7a3df1a1aa --unvotes e01b6b8a9b808ec3f67a638a2d3fa0fe1a9439b91dbdde92e2839c3327bd4589,ac09bc40c889f688f9158cca1fcfcdf6320f501242e0f7088d52a5077084ccba\n';

var processInputs = function processInputs(votes, unvotes) {
	return function (_ref) {
		var passphrase = _ref.passphrase,
		    secondPassphrase = _ref.secondPassphrase;
		return _transactions2.default.castVotes({ passphrase: passphrase, votes: votes, unvotes: unvotes, secondPassphrase: secondPassphrase });
	};
};

var processVotesInput = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(votes) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						return _context.abrupt('return', votes.includes(':') ? (0, _utils.getData)(votes) : votes);

					case 1:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function processVotesInput(_x) {
		return _ref2.apply(this, arguments);
	};
}();

var processVotes = function processVotes(votes) {
	return votes.replace(/\n/g, ',').split(',').filter(Boolean).map(function (vote) {
		return vote.trim();
	});
};

var actionCreator = exports.actionCreator = function actionCreator(vorpal) {
	return function () {
		var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
			var options = _ref3.options;
			var passphraseSource, secondPassphraseSource, votes, unvotes, signature, processedVotesInput, processedUnvotesInput, validatedVotes, validatedUnvotes, processFunction;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							passphraseSource = options.passphrase, secondPassphraseSource = options['second-passphrase'], votes = options.votes, unvotes = options.unvotes, signature = options.signature;

							if (!(!votes && !unvotes)) {
								_context2.next = 3;
								break;
							}

							throw new _error.ValidationError('At least one of votes and/or unvotes options must be provided.');

						case 3:
							if (!(votes === unvotes)) {
								_context2.next = 5;
								break;
							}

							throw new _error.ValidationError('Votes and unvotes sources must not be the same.');

						case 5:
							if (!votes) {
								_context2.next = 11;
								break;
							}

							_context2.next = 8;
							return processVotesInput(votes.toString());

						case 8:
							_context2.t0 = _context2.sent;
							_context2.next = 12;
							break;

						case 11:
							_context2.t0 = null;

						case 12:
							processedVotesInput = _context2.t0;

							if (!unvotes) {
								_context2.next = 19;
								break;
							}

							_context2.next = 16;
							return processVotesInput(unvotes.toString());

						case 16:
							_context2.t1 = _context2.sent;
							_context2.next = 20;
							break;

						case 19:
							_context2.t1 = null;

						case 20:
							processedUnvotesInput = _context2.t1;
							validatedVotes = processedVotesInput ? (0, _helpers.validatePublicKeys)(processVotes(processedVotesInput)) : [];
							validatedUnvotes = processedUnvotesInput ? (0, _helpers.validatePublicKeys)(processVotes(processedUnvotesInput)) : [];
							processFunction = processInputs(validatedVotes, validatedUnvotes);
							return _context2.abrupt('return', signature === false ? processFunction({ passphrase: null, secondPassphrase: null }) : (0, _input2.default)(vorpal, {
								passphrase: {
									source: passphraseSource,
									repeatPrompt: true
								},
								secondPassphrase: !secondPassphraseSource ? null : {
									source: secondPassphraseSource,
									repeatPrompt: true
								}
							}).then(processFunction));

						case 25:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		return function (_x2) {
			return _ref4.apply(this, arguments);
		};
	}();
};

var createTransactionCastVotes = (0, _helpers.createCommand)({
	command: 'create transaction cast votes',
	alias: ['create transaction 3', 'create transaction cast vote'],
	description: description,
	actionCreator: actionCreator,
	options: [_options2.default.noSignature, _options2.default.passphrase, _options2.default.secondPassphrase, _options2.default.votes, _options2.default.unvotes],
	errorPrefix: 'Could not create "cast votes" transaction'
});

exports.default = createTransactionCastVotes;
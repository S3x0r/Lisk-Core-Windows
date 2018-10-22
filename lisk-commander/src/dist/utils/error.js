'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.FileSystemError = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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


var FileSystemError = exports.FileSystemError = function (_Error) {
  _inherits(FileSystemError, _Error);

  function FileSystemError(message) {
    _classCallCheck(this, FileSystemError);

    var _this = _possibleConstructorReturn(this, (FileSystemError.__proto__ || Object.getPrototypeOf(FileSystemError)).call(this, message));

    _this.message = _chalk2.default.red(message);
    _this.name = 'FileSystemError';
    return _this;
  }

  return FileSystemError;
}(Error);

var ValidationError = exports.ValidationError = function (_Error2) {
  _inherits(ValidationError, _Error2);

  function ValidationError(message) {
    _classCallCheck(this, ValidationError);

    var _this2 = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, message));

    _this2.message = _chalk2.default.red(message);
    _this2.name = 'ValidationError';
    return _this2;
  }

  return ValidationError;
}(Error);
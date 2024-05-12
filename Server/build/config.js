"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testEnvironmentVariable = exports.log_dir = exports.cookie_secret = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var testEnvironmentVariable = exports.testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
var cookie_secret = exports.cookie_secret = process.env.COOKIE_SECRET;
var log_dir = exports.log_dir = process.env.LOG_DIR;
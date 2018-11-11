'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = exports.connect = exports.AppProvider = exports.actions = exports.model = undefined;

var _Provider = require('./Provider');

var _actions = require('./actions');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  model: _model2.default,
  actions: _actions.actions,
  AppProvider: _Provider.AppProvider,
  connect: _connect2.default,
  middleware: _middlewares2.default
};
exports.model = _model2.default;
exports.actions = _actions.actions;
exports.AppProvider = _Provider.AppProvider;
exports.connect = _connect2.default;
exports.middleware = _middlewares2.default;
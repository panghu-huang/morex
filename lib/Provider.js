"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.AppProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _actions = require("./actions");

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

var _RouterWrapper = require("./RouterWrapper");

var _RouterWrapper2 = _interopRequireDefault(_RouterWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _createContext = (0, _react.createContext)(),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var AppProvider = function (_Component) {
  _inherits(AppProvider, _Component);

  function AppProvider(props) {
    _classCallCheck(this, AppProvider);

    var _this = _possibleConstructorReturn(this, (AppProvider.__proto__ || Object.getPrototypeOf(AppProvider)).call(this, props));

    var models = (0, _model2.default)();
    var data = {};
    models.forEach(function (model) {
      var name = model.name,
          _model$initialState = model.initialState,
          initialState = _model$initialState === undefined ? {} : _model$initialState,
          _model$reducers = model.reducers,
          reducers = _model$reducers === undefined ? {} : _model$reducers,
          _model$effects = model.effects,
          effects = _model$effects === undefined ? {} : _model$effects;

      if (!name || "string" !== typeof name) {
        return;
      }
      if (name === "routing") {
        throw new Error('invalid model name "routing"');
      }
      data[name] = initialState;
      _actions.actions[name] = {};
      _this.addReducers(name, reducers);
      _this.addEffects(name, effects);
    });
    _this.state = { data: data };
    _this.getState = _this.getState.bind(_this);
    return _this;
  }

  _createClass(AppProvider, [{
    key: "addReducers",
    value: function addReducers(name) {
      var _this2 = this;

      var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      Object.keys(reducers).forEach(function (actionName) {
        _actions.actions[name][actionName] = function () {
          var _reducers$actionName;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var data = _this2.state.data;

          var newData = (_reducers$actionName = reducers[actionName]).call.apply(_reducers$actionName, [null, data[name]].concat(args));
          _this2.setState({ data: _extends({}, data, _defineProperty({}, name, newData)) });
        };
      });
    }
  }, {
    key: "addEffects",
    value: function addEffects(name) {
      var _this3 = this;

      var effects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      Object.keys(effects).forEach(function (actionName) {
        _actions.actions[name][actionName] = function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var ret;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return effects[actionName].apply(null, args.concat(_this3.getState));

                  case 3:
                    ret = _context.sent;
                    return _context.abrupt("return", ret);

                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context["catch"](0);
                    throw _context.t0;

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this3, [[0, 7]]);
          }));

          return function () {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  }, {
    key: "getState",
    value: function getState() {
      var data = this.state.data;

      return data;
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.state.data;

      return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
          Provider,
          { value: data },
          _react2.default.createElement(
            _RouterWrapper2.default,
            null,
            this.props.children
          )
        )
      );
    }
  }]);

  return AppProvider;
}(_react.Component);

exports.AppProvider = AppProvider;
exports.Consumer = Consumer;
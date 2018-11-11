'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.AppProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _actions = require('./actions');

var _RouterWrapper = require('./RouterWrapper');

var _RouterWrapper2 = _interopRequireDefault(_RouterWrapper);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

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

    var data = _this.initialModel();
    _this.state = { data: data };
    _this.initialMiddlewares(data);
    _this.getState = _this.getState.bind(_this);
    return _this;
  }

  _createClass(AppProvider, [{
    key: 'initialModel',
    value: function initialModel() {
      var _this2 = this;

      var models = (0, _model2.default)();
      var data = {};
      models.forEach(function (model) {
        var name = model.name,
            _model$initialState = model.initialState,
            initialState = _model$initialState === undefined ? {} : _model$initialState,
            reducers = model.reducers,
            effects = model.effects;

        if (!name || 'string' !== typeof name || name === 'routing') {
          throw new Error('invalid model name "' + String(name) + '"');
        }
        data[name] = initialState;
        _actions.actions[name] = {};
        _this2.addReducers(name, reducers);
        _this2.addEffects(name, effects);
      });
      return data;
    }
  }, {
    key: 'initialMiddlewares',
    value: function initialMiddlewares(initialStore) {
      var _this3 = this;

      var NODE_ENV = process.env.NODE_ENV;

      var reduxDevTools = NODE_ENV === 'development' && window && window.devToolsExtension;
      var middlewares = (0, _middlewares2.default)();
      if (reduxDevTools) {
        var features = {
          jump: true
        };
        var devTools = reduxDevTools.connect({ name: 'More Store', features: features });
        devTools.init(initialStore);
        devTools.subscribe(function (data) {
          switch (data.type) {
            case 'DISPATCH':
              var type = data.payload.type;

              if (type === 'JUMP_TO_STATE' || type === 'JUMP_TO_ACTION') {
                _this3.setState({ data: JSON.parse(data.state) });
              }
            default:
              break;
          }
        });
        middlewares.push(function (actionName, data) {
          devTools.send({ type: actionName }, data);
        });
      }
      this.middlewares = middlewares;
    }
  }, {
    key: 'addReducers',
    value: function addReducers(name) {
      var _this4 = this;

      var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      Object.keys(reducers).forEach(function (actionName) {
        _actions.actions[name][actionName] = function () {
          var _reducers$actionName;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var data = _this4.state.data;

          var newData = (_reducers$actionName = reducers[actionName]).call.apply(_reducers$actionName, [null, data[name]].concat(args));
          var updatedData = _extends({}, data, _defineProperty({}, name, newData));
          _this4.setState({ data: updatedData }, function () {
            _this4.middlewares.forEach(function (middleware) {
              middleware(actionName, updatedData, data);
            });
          });
        };
      });
    }
  }, {
    key: 'addEffects',
    value: function addEffects(name) {
      var _this5 = this;

      var effects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      Object.keys(effects).forEach(function (actionName) {
        _actions.actions[name][actionName] = function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return effects[actionName].apply(null, args.concat(_this5.getState));

                  case 3:
                    result = _context.sent;
                    return _context.abrupt('return', result);

                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context['catch'](0);
                    throw _context.t0;

                  case 10:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this5, [[0, 7]]);
          }));

          return function () {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state.data;
    }
  }, {
    key: 'render',
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
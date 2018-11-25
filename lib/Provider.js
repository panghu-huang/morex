'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.AppProvider = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _createContext = (0, _react.createContext)(),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var AppProvider = function (_Component) {
  (0, _inherits3.default)(AppProvider, _Component);

  function AppProvider(props) {
    (0, _classCallCheck3.default)(this, AppProvider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppProvider.__proto__ || (0, _getPrototypeOf2.default)(AppProvider)).call(this, props));

    var data = _this.initialModel();
    _this.state = { data: data };
    _this.initialMiddlewares(data);
    _this.getState = _this.getState.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(AppProvider, [{
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

      (0, _keys2.default)(reducers).forEach(function (actionName) {
        _actions.actions[name][actionName] = function () {
          var _reducers$actionName;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var data = _this4.state.data;

          var newData = (_reducers$actionName = reducers[actionName]).call.apply(_reducers$actionName, [null, data[name]].concat(args));
          var updatedData = (0, _extends4.default)({}, data, (0, _defineProperty3.default)({}, name, newData));
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

      (0, _keys2.default)(effects).forEach(function (actionName) {
        _actions.actions[name][actionName] = function () {
          var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            var result;
            return _regenerator2.default.wrap(function _callee$(_context) {
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
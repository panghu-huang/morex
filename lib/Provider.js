'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.AppProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./actions');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    _initialiseProps.call(_this);

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

      if (!name || 'string' !== typeof name) {
        return;
      }
      data[name] = initialState;
      _actions.actions[name] = {};
      _this.addReducers(name, reducers);
      _this.addEffects(name, effects);
    });
    _this.state = { data: data };
    return _this;
  }

  _createClass(AppProvider, [{
    key: 'render',
    value: function render() {
      var data = this.state.data;

      return _react2.default.createElement(
        Provider,
        { value: data },
        this.props.children
      );
    }
  }]);

  return AppProvider;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.addReducers = function (name) {
    var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Object.keys(reducers).forEach(function (actionName) {
      _actions.actions[name][actionName] = function () {
        var _reducers$actionName;

        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        var data = _this2.state.data;

        var newData = (_reducers$actionName = reducers[actionName]).call.apply(_reducers$actionName, [null, data[name]].concat(params));
        _this2.setState({ data: _extends({}, data, _defineProperty({}, name, newData)) });
      };
    });
  };

  this.addEffects = function (name) {
    var effects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Object.keys(effects).forEach(function (actionName) {
      _actions.actions[name][actionName] = effects[actionName];
    });
  };
};

exports.AppProvider = AppProvider;
exports.Consumer = Consumer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Provider = require('./Provider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connect = function connect() {
  var mapping = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (store) {
    return store;
  };

  return function (WappedComponent) {
    return function (_Component) {
      _inherits(Wrapper, _Component);

      function Wrapper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call.apply(_ref, [this].concat(args))), _this), _this.renderContent = function (store) {
          var props = mapping(store);
          if ('object' !== (typeof props === 'undefined' ? 'undefined' : _typeof(props))) {
            throw new Error('返回值应该是 Object 类型');
          }
          return _react2.default.createElement(WappedComponent, props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(Wrapper, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            _Provider.Consumer,
            null,
            this.renderContent
          );
        }
      }]);

      return Wrapper;
    }(_react.Component);
  };
};

exports.default = connect;